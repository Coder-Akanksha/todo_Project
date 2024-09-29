const todoTitleInput = document.getElementById("todo-title");
const todoDescriptionInput = document.getElementById("todo-description");
const addTodoButton = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

// Load saved data from local storage
const savedTodos = localStorage.getItem("todos");
if (savedTodos) {
  const todos = JSON.parse(savedTodos);
  todos.forEach((todo) => {
    createTodoElement(todo);
  });
}

addTodoButton.addEventListener("click", () => {
  const title = todoTitleInput.value;
  const description = todoDescriptionInput.value;
  const createdAt = new Date();

  if (title && description) {
    const todo = {
      title,
      description,
      createdAt,
    };

    createTodoElement(todo);

    // Save data to local storage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    todoTitleInput.value = "";
    todoDescriptionInput.value = "";
  }
});

function createTodoElement(todo) {
  const li = document.createElement("li");
  li.innerHTML = `
        <h3>${todo.title}</h3>
        <p>${todo.description}</p>
        <p>Created at: ${todo.createdAt.toLocaleString()}</p>
        <div class="todo-buttons">
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        </div>
    `;

  todoList.prepend(li);

  const deleteButton = li.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    li.remove();

    // Remove from local storage
    const todos = JSON.parse(localStorage.getItem("todos"));
    const index = todos.findIndex((t) => t.createdAt === todo.createdAt);
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  const editButton = li.querySelector(".edit-button");
  editButton.addEventListener("click", () => {
    todoTitleInput.value = todo.title;
    todoDescriptionInput.value = todo.description;
    li.remove();
  });
}
