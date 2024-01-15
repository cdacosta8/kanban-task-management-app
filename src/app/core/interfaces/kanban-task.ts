import { KanbanStatusList } from '@core/enumerations';
import { ISubTask } from './sub-task';

export interface IkanbanTask {
  id: number;
  status: KanbanStatusList;
  title: string;
  description: string;
  subtask: ISubTask[];
}
