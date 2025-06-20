// Todo Service
angular.module('todoApp').service("TodoService", function () {
  var todos = [];
  var nextId = 1;

  this.getAllTodos = function () {
    console.log('[TodoService] getAllTodos called');
    return todos;
  };

  this.addTodo = function (text) {
    var todo = {
      id: nextId++,
      text: text,
      completed: false,
      createdAt: new Date(),
    };
    todos.push(todo);
    console.log('[TodoService] addTodo called with:', todo);
    return todo;
  };

  this.deleteTodo = function (id) {
    console.log('[TodoService] deleteTodo called with id:', id);
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        return todos.splice(i, 1)[0];
      }
    }
    return null;
  };

  this.toggleTodo = function (todo) {
    //todo.completed = !todo.completed;
    console.log('[TodoService] toggleTodo called for todo:', todo);
    return todo;
  };

  this.getStats = function () {
    console.log('[TodoService] getStats called');
    var total = todos.length;
    var completed = todos.filter(function (todo) {
      return todo.completed;
    }).length;
    var active = total - completed;

    return {
      total: total,
      completed: completed,
      active: active,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  };
});
