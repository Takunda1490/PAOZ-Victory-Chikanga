import { test, expect } from "@playwright/test";

const handheldDevices = [
  { name: "iPhone 12", width: 390, height: 844 },
  { name: "iPhone SE", width: 375, height: 667 },
  { name: "Samsung Galaxy S21", width: 360, height: 800 },
];

test.describe("Scripture Slider Visual Debug", () => {
  for (const device of handheldDevices) {
    test.describe(device.name, () => {
      test.use({ viewport: { width: device.width, height: device.height } });

      test("capture slider screenshots and check layout", async ({ page }) => {
        await page.goto("/");
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(1000);

        // Scroll to scriptures section
        const scripturesSection = page.locator("#scriptures");
        await scripturesSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        // Take full page screenshot of the section
        await scripturesSection.screenshot({ 
          path: `test-results/scriptures-${device.name.replace(/\s+/g, '-')}.png` 
        });

        // Check for any element overlaps more thoroughly
        const overlapAnalysis = await page.evaluate(() => {
          const section = document.querySelector("#scriptures");
          const carousel = section?.querySelector(".overflow-hidden");
          const slides = carousel?.querySelectorAll("[class*='grid md:grid-cols-2']");
          
          if (!slides || slides.length === 0) return { error: "No slides found" };

          const results = [];
          
          slides.forEach((slide, index) => {
            const slideRect = slide.getBoundingClientRect();
            
            // Get all child elements
            const children = Array.from(slide.children);
            const childRects = children.map(child => {
              const rect = child.getBoundingClientRect();
              return {
                tag: child.tagName,
                classes: child.className,
                rect: {
                  top: rect.top - slideRect.top,
                  right: rect.right - slideRect.left,
                  bottom: rect.bottom - slideRect.top,
                  left: rect.left - slideRect.left,
                  width: rect.width,
                  height: rect.height,
                }
              };
            });

            // Check for overlaps between any two children
            const overlaps = [];
            for (let i = 0; i < children.length; i++) {
              for (let j = i + 1; j < children.length; j++) {
                const a = childRects[i].rect;
                const b = childRects[j].rect;
                
                const overlapX = !(a.right <= b.left || b.right <= a.left);
                const overlapY = !(a.bottom <= b.top || b.bottom <= a.top);
                
                if (overlapX && overlapY) {
                  overlaps.push({
                    element1: childRects[i].tag,
                    element2: childRects[j].tag,
                    classes1: childRects[i].classes,
                    classes2: childRects[j].classes,
                  });
                }
              }
            }

            results.push({
              index,
              slideRect: {
                width: slideRect.width,
                height: slideRect.height,
              },
              children: childRects,
              overlaps,
            });
          });

          return {
            viewport: { width: window.innerWidth, height: window.innerHeight },
            slides: results,
          };
        });

        console.log(`\n=== ${device.name} Overlap Analysis ===`);
        console.log(JSON.stringify(overlapAnalysis, null, 2));

        // Log any overlaps found
        overlapAnalysis.slides?.forEach(slide => {
          if (slide.overlaps.length > 0) {
            console.log(`Slide ${slide.index} overlaps:`, slide.overlaps);
          }
        });
      });
    });
  }
});
