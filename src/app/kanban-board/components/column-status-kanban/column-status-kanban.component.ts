import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KanbanStatusList } from '@core/enumerations';
import { IMoveTask, IkanbanTask } from '@core/interfaces';

@Component({
  selector: 'app-column-status-kanban',
  templateUrl: './column-status-kanban.component.html',
  styleUrl: './column-status-kanban.component.scss',
})
export class ColumnStatusKanbanComponent {
  public filterTask: IkanbanTask[] = [];

  @Output() public moveTask = new EventEmitter<IMoveTask>();

  @Input() public kanbanStatus: KanbanStatusList | null = null;

  @Input() public set listOfTask(
    listOfTask: Map<KanbanStatusList, IkanbanTask[]> | null
  ) {
    if (listOfTask && this.kanbanStatus) {
      this.filterTask = [
        ...(listOfTask.get(this.kanbanStatus) as IkanbanTask[]),
      ];
    }
  }

  public drop(
    event: CdkDragDrop<IkanbanTask[]>,
    kanbanStatus: KanbanStatusList | null
  ) {
    const isTheSameColumn = event.previousContainer === event.container;

    if (isTheSameColumn) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    const taskToMove = { ...event.container.data[event.currentIndex] };

    const filterTaskUpdate = event.container.data.map((task, index) =>
      index === event.currentIndex
        ? { ...task, status: kanbanStatus as KanbanStatusList }
        : task
    );

    this.moveTask.emit({
      taskToMove,
      newListOftask: filterTaskUpdate,
      newKanbanStatus: kanbanStatus as KanbanStatusList,
      isTheSameColumn,
    });
  }
}
