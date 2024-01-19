import { InjectionToken } from '@angular/core';
import { IState } from '@core/interfaces';
import { ActionReducerMap } from '@ngrx/store';
import { taskReducer } from './list-of-task.reducer';
import { layoutReducer } from './layout.reducer';

export const rootReducersInjector = new InjectionToken<
  ActionReducerMap<IState>
>('Root Reducers', {
  factory: () => ({
    task: taskReducer,
    layout: layoutReducer,
  }),
});
