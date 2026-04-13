import { LoginBasePage } from "./loginBasePage.ts";
import {logger} from "../../../utils/logger/logger.ts";

export class LoginPage extends LoginBasePage {
  /**
   * Fills the Email input field with the given email.
   * Waits for the element to be visible, then fills it with the given email.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {string} email - The email to be filled in the Email input field.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  private async fillEmailInput(email: string): Promise<void> {
    await this.modulars.elements.fillTheElement(
      this.emailInput,
      email,
      "Email",
      "fillEmailInput",
      { encryption: true },
    );
  }

  /**
   * Fills the Password input field with the given password.
   * Waits for the element to be visible, then fills it with the given password.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {string} password - The password to be filled in the Password input field.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  private async fillPasswordInput(password: string): Promise<void> {
    await this.modulars.elements.fillTheElement(
      this.passwordInput,
      password,
      "Password",
      "fillPasswordInput",
      { encryption: true },
    );
  }

  /**
   * Toggles the remember me checkbox.
   * If the remember parameter is true, the remember me checkbox will be checked.
   * If the remember parameter is false, the remember me checkbox will be unchecked.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {boolean} remember - Whether to toggle the remember me checkbox.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  private async toggleRememberMe(remember: boolean): Promise<void> {
    if (remember) {
      await this.modulars.elements.jsClick(
        this.rememberMeCheckbox,
        "Toggle Remember Me",
        "toggleRememberMe",
      );
    }
  }

  /**
   * Clicks the login button.
   * Waits for the login button to be visible, then clicks on it.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  private async clickLoginButton(): Promise<void> {
    await this.modulars.elements.jsClick(
      this.loginButton,
      "Login",
      "clickLoginButton",
    );
  }

  /**
   * Signs in to the account with the given email and password.
   * If the remember parameter is true, the remember me checkbox will be checked.
   * If the remember parameter is false, the remember me checkbox will be unchecked.
   * Waits for the login button to be visible, then clicks on it.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {string} email - The email to sign in with.
   * @param {string} password - The password to sign in with.
   * @param {boolean} remember - Whether to toggle the remember me checkbox. Defaults to false.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  private async signIn(
    email: string,
    password: string,
    remember: boolean,
  ): Promise<void> {
    await this.fillEmailInput(email);
    await this.fillPasswordInput(password);
    await this.toggleRememberMe(remember);
    await this.clickLoginButton();
    await this.verifySuccessfulLogin();
  }

  /**
   * Verifies that the successful login page is opened.
   * Waits for the Dashboard header to be visible.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  private async verifySuccessfulLogin(): Promise<void> {
    await this.modulars.assertions.assertElementState(
      this.dashBoardHeader,
      "visible",
      "Dashboard Header",
      "verifySuccessfulLogin",
    );
  }

  /**
   * Signs in to the account with the given email and password, and saves the customer data to the storage.
   * If the remember parameter is true, the remember me checkbox will be checked.
   * If the remember parameter is false, the remember me checkbox will be unchecked.
   * @param {string} email - The email to sign in with.
   * @param {string} password - The password to sign in with.
   * @param {boolean} remember - Whether to toggle the remember me checkbox. Defaults to false.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async customerLogin(
    email: string,
    password: string,
    remember: boolean = false,
  ): Promise<void> {
    await this.signIn(email, password, remember);
    await this.page.context().storageState({ path: "storage/customer.json" });
    logger.info("Customer logged in successfully");
  }

  /**
   * Signs in to the agent account with the given email and password, and saves the agent data to the storage.
   * If the remember parameter is true, the remember me checkbox will be checked.
   * If the remember parameter is false, the remember me checkbox will be unchecked.
   * @param {string} email - The email to sign in with.
   * @param {string} password - The password to sign in with.
   * @param {boolean} remember - Whether to toggle the remember me checkbox. Defaults to false.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async agentLogin(
    email: string,
    password: string,
    remember: boolean = false,
  ): Promise<void> {
    await this.signIn(email, password, remember);
    await this.page.context().storageState({ path: "storage/agent.json" });
    logger.info("Agent logged in successfully");
  }

  /**
   * Signs in to the admin account with the given email and password, and saves the admin data to the storage.
   * If the remember parameter is true, the remember me checkbox will be checked.
   * If the remember parameter is false, the remember me checkbox will be unchecked.
   * @param {string} email - The email to sign in with.
   * @param {string} password - The password to sign in with.
   * @param {boolean} [remember=false] - Whether to toggle the remember me checkbox.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async adminLogin(
    email: string,
    password: string,
    remember: boolean = false,
  ): Promise<void> {
    await this.signIn(email, password, remember);
    await this.page.context().storageState({ path: "storage/admin.json" });
    logger.info("Admin logged in successfully");
  }

  /**
   * Clicks the logout button.
   * Waits for the logout button to be visible, then clicks on it.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  private async clickLogoutButton(): Promise<void> {
    await this.modulars.elements.jsClick(
      this.logoutButton,
      "Logout",
      "clickLogoutButton",
    );
  }

  /**
   * Logs out of the currently logged in account.
   * First, it hovers over the logged in user button to reveal the logout button.
   * Then, it clicks on the logout button to log out of the account.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async logout(): Promise<void> {
    await this.modulars.elements.hoverElement(
      this.loggedInUserButton,
      "Logged In User Button",
      "logout",
    );
    await this.clickLogoutButton();
    await this.modulars.assertions.assertElementState(
      this.loginButton,
      "visible",
      "Login Button",
      "logout",
    );
    logger.info("Logged out successfully");
  }
}
