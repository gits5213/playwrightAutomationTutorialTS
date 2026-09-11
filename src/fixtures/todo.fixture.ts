import { test as base } from '@playwright/test';
import { TodoPage } from '../pages/todo.page';

type TodoFixtures = {
  todoPage: TodoPage;
};

export const test = base.extend<TodoFixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await use(todoPage);
  },
});

export { expect } from '@playwright/test';
