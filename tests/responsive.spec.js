import { test, expect } from "@playwright/test";

const devices = [
  { name: "iPhone 12", width: 390, height: 844 },
  { name: "iPad Mini", width: 744, height: 1133 },
  { name: "Desktop", width: 1280, height: 720 },
  { name: "Wide Desktop", width: 1920, height: 1080 },
];

test.describe("responsiveness across device dimensions", () => {
  for (const device of devices) {
    test.describe(device.name, () => {
      test.use({ viewport: { width: device.width, height: device.height } });

      test("renders homepage without horizontal overflow", async ({ page }) => {
        await page.goto("/");
        await page.waitForLoadState("networkidle");

        const overflow = await page.evaluate(() => {
          const doc = document.documentElement;
          return doc.scrollWidth > doc.clientWidth;
        });
        expect(overflow).toBe(false);
      });

      test("hero section is visible and images render", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("#hero")).toBeVisible();
        await expect(page.locator("h1")).toContainText("PAOZ Victory Tabernacle");
      });

      test("navbar is present on all viewports", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("nav")).toBeVisible();
      });

      test("all page sections render", async ({ page }) => {
        await page.goto("/");
        for (const id of [
          "hero",
          "services",
          "about",
          "pillars",
          "scriptures",
          "events",
          "message",
          "visit",
          "giving",
          "footer",
        ]) {
          await expect(page.locator(`#${id}`)).toBeVisible();
        }
      });

      test("mobile navigation drawer opens on small screens", async ({ page }) => {
        if (device.width > 768) return;
        await page.goto("/");
        const menuBtn = page.locator('button[aria-label="Open menu"]');
        await expect(menuBtn).toBeVisible();
        await menuBtn.click();
        const drawer = page.locator("nav [class*='animate-fade-in']");
        await expect(drawer).toBeVisible();
      });
    });
  }
});
