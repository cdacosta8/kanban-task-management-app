import { KanbanStatusList } from '@core/enumerations';
import { IkanbanTask } from './kanban-task';

export interface ITaskState {
  listOfTask: Array<[KanbanStatusList, IkanbanTask[]]>;
}
