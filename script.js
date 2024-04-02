const todoForm = document.getElementById("todo-form");
const todoFormCancel = document.getElementById("todo-form-cancel");
const todoFormShow = document.getElementById("todo-form-show");
const todoInputText = document.getElementById("todo-input-text");
const todoInputNote = document.getElementById("todo-input-note");
const todoContainer = document.getElementById("todo-container");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const populateTodoContainer = () => {
  todoContainer.innerHTML = "";
  if (todos.length == 0) {
    todoContainer.innerHTML = '<p class="text-center mt-10">No Todo</p>';
  } else {
    todos.forEach((todo) => {
      todoContainer.innerHTML += `
    <div class="item border-t p-3 px-8 w-full flex justify-between items-center relative bg-white group">
          <div class="flex gap-x-4 items-center">
          ${
            todo.completed
              ? '<input checked onClick="completeTodo(' +
                todo.id +
                ')" type="checkbox" class="scale-125 cursor-pointer" />'
              : '<input onClick="completeTodo(' +
                todo.id +
                ')" type="checkbox" class="scale-125 cursor-pointer" />'
          }
            <div class="${todo.completed ? "opacity-30" : ""}">
              <p class="${
                todo.completed ? "line-through text-gray-500" : ""
              }">${todo.text}</p>
              <p class="text-xs text-gray-500">${todo.note}</p>
            </div>
            </div>
            <img onClick="deleteTodo(${
              todo.id
            })" class="transition duration-350 md:opacity-0 md:pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto absolute right-4 cursor-pointer hover:bg-slate-200 p-1 rounded-full" width="30" height="30" src="./delete.svg" alt="delete"/>
          </div>
          `;
    });
  }

  localStorage.setItem("todos", JSON.stringify(todos));
};

populateTodoContainer();

const completeTodo = (id) => {
  todos = todos.map((todo) =>
    todo.id == id ? { ...todo, completed: !todo.completed } : todo
  );
  populateTodoContainer();
};

const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id != id);
  populateTodoContainer();
};

todoForm.onsubmit = (e) => {
  e.preventDefault();
  if (todoInputText.value) {
    todos.push({
      id: Date.now(),
      text: todoInputText.value,
      note: todoInputNote.value,
      completed: false,
    });
    todoInputText.value = "";
    todoInputNote.value = "";
    populateTodoContainer();
    todoForm.style.display = "none";
  }
};

todoFormCancel.onclick = () => {
  todoForm.style.display = "none";
};

todoFormShow.onclick = () => {
  todoForm.style.display = "flex";
};

todoForm.onclick = (e) => {
  if (e.target.id == "todo-form") {
    todoForm.style.display = "none";
  }
};
