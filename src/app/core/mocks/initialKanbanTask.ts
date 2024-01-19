import { KanbanStatusList } from '@core/enumerations';
import { IkanbanTask } from '@core/interfaces';

// Mock de datos para listOfTask
const initialKanbanTask: Array<[KanbanStatusList, IkanbanTask[]]> = [
  [
    KanbanStatusList.TODO,
    [
      {
        id: 1,
        status: KanbanStatusList.TODO,
        title: 'Tarea 1',
        description: 'Descripción de la tarea 1',
        subtask: [
          { status: false, title: 'Subtarea 1' },
          { status: false, title: 'Subtarea 2' },
        ],
      },
      {
        id: 2,
        status: KanbanStatusList.TODO,
        title: 'Tarea 2',
        description: 'Descripción de la tarea 2',
        subtask: [
          { status: false, title: 'Subtarea 1' },
          { status: false, title: 'Subtarea 2' },
        ],
      },
    ],
  ],
  [
    KanbanStatusList.DOING,
    [
      {
        id: 3,
        status: KanbanStatusList.DOING,
        title: 'Tarea 3',
        description: 'Descripción de la tarea 3',
        subtask: [
          { status: true, title: 'Subtarea 1' },
          { status: false, title: 'Subtarea 2' },
        ],
      },
      {
        id: 4,
        status: KanbanStatusList.DOING,
        title: 'Tarea 4',
        description: 'Descripción de la tarea 4',
        subtask: [
          { status: true, title: 'Subtarea 1' },
          { status: false, title: 'Subtarea 2' },
        ],
      },
    ],
  ],
  [
    KanbanStatusList.DONE,
    [
      {
        id: 5,
        status: KanbanStatusList.DONE,
        title: 'Tarea 5',
        description: 'Descripción de la tarea 5',
        subtask: [
          { status: true, title: 'Subtarea 1' },
          { status: true, title: 'Subtarea 2' },
        ],
      },
      {
        id: 6,
        status: KanbanStatusList.DONE,
        title: 'Tarea 6',
        description: 'Descripción de la tarea 6',
        subtask: [
          { status: true, title: 'Subtarea 1' },
          { status: true, title: 'Subtarea 2' },
          { status: true, title: 'Subtarea 3' },
          { status: true, title: 'Subtarea 4' },
        ],
      },
      {
        id: 7,
        status: KanbanStatusList.DONE,
        title: 'Tarea 7',
        description: 'Descripción de la tarea 7',
        subtask: [
          { status: true, title: 'Subtarea 1' },
          { status: true, title: 'Subtarea 2' },
          { status: true, title: 'Subtarea 3' },
        ],
      },
    ],
  ],
];

const kanbanTaskMap = new Map<KanbanStatusList, IkanbanTask[]>();

initialKanbanTask.forEach(([status, tasks]) => {
  kanbanTaskMap.set(status, tasks);
});

export default initialKanbanTask;
