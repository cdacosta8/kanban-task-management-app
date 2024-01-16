import { Injectable } from '@angular/core';
import {
  initializeTask,
  moveTask,
  moveTaskkSuccess,
  setAllTask,
  setAllTaskSuccess,
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
import { map, mergeMap } from 'rxjs';

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
        return setAllTask(listOfTask);
      })
    );
  });

  public setAllTask$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(setAllTask),
      map(({ listOfTask }) => {
        window.localStorage.setItem('listOfTask', JSON.stringify(listOfTask));
        return setAllTaskSuccess();
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

        return [moveTaskkSuccess(), setAllTask(arrayFromMap)];
      })
    );
  });

  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store
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
}
