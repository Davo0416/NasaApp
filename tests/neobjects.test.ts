import { test, expect } from '@playwright/test';

test('Test for correct Near Earth Objects Title', async ({ page }) => {
  //GOTO NEObjects
  await page.goto('/NEObjects');
  //Find title
  const title = page.locator('h1');
  //Check for a match
  await expect(title).toHaveText('Near-Earth Objects');
});

test('Test initial NEObject image cards loading', async ({ page }) => {
  //GOTO Gallery
  await page.goto('/NEObjects');

  //Find the first imageCard, expect it to load in appropriate time
  const firstImageCard = page.locator('.imageCard_False').first();
  await expect(firstImageCard).toBeVisible({ timeout: 10000 });
});

test('Test NEO search updates the image cards when date changes', async ({ page }) => {
  //GOTO NEObjects
  await page.goto('/NEObjects');

  //Wait for initial results to load
  const firstCardBefore = page.locator('.imageCard_True, .imageCard_False').first();
  await expect(firstCardBefore).toBeVisible({ timeout: 15000 });

  //Get the first card’s title
  const titleBefore = await firstCardBefore.locator('h3').innerText();


  //Select the date input
  const dateInput = page.locator('input[type="date"]');

  //Pick a date 5 days earlier than today
  const today = new Date();
  const earlier = new Date(today);
  earlier.setDate(today.getDate() - 5);

  const formatted = earlier.toISOString().split('T')[0];

  await dateInput.fill(formatted);
  await page.locator('button:has(.oi-magnifying-glass)').click();

  //Wait for new results to load
  const firstCardAfter = page.locator('.imageCard_True, .imageCard_False').first();
  await expect(firstCardAfter).toBeVisible({ timeout: 15000 });

  //Get the new first card’s title
  const titleAfter = await firstCardAfter.locator('h3').innerText();

  //Confirm search changed the first result
  expect(titleAfter).not.toBe(titleBefore);
});

test('Test if image modal opens with correct content', async ({ page }) => {
  await page.goto('/NEObjects');

  const firstImageCard = page.locator('.imageCard_True').first();
  await firstImageCard.click();

  const modal = page.locator('.modal-overlay');
  await expect(modal).toBeVisible();

  const modalTitle = modal.locator('h2');
  await expect(modalTitle).not.toBeEmpty();

  const modalID = modal.locator('pre:has-text("ID:")').first();
  await expect(modalID).toBeVisible();

});
