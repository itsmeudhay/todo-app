const newTask = document.getElementById('newtask');
const addButton = document.getElementById('add');
const resultList  = document.getElementById('tasks');

let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];

addButton.addEventListener("click", () => {
  const inputValue = newTask.querySelector('input').value;

  if(inputValue === "") {
    alert("Please Enter the Task Name!")
    return;
  }

  tasksArray.push({
    name: inputValue
  })

  updateTasks()
})

function updateTasks() {
  resultList.innerHTML = "";

  for (const task of tasksArray) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    span.textContent = task.name;
    editButton.textContent = "Edit";
    deleteButton.textContent = "Delete";

    editButton.addEventListener("click", () => {
      editTask(task)
    })

    deleteButton.addEventListener("click", () => {
      // Call the confirmDelete() function before deleting the task.
      if (confirmDelete(task)) {
        deleteTask(task)
      }
    })

    li.className = 'list-group-item';
    editButton.className = "btn btn-outline-primary ms-5";
    deleteButton.className = "btn btn-outline-danger ms-5";
    span.className = 'fs-2 text-break me-5';

    resultList.appendChild(li);
    li.appendChild(span);
    span.appendChild(editButton);
    span.appendChild(deleteButton);
  }

  const inputValue = newTask.querySelector('input');
  inputValue.value = "";
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

// New function to display a prompt to the user asking them to enter the new task name.
function editTask(task) {
  const newTaskName = prompt(`Enter the new task name for "${task.name}"`);

  if (newTaskName) {
    // Update the task in the tasksArray.
    task.name = newTaskName;

    // Update the UI.
    updateTasks();
  }
}

// New function to display a confirmation popup before deleting a task.
function confirmDelete(task) {
  return confirm(`Are you sure you want to delete the task "${task.name}"?`);
}

function deleteTask(task) {
  tasksArray.splice(tasksArray.indexOf(task), 1)
  updateTasks();
}
