var todoList = {
    todos: [],
    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function(){
        var totalTodos = this.todos.length;
        var completedTodos = 0;

        // Get number of completed todos.
        this.todos.forEach(function(todo){
            if(todo.completed === true) {
                completedTodos++;
            }
        });

        this.todos.forEach(function(todo) {
        // Case 1: If everything's true, make them false.
            if(completedTodos === totalTodos) {
                todo.completed = false
        // Case 2: Otherwise, make everything true.
            } else {
                todo.completed = true
            }
        })
    }
  };

 var handlers = {
    addTodo: function(){
       var addTodoTextInput = document.getElementById('addTodoTextInput');
       todoList.addTodo(addTodoTextInput.value);
       addTodoTextInput.value = '';
       view.displayTodos();
    },
    changeTodo: function(){
        var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
        var changeTodoTextInput = document.getElementById('changeTodoTextInput');
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.valueAsNumber = '';
        changeTodoTextInput.value = '';
        view.displayTodos();
     },
     toggleCompleted: function(){
        var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
        toggleCompletedPositionInput.value = '';
        view.displayTodos();
     },
     toggleAll: function(){
        todoList.toggleAll();
        view.displayTodos();
    }
};

var view = {
    displayTodos: function(){
        var todosOl = document.querySelector('ol');
        todosOl.innerHTML = '';
    
    todoList.todos.forEach(function(todo, position){
        var todoLi = document.createElement('li');
        var todoTextWithCompletion = "";

            if(todo.completed === true) {
                todoTextWithCompletion = "(X) " + todo.todoText;
            } else {
                todoTextWithCompletion = "(  ) " + todo.todoText;
            }
        todoLi.setAttribute('id', "list-item-" + position);
        todoLi.textContent = todoTextWithCompletion;
        todoLi.appendChild(this.createDeleteButton());
        todosOl.appendChild(todoLi);
    }, this)

    },
    createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';

        return deleteButton;
    },
    setUpEventListeners: function() {
        var todosOl = document.querySelector('ol');
        todosOl.addEventListener('click', function(event){
        var clicked_event = event.target.parentElement.id;
        document.getElementById(clicked_event).remove();
        stringRemoved = clicked_event.replace(/[^0-9]/g, '');
        todoList.todos.splice(stringRemoved, 1);
        });

        var enterAdd = document.getElementById('addTodoTextInput');
        enterAdd.addEventListener("keydown", function(event) {
            if (event.keyCode === 13) {
                handlers.addTodo();
            } 
        });
    }
};

view.setUpEventListeners();


