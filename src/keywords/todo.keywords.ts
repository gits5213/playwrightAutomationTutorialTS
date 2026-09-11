import { expect } from '@playwright/test';
import { TodoPage } from '../pages/todo.page';

/**
 * Named business steps. Tests read like a story. The page object still
 * knows how to click. If the button label changes, you fix TodoPage,
 * not every keyword and not every test.
 */
export class TodoKeywords {
  constructor(private readonly todoPage: TodoPage) {}

  async addATodoCalled(title: string) {
    await this.todoPage.addTodo(title);
  }

  async completeTheTodoCalled(title: string) {
    await this.todoPage.complete(title);
  }

  async deleteTheTodoCalled(title: string) {
    await this.todoPage.remove(title);
  }

  async showOnly(filter: 'All' | 'Active' | 'Completed') {
    await this.todoPage.showFilter(filter);
  }

  async theListShouldShow(titles: string[]) {
    await expect(this.todoPage.todoTitles).toHaveText(titles);
  }

  async theListShouldBeEmpty() {
    await expect(this.todoPage.todoTitles).toHaveCount(0);
  }
}
