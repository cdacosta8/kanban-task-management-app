import { KanbanStatusList } from '@core/enumerations';
import { IMoveTask, IkanbanTask } from '@core/interfaces';
import { createAction } from '@ngrx/store';

export const initializeTask = createAction('[task] Initialize Task');

export const setTask = createAction(
  '[task] Set Task',
  (listOfTask: Array<[KanbanStatusList, IkanbanTask[]]>) => ({
    listOfTask,
  })
);

export const setTaskSuccess = createAction('[task] Set Task Success');

export const moveTask = createAction(
  '[task] Move Task',
  (moveTask: IMoveTask) => ({
    moveTask,
  })
);

export const moveTaskSuccess = createAction('[task] Move Task Success');

export const openAddTaskDialog = createAction(
  '[Finalize] Open Add Task Dialog'
);

export const openAddTaskDialogSuccess = createAction(
  '[Finalize] Open Add Task Dialog success'
);

export const addTask = createAction(
  '[task] Add Task',
  (newTask: IkanbanTask) => ({
    newTask,
  })
);

export const addTaskSuccess = createAction('[task] Add Task Success');
