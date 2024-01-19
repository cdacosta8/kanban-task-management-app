import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IkanbanTask } from '@core/interfaces';

@Component({
  selector: 'app-kanban-task',
  templateUrl: './kanban-task.component.html',
  styleUrl: './kanban-task.component.scss',
})
export class KanbanTaskComponent {
  @Input() public kanbanTask: IkanbanTask | null = null;

  @Output() public editTask = new EventEmitter<IkanbanTask | null>();

  editTaskClicked(kanbanTask: IkanbanTask | null) {
    this.editTask.emit(kanbanTask);
  }
}
