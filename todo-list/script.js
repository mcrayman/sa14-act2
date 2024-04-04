$(document).ready(function() {
  $('#todo-form').submit(function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get todo and description values
    var todo = $('#todo-item').val().trim();
    var description = $('#todo-details').val().trim();
    if (!todo) {
      alert('Please enter a todo item.');
      return; // Exit if no todo is entered
    }

    // Create new list item for todo
    var listItem = $('<li class="list-group-item"></li>');

    // Create todo element
    var todoElement = $('<span class="todo"></span>').text(todo + ': ');
    listItem.append(todoElement);

    // Create description element
    var descriptionElement = $('<span class="description"></span>').text(description);
    listItem.append(descriptionElement);

    // Create edit todo button
    var editTodoButton = $('<button class="btn btn-secondary btn-sm ml-2">Edit Todo</button>');
    editTodoButton.click(function() {
      var listItem = $(this).parent(); // Get the parent list item
      var currentTodo = listItem.find('.todo').text(); // Extract current todo text
      var newTodo = prompt('Edit your todo item:', currentTodo);
      if (newTodo) {
        listItem.find('.todo').text(newTodo); // Update todo text
      }
    });

    // Create edit description button
    var editDescriptionButton = $('<button class="btn btn-secondary btn-sm ml-2">Edit Description</button>');
    editDescriptionButton.click(function() {
      var listItem = $(this).parent(); // Get the parent list item
      var currentDescription = listItem.find('.description').text(); // Extract current description text
      var newDescription = prompt('Edit the description:', currentDescription);
      if (newDescription) {
        listItem.find('.description').text(newDescription); // Update description text
      }
    });

    // Create delete button
    var deleteButton = $('<button class="btn btn-danger btn-sm ml-2">Delete</button>');
    deleteButton.click(function() {
      $(this).parent().remove(); // Remove the list item from the DOM
    });

    // Append buttons to list item
    listItem.append(editTodoButton);
    listItem.append(editDescriptionButton);
    listItem.append(deleteButton);

    // Append list item to todo-list
    $('#todo-list').append(listItem);

    // Clear input fields
    $('#todo-item').val('');
    $('#todo-details').val('');
  });
});
