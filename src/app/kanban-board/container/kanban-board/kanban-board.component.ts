import { Component } from '@angular/core';
import { KanbanStatusList } from '@core/enumerations';
import { IkanbanTask } from '@core/interfaces';
import { getListOfTask } from '@core/selectors';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss',
})
export class KanbanBoardComponent {
  kanbanStatus = Object.values(KanbanStatusList);

  public listOfTask$: Observable<IkanbanTask[] | null> = this._store.pipe(
    select(getListOfTask)
  );

  constructor(private readonly _store: Store) {}
}
