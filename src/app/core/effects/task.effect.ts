import { Injectable } from '@angular/core';
import {
  initializeTask,
  setAllTask,
  setAllTaskSuccess,
  updateTask,
  updateTaskSuccess,
} from '@core/actions/task.actions';
import { updateTaskStatus } from '@core/helpers';
import { initialKanbanTask } from '@core/mocks/initialKanbanTask';
import { getListOfTask } from '@core/selectors';
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

  public updateTask$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(updateTask),
      concatLatestFrom(() => this._store.pipe(select(getListOfTask))),
      mergeMap(([{ idTask, newKanbanStatus }, listOfTaskFromState]) => {
        const listOfTaskUpdate = updateTaskStatus(
          listOfTaskFromState,
          idTask,
          newKanbanStatus
        );

        return [updateTaskSuccess(), setAllTask(listOfTaskUpdate)];
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

  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store
  ) {}

  public ngrxOnInitEffects(): Action {
    return initializeTask();
  }
}
