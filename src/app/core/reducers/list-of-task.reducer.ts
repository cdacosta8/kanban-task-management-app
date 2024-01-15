import { ITaskState } from '@core/interfaces';
import { initialKanbanTask } from '@core/mocks/initialKanbanTask';
import { createReducer } from '@ngrx/store';

const initialState: ITaskState = {
  listOfTask: initialKanbanTask,
};

/**
 * Core reducer function.
 */
export const taskReducer = createReducer(initialState);
