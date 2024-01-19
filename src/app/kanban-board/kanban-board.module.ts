import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnStatusKanbanComponent } from './components/column-status-kanban/column-status-kanban.component';
import { KanbanTaskComponent } from './components/kanban-task/kanban-task.component';
import { KanbanBoardComponent } from './container/kanban-board/kanban-board.component';
import { KanbanBoardRoutingModule } from './kanban-board-routing.module';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { AddTaskDialogComponent } from './components/add-task-dialog/add-task-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { EditTaskDialogComponent } from './components/edit-task-dialog/edit-task-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StrikeThroughDirective } from '../shared/directives/strike-through.directive';
@NgModule({
  declarations: [
    KanbanBoardComponent,
    ColumnStatusKanbanComponent,
    KanbanTaskComponent,
    AddTaskDialogComponent,
    EditTaskDialogComponent,
    StrikeThroughDirective,
  ],
  imports: [
    CommonModule,
    KanbanBoardRoutingModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatIconModule,
    MatCheckboxModule,
  ],
})
export class KanbanBoardModule {}
