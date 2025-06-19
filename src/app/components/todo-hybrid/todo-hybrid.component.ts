import { Component, OnInit } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-todo-hybrid',
  templateUrl: './todo-hybrid.component.html',
  styleUrls: ['./todo-hybrid.component.css'],
})
export class TodoHybridComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: string = '';
  currentFilter: string = 'all';
  notification = {
    show: false,
    message: '',
    type: 'success',
  };
  nextId = 1;

  private todoService: any;
  private notificationService: any;
  private storageService: any;


  constructor(private upgrade: UpgradeModule) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.todoService = this.upgrade.$injector.get('TodoService');
      this.notificationService = this.upgrade.$injector.get('NotificationService');
      this.storageService = this.upgrade.$injector.get('StorageService');
      this.todos = this.todoService.getAllTodos();
      this.notification = this.notificationService.getNotification();

      const savedFilter = this.storageService.get('todoFilter');
      if (savedFilter) {
        this.currentFilter = savedFilter;
      }
  
      this.todoService.addTodo('Learn AngularJS');
      this.todoService.addTodo('Build a Todo App');
      this.todoService.addTodo('Master $scope and services');
  
      this.todos = this.todoService.getAllTodos();  // reload list
      this.todos[0].completed = true;
      this.showNotification('Welcome to your Todo App!', 'success');
    }, 0);
  }

  showNotification(message: string, type: 'success' | 'error'): void {
    if (this.notificationService) {
      this.notificationService.show(message, type);
    } else {
      this.notification = { show: true, message, type};
      setTimeout(() => {
        this.notification.show = false;
      }, 3000);
    }
  }

  addTodo(text?: string): void {
    const content = text || this.newTodo.trim();
    if (!content) return;
    if (this.todoService) {
      this.todoService.addTodo(content);
      this.todos = this.todoService.getAllTodos();
    }

    if (!text) this.newTodo = '';
    this.showNotification('Todo added successfully!', 'success');
  }

  deleteTodo(id: number): void {
    if (this.todoService) {
      const deleted = this.todoService.deleteTodo(id);
      if (deleted) {
        this.todos = this.todoService.getAllTodos();
        this.showNotification(`Todo deleted: ${deleted.text}`, 'success');
      }
    }
  }

  toggleTodo(todo: Todo): void {
   if (this.todoService) {
    //todo.completed = !todo.completed;
    this.todoService.toggleTodo(todo);
    const msg = todo.completed ? 'Todo completed!' : 'Todo marked as active';
    this.showNotification(msg, 'success');
   }
  }

  setFilter(filter: any): void {
    this.currentFilter = filter;
    if (this.storageService) {
      this.storageService.set('todoFilter', filter);
    }
  }

  get filteredTodos(): any[] {
    switch (this.currentFilter) {
      case 'active':
        return this.todos.filter((todo) => !todo.completed);
      case 'completed':
        return this.todos.filter((todo) => todo.completed);
      default:
        return this.todos;
    }
  }

  getTotalCount(): number {
    return this.todos.length;
  }

  getActiveCount(): number {
    return this.todos.filter((t) => !t.completed).length;
  }

  getCompletedCount(): number {
    return this.todos.filter((t) => t.completed).length;
  }

  getCompletionRate(): number {
    const total = this.getTotalCount();
    const completed = this.getCompletedCount();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  trackById(index: number, todo: Todo): number {
    return todo.id;
  }
}
