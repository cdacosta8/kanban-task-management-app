import { setTask } from '@core/actions/task.actions';
import { ITaskState } from '@core/interfaces';
import initialKanbanTask from '@core/mocks/initialKanbanTask';
import { createReducer, on } from '@ngrx/store';

const initialState: ITaskState = {
  listOfTask: initialKanbanTask,
};

/**
 * Core reducer function.
 */
export const taskReducer = createReducer(
  initialState,
  on(setTask, (state, { listOfTask }): ITaskState => {
    return { ...state, listOfTask };
  })
);
