import { ValidationHelper } from "../../../utils/validation/validationHelper";
import { CustomerSignupOptions } from "./customerSignup.type";
import { CustomerSignupBasePage } from "./customerSignupBasePage";

export class CustomerSignupPage extends CustomerSignupBasePage {
  /**
   * Fills the First Name input field with the given first name.
   * Waits for the element to be visible, then fills it with the given first name.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {string} firstName - The first name to be filled in the First Name input field.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  private async fillFirstNameInput(firstName: string): Promise<void> {
    await this.modulars.elements.fillTheElement(
      this.firstNameInput,
      firstName,
      "First Name",
      "fillFirstNameInput",
    );
  }

  /**
   * Fills the Last Name input field with the given last name.
   * Waits for the element to be visible, then fills it with the given last name.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {string} lastName - The last name to be filled in the Last Name input field.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  private async fillLastNameInput(lastName: string): Promise<void> {
    await this.modulars.elements.fillTheElement(
      this.lastNameInput,
      lastName,
      "Last Name",
      "fillLastNameInput",
    );
  }

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
    );
  }

  /**
   * Fills the Confirm Password input field with the given password.
   * Waits for the element to be visible, then fills it with the given password.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {string} password - The password to be filled in the Confirm Password input field.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  private async fillConfirmPasswordInput(password: string): Promise<void> {
    await this.modulars.elements.fillTheElement(
      this.confirmPasswordInput,
      password,
      "Confirm Password",
      "fillConfirmPasswordInput",
    );
  }

  /**
   * Fills the Security Check Answer input field with the given answer.
   * Waits for the element to be visible, then fills it with the given answer.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {string} answer - The answer to be filled in the Security Check Answer input field.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  private async fillSecurityCheckAnswerInput(answer: string): Promise<void> {
    await this.modulars.elements.fillTheElement(
      this.securityCheckAnswerInput,
      answer,
      "Security Check Answer",
      "fillSecurityCheckAnswerInput",
    );
  }

  /**
   * Extracts the text content of the Security Check Question element.
   * Waits for the element to be visible, then extracts its text content.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<string>} - A promise which resolves with the text content of the Security Check Question element if the operation is successful, and rejects with an error if the operation fails.
   */
  public async extractSecurityCheckQuestion(): Promise<string> {
    const securityCheckQuestion = await this.modulars.elements.getText(
      this.securityCheckQuestion,
      "Security Check Question",
      "extractSecurityCheckQuestion",
    );

    return securityCheckQuestion || "";
  }

  /**
   * Agrees to the terms of the customer signup page.
   * If the given agreeToTerms parameter is true, the terms checkbox will be checked.
   * If the given agreeToTerms parameter is false, the terms checkbox will be unchecked.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {boolean} agreeToTerms - Whether to agree to the terms of the customer signup page.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  private async agreeToTerms(agreeToTerms: boolean): Promise<void> {
    if (agreeToTerms) {
      await this.modulars.elements.jsClick(this.agreeToTermsCheckbox, "Agree to Terms", "agreeToTerms");
    }
  }

  /**
   * Clicks the Create Account button on the customer signup page.
   * Waits for the Create Account button to be visible, then clicks on it.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  private async clickCreateAccountButton(): Promise<void> {
    await this.modulars.elements.jsClick(
      this.createAccountButton,
      "Create Account",
      "clickCreateAccountButton",
    );
  }

  /**
   * Fills the customer signup form with the given options.
   * If the given options object contains a property for a field, the corresponding field will be filled with the given value.
   * If the given options object contains the expectValidationErrors property set to true, the Create Account button will be clicked and the validation message will be extracted.
   * If the given options object does not contain the expectValidationErrors property or it is set to false, the Create Account button will be clicked and the network request will be asserted with a status code of 200.
   * @param {CustomerSignupOptions} option - The options object containing the values to be filled in the customer signup form.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async fillCustomerSignUpForm(
    option: CustomerSignupOptions,
  ): Promise<void> {
    if (option.firstName) {
      await this.fillFirstNameInput(option.firstName);
    }
    if (option.lastName) {
      await this.fillLastNameInput(option.lastName);
    }
    if (option.email) {
      await this.fillEmailInput(option.email);
    }
    if (option.password) {
      await this.fillPasswordInput(option.password);
    }
    if (option.confirmPassword) {
      await this.fillConfirmPasswordInput(option.confirmPassword);
    }
    if (option.securityCheck) {
      await this.fillSecurityCheckAnswerInput(option.securityCheck);
    }
    if (option.agreeToTerms) {
      await this.agreeToTerms(option.agreeToTerms);
    }

    if (option.expectValidationErrors) {
      await this.clickCreateAccountButton();
      const validationMessage = await ValidationHelper.getValidationMessage(this.page, option.fieldId);
      await this.modulars.assertions.assertNotNullOrEmptyVar(validationMessage, "Validation Message", "fillCustomerSignUpForm");
    } else {
      await this.modulars.network.assertNetworkRequest(
        "https://phptravels.net/login",
        200,
        () => this.clickCreateAccountButton(),
        "GET",
        "Create Account",
        "fillCustomerSignUpForm",
      );
    }
  }

  /**
   * Verifies that the backend validation errors are hidden.
   * Asserts that the backend error message element is hidden.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   */
  public async verifyBackendValidationErrorsAreHidden(): Promise<void> {
    await this.modulars.assertions.assertElementState(this.backendErrorMessage, "hidden", "Backend Error Message", "verifyBackendValidationErrorsAreHidden");
  }
}
