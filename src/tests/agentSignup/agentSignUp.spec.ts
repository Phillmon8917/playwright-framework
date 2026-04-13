import { test } from "../../../src/main/fixtures/fixture.ts";
import { ai } from "@zerostep/playwright";
import { FakerHelper } from "../../main/utils/faker/fakerHelper.ts";
import { logger } from "../../main/utils/logger/logger.ts";

test.describe("Agent Signup Page @regression @guest", () => {

  test("Verify successful customer signup", {tag: "@sanity"}, async ({
    homePage,
    signupPage,
    page,
  }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToAgentSignupPage();
    const securityCheckQuestion =
      await signupPage.extractSecurityCheckQuestion();
    logger.info("Security check question is: " + securityCheckQuestion);
    const securityCheckAnswer = await ai(
      `Answer this math question with only a number: ${securityCheckQuestion}`,
      { page, test },
    );

    logger.info("Security check answer is: " + securityCheckAnswer);
    const generatedPassword = FakerHelper.generatePassword(8);
    await signupPage.fillTheSignUpForm({
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
    await signupPage.verifyBackendValidationErrorsAreHidden();
    logger.info("Assertion Passed - Customer signup is successful");
  });

  test("Verify firstName input validation", {tag: "@sanity"}, async ({
    homePage,
    signupPage,
  }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToAgentSignupPage();
    await signupPage.fillTheSignUpForm({
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
    signupPage,
  }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToAgentSignupPage();
    await signupPage.fillTheSignUpForm({
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
    signupPage,
  }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToAgentSignupPage();
    await signupPage.fillTheSignUpForm({
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

  test("Verify password input validation", {tag: "@sanity"}, async ({
    homePage,
    signupPage,
  }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToAgentSignupPage();
    await signupPage.fillTheSignUpForm({
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
    signupPage,
  }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToAgentSignupPage();
    await signupPage.fillTheSignUpForm({
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
