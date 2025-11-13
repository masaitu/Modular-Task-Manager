import { Task } from "./Task.js";
import { load, save } from "./store.js";
import { render } from "./view.js";
import { uid } from "./utils.js";

const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const list = document.getElementById("task-list");
const count = document.getElementById("task-count");
const remaining = document.getElementById("task-remaining");
const filterButtons = Array.from(
  document.querySelectorAll(".filters__button[data-filter]")
);

const state = {
  tasks: [],
  filter: "all",
};

const handlers = {
  onToggle: handleToggleTask,
  onDelete: handleDeleteTask,
};

init();

function init() {
  state.tasks = load();
  renderApp();

  form.addEventListener("submit", handleAddTask);
  filterButtons.forEach((button) =>
    button.addEventListener("click", handleFilterChange)
  );
}

function handleAddTask(event) {
  event.preventDefault();

  titleInput.setCustomValidity("");

  const title = titleInput.value;

  try {
    const task = Task.create({ id: uid(), title, done: false });
    updateTasks([...state.tasks, task]);
    form.reset();
    titleInput.focus();
  } catch (error) {
    console.warn("Unable to add task:", error);
    titleInput.setCustomValidity(error.message);
    titleInput.reportValidity();
  }
}

function handleToggleTask(taskId) {
  updateTasks(
    state.tasks.map((task) =>
      task.id === taskId ? task.toggled() : task
    )
  );
}

function handleDeleteTask(taskId) {
  updateTasks(state.tasks.filter((task) => task.id !== taskId));
}

function handleFilterChange(event) {
  event.preventDefault();
  const { filter } = event.currentTarget.dataset;

  if (!filter || filter === state.filter) {
    return;
  }

  state.filter = filter;
  renderApp();
}

function updateTasks(nextTasks) {
  state.tasks = nextTasks.map((task) => Task.from(task));
  save(state.tasks);
  renderApp();
}

function renderApp() {
  render(
    { tasks: state.tasks, filter: state.filter },
    { list, count, remaining, filterButtons },
    handlers
  );
}
