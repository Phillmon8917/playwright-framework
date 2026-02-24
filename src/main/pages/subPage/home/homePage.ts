import { HomeBasePage } from "./homeBasePage";
import { expect } from "@playwright/test";

export class HomePage extends HomeBasePage {

  /**
   * Loads the home page.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async loadThePage(): Promise<void> {
    await this.modulars.browser.loadThePage();
  }

/**
 * Verifies that the home page is loaded by checking the title of the page.
 * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
 * @throws {Error} - If the operation fails.
 */
  public async verifyPageLoaded(): Promise<void> {
    const title = await this.modulars.browser.getTitle();
    expect(title).toBe("PHPTRAVELS");
  }

/**
 * Verifies that all the header navigation links are visible.
 * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
 * @throws {Error} - If the operation fails.
 */
  public async verifyThatHeaderNavLinksAreVisible(): Promise<void> {
    await this.modulars.assertions.assertElementState(this.servicesButton, "visible", "Services", "verifyThatAllNavLinksArePresent");
    await this.modulars.assertions.assertElementState(this.companyButton, "visible", "Company", "verifyThatAllNavLinksArePresent");
    await this.modulars.assertions.assertElementState(this.blogNavLink, "visible", "Blogs", "verifyThatAllNavLinksArePresent");
    await this.modulars.assertions.assertElementState(this.languageButton, "visible", "Language", "verifyThatAllNavLinksArePresent");
    await this.modulars.assertions.assertElementState(this.currencyButton, "visible", "Currency", "verifyThatAllNavLinksArePresent");
    await this.modulars.assertions.assertElementState(this.loginButton, "visible", "Login", "verifyThatAllNavLinksArePresent");
    await this.modulars.assertions.assertElementState(this.signupButton, "visible", "Signup", "verifyThatAllNavLinksArePresent");
  }
}
