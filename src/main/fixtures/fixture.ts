import { test as base } from "@playwright/test";
import { HomePage } from "../pages/subPage/home/homePage";
import { LoginPage } from "../pages/subPage/login/loginPage";

export const test = base.extend<{
  homePage: HomePage;
  loginPage: LoginPage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
