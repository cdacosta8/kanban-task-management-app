import { KanbanStatusList, ReducerKeys } from '@core/enumerations';
import { ISubTask, ITaskState, IkanbanTask } from '@core/interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const taskState = createFeatureSelector<ITaskState>(ReducerKeys.Task);

export const getListOfTask = createSelector(
  taskState,
  (state) => state.listOfTask
);

export const getListOfTaskMap = createSelector(
  getListOfTask,
  (listOfTask: Array<[KanbanStatusList, IkanbanTask[]]>) => {
    return new Map(listOfTask);
  }
);

export const getTasksWithSubtasksCount = createSelector(
  getListOfTaskMap,
  (listOfTaskMap: Map<KanbanStatusList, IkanbanTask[]>) => {
    const tasksWithSubtasksCount: Map<KanbanStatusList, IkanbanTask[]> =
      new Map();

    listOfTaskMap.forEach((tasks, status) => {
      const updatedTasks = tasks.map((task) => {
        const subtasksTrueCount = task.subtask.reduce((count, subtask) => {
          return count + (subtask.status === true ? 1 : 0);
        }, 0);

        return { ...task, subtasksTrueCount };
      });

      tasksWithSubtasksCount.set(status, updatedTasks);
    });

    return tasksWithSubtasksCount;
  }
);
