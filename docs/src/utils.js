let incrementalId = 0;

/**
 * Generates a reasonably collision-resistant identifier.
 * Uses timestamp + incremental counter combo to avoid duplicates in a session.
 */
export function uid(prefix = "task") {
  const timePart = Date.now().toString(36);
  const counterPart = (incrementalId++).toString(36);
  return `${prefix}-${timePart}${counterPart}`;
}

/**
 * Escapes HTML special characters in a string to prevent DOM injection.
 */
export function escapeHTML(value) {
  const stringValue =
    value === undefined || value === null ? "" : String(value);
  const escapeMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "`": "&#96;",
  };
  return stringValue.replace(/[&<>"'`]/g, (char) => escapeMap[char]);
}
