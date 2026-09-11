/** Shared titles used by several tests. Keep wording in one place. */
export const todoTitles = {
  milk: 'Buy milk',
  bread: 'Buy bread',
} as const;

/**
 * Unique titles so two tests can create items at the same time
 * without colliding. That is what makes parallel runs safe.
 */
export function uniqueTodo(prefix = 'Task') {
  return `${prefix} ${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}
