// When the page loads, call this function to load todos from localStorage
window.onload = function () {
    loadTodos();
  };
  //  Toggles the completed style when checkbox is clicked
  function toggleStrike(checkbox) {
    const li = checkbox.parentElement;// Get the parent <li>
    const span = checkbox.nextElementSibling;// Get the <span> with the text
  
    span.classList.toggle("completed");// Add/remove line-through style
    li.setAttribute("data-status", checkbox.checked ? "completed" : "active");
  
    saveTodos(); // Save updated list to localStorage
  }
  
  function deleteTodo(icon) {//  Deletes the todo item from the list
    const li = icon.parentElement;
    li.remove();
    saveTodos();
  }
  
  function addTodo() {//  Adds a new todo item from the input box
    const input = document.getElementById("todo-input");
    const todoText = input.value.trim();
    if (todoText === "") return;// Don't add empty todos
  
    const ul = document.getElementById("todo-list");
  
    const li = document.createElement("li");
    li.setAttribute("data-status", "active");
  
    li.innerHTML = `
      <input type="checkbox" onclick="toggleStrike(this)">
      <span>${todoText}</span>
      <i class="fas fa-trash delete-icon" onclick="deleteTodo(this)"></i>
    `;
  
    ul.appendChild(li);// Add to list
    input.value = ""; // Clear input
  
    saveTodos();
  }
  // Filters to-do items based on All / Active / Completed
  function filterTodos(filter) {
    const tasks = document.querySelectorAll("#todo-list li");
  
    tasks.forEach(task => {
      const status = task.getAttribute("data-status");
      task.style.display = (filter === "all" || filter === status) ? "flex" : "none";
    });
  }
  //  Saves the current to-do list to localStorage
  function saveTodos() {
    const todos = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
      const checkbox = li.querySelector("input[type='checkbox']");
      const span = li.querySelector("span");
      todos.push({
        text: span.textContent,
        completed: checkbox.checked
      });
    });
   // Save the array as a string in localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  // Loads 10 fake todos from JSONPlaceholder API
  function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const ul = document.getElementById("todo-list");
    ul.innerHTML = "";
  
    todos.forEach(todo => {
      const li = document.createElement("li");
      li.setAttribute("data-status", todo.completed ? "completed" : "active");
  
      li.innerHTML = `
        <input type="checkbox" onclick="toggleStrike(this)" ${todo.completed ? "checked" : ""}>
        <span class="${todo.completed ? "completed" : ""}">${todo.text}</span>
        <i class="fas fa-trash delete-icon" onclick="deleteTodo(this)"></i>
      `;
  
      ul.appendChild(li);
    });
  }
  
  function fetchApiTodos() {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then(response => response.json())
      .then(todos => {
        const ul = document.getElementById("todo-list");
        ul.innerHTML = ""; // Clear current list
  
        todos.forEach(todo => {
          const li = document.createElement("li");
          li.setAttribute("data-status", todo.completed ? "completed" : "active");
  
          li.innerHTML = `
            <input type="checkbox" onclick="toggleStrike(this)" ${todo.completed ? "checked" : ""}>
            <span class="${todo.completed ? "completed" : ""}">${todo.title}</span>
            <i class="fas fa-trash delete-icon" onclick="deleteTodo(this)"></i>
          `;
  
          ul.appendChild(li);
        });
      });
  }
