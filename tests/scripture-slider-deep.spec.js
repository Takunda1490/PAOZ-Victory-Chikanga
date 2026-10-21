import { test, expect } from "@playwright/test";

const handheldDevices = [
  { name: "iPhone 12", width: 390, height: 844 },
  { name: "iPhone SE", width: 375, height: 667 },
];

test.describe("Scripture Slider Deep Element Analysis", () => {
  for (const device of handheldDevices) {
    test.describe(device.name, () => {
      test.use({ viewport: { width: device.width, height: device.height } });

      test("analyze all elements for overlaps", async ({ page }) => {
        await page.goto("/");
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(1000);

        const scripturesSection = page.locator("#scriptures");
        await scripturesSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        const analysis = await page.evaluate(() => {
          const section = document.querySelector("#scriptures");
          const carousel = section?.querySelector(".overflow-hidden");
          const slides = carousel?.querySelectorAll("[class*='grid md:grid-cols-2']");
          
          if (!slides || slides.length === 0) return { error: "No slides found" };

          const results = [];
          
          slides.forEach((slide, slideIndex) => {
            const slideRect = slide.getBoundingClientRect();
            
            // Get ALL descendant elements
            const allElements = Array.from(slide.querySelectorAll("*"));
            const elementData = allElements.map(el => {
              const rect = el.getBoundingClientRect();
              const style = window.getComputedStyle(el);
              
              return {
                tag: el.tagName,
                classes: el.className?.toString()?.substring(0, 100),
                text: el.textContent?.substring(0, 50),
                rect: {
                  top: rect.top - slideRect.top,
                  right: rect.right - slideRect.left,
                  bottom: rect.bottom - slideRect.top,
                  left: rect.left - slideRect.left,
                  width: rect.width,
                  height: rect.height,
                },
                position: style.position,
                zIndex: style.zIndex,
              };
            });

            // Find overlapping pairs
            const overlaps = [];
            for (let i = 0; i < elementData.length; i++) {
              for (let j = i + 1; j < elementData.length; j++) {
                const a = elementData[i].rect;
                const b = elementData[j].rect;
                
                // Skip if either has zero dimensions
                if (a.width === 0 || a.height === 0 || b.width === 0 || b.height === 0) continue;
                
                const overlapX = !(a.right <= b.left || b.right <= a.left);
                const overlapY = !(a.bottom <= b.top || b.bottom <= a.top);
                
                if (overlapX && overlapY) {
                  // Calculate overlap area
                  const overlapWidth = Math.min(a.right, b.right) - Math.max(a.left, b.left);
                  const overlapHeight = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
                  const overlapArea = overlapWidth * overlapHeight;
                  
                  // Only report significant overlaps (> 10px² and not just parent-child)
                  if (overlapArea > 100) {
                    overlaps.push({
                      element1: `${elementData[i].tag}.${elementData[i].classes}`,
                      element2: `${elementData[j].tag}.${elementData[j].classes}`,
                      text1: elementData[i].text,
                      text2: elementData[j].text,
                      overlapArea: Math.round(overlapArea),
                    });
                  }
                }
              }
            }

            results.push({
              slideIndex,
              slideSize: { width: slideRect.width, height: slideRect.height },
              elementCount: elementData.length,
              overlaps: overlaps.slice(0, 20), // Limit to first 20
            });
          });

          return {
            viewport: { width: window.innerWidth, height: window.innerHeight },
            slides: results,
          };
        });

        console.log(`\n=== ${device.name} Deep Analysis ===`);
        console.log(JSON.stringify(analysis, null, 2));
      });
    });
  }
});
