import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [LayoutComponent, LeftPanelComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
  ],
  exports: [LayoutComponent, LeftPanelComponent],
})
export class LayoutCommonModule {}
