import { test, expect } from "@playwright/test";

const handheldDevices = [
  { name: "iPhone 12", width: 390, height: 844 },
  { name: "iPhone SE", width: 375, height: 667 },
  { name: "Samsung Galaxy S21", width: 360, height: 800 },
  { name: "Google Pixel 5", width: 393, height: 851 },
];

test.describe("Scripture Slider Overlap Debug", () => {
  for (const device of handheldDevices) {
    test.describe(device.name, () => {
      test.use({ viewport: { width: device.width, height: device.height } });

      test("analyze slider layout for overlaps", async ({ page }) => {
        await page.goto("/");
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(1000);

        // Scroll to the scriptures section
        const scripturesSection = page.locator("#scriptures");
        await scripturesSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        // Check if slider exists
        const slider = page.locator("#scriptures .overflow-hidden");
        await expect(slider).toBeVisible();

        // Analyze each slide's grid layout
        const analysis = await page.evaluate(() => {
          const slides = document.querySelectorAll("#scriptures [class*='grid md:grid-cols-2']");
          const results = [];

          slides.forEach((slide, index) => {
            const style = window.getComputedStyle(slide);
            const gridTemplateColumns = style.gridTemplateColumns;
            const gridTemplateRows = style.gridTemplateRows;
            const display = style.display;

            // Get image container
            const imageContainer = slide.querySelector(".relative.h-64");
            const textContainer = slide.querySelector(".px-6");

            const imageRect = imageContainer ? imageContainer.getBoundingClientRect() : null;
            const textRect = textContainer ? textContainer.getBoundingClientRect() : null;

            // Check if image and text overlap
            let overlap = false;
            if (imageRect && textRect) {
              overlap = !(
                imageRect.bottom <= textRect.top ||
                imageRect.right <= textRect.left ||
                textRect.bottom <= imageRect.top ||
                textRect.right <= imageRect.left
              );
            }

            results.push({
              index,
              gridTemplateColumns,
              gridTemplateRows,
              display,
              imageRect: imageRect ? {
                top: imageRect.top,
                right: imageRect.right,
                bottom: imageRect.bottom,
                left: imageRect.left,
                width: imageRect.width,
                height: imageRect.height,
              } : null,
              textRect: textRect ? {
                top: textRect.top,
                right: textRect.right,
                bottom: textRect.bottom,
                left: textRect.left,
                width: textRect.width,
                height: textRect.height,
              } : null,
              overlap,
            });
          });

          return {
            viewport: { width: window.innerWidth, height: window.innerHeight },
            slides: results,
          };
        });

        console.log(`\n=== ${device.name} (${device.width}x${device.height}) ===`);
        console.log(JSON.stringify(analysis, null, 2));

        // Check for overlaps
        const hasOverlap = analysis.slides.some(slide => slide.overlap);
        if (hasOverlap) {
          console.log(`WARNING: Overlap detected on ${device.name}!`);
        }
      });
    });
  }
});
