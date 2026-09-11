import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { TodoItemComponent } from './components/todo-item.component';

/**
 * One screen of the app. Locators and user actions live here so tests
 * stay short and a UI change is fixed in one file.
 */
export class TodoPage extends BasePage {
  readonly newTodo: Locator;
  readonly todoTitles: Locator;
  readonly todoItems: Locator;

  constructor(page: Page) {
    super(page);
    this.newTodo = page.getByPlaceholder('What needs to be done?');
    this.todoTitles = page.getByTestId('todo-title');
    this.todoItems = page.getByTestId('todo-item');
  }

  async goto() {
    await this.open('/todomvc');
  }

  async addTodo(title: string) {
    await this.newTodo.fill(title);
    await this.newTodo.press('Enter');
  }

  itemNamed(title: string) {
    return new TodoItemComponent(this.todoItems.filter({ hasText: title }));
  }

  async complete(title: string) {
    await this.itemNamed(title).complete();
  }

  async remove(title: string) {
    await this.itemNamed(title).remove();
  }

  async showFilter(name: 'All' | 'Active' | 'Completed') {
    await this.page.getByRole('link', { name }).click();
  }
}
