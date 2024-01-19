import { setShowLeftPanel } from '@core/actions/layout.actions';
import { ILayoutState } from '@core/interfaces';
import { createReducer, on } from '@ngrx/store';

const initialState: ILayoutState = {
  showLeftPanel: true,
};

/**
 * Core reducer function.
 */
export const layoutReducer = createReducer(
  initialState,
  on(setShowLeftPanel, (state, { showLeftPanel }): ILayoutState => {
    return { ...state, showLeftPanel };
  })
);
