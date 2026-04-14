import { BasePage } from "../../basePage/basePage.ts";
import { Locator, Page } from "@playwright/test";

export class LoginBasePage extends BasePage {
  protected readonly emailInput: Locator;
  protected readonly passwordInput: Locator;
  protected readonly rememberMeCheckbox: Locator;
  protected readonly loginButton: Locator;
  protected readonly dashBoardHeader: Locator;
  protected readonly loggedInUserButton: Locator;
  protected readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('input[placeholder="Email Address"]');
    this.passwordInput = page.locator('input[placeholder="Password"]');
    this.rememberMeCheckbox = page.locator("div.checkbox-custom span");
    this.loginButton = page.locator('button[type="submit"]');
    this.dashBoardHeader = page.locator('div h1:text("Dashboard")');
    this.loggedInUserButton = page.locator('button span:has(text="account_circle")');
    this.logoutButton = page.getByRole("button", { name: "Logout" });
  }
}
