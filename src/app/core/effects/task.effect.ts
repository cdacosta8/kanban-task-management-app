import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  addTask,
  addTaskSuccess,
  initializeTask,
  moveTask,
  moveTaskSuccess,
  openAddTaskDialog,
  openAddTaskDialogSuccess,
  setTask,
  setTaskSuccess,
} from '@core/actions/task.actions';
import { KanbanStatusList } from '@core/enumerations';
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
import { map, mergeMap, of } from 'rxjs';
import { AddTaskDialogComponent } from 'src/app/kanban-board/components/add-task-dialog/add-task-dialog.component';

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
        const updatedList = this.updateListOnMove(
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
        let addEditCommentsDialog$ = of(null);
        addEditCommentsDialog$ = this._openAddTaskDialog();

        return addEditCommentsDialog$.pipe(
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

  public addTask$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(addTask),
      concatLatestFrom(() => this._store.pipe(select(getListOfTaskMap))),
      mergeMap(([{ newTask }, listOfTaskFromState]) => {
        const tasksArrayMap = new Map(listOfTaskFromState);
        if (tasksArrayMap.has(newTask.status)) {
          const statusTasks = [...(tasksArrayMap.get(newTask.status) ?? [])];
          statusTasks?.push(newTask);
          tasksArrayMap.set(newTask.status, statusTasks as IkanbanTask[]);
        }
        const arrayFromMap = Array.from(tasksArrayMap);

        return [addTaskSuccess(), setTask(arrayFromMap)];
      })
    );
  });

  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store,
    private readonly _dialogService: MatDialog
  ) {}

  public ngrxOnInitEffects(): Action {
    return initializeTask();
  }

  private updateListOnMove(
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

  private _openAddTaskDialog() {
    const confirmationRef = this._dialogService.open(AddTaskDialogComponent);

    return confirmationRef.afterClosed();
  }
}
