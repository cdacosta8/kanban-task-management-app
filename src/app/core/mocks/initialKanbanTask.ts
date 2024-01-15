import { KanbanStatusList } from '@core/enumerations';
import { IkanbanTask } from '@core/interfaces';

export const initialKanbanTask: IkanbanTask[] = [
  {
    id: 1,
    status: KanbanStatusList.TODO,
    title: 'Tarea 1',
    description: 'Descripción de la tarea 1',
    subtask: [
      { status: true, title: 'Subtarea 1.1' },
      { status: false, title: 'Subtarea 1.2' },
    ],
  },
  {
    id: 2,
    status: KanbanStatusList.DOING,
    title: 'Tarea 2',
    description: 'Descripción de la tarea 2',
    subtask: [
      { status: true, title: 'Subtarea 2.1' },
      { status: true, title: 'Subtarea 2.2' },
    ],
  },
  {
    id: 3,
    status: KanbanStatusList.DONE,
    title: 'Tarea 3',
    description: 'Descripción de la tarea 3',
    subtask: [
      { status: false, title: 'Subtarea 3.1' },
      { status: false, title: 'Subtarea 3.2' },
    ],
  },
  {
    id: 4,
    status: KanbanStatusList.DONE,
    title: 'Tarea 4',
    description: 'Descripción de la tarea 4',
    subtask: [
      { status: false, title: 'Subtarea 4.1' },
      { status: false, title: 'Subtarea 4.2' },
    ],
  },
  // Puedes agregar más registros según sea necesario
];
