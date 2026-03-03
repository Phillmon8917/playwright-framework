import { test as base } from "@playwright/test";
import { HomePage } from "../pages/subPage/home/homePage";

export const test = base.extend<{
  homePage: HomePage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});
