import {
  Component,
  HostBinding,
  OnDestroy,
  effect,
  signal,
} from '@angular/core';
import { slideInAnimation } from '../../animation';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getShowLeftPanel } from '@core/selectors';
import { setShowLeftPanel } from '@core/actions/layout.actions';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [slideInAnimation],
})
export class LayoutComponent implements OnDestroy {
  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }

  public showLeftPanel$: Observable<boolean> = this._store.pipe(
    select(getShowLeftPanel)
  );
  public showLeftPanel = true;

  public darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'true')
  );

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private readonly _store: Store) {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    });

    this.showLeftPanel$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((showLeftPanel) => {
        this.showLeftPanel = showLeftPanel;
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  toggleLeftPanel() {
    this._store.dispatch(setShowLeftPanel(!this.showLeftPanel));
  }
}
