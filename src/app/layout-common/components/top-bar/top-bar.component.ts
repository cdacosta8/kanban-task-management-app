import { Component } from '@angular/core';
import { openAddTaskDialog } from '@core/actions/task.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  constructor(private readonly _store: Store) {}

  public openAddTaskDialogMat(): void {
    this._store.dispatch(openAddTaskDialog());
  }
}
