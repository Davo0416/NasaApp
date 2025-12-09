import { test, expect } from '@playwright/test';

test('Test for correct APOD Title', async ({ page }) => {
  //GOTO APOD
  await page.goto('NasaApp/apod');
  //Find title
  const title = page.locator('h1');
  //Check for a match
  await expect(title).toHaveText('NASA Astronomy Picture Of The Day');
});

test('Test for Image/Video content on APOD page', async ({ page }) => {
  //GOTO APOD
  await page.goto('NasaApp/apod');

  //Find image & check if is loaded (Meaning API request was successful)
  const image = page.locator('img');
  if (await image.count() > 0) {
    await expect(image).toBeVisible();
    const loaded = await image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0);
    expect(loaded).toBe(true);
  }

  //Alternatively find video & check if is loaded (Meaning API request was successful)
  const video = page.locator('video');
  if (await video.count() > 0) {
    await expect(video).toBeVisible();
    const hasSource = await video.evaluate((v: HTMLVideoElement) => v.readyState >= 3);
    expect(hasSource).toBe(true);
  }
});

test('Test image date & description fetch on APOD page', async ({ page }) => {
  //GOTO APOD
  await page.goto('NasaApp/apod');
  //Find the first paragraph
  const firstParagraph = page.locator('p').first();
  //Check if it contains the text "Date:" (Meaning the date & description of the image were successfuly obtained from the API)
  await expect(firstParagraph).toContainText('Date:');
});
