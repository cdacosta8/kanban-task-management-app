import { createAction } from '@ngrx/store';

export const setShowLeftPanel = createAction(
  '[layout] Set Show Left Panel',
  (showLeftPanel: boolean) => ({
    showLeftPanel,
  })
);
