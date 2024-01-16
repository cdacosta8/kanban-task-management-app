import { ReducerKeys } from '@core/enumerations';
import { ISubTask, ITaskState } from '@core/interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const taskState = createFeatureSelector<ITaskState>(ReducerKeys.Task);

export const getListOfTask = createSelector(
  taskState,
  (state) => state.listOfTask
);

export const getListOfTaskCalculated = createSelector(taskState, (state) => {
  return state.listOfTask.map((task) => {
    const subtasksTrueCount = task.subtask.filter(
      (subtask: ISubTask) => subtask.status
    ).length;
    return {
      ...task,
      subtasksTrueCount,
    };
  });
});
