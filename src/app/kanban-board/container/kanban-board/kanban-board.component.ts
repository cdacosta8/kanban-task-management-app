import { Component } from '@angular/core';
import { moveTask } from '@core/actions/task.actions';
import { KanbanStatusList } from '@core/enumerations';
import { IMoveTask, IkanbanTask } from '@core/interfaces';
import { getTasksWithSubtasksCount } from '@core/selectors';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss',
})
export class KanbanBoardComponent {
  public kanbanStatus = Object.values(KanbanStatusList);

  public listOfTask$: Observable<Map<KanbanStatusList, IkanbanTask[]>> =
    this._store.pipe(select(getTasksWithSubtasksCount));

  constructor(private readonly _store: Store) {}

  public outMoveTask(event: IMoveTask) {
    this._store.dispatch(moveTask(event));
  }
}
