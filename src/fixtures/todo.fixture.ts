import { test as base } from '@playwright/test';
import { TodoKeywords } from '../keywords/todo.keywords';
import { TodoPage } from '../pages/todo.page';

type TodoFixtures = {
  todoPage: TodoPage;
  todoKeywords: TodoKeywords;
};

export const test = base.extend<TodoFixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await use(todoPage);
  },

  todoKeywords: async ({ todoPage }, use) => {
    await use(new TodoKeywords(todoPage));
  },
});

export { expect } from '@playwright/test';
