import { ILayoutState } from './layout-state';
import { ITaskState } from './task-state';

export interface IState {
  task: ITaskState;
  layout: ILayoutState;
}
