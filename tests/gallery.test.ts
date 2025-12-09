import { test, expect } from '@playwright/test';

test('Test for correct Gallery Title', async ({ page }) => {
  //GOTO Gallery
  await page.goto('/gallery');
  //Find title
  const title = page.locator('h1');
  //Check for a match
  await expect(title).toHaveText('Image Gallery');
});

test('Test initial image cards loading', async ({ page }) => {
  //GOTO Gallery
  await page.goto('/gallery');

  //Find the first imageCard, expect it to load in appropriate time
  const firstImageCard = page.locator('.imageCard').first();
  await expect(firstImageCard).toBeVisible({ timeout: 10000 });
});

test('Test search functionality updates first image card', async ({ page }) => {
  //GOTO Gallery
  await page.goto('/gallery');

  //Wait for the first image card to appear
  const firstImageCardBefore = page.locator('.imageCard').first();
  await expect(firstImageCardBefore).toBeVisible({ timeout: 10000 });

  //Get image src & title of the first card
  const firstCardImageSrcBefore = await firstImageCardBefore.locator('img').getAttribute('src');
  const firstCardTitleBefore = await firstImageCardBefore.locator('h3').innerText();

  //Search for "mars"
  const searchInput = page.locator('input[placeholder="Search..."]');
  await searchInput.fill('mars');
  await searchInput.press('Enter');

  //Wait for new results
  const firstImageCardAfter = page.locator('.imageCard').first();
  await expect(firstImageCardAfter).toBeVisible({ timeout: 10000 });

  //Get image src & title of the first card after search
  const firstCardImageSrcAfter = await firstImageCardAfter.locator('img').getAttribute('src');
  const firstCardTitleAfter = await firstImageCardAfter.locator('h3').innerText();

  //Compare before and after
  expect(firstCardImageSrcAfter).not.toBe(firstCardImageSrcBefore);
  expect(firstCardTitleAfter).not.toBe(firstCardTitleBefore);
});

test('Test if image modal opens with correct content', async ({ page }) => {
  //GOTO Gallery
  await page.goto('/gallery');

  //Click first image card
  const firstImageCard = page.locator('.imageCard').first();
  await firstImageCard.click();

  //Check if modal has opened
  const modal = page.locator('.modal-content');
  await expect(modal).toBeVisible({ timeout: 100000 });

  //Check if title is not empty
  const modalTitle = modal.locator('h2');
  await expect(modalTitle).not.toBeEmpty();

  //Check if date is not empty
  const modalDate = modal.locator('p:has(strong:has-text("Date:"))').first();
  await expect(modalDate).toBeVisible();

  //Check if description is not empty
  const modalDescription = modal.locator('p').nth(1);
  await expect(modalDescription).not.toBeEmpty();
});
