// find elemets on web-page
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
//const emptyList = document.querySelector('#emptyList');

// add tasks
form.addEventListener('submit', addTask);
// delete tasks
tasksList.addEventListener('click', deleteTasks);
// task done
tasksList.addEventListener('click', taskDone);

let Tasks = [];

if (localStorage.getItem('tasks')) {
    Tasks = JSON.parse(localStorage.getItem('tasks'));

    Tasks.forEach(function(task) {
        cssClass = task.done ? 'task-title task-title--done' : 'task-title';
    
        taskHTML = `<li id= "${task.id}" class="list-group-item d-flex justify-content-between task-item">
        <span class="${cssClass}">${task.text}</span>
        <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
        </li>`;
    
        tasksList.insertAdjacentHTML("beforeend", taskHTML);
    });
};

checkEmptyList();
// funcsions

if (localStorage.getItem('tasksHTML')) {
    tasksList.innerHTML = localStorage.getItem('tasksHTML');
}

function addTask(event) {
    event.preventDefault(); // standart behavior = false

    taskText = taskInput.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    };

    // add task in arrey of tasks
    Tasks.push(newTask);

    //Create CSS class
    cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';

    taskHTML = `<li id= "${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${newTask.text}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
    </li>`;

    tasksList.insertAdjacentHTML("beforeend", taskHTML);

    //Clear input element and stand cursor there
    taskInput.value = "";
    taskInput.focus();

    // if (tasksList.children.length > 1) {
    //     emptyList.classList.add('none');
    // }
    checkEmptyList();
    saveToLS();
};


function deleteTasks(event) {

    if (event.target.dataset.action !== 'delete') return;

    parentNode = event.target.closest('.list-group-item');

    const ID = Number(parentNode.id);

    // finde index of element
    const index = Tasks.findIndex((task) => task.id === ID);
    // delete elemet from arrey by ID
    Tasks.splice(index, 1);

    // delete task by arrey filter
    //Tasks = Tasks.filter((task) => task.id !== ID);


    // delete task from html
    parentNode.remove();

    // // visibility image 'emptyList'
    // if (tasksList.children.length === 1) {
    //     emptyList.classList.remove('none');
    // }

    checkEmptyList();
    saveToLS();
};


function taskDone(event) {

    if (event.target.dataset.action !== 'done') return;

    parentNode = event.target.closest('.list-group-item');

    // find the element and mark this done:true
    const ID = Number(parentNode.id);
    const task = Tasks.find((task) => task.id === ID);
    task.done = !task.done;


    taskTitle = parentNode.querySelector('.task-title');

    taskTitle.classList.toggle('task-title--done');

    saveToLS();
}

function checkEmptyList() {

    if (Tasks.length === 0) {
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">На сьогодні завдання відсутні</div>
    </li>`;

        tasksList.insertAdjacentHTML("afterbegin", emptyListHTML);
    }


    if (Tasks.length > 0) {

        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;

    }
}

function saveToLS() {
    localStorage.setItem('tasks', JSON.stringify(Tasks));
}