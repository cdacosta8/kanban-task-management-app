import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appStrikeThrough]',
})
export class StrikeThroughDirective implements OnChanges {
  @Input() appStrikeThrough: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    this.applyStrikeThrough();
  }

  private applyStrikeThrough() {
    const textElement = this.el.nativeElement as HTMLElement;
    textElement.style.textDecoration = this.appStrikeThrough
      ? 'line-through'
      : 'none';
  }
}
