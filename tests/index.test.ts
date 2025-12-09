import { test, expect } from '@playwright/test';

test('Check redirection to /apod', async ({ page }) => {
  //GOTO Home
  await page.goto('');

  //Click 1st card
  const apodCard = page.locator('.home-card').nth(0);
  await apodCard.click();

  //Check if landed on the APOD page
  await expect(page).toHaveURL(/\/apod$/);
});

test('Check redirection to /gallery', async ({ page }) => {
  //GOTO Home
  await page.goto('');

  //Click 2nd card
  const galleryCard = page.locator('.home-card').nth(1);
  await galleryCard.click();

  //Check if landed on the Gallery page
  await expect(page).toHaveURL(/\/gallery$/);
});

test('Check redirection to /NEObjects', async ({ page }) => {
  //GOTO Home
  await page.goto('');

  //Click 3rd card
  const neoCard = page.locator('.home-card').nth(2);
  await neoCard.click();

  //Check if landed on the NEObjects page
  await expect(page).toHaveURL(/\/NEObjects$/);
});