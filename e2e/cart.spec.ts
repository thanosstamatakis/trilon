import { test } from "@playwright/test";

test("shopping cart", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("button", { name: "🛒" }).first().click();
  await page.getByText("My cart").click();
  await page.getByRole("button", { name: "Smartphones" }).first().click();
  await page
    .locator("div")
    .filter({ hasText: /^iPhone 9\$549$/ })
    .first()
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^iPhone X\$899$/ })
    .first()
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Samsung Universe 9\$1249$/ })
    .first()
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^OPPOF19\$280$/ })
    .first()
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Huawei P30\$499$/ })
    .first()
    .click();
  await page.getByRole("button", { name: "Laptops" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^MacBook Pro\$1749$/ })
    .first()
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Samsung Galaxy Book\$1499$/ })
    .first()
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Microsoft Surface Laptop 4\$1499$/ })
    .first()
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Infinix INBOOK\$1099$/ })
    .first()
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^HP Pavilion 15-DK1056WM\$1099$/ })
    .first()
    .click();
  await page.locator("html").click();
});
