import { KanbanStatusList } from '@core/enumerations';
import { IkanbanTask } from './kanban-task';

export interface IMoveTask {
  taskToMove: IkanbanTask;
  newListOftask: IkanbanTask[];
  newKanbanStatus: KanbanStatusList;
  isTheSameColumn: boolean;
}
