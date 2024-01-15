import { Component, Input } from '@angular/core';
import { KanbanStatusList } from '@core/enumerations';
import { IkanbanTask } from '@core/interfaces';

@Component({
  selector: 'app-column-status-kanban',
  templateUrl: './column-status-kanban.component.html',
  styleUrl: './column-status-kanban.component.scss',
})
export class ColumnStatusKanbanComponent {
  filterTask: IkanbanTask[] = [];

  @Input() public kanbanStatus: KanbanStatusList | null = null;

  @Input() public set listOfTask(listOfTask: IkanbanTask[] | null) {
    if (listOfTask && this.kanbanStatus) {
      this.filterTask = listOfTask.filter(
        (task) => task.status === this.kanbanStatus
      );
    }
  }
}
