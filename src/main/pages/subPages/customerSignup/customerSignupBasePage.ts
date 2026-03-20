import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../basePage/basePage";

export class CustomerSignupBasePage extends BasePage {
  protected readonly firstNameInput: Locator;
  protected readonly lastNameInput: Locator;
  protected readonly emailInput: Locator;
  protected readonly passwordInput: Locator;
  protected readonly confirmPasswordInput: Locator;
  protected readonly securityCheckQuestion: Locator;
  protected readonly securityCheckAnswerInput: Locator;
  protected readonly agreeToTermsCheckbox: Locator;
  protected readonly createAccountButton: Locator;
  protected readonly backendErrorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameInput = page.getByRole("textbox", { name: "First Name *" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last Name *" });
    this.emailInput = page.getByRole("textbox", { name: "Email Address *" });
    this.passwordInput = page.getByRole("textbox", {
      name: "Password *",
      exact: true,
    });
    this.confirmPasswordInput = page.getByRole("textbox", {
      name: "Confirm Password *",
    });
    this.securityCheckQuestion = page.locator('label[for="captcha_answer"]');
    this.securityCheckAnswerInput = page.getByLabel(/Security Check:/);
    this.agreeToTermsCheckbox = page.locator('input[name="terms"]');
    this.createAccountButton = page.locator('button[type="submit"]');
    this.backendErrorMessage = page.locator(".alert-error");
  }
}
