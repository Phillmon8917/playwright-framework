import { test as base } from "@playwright/test";
import { HomePage } from "../pages/subPages/home/homePage.ts";
import { CustomerSignupPage } from "../pages/subPages/customerSignup/customerSignUp.ts";

export const test = base.extend<{
  homePage: HomePage;
  customerSignupPage: CustomerSignupPage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  customerSignupPage: async ({ page }, use) => {
    await use(new CustomerSignupPage(page));
  },
});
