import { KanbanStatusList } from '@core/enumerations';
import { IkanbanTask } from '@core/interfaces';

export const findByIdInMap = (
  map: Map<KanbanStatusList, IkanbanTask[]>,
  id: number
): IkanbanTask | null => {
  let findTask: IkanbanTask | null = null;

  map.forEach((tasksArray) => {
    const task = tasksArray.find((tarea) => tarea.id === id);

    if (task) {
      findTask = task;
    }
  });

  return findTask;
};
