import { InjectionToken } from '@angular/core';
import { IState } from '@core/interfaces';
import { ActionReducerMap } from '@ngrx/store';

export const rootReducersInjector = new InjectionToken<
  ActionReducerMap<IState>
>('Root Reducers', {
  factory: () => ({}),
});
