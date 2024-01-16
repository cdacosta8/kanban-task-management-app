import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KanbanStatusList } from '@core/enumerations';
import { IkanbanTask } from '@core/interfaces';

@Component({
  selector: 'app-column-status-kanban',
  templateUrl: './column-status-kanban.component.html',
  styleUrl: './column-status-kanban.component.scss',
})
export class ColumnStatusKanbanComponent {
  public filterTask: IkanbanTask[] = [];

  @Input() public kanbanStatus: KanbanStatusList | null = null;

  @Input() public set listOfTask(listOfTask: IkanbanTask[] | null) {
    if (listOfTask && this.kanbanStatus) {
      this.filterTask = listOfTask.filter(
        (task) => task.status === this.kanbanStatus
      );
    }
  }

  @Output() public updateTask = new EventEmitter<{
    idTask: number;
    newKanbanStatus: KanbanStatusList;
  }>();

  public drop(
    event: CdkDragDrop<IkanbanTask[]>,
    kanbanStatus: KanbanStatusList | null
  ) {
    if (event.previousContainer === event.container) {
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

    const { id } = this.filterTask[event.currentIndex];

    this.updateTask.emit({
      idTask: id,
      newKanbanStatus: kanbanStatus as KanbanStatusList,
    });
  }
}
