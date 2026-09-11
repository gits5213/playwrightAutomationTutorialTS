/**
 * Tables of examples. Data-driven tests loop these rows instead of
 * copying the same test three times.
 */
export const filterCases = [
  {
    name: 'Active hides completed items',
    add: ['Milk', 'Bread'],
    complete: 'Milk',
    filter: 'Active' as const,
    expected: ['Bread'],
  },
  {
    name: 'Completed shows only finished items',
    add: ['Milk', 'Bread'],
    complete: 'Bread',
    filter: 'Completed' as const,
    expected: ['Bread'],
  },
];
