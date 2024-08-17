let tasks = [];

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    taskElement.innerHTML = `
            <div>
                <strong>${task.name}</strong> - <span class="task-category">${
      task.category
    }</span> - Due: ${task.deadline}
            </div>
            <div class="task-actions">
                <button class="btn btn-sm btn-success" onclick="toggleStatus(${index})">${
      task.completed ? "Completed" : "Mark Complete"
    }</button>
                <button class="btn btn-sm btn-warning" onclick="editTask(${index})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

    if (task.completed) {
      taskElement.style.textDecoration = "line-through";
    }

    taskList.appendChild(taskElement);
  });
}

function addTask() {
  const taskName = document.getElementById("task-name").value;
  const taskDeadline = document.getElementById("task-deadline").value;
  const taskCategory = document.getElementById("task-category").value;

  if (taskName && taskDeadline && taskCategory) {
    const newTask = {
      name: taskName,
      deadline: taskDeadline,
      category: taskCategory,
      completed: false,
    };

    tasks.push(newTask);
    renderTasks();
    clearInputs();
  } else {
    alert("Please fill in all fields.");
  }
}

function toggleStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const taskName = prompt("Edit Task Name", tasks[index].name);
  const taskDeadline = prompt("Edit Task Deadline", tasks[index].deadline);
  const taskCategory = prompt("Edit Task Category", tasks[index].category);

  if (taskName && taskDeadline && taskCategory) {
    tasks[index].name = taskName;
    tasks[index].deadline = taskDeadline;
    tasks[index].category = taskCategory;
    renderTasks();
  } else {
    alert("All fields must be filled to update the task.");
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function clearInputs() {
  document.getElementById("task-name").value = "";
  document.getElementById("task-deadline").value = "";
  document.getElementById("task-category").value = "Work";
}

document.getElementById("add-task-btn").addEventListener("click", addTask);
