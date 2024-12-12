// Select DOM Elements
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Load tasks from local storage
window.onload = loadTasks;

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(addTaskToDOM);
}

// Add Task
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert('You have not entered anything!');
    return;
  }

  const task = { text: taskText, completed: false };
  addTaskToDOM(task);
  saveTaskToLocalStorage(task);
  taskInput.value = "";
});

// Add Task to DOM
function addTaskToDOM(task) {
  const listItem = document.createElement("li");
  listItem.className = "task-item";
  if (task.completed) listItem.classList.add("completed");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => toggleTaskCompletion(task, listItem));

  const taskText = document.createElement("p");
  taskText.className = "task-text";
  taskText.textContent = task.text;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.className = "delete-btn";
  deleteButton.addEventListener("click", () => deleteTask(task, listItem));

  listItem.appendChild(checkbox);
  listItem.appendChild(taskText);
  listItem.appendChild(deleteButton);
  taskList.appendChild(listItem);
}

// Save Task to Local Storage
function saveTaskToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Toggle Task Completion
function toggleTaskCompletion(task, listItem) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskIndex = tasks.findIndex((t) => t.text === task.text);
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  listItem.classList.toggle("completed");
}

// Delete Task
function deleteTask(task, listItem) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter((t) => t.text !== task.text);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  listItem.remove();
}
