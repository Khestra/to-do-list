//Retrieve todo from local storage or initialize an empty array//
let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function (event) {
        if (event.key == "Enter") {
            event.preventDefault();
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
    displayTasks();
});

function addTask() {
    const newTask = todoInput.value.trim();
    if (newTask !== "") {
        todo.push({
            text: newTask,
            disabled: false,
        });
        saveToLocalStorage();
        todoInput.value = "";
        displayTasks();
    }
}

function deleteAllTasks() {
    todo = []; // Clear the todo array
    saveToLocalStorage();
    displayTasks(); 
}

function displayTasks() {
    todoList.innerHTML = ""; // Clear the task list

    todo.forEach((item, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("todo-container");

        taskDiv.innerHTML = `
            <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""}>
            <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}" onclick="editTask(${index})">${item.text}</p>
        `;

        taskDiv.querySelector(".todo-checkbox").addEventListener("change", () => {
            toggleTask(index);
        });

        todoList.appendChild(taskDiv);
    });

    // Update the task counter
    todoCount.textContent = todo.length;
}
function editTask(index){
    const todoItem = document.getElementById(`todo-${index}`)
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");

    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur" ,function() {
        const updatedText = inputElemment.value.trim();
        if (updatedText){
            todo[index].text = updatedText;
            saveToLocalStorage();
      }
    });
}
// Toggle task completion
function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled; // Toggle the disabled status
    saveToLocalStorage();
    displayTasks(); // Refresh the task list
}


function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}