import { Task } from "./Task.js";

const STORAGE_KEY = "modular-task-manager.tasks";

const memoryStorage = (() => {
  const bucket = new Map();
  return {
    getItem(key) {
      return bucket.has(key) ? bucket.get(key) : null;
    },
    setItem(key, value) {
      bucket.set(key, value);
    },
    removeItem(key) {
      bucket.delete(key);
    },
  };
})();

function resolveStorage() {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage;
    }
  } catch (error) {
    // Access to localStorage can throw in private browsing.
  }
  return memoryStorage;
}

const storage = resolveStorage();

export function load() {
  const stored = storage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((item) => Task.from(item));
  } catch (error) {
    console.warn("Failed to parse tasks from storage, clearing.", error);
    storage.removeItem(STORAGE_KEY);
    return [];
  }
}

export function save(tasks) {
  if (!Array.isArray(tasks)) {
    throw new TypeError("Expected an array of tasks to save.");
  }

  const serializable = tasks.map((task) => Task.from(task).toJSON());
  const payload = JSON.stringify(serializable);
  storage.setItem(STORAGE_KEY, payload);
}
