import { ReducerKeys } from '@core/enumerations';
import { ILayoutState } from '@core/interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const layoutState = createFeatureSelector<ILayoutState>(
  ReducerKeys.Layout
);

export const getShowLeftPanel = createSelector(
  layoutState,
  (state) => state.showLeftPanel
);
