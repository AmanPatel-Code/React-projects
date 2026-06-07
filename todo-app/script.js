const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks =
JSON.parse(localStorage.getItem("tasks"))
|| [];

// Add Task
addBtn.addEventListener("click", () => {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskInput.value = "";
});

// Save to Local Storage
function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

// Render Tasks
function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div>
                <button onclick="toggleTask(${index})">
                    ✔
                </button>

                <button onclick="deleteTask(${index})">
                    🗑
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Toggle Complete
function toggleTask(index) {

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();
    renderTasks();
}

// Delete Task
function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();
    renderTasks();
}

// Load Tasks on Page Refresh
renderTasks();