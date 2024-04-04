// Task array to store tasks
let tasks = [];

// Function to add a new task
function addTask() {
    const newTaskInput = document.getElementById('newTask');
    const taskText = newTaskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a valid task.');
        return;
    }

    const newTask = {
        text: taskText,
        dateAdded: new Date(),
        completed: false,
        dateCompleted: null,
    };

    tasks.push(newTask);
    newTaskInput.value = ''; // Clear the input field
    displayTasks();
}

// Function to display tasks in the UI
function displayTasks() {
    const pendingList = document.getElementById('pendingList');
    const completedList = document.getElementById('completedList');

    // Clear existing lists
    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <span>${task.completed ? formatDate(task.dateCompleted) : formatDate(task.dateAdded)}</span>
            <button onclick="editTask(${tasks.indexOf(task)})">Edit</button>
            <button onclick="toggleComplete(${tasks.indexOf(task)})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button onclick="deleteTask(${tasks.indexOf(task)})">Delete</button>
        `;

        if (task.completed) {
            completedList.appendChild(listItem);
        } else {
            pendingList.appendChild(listItem);
        }
    });
}

// Function to toggle task completion status
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    tasks[index].dateCompleted = tasks[index].completed ? new Date() : null;
    displayTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

// Function to edit a task
function editTask(index) {
    const updatedText = prompt('Edit task:', tasks[index].text);
    
    if (updatedText !== null && updatedText.trim() !== '') {
        tasks[index].text = updatedText.trim();
        displayTasks();
    }
}

// Function to format date and time
function formatDate(date) {
    return date ? date.toLocaleString() : '';
}

// Initial display
displayTasks();
