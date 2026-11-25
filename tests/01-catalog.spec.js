import { test, expect } from '@playwright/test';
import { CatalogPage } from '../pages/CatalogPage.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Задание 1', async ({ page }) => {
  const model = new CatalogPage(page);
  // BEGIN
  const apple = page.getByRole('heading', { name: 'Apple', exact: true });
  const redLipstick = page.getByRole('heading', { name: 'Red Lipstick', exact: true });
  await expect(apple).toBeVisible();

  await model.search('Red Lipstick');

  await expect(redLipstick).toBeVisible();
  await expect(apple).toHaveCount(0);
  // END
});

test('Задание 2', async ({ page }) => {
  const model = new CatalogPage(page);
  // BEGIN
  const apple = page.getByRole('heading', { name: 'Apple', exact: true });
  const essenceCheckbox = page.getByLabel('Essence', { exact: true });
  const mascara = page.getByRole('heading', {
    name: 'Essence Mascara Lash Princess',
    exact: true,
  });
  await expect(apple).toBeVisible();

  await model.selectBrand('Essence');

  await expect(essenceCheckbox).toBeChecked();
  await expect(mascara).toBeVisible();
  await expect(apple).toHaveCount(0);
  // END
});

test('Задание 3', async ({ page }) => {
  const model = new CatalogPage(page);
  // BEGIN
  await model.openProduct('Red Lipstick');

  await expect(page).toHaveURL(/\/products\/4$/);
  await expect(page.getByRole('heading', { name: 'Red Lipstick', exact: true })).toBeVisible();
  // END
});

test('Задание 4', async ({ page }) => {
  const model = new CatalogPage(page);
  // BEGIN
  const mascara = page.getByRole('heading', {
    name: 'Essence Mascara Lash Princess',
    exact: true,
  });
  const cards = page.locator('h6.card-title');
  await expect(mascara).toBeVisible();

  await model.nextPage();

  await expect(mascara).toHaveCount(0);
  await expect(cards.first()).toBeVisible();
  // END
});
