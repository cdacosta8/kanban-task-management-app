import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  addTask,
  addTaskSuccess,
  editTask,
  initializeTask,
  moveTask,
  moveTaskSuccess,
  openAddTaskDialog,
  openAddTaskDialogSuccess,
  openEditTaskDialog,
  openEditTaskDialogSuccess,
  setTask,
  setTaskSuccess,
} from '@core/actions/task.actions';
import { KanbanStatusList } from '@core/enumerations';
import { findByIdInMap } from '@core/helpers';
import { IMoveTask, IkanbanTask } from '@core/interfaces';
import initialKanbanTask from '@core/mocks/initialKanbanTask';

import { getListOfTaskMap } from '@core/selectors';
import {
  Actions,
  OnInitEffects,
  concatLatestFrom,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { filter, map, mergeMap, of } from 'rxjs';
import { AddTaskDialogComponent } from 'src/app/kanban-board/components/add-task-dialog/add-task-dialog.component';
import { EditTaskDialogComponent } from 'src/app/kanban-board/components/edit-task-dialog/edit-task-dialog.component';

@Injectable()
export class TaskEffects implements OnInitEffects {
  public initializeTask$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(initializeTask),
      map(() => {
        const listOfTask = JSON.parse(
          window.localStorage.getItem('listOfTask') ??
            JSON.stringify(initialKanbanTask)
        );
        return setTask(listOfTask);
      })
    );
  });

  public setAllTask$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(setTask),
      map(({ listOfTask }) => {
        window.localStorage.setItem('listOfTask', JSON.stringify(listOfTask));
        return setTaskSuccess();
      })
    );
  });

  public moveTask$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(moveTask),
      concatLatestFrom(() => this._store.pipe(select(getListOfTaskMap))),
      mergeMap(([{ moveTask }, listOfTaskFromState]) => {
        const updatedList = this._updateListOnMove(
          moveTask,
          listOfTaskFromState
        );
        const arrayFromMap = Array.from(updatedList);

        return [moveTaskSuccess(), setTask(arrayFromMap)];
      })
    );
  });

  public openAddTaskDialog$ = createEffect(() =>
    this._actions$.pipe(
      ofType(openAddTaskDialog),
      mergeMap(() => {
        let addTaskDialog$ = of(null);
        addTaskDialog$ = this._openAddTaskDialog();

        return addTaskDialog$.pipe(
          mergeMap((dialogResult) => {
            const responseActions = [openAddTaskDialogSuccess()];
            if (dialogResult) {
              const { task } = dialogResult;
              return [...responseActions, addTask(task)];
            }

            return responseActions;
          })
        );
      })
    )
  );

  public addTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(addTask),
      concatLatestFrom(() => this._store.pipe(select(getListOfTaskMap))),
      mergeMap(([{ newTask }, listOfTaskFromState]) => {
        const listOfTask = new Map(listOfTaskFromState);

        if (listOfTask.has(newTask.status)) {
          const statusTasks = [
            ...(listOfTask.get(newTask.status) || []),
            newTask,
          ];
          listOfTask.set(newTask.status, statusTasks);
        } else {
          listOfTask.set(newTask.status, [newTask]);
        }

        const arrayFromMap = Array.from(listOfTask);
        return [addTaskSuccess(), setTask(arrayFromMap)];
      })
    )
  );

  public openEditTaskDialog$ = createEffect(() =>
    this._actions$.pipe(
      ofType(openEditTaskDialog),
      filter(({ taskToEdit }) => taskToEdit !== null),
      mergeMap(({ taskToEdit }) => {
        let editTaskDialog$ = of(null);
        editTaskDialog$ = this._openEditTaskDialog(taskToEdit as IkanbanTask);

        return editTaskDialog$.pipe(
          mergeMap((dialogResult) => {
            const responseActions = [openEditTaskDialogSuccess()];
            if (dialogResult) {
              const { task } = dialogResult;
              return [...responseActions, editTask(task)];
            }

            return responseActions;
          })
        );
      })
    )
  );

  public editTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(editTask),
      concatLatestFrom(() => this._store.pipe(select(getListOfTaskMap))),
      mergeMap(([{ taskToEdit }, listOfTaskFromState]) => {
        const listOfTask = new Map(listOfTaskFromState);
        const previusTask = findByIdInMap(listOfTask, taskToEdit.id);

        if (previusTask) {
          this._handleStatusChange(listOfTask, previusTask, taskToEdit);
          console.log([...Array.from(listOfTask)]);
          this._updateTaskList(listOfTask, taskToEdit);
        }

        const arrayFromMap = Array.from(listOfTask);
        return [addTaskSuccess(), setTask(arrayFromMap)];
      })
    )
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store,
    private readonly _dialogService: MatDialog
  ) {}

  public ngrxOnInitEffects(): Action {
    return initializeTask();
  }

  private _openAddTaskDialog() {
    const confirmationRef = this._dialogService.open(AddTaskDialogComponent);

    return confirmationRef.afterClosed();
  }

  private _openEditTaskDialog(taskToEdit: IkanbanTask) {
    const confirmationRef = this._dialogService.open(EditTaskDialogComponent, {
      data: { taskToEdit },
    });

    return confirmationRef.afterClosed();
  }

  private _handleStatusChange(
    listOfTask: Map<KanbanStatusList, IkanbanTask[]>,
    previousTask: IkanbanTask,
    taskToEdit: IkanbanTask
  ): void {
    const { status: prevStatus, id } = previousTask;
    const { status: newStatus } = taskToEdit;

    if (prevStatus !== newStatus) {
      const removeFromStatus = listOfTask.get(prevStatus) || [];
      const updatedTasksArray = removeFromStatus.filter(
        (task) => task.id !== id
      );
      listOfTask.set(prevStatus, updatedTasksArray);

      const addToStatus = listOfTask.get(newStatus) || [];
      listOfTask.set(newStatus, [...addToStatus, taskToEdit]);
    }
  }

  private _updateTaskList(
    listOfTask: Map<KanbanStatusList, IkanbanTask[]>,
    taskToEdit: IkanbanTask
  ): void {
    const statusTasks = listOfTask.get(taskToEdit.status);

    if (statusTasks) {
      const updatedTasks = statusTasks.map((task) =>
        task.id === taskToEdit.id ? { ...taskToEdit } : task
      );

      listOfTask.set(taskToEdit.status, updatedTasks);
    }
  }

  private _updateListOnMove(
    actionData: IMoveTask,
    listOfTaskFromState: Map<KanbanStatusList, IkanbanTask[]>
  ) {
    if (!actionData.isTheSameColumn) {
      const { status, id } = actionData.taskToMove;
      const tasksArray = listOfTaskFromState.get(status) ?? [];
      const updatedTasksArray = tasksArray.filter((task) => task.id !== id);
      listOfTaskFromState.set(status, updatedTasksArray);
    }

    listOfTaskFromState.set(
      actionData.newKanbanStatus,
      actionData.newListOftask
    );
    return listOfTaskFromState;
  }
}
