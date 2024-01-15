import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnStatusKanbanComponent } from './column-status-kanban.component';

describe('ColumnStatusKanbanComponent', () => {
  let component: ColumnStatusKanbanComponent;
  let fixture: ComponentFixture<ColumnStatusKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnStatusKanbanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColumnStatusKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
