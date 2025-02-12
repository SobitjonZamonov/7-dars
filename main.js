document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks();

    addBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const taskObj = { text: taskText };
        tasks.push(taskObj);
        saveTasks();
        renderTasks();

        taskInput.value = ""; 
    });


    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.classList.add("task-item");

            const span = document.createElement("span");
            span.textContent = task.text;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.classList.add("remove-btn");
            removeBtn.addEventListener("click", function () {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.classList.add("edit-btn");
            editBtn.addEventListener("click", function () {
                const newText = prompt("Enter new task:", task.text);
                if (newText) {
                    tasks[index].text = newText;
                    saveTasks();
                    renderTasks();
                }
            });

            li.appendChild(span);
            li.appendChild(editBtn);
            li.appendChild(removeBtn);

            taskList.appendChild(li);
        });
    }
});
