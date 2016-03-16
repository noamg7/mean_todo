angular.module('todoApp', [

]); //this is the setter syntax, you are creating an application using this one

angular.module('todoApp') //this is the getter syntax, we can use this so we don't have to make a variable to store our angular application; YAYYY no globals
      .controller('TodoController', TodoController);

TodoController.$inject = ['$scope', '$http', 'TodoService'];

function TodoController($scope, $http, TodoService){
  getTodos();
  $scope.isEditing = false;


  $scope.saveTodo = function(){
    TodoService.create($scope.newTodo)
    .then(function(){
      $scope.newTodo = {};
      getTodos();
    });
}
  $scope.editTodo = function(todo){
    $scope.isEditing = !$scope.isEditing;
    $scope.editingTodo = todo;
    todo.edit = true;
  }
  $scope.updateTodo = function(todo){
    TodoService.update(todo._id, todo)
              .then(function(){
                getTodos();
                $scope.isEditing = false;
    });
  }
  // function initTodos(){
  //   $http.get('/api/todos')
  //       .then(function(response){
  //         console.log(response);
  //         $scope.todos = response.data;
  //       })
  //       .catch(function(err){
  //         console.err(err);
  //       });
  // }
  $scope.deleteTodo = function(todo){
    TodoService.delete(todo._id)
              .then(function(){
                getTodos();
              });
  }
  function getTodos(){
    TodoService.read()
                .then(function(response){
                  $scope.todos = response;
                  console.log($scope.todos);
                });
  }
}
