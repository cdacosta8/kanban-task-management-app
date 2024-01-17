import { Component, HostBinding, effect, signal } from '@angular/core';
import { slideInAnimation } from '../../animation';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [slideInAnimation],
})
export class LayoutComponent {
  showLeftPanel: boolean = true;
  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'true')
  );

  constructor() {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    });
  }

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }

  toggleLeftPanel() {
    this.showLeftPanel = !this.showLeftPanel;
  }
}
