
const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit' , function(e){
    e.preventDefault();
    addTodo();
})

function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList()
        saveTodos();
        todoInput.value = "";
    }
}

function updateTodoList(){
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex)=>{
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    })
}

function createTodoItem(todo, todoIndex){
    const todoId = "todo-"+todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo";
    todoLI.innerHTML = `

        <input type="checkbox" id="${todoId}">
        <label class="custom-checkbox" for="${todoId}">
            <img src="icons/check_small_30dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg" alt="done icon" fill="transparent">
        </label>
        <label class="todo-text" for="${todoId}" >
            ${todoText}
        </label>
        <button class="delete-btn">
            <img  src="icons/delete_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg" alt="delete btn">
        </button>
    
       `
    const deleteButton = todoLI.querySelector(".delete-btn");
    deleteButton.addEventListener("click" , ()=>{
        deleteTodoItem(todoIndex);
    })
    
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    })

    checkbox.checked = todo.completed;

    return todoLI;
}

//      localStorage

function deleteTodoItem (todoIndex){
    allTodos = allTodos.filter((_, i)=> i !== todoIndex);
    saveTodos();
    updateTodoList();
}
function saveTodos(){
    const todoJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todoJson)
}
function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}

