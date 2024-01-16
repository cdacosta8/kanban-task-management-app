import { Component } from '@angular/core';
import { updateTask } from '@core/actions/task.actions';
import { KanbanStatusList } from '@core/enumerations';
import { IkanbanTask } from '@core/interfaces';
import { getListOfTask, getListOfTaskCalculated } from '@core/selectors';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss',
})
export class KanbanBoardComponent {
  public kanbanStatus = Object.values(KanbanStatusList);

  public listOfTask$: Observable<IkanbanTask[] | null> = this._store.pipe(
    select(getListOfTaskCalculated)
  );

  constructor(private readonly _store: Store) {}

  public outUpdateTask(event: {
    idTask: number;
    newKanbanStatus: KanbanStatusList;
  }) {
    this._store.dispatch(updateTask(event.idTask, event.newKanbanStatus));
  }
}
