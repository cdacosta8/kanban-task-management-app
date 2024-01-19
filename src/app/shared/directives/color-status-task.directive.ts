import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import { KanbanStatusList } from '@core/enumerations';

@Directive({
  selector: '[appColorStatusTask]',
})
export class ColorStatusTaskDirective implements OnChanges {
  @Input() appColorStatusTask: KanbanStatusList | null = null;

  constructor(private el: ElementRef, private _renderer: Renderer2) {}

  ngOnChanges(): void {
    this.updateStyles(this.appColorStatusTask);
  }

  private updateStyles(status: KanbanStatusList | null) {
    if (status === null || status === undefined) {
      return;
    }

    switch (status) {
      case KanbanStatusList.TODO:
        this._renderer.addClass(this.el.nativeElement, 'bg-cyan-300');
        break;
      case KanbanStatusList.DOING:
        this._renderer.addClass(this.el.nativeElement, 'bg-indigo-300');
        break;
      case KanbanStatusList.DONE:
        this._renderer.addClass(this.el.nativeElement, 'bg-emerald-300');
        break;
      default:
        this._renderer.addClass(this.el.nativeElement, 'bg-cyan-300');
    }
  }
}
