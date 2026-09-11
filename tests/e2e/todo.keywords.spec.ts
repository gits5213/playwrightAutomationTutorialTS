import { test } from '../../src/fixtures';

test('a person adds two items using named steps @keywords', async ({ todoKeywords }) => {
  await todoKeywords.addATodoCalled('Buy milk');
  await todoKeywords.addATodoCalled('Buy bread');
  await todoKeywords.theListShouldShow(['Buy milk', 'Buy bread']);
});

test('a person completes then hides an item using named steps @keywords', async ({ todoKeywords }) => {
  await todoKeywords.addATodoCalled('Buy milk');
  await todoKeywords.completeTheTodoCalled('Buy milk');
  await todoKeywords.showOnly('Active');
  await todoKeywords.theListShouldBeEmpty();
});

test('a person can delete an item using named steps @keywords', async ({ todoKeywords }) => {
  await todoKeywords.addATodoCalled('Buy milk');
  await todoKeywords.deleteTheTodoCalled('Buy milk');
  await todoKeywords.theListShouldBeEmpty();
});
