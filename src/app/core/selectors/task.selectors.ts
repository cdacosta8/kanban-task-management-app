import { ReducerKeys } from '@core/enumerations';
import { ITaskState } from '@core/interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const taskState = createFeatureSelector<ITaskState>(ReducerKeys.Task);

export const getListOfTask = createSelector(
  taskState,
  (state) => state.listOfTask
);
