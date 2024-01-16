import { KanbanStatusList } from '@core/enumerations';
import { IkanbanTask } from '@core/interfaces';

export const updateTaskStatus = (
  state: IkanbanTask[],
  taskId: number,
  newStatus: KanbanStatusList
): IkanbanTask[] => {
  return state.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        status: newStatus,
      };
    }
    return task;
  });
};
