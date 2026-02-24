import { BasePage } from "../../basePage/basePage";
import { Page, Locator } from "@playwright/test";

export class LoginBasePage extends BasePage {
  protected readonly welcomeBackText: Locator;
  protected readonly emailInput: Locator;
  protected readonly passwordInput: Locator;
  protected readonly rememberMeCheckbox: Locator;
  protected readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);

    this.welcomeBackText = page.getByRole("heading", {
      name: "Welcome Back",
      exact: true,
    });
    this.emailInput = page.getByRole("textbox", { name: "Email Address" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.rememberMeCheckbox = page.locator("#login-form").getByText("check");
    this.signInButton = page.getByRole("button", {
      name: "login Sign In to your account",
    });
  }
}
