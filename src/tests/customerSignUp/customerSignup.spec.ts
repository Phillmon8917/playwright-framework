import { test } from "../../../src/main/fixtures/fixture";
import { ai } from "@zerostep/playwright";
import { FakerHelper } from "../../main/utils/faker/fakerHelper";
import { logger } from "../../main/utils/logger/logger";

test.describe("Customer Signup Page @regression", () => {
  test("Verify successful customer signup", async ({
    homePage,
    customerSignupPage,
    page,
  }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToCustomerSignupPage();
    const securityCheckQuestion =
      await customerSignupPage.extractSecurityCheckQuestion();
    logger.info("Security check question is: " + securityCheckQuestion);
    const securityCheckAnswer = await ai(
      `Answer this math question with only a number: ${securityCheckQuestion}`,
      { page, test },
    );

    logger.info("Security check answer is: " + securityCheckAnswer);
    const generatedPassword = FakerHelper.generatePassword(8);
    await customerSignupPage.fillCustomerSignUpForm({
      firstName: FakerHelper.generateFirstName(),
      lastName: FakerHelper.generateLastName(),
      email: FakerHelper.generateEmail(),
      password: generatedPassword,
      confirmPassword: generatedPassword,
      securityCheck: securityCheckAnswer,
      agreeToTerms: true,
      expectValidationErrors: false,
      fieldId: "",
    });
    await customerSignupPage.verifyBackendValidationErrorsAreHidden();
    logger.info("Assertion Passed - Customer signup is successful");
  });

  test("Verify firstName input validation", async ({
    homePage,
    customerSignupPage,
  }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToCustomerSignupPage();
    await customerSignupPage.fillCustomerSignUpForm({
      firstName: "",
      lastName: FakerHelper.generateLastName(),
      email: FakerHelper.generateEmail(),
      password: FakerHelper.generatePassword(8),
      confirmPassword: FakerHelper.generatePassword(8),
      agreeToTerms: true,
      expectValidationErrors: true,
      fieldId: "first_name",
    });
    logger.info("Assertion Passed - First name input validation is successful");
  });

  test("Verify lastName input validation", async ({
    homePage,
    customerSignupPage,
  }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToCustomerSignupPage();
    await customerSignupPage.fillCustomerSignUpForm({
      firstName: FakerHelper.generateFirstName(),
      lastName: "",
      email: FakerHelper.generateEmail(),
      password: FakerHelper.generatePassword(8),
      confirmPassword: FakerHelper.generatePassword(8),
      agreeToTerms: true,
      expectValidationErrors: true,
      fieldId: "last_name",
    });
    logger.info("Assertion Passed - Last name input validation is successful");
  });

  test("Verify email input validation", async ({
    homePage,
    customerSignupPage,
  }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToCustomerSignupPage();
    await customerSignupPage.fillCustomerSignUpForm({
      firstName: FakerHelper.generateFirstName(),
      lastName: FakerHelper.generateLastName(),
      email: "",
      password: FakerHelper.generatePassword(8),
      confirmPassword: FakerHelper.generatePassword(8),
      agreeToTerms: true,
      expectValidationErrors: true,
      fieldId: "email",
    });
    logger.info("Assertion Passed - Email input validation is successful");
  });

  test("Verify password input validation", async ({
    homePage,
    customerSignupPage,
  }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToCustomerSignupPage();
    await customerSignupPage.fillCustomerSignUpForm({
      firstName: FakerHelper.generateFirstName(),
      lastName: FakerHelper.generateLastName(),
      email: FakerHelper.generateEmail(),
      password: "",
      confirmPassword: FakerHelper.generatePassword(8),
      agreeToTerms: true,
      expectValidationErrors: true,
      fieldId: "password",
    });
    logger.info("Assertion Passed - Password input validation is successful");
  });

   test("Verify confirm password input validation", async ({
    homePage,
    customerSignupPage,
  }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToCustomerSignupPage();
    await customerSignupPage.fillCustomerSignUpForm({
      firstName: FakerHelper.generateFirstName(),
      lastName: FakerHelper.generateLastName(),
      email: FakerHelper.generateEmail(),
      password: FakerHelper.generatePassword(8),
      confirmPassword: "",
      agreeToTerms: true,
      expectValidationErrors: true,
      fieldId: "confirm_password",
    });
    logger.info("Assertion Passed - Confirm password input validation is successful");
  });
});
