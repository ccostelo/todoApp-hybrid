import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoHybridComponent } from './todo-hybrid.component';

describe('TodoHybridComponent', () => {
  let component: TodoHybridComponent;
  let fixture: ComponentFixture<TodoHybridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoHybridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoHybridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
