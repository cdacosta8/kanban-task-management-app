import { KanbanStatusList } from '@core/enumerations';
import { IkanbanTask } from '@core/interfaces';
import { createAction } from '@ngrx/store';

export const initializeTask = createAction('[task] initialize task');

export const setAllTask = createAction(
  '[task] set all task',
  (listOfTask: IkanbanTask[]) => ({
    listOfTask,
  })
);

export const setAllTaskSuccess = createAction('[task] set all task success');

export const updateTask = createAction(
  '[task] update task',
  (idTask: number, newKanbanStatus: KanbanStatusList) => ({
    idTask,
    newKanbanStatus,
  })
);

export const updateTaskSuccess = createAction('[task] update task success');
