// Main Controller
angular
  .module('todoApp')
  .controller(
    "TodoController",
    function ($scope, TodoService, NotificationService, StorageService) {
      // Initialize scope variables
      $scope.todos = TodoService.getAllTodos();
      $scope.newTodo = "";
      $scope.currentFilter = "all";
      $scope.notification = NotificationService.getNotification();

      // Add new todo
      $scope.addTodo = function () {
        if ($scope.newTodo && $scope.newTodo.trim()) {
          var todo = TodoService.addTodo($scope.newTodo.trim());
          $scope.newTodo = "";
          NotificationService.showSuccess("Todo added successfully!");
        }
      };

      // Delete todo
      $scope.deleteTodo = function (id) {
        var deletedTodo = TodoService.deleteTodo(id);
        if (deletedTodo) {
          NotificationService.showSuccess("Todo deleted: " + deletedTodo.text);
        }
      };

      // Toggle todo completion
      $scope.toggleTodo = function (todo) {
        // Removed. Not needed due to ng-model
        TodoService.toggleTodo(todo);
        var message = todo.completed
          ? "Todo completed!"
          : "Todo marked as active!";
        NotificationService.showSuccess(message);
      };

      // Set filter
      $scope.setFilter = function (filter) {
        $scope.currentFilter = filter;
        StorageService.set("todoFilter", filter);
      };

      // Get filtered todos
      $scope.getFilteredTodos = function () {
        switch ($scope.currentFilter) {
          case "active":
            return $scope.todos.filter(function (todo) {
              return !todo.completed;
            });
          case "completed":
            return $scope.todos.filter(function (todo) {
              return todo.completed;
            });
          default:
            return $scope.todos;
        }
      };

      // Statistics functions
      $scope.getTotalCount = function () {
        return TodoService.getStats().total;
      };

      $scope.getActiveCount = function () {
        return TodoService.getStats().active;
      };

      $scope.getCompletedCount = function () {
        return TodoService.getStats().completed;
      };

      $scope.getCompletionRate = function () {
        return TodoService.getStats().completionRate;
      };

      // Watch for changes in todos array
      $scope.$watchCollection("todos", function (newTodos, oldTodos) {
        if (newTodos !== oldTodos) {
          console.log("Todos changed:", TodoService.getStats());
        }
      });

      // Initialize with sample data
      $scope.$evalAsync(function () {
        TodoService.addTodo("Learn AngularJS");
        TodoService.addTodo("Build a todo app");
        TodoService.addTodo("Master $scope and services");

        // Mark first todo as completed
        $scope.todos[0].completed = true;

        NotificationService.showSuccess("Welcome to your Todo App!");
      });

      // Load saved filter
      var savedFilter = StorageService.get("todoFilter");
      if (savedFilter) {
        $scope.currentFilter = savedFilter;
      }
    }
  );
