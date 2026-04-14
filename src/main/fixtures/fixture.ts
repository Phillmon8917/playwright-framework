import { test as base } from "@playwright/test";
import { HomePage } from "../pages/subPages/home/homePage.ts";
import { SignupPage } from "../pages/subPages/signUp/signUp.ts";
import { LoginPage } from "../pages/subPages/login/login.ts";

export const test = base.extend<{
  homePage: HomePage;
  signupPage: SignupPage;
  loginPage: LoginPage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
