import { KanbanStatusList } from '@core/enumerations';
import { ISubTask, IkanbanTask } from '@core/interfaces';

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
      // Puedes agregar más tareas según sea necesario
    ],
  ],
  [
    KanbanStatusList.DOING,
    [
      {
        id: 3,
        status: KanbanStatusList.DOING,
        title: 'Tarea doing 1',
        description: 'Descripción de la tarea 1',
        subtask: [
          { status: true, title: 'Subtarea 1' },
          { status: false, title: 'Subtarea 2' },
        ],
      },
      {
        id: 4,
        status: KanbanStatusList.DOING,
        title: 'Tarea doing 2',
        description: 'Descripción de la tarea 2',
        subtask: [
          { status: true, title: 'Subtarea 1' },
          { status: false, title: 'Subtarea 2' },
        ],
      },
      // Puedes agregar más tareas según sea necesario
    ],
  ],
  [
    KanbanStatusList.DONE,
    [
      {
        id: 5,
        status: KanbanStatusList.DONE,
        title: 'Tarea DONE 1',
        description: 'Descripción de la tarea 1',
        subtask: [
          { status: true, title: 'Subtarea 1' },
          { status: true, title: 'Subtarea 2' },
        ],
      },
      {
        id: 6,
        status: KanbanStatusList.DONE,
        title: 'Tarea DONE 2',
        description: 'Descripción de la tarea 2',
        subtask: [
          { status: true, title: 'Subtarea 1' },
          { status: true, title: 'Subtarea 2' },
        ],
      },
      // Puedes agregar más tareas según sea necesario
    ],
  ],
  // Puedes agregar más registros según sea necesario
];

const kanbanTaskMap = new Map<KanbanStatusList, IkanbanTask[]>();

initialKanbanTask.forEach(([status, tasks]) => {
  kanbanTaskMap.set(status, tasks);
});

export default initialKanbanTask;
