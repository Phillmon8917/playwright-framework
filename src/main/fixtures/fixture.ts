import { test as base } from "@playwright/test";
import { HomePage } from "../pages/subPages/home/homePage.ts";
import { SignupPage } from "../pages/subPages/signUp/signUp.ts";

export const test = base.extend<{
  homePage: HomePage;
  signupPage: SignupPage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
});
