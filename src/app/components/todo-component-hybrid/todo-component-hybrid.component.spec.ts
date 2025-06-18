import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponentHybridComponent } from './todo-component-hybrid.component';

describe('TodoComponentHybridComponent', () => {
  let component: TodoComponentHybridComponent;
  let fixture: ComponentFixture<TodoComponentHybridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoComponentHybridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoComponentHybridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
