import { test, expect } from '../../src/fixtures';
import addCases from '../../src/data/todo-add-cases.json';
import { filterCases } from '../../src/data/todo-filter-cases';

for (const row of addCases) {
  test(`a person can add ${row.name} @data`, async ({ todoPage }) => {
    await todoPage.addTodo(row.title);

    await expect(todoPage.todoTitles).toHaveText([row.title]);
  });
}

for (const row of filterCases) {
  test(`${row.name} @data`, async ({ todoPage }) => {
    for (const title of row.add) {
      await todoPage.addTodo(title);
    }

    await todoPage.complete(row.complete);
    await todoPage.showFilter(row.filter);

    await expect(todoPage.todoTitles).toHaveText(row.expected);
  });
}
