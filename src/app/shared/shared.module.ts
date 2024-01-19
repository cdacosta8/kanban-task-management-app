import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrikeThroughDirective } from './directives/strike-through.directive';
import { ColorStatusTaskDirective } from './directives/color-status-task.directive';

@NgModule({
  declarations: [StrikeThroughDirective, ColorStatusTaskDirective],
  imports: [CommonModule],
  exports: [StrikeThroughDirective, ColorStatusTaskDirective],
})
export class SharedModule {}
