import { test, expect } from '../../src/fixtures';
import { todoTitles, uniqueTodo } from '../../src/data/todos.data';

test('a person can add one to-do item @smoke', async ({ todoPage }) => {
  await todoPage.addTodo(todoTitles.milk);

  await expect(todoPage.todoTitles).toHaveText([todoTitles.milk]);
});

test('a person can add two to-do items', async ({ todoPage }) => {
  await todoPage.addTodo(todoTitles.milk);
  await todoPage.addTodo(todoTitles.bread);

  await expect(todoPage.todoTitles).toHaveText([todoTitles.milk, todoTitles.bread]);
});

test('a person can complete a to-do item', async ({ todoPage }) => {
  await todoPage.addTodo(todoTitles.milk);
  await todoPage.complete(todoTitles.milk);
  await todoPage.showFilter('Completed');

  await expect(todoPage.todoTitles).toHaveText([todoTitles.milk]);
});

test('a person can delete a to-do item', async ({ todoPage }) => {
  await todoPage.addTodo(todoTitles.milk);
  await todoPage.remove(todoTitles.milk);

  await expect(todoPage.todoTitles).toHaveCount(0);
});

test('unique titles do not clash when tests run together', async ({ todoPage }) => {
  const title = uniqueTodo('Buy milk');

  await todoPage.addTodo(title);

  await expect(todoPage.todoTitles).toHaveText([title]);
});
