import { KanbanStatusList } from '@core/enumerations';
import { IMoveTask, IkanbanTask } from '@core/interfaces';
import { createAction } from '@ngrx/store';

export const initializeTask = createAction('[task] Initialize Task');

export const setAllTask = createAction(
  '[task] Set All Task',
  (listOfTask: Array<[KanbanStatusList, IkanbanTask[]]>) => ({
    listOfTask,
  })
);

export const setAllTaskSuccess = createAction('[task] Set All Task Success');

export const moveTask = createAction(
  '[task] Move Task',
  (moveTask: IMoveTask) => ({
    moveTask,
  })
);

export const moveTaskkSuccess = createAction('[task] Move Task Success');
