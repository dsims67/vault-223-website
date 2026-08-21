import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/menu/", "/visit/"];

for (const route of routes) {
  test(`${route} renders without horizontal overflow`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("main h1")).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  });
}

test("all launch widths remain overflow-free", async ({ page }) => {
  for (const width of [320, 360, 390, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: width < 768 ? 760 : 900 });
    for (const route of routes) {
      await page.goto(route);
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(dimensions.content, `${route} overflowed at ${width}px`).toBeLessThanOrEqual(dimensions.viewport);
    }
  }
});

test("menu content is semantic and complete", async ({ page }) => {
  await page.goto("/menu/");
  await expect(page.locator("#breakfast")).toBeVisible();
  await expect(page.locator("#flatbread")).toBeVisible();
  await expect(page.getByText("Prices and availability may change.")).toBeVisible();
});

test("visible mobile controls meet the 44px touch target", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 });
  for (const route of routes) {
    await page.goto(route);
    const undersized = await page.locator("a, button, summary").evaluateAll((elements) =>
      elements
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
        })
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return { label: element.textContent?.replace(/\s+/g, " ").trim(), width: rect.width, height: rect.height };
        })
        .filter((control) => control.width < 44 || control.height < 44),
    );
    expect(undersized, `${route} has undersized touch targets`).toEqual([]);
  }
});

test("order chooser opens from the sitewide action", async ({ page }) => {
  await page.goto("/");
  const orderTrigger = (page.viewportSize()?.width ?? 0) < 960
    ? page.locator("[data-mobile-order-sentinel]")
    : page.locator(".desktop-order");
  await orderTrigger.click();
  await expect(page.getByRole("heading", { name: "Choose a delivery service" })).toBeVisible();
  await expect(page.getByRole("link", { name: /DoorDash/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Uber Eats/ })).toBeVisible();
  await expect(page.getByText(/Clover can be added/)).toHaveCount(0);
});

test("mobile order bar appears after the hero order action scrolls past", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 760 });
  await page.goto("/");

  const orderBar = page.locator(".mobile-order-bar");
  const heroOrder = page.locator("[data-mobile-order-sentinel]");

  await expect(heroOrder).toBeVisible();
  await expect(orderBar).toHaveAttribute("aria-hidden", "true");

  await heroOrder.evaluate((element) => {
    const headerHeight = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-height"),
    ) || 72;
    const bottom = element.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo(0, bottom + headerHeight + 1);
  });

  await expect(orderBar).toHaveAttribute("aria-hidden", "false");
  await expect(page.locator(".mobile-order-trigger")).toBeEnabled();
});

test("header navigation reaches Menu and Visit", async ({ page }) => {
  const useHeaderLink = async (href: string) => {
    if ((page.viewportSize()?.width ?? 0) < 960) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page.locator(`.mobile-nav a[href="${href}"]`).click();
    } else {
      await page.locator(`.desktop-nav a[href="${href}"]`).click();
    }
  };

  await page.goto("/");
  await useHeaderLink("/menu/");
  await expect(page).toHaveURL(/\/menu\/$/);
  await expect(page.getByRole("heading", { name: "Open the menu." })).toBeVisible();

  await page.goto("/");
  await useHeaderLink("/visit/");
  await expect(page).toHaveURL(/\/visit\/$/);
  await expect(page.getByRole("heading", { name: "Find the door marked 223." })).toBeVisible();
});

test("pages have no serious accessibility violations", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    const blocking = results.violations.filter((violation) =>
      violation.impact === "serious" || violation.impact === "critical",
    );
    expect(blocking, `${route} has blocking axe findings`).toEqual([]);
  }
});
