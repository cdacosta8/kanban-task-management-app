import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnStatusKanbanComponent } from './components/column-status-kanban/column-status-kanban.component';
import { KanbanTaskComponent } from './components/kanban-task/kanban-task.component';
import { KanbanBoardComponent } from './container/kanban-board/kanban-board.component';
import { KanbanBoardRoutingModule } from './kanban-board-routing.module';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    KanbanBoardComponent,
    ColumnStatusKanbanComponent,
    KanbanTaskComponent,
  ],
  imports: [
    CommonModule,
    KanbanBoardRoutingModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
  ],
})
export class KanbanBoardModule {}
