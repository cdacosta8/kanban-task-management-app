import { Component, Input } from '@angular/core';
import { IkanbanTask } from '@core/interfaces';

@Component({
  selector: 'app-kanban-task',
  templateUrl: './kanban-task.component.html',
  styleUrl: './kanban-task.component.scss',
})
export class KanbanTaskComponent {
  @Input() public kanbanTask: IkanbanTask | null = null;
}
