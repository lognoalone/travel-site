import { test, expect } from '@playwright/test';

test('home -> destination detail navigation', async ({ page }) => {
  // Go to the home page
  await page.goto('/');

  // Wait for destination cards to load
  await page.locator('.card').first().waitFor({ state: 'visible', timeout: 5000 });

  // Click the first "了解更多" link/button inside the first card
  const firstCard = page.locator('.card').first();
  const detailButton = firstCard.locator('text=了解更多');
  await detailButton.click();

  // Expect navigation to a destination detail route
  await expect(page).toHaveURL(/\/destination\/[0-9]+/);

  // Expect the detail page to show a title and price
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('h1')).not.toBeEmpty();
  await expect(page.locator('text=立即预订')).toBeVisible();
});

