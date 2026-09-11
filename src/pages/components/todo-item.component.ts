import { type Locator } from '@playwright/test';

/**
 * One row in the to-do list. Shared widgets belong here so page
 * objects do not copy the same checkbox and delete button.
 */
export class TodoItemComponent {
  constructor(private readonly root: Locator) {}

  async complete() {
    await this.root.getByRole('checkbox').check();
  }

  async remove() {
    await this.root.hover();
    await this.root.getByRole('button', { name: 'Delete' }).click();
  }
}
