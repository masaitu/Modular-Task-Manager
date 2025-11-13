/**
 * Represents a single immutable task entity.
 * Enforces title normalization and id immutability.
 */
export class Task {
  constructor({ id, title, done = false }) {
    if (!id || typeof id !== "string") {
      throw new TypeError("Task id must be a non-empty string.");
    }

    const normalizedTitle = Task.normalizeTitle(title);

    this.id = id;
    this.title = normalizedTitle;
    this.done = Boolean(done);

    Object.freeze(this);
  }

  /**
   * Returns a copy of the task with its done flag flipped.
   */
  toggled() {
    return new Task({ id: this.id, title: this.title, done: !this.done });
  }

  /**
   * Returns a copy updated with a new title.
   */
  withTitle(nextTitle) {
    return new Task({
      id: this.id,
      title: Task.normalizeTitle(nextTitle),
      done: this.done,
    });
  }

  /**
   * Serialization hook used by JSON.stringify.
   */
  toJSON() {
    return { id: this.id, title: this.title, done: this.done };
  }

  static normalizeTitle(title) {
    if (typeof title !== "string") {
      throw new TypeError("Task title must be a string.");
    }

    const trimmed = title.trim();

    if (!trimmed) {
      throw new RangeError("Task title cannot be empty.");
    }

    return trimmed;
  }

  static create({ id, title, done = false }) {
    return new Task({ id, title, done });
  }

  static from(value) {
    if (value instanceof Task) {
      return value;
    }

    if (!value || typeof value !== "object") {
      throw new TypeError("Cannot construct Task from non-object value.");
    }

    return new Task({
      id: value.id,
      title: value.title,
      done: value.done,
    });
  }
}
