import { escapeHTML } from "./utils.js";

const FILTERS = {
  all: (task) => true,
  active: (task) => !task.done,
  done: (task) => task.done,
};

export function render({ tasks, filter }, elements, handlers) {
  const activeFilter = FILTERS[filter] ? filter : "all";
  const filteredTasks = tasks.filter(FILTERS[activeFilter]);

  renderTaskList(elements.list, filteredTasks, handlers);
  renderCounts(elements.count, elements.remaining, tasks);
  renderFilterButtons(elements.filterButtons, activeFilter);
}

function renderTaskList(listEl, tasks, handlers) {
  listEl.innerHTML = "";

  if (!tasks.length) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "task task--empty";
    emptyItem.textContent = "No tasks to show.";
    listEl.append(emptyItem);
    return;
  }

  const fragment = document.createDocumentFragment();

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = "task";
    item.dataset.taskId = task.id;

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.className = "task__toggle";
    toggle.checked = task.done;
    toggle.setAttribute("aria-label", `Toggle ${task.title}`);
    toggle.addEventListener("change", () => {
      if (handlers.onToggle) {
        handlers.onToggle(task.id);
      }
    });

    const title = document.createElement("span");
    title.className = `task__title${task.done ? " task__title--done" : ""}`;
    title.innerHTML = escapeHTML(task.title);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "task__delete";
    deleteBtn.setAttribute("aria-label", `Delete ${task.title}`);
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      if (handlers.onDelete) {
        handlers.onDelete(task.id);
      }
    });

    item.append(toggle, title, deleteBtn);
    fragment.append(item);
  });

  listEl.append(fragment);
}

function renderCounts(countEl, remainingEl, tasks) {
  const total = tasks.length;
  const remaining = tasks.reduce((count, task) => count + (task.done ? 0 : 1), 0);

  countEl.textContent = String(total);
  remainingEl.textContent = String(remaining);
}

function renderFilterButtons(buttons, activeFilter) {
  buttons.forEach((button) => {
    const isActive = button.dataset.filter === activeFilter;
    button.classList.toggle("filters__button--active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}
