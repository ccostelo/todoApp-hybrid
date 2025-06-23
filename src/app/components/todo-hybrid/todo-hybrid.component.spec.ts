import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoHybridComponent } from './todo-hybrid.component';
import { FormsModule } from '@angular/forms';

describe('TodoHybridComponent', () => {
  let component: TodoHybridComponent;
  let fixture: ComponentFixture<TodoHybridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoHybridComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoHybridComponent);
    component = fixture.componentInstance;

    // Mock of Service
    component['todoService'] = {
      getAllTodos: jest.fn(),
      addTodo: jest.fn(),
      deleteTodo: jest.fn(),
      toggleTodo: jest.fn(),
      getStats: jest.fn(),
    };

    component['notificationService'] = {
      getNotification: jest.fn(),
      show: jest.fn(),
    };

    component['storageService'] = {
      get: jest.fn(),
      set: jest.fn(),
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // addTodo
  it('should add first todo', () => {
    const firstTodo = [
      { id: 1, text: 'First Todo', completed: false, createdAt: new Date() },
    ];
    // use of todoService
    component['todoService'].getAllTodos.mockReturnValueOnce(firstTodo);

    component.newTodo = 'First Todo';
    component.addTodo();

    expect(component.todos.length).toBe(1); 
    expect(component.todos[0].text).toBe('First Todo'); 
    expect(component.newTodo).toBe(''); 
  });

  // addTodo (3 todos)

  it('should add 3 todos', () => {
    const todoList = [
      { id: 1, text: 'Todo 1', completed: true, createdAt: new Date() },
      { id: 2, text: 'Todo 2', completed: false, createdAt: new Date() },
      { id: 3, text: 'Todo 3', completed: false, createdAt: new Date() },
    ];
    component['todoService'].getAllTodos.mockReturnValue(todoList);

    component.newTodo = 'Todo 1';
    component.addTodo();

    component.newTodo = 'Todo 1';
    component.addTodo();

    component.newTodo = 'Todo 1';
    component.addTodo();

    expect(component.todos.length).toBe(3);
    expect(component.todos[0].text).toBe('Todo 1');
    expect(component.todos[1].text).toBe('Todo 2');
    expect(component.todos[2].text).toBe('Todo 3');
    expect(component.newTodo).toBe('');
  });

  it('should delete todo', () => {
    const deleteTodo = {
      id: 1,
      text: 'Deleted Todo',
      completed: false,
      createdAt: new Date(),
    };

    component['todoService'].deleteTodo.mockReturnValueOnce(deleteTodo);
    component['todoService'].getAllTodos.mockReturnValueOnce([]);

    component.deleteTodo(1);

    expect(component.todos.length).toBe(0);
    expect(component['notificationService'].show).toHaveBeenCalledWith(
      `Todo deleted: ${deleteTodo.text}`,
      'success'
    );
  });

  it('should toggle todo', () => {
    const todo = {
      id: 1,
      text: 'Todo 1',
      completed: false,
      createdAt: new Date(),
    };

    component.toggleTodo(todo);

    expect(component['todoService'].toggleTodo).toHaveBeenCalledWith(todo);
    expect(component['notificationService'].show).toHaveBeenCalled();
  });

  it('should filter active todos', () => {
    component.todos = [
      { id: 1, text: 'Todo 1', completed: false, createdAt: new Date() },
      { id: 2, text: 'Todo 2', completed: true, createdAt: new Date() },
    ];

    component.setFilter('active');
    const filtered = component.filteredTodos;

    expect(filtered.length).toBe(1);
    expect(filtered[0].completed).toBe(false);
  });

  it('should calculate correct completion rate', () => {
    component.todos = [
      { id: 1, text: 'Todo 1', completed: false, createdAt: new Date() },
      { id: 2, text: 'Todo 2', completed: true, createdAt: new Date() },
      { id: 3, text: 'Todo 3', completed: true, createdAt: new Date() },
    ];

    const rate = component.getCompletionRate();
    expect(rate).toBe(67);
  });

  it('should track by id', () => {
    const todo = {
      id: 42,
      text: 'Test',
      completed: false,
      createdAt: new Date(),
    };
    expect(component.trackById(0, todo)).toBe(42);
  });

  it('should fallback to internal notification display', () => {
    component['notificationService'] = null;

    jest.useFakeTimers();

    component.showNotification('Test Message', 'success');

    expect(component.notification.show).toBe(true);
    expect(component.notification.message).toBe('Test Message');
    expect(component.notification.type).toBe('success');

    jest.advanceTimersByTime(3000);

    expect(component.notification.show).toBe(false);

    jest.useRealTimers();
  });

  it('should filter completed todos', () => {
    component.todos = [
      { id: 1, text: 'Todo 1', completed: false, createdAt: new Date() },
      { id: 2, text: 'Todo 2', completed: true, createdAt: new Date() },
    ];

    component.setFilter('completed');
    const filtered = component.filteredTodos;

    expect(filtered.length).toBe(1);
    expect(filtered[0].completed).toBe(true);
  });

  it('should return correct active and completed count', () => {
    component.todos = [
      { id: 1, text: 'Todo 1', completed: false, createdAt: new Date() },
      { id: 2, text: 'Todo 2', completed: true, createdAt: new Date() },
      { id: 3, text: 'Todo 3', completed: false, createdAt: new Date() },
    ];

    expect(component.getActiveCount()).toBe(2);
    expect(component.getCompletedCount()).toBe(1);
  });

  it('should not add todo if todoService is missing', () => {
    component['todoService'] = null;

    component.newTodo = 'Should Not Add';
    component.addTodo();

    expect(component.todos.length).toBe(0);
  });

  it('should do nothing if deleteTodo called and todoService is missing', () => {
    component['todoService'] = null;

    component.todos = [
      { id: 1, text: 'Todo 1', completed: false, createdAt: new Date() },
    ];

    component.deleteTodo(1);

    expect(component.todos.length).toBe(1);
  });

  it('should do nothing if toggleTodo called and todoService is missing', () => {
    component['todoService'] = null;

    const todo = {
      id: 1,
      text: 'Todo 1',
      completed: false,
      createdAt: new Date(),
    };

    component.toggleTodo(todo);

    expect(todo.completed).toBe(false); // unchanged
  });

  it('should set current filter and save to storage', () => {
    component.setFilter('active');

    expect(component.currentFilter).toBe('active');
    expect(component['storageService'].set).toHaveBeenCalledWith(
      'todoFilter',
      'active'
    );
  });

  it('should return total count', () => {
    component.todos = [
      { id: 1, text: 'Todo 1', completed: false, createdAt: new Date() },
      { id: 2, text: 'Todo 2', completed: true, createdAt: new Date() },
    ];

    expect(component.getTotalCount()).toBe(2);
  });

  it('should initialize todos and notification from services', () => {
    const todosMock = [
      {
        id: 1,
        text: 'Learn AngularJS',
        completed: false,
        createdAt: new Date(),
      },
      {
        id: 2,
        text: 'Build a Todo App',
        completed: false,
        createdAt: new Date(),
      },
      {
        id: 3,
        text: 'Master $scope and services',
        completed: false,
        createdAt: new Date(),
      },
    ];
    const notificationMock = { show: false, message: 'Init', type: 'success' };

    const mockUpgrade = {
      $injector: {
        get: jest.fn((serviceName) => {
          if (serviceName === 'TodoService')
            return {
              getAllTodos: jest.fn(() => todosMock),
              addTodo: jest.fn(),
            };
          if (serviceName === 'NotificationService')
            return {
              getNotification: jest.fn(() => notificationMock),
              show: jest.fn(),
            };
          if (serviceName === 'StorageService')
            return { get: jest.fn(() => 'completed'), set: jest.fn() };
          return undefined; 
        }),
      },
    };
  
    component = new TodoHybridComponent(mockUpgrade as any);

    jest.useFakeTimers();

    component.ngOnInit();
    jest.runAllTimers();

    expect(component.todos.length).toBe(3);
    expect(component.notification.message).toBe('Init');
    expect(component.currentFilter).toBe('completed');

    jest.useRealTimers();
  });

  it('should return 0% completion rate when no todos', () => {
    component.todos = [];
  
    const rate = component.getCompletionRate();
  
    expect(rate).toBe(0);
  });

  it('should return all todos if filter is unknown', () => {
    component.todos = [
      { id: 1, text: 'Todo 1', completed: false, createdAt: new Date() },
      { id: 2, text: 'Todo 2', completed: true, createdAt: new Date() },
    ];
  
    component.setFilter('unknownFilter');
    const filtered = component.filteredTodos;
  
    expect(filtered.length).toBe(2);
  });
  
});
