import { test } from "../../../src/main/fixtures/fixture";
import { logger } from "../../main/utils/logger/logger";

test.describe("Home Page @regression", () => {
  test("Verify Home Page is loaded", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyPageLoaded();
    logger.info("Assertion Passed -Home Page is loaded");
  });

  test("Verify header navigation links are present", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyThatHeaderNavLinksAreVisible();
    logger.info("Assertion Passed - Header navigation links are present");
  });

  test("Verify navigation to visa booking page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToVisaBookingPage();
    logger.info(
      "Assertion Passed - Navigation to visa booking page is successful",
    );
  });

  test("Verify navigation to tours booking page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToToursBooking();
    logger.info(
      "Assertion Passed - Navigation to tours booking page is successful",
    );
  });

  test("Verify navigation to cars booking page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToCarsBooking();
    logger.info(
      "Assertion Passed - Navigation to cars booking page is successful",
    );
  });

  test("Verify navigation to flight booking page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToFlightsBooking();
    logger.info(
      "Assertion Passed - Navigation to flight booking page is successful",
    );
  });

  test("Verify navigation to stays booking page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToStaysBooking();
    logger.info(
      "Assertion Passed - Navigation to stays booking page is successful",
    );
  });

  test("Verify navigation to contact us page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToContactUsPage();
    logger.info(
      "Assertion Passed - Navigation to contact us page is successful",
    );
  });

  test("Verify navigation to about us page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToAboutUsPage();
    logger.info("Assertion Passed - Navigation to about us page is successful");
  });

  test("Verify navigation to cookies policy page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToCookiesPolicyPage();
    logger.info(
      "Assertion Passed - Navigation to cookies policy page is successful",
    );
  });

  test("Verify navigation to privacy policy page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToPrivacyPolicyPage();
    logger.info(
      "Assertion Passed - Navigation to privacy policy page is successful",
    );
  });

  test("Verify navigation to become a supplier page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToBecomeASupplierPage();
    logger.info(
      "Assertion Passed - Navigation to become a supplier page is successful",
    );
  });

  test("Verify navigation to terms of use page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToTermsOfUsePage();
    logger.info(
      "Assertion Passed - Navigation to terms of use page is successful",
    );
  });

  test("Should verify navigation to blogs page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToBlogsPage();
    logger.info("Assertion Passed - Navigation to blogs page is successful");
  });

  test("Should verify language change", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyLanguageChange("Russian");
    logger.info("Assertion Passed - Language change is successful");
  });

  test("Should verify currency change", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyCurrencyChange("NGN");
    logger.info("Assertion Passed - Currency change is successful");
  });

  test("Should verify navigation to login page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToLoginPage();
    logger.info("Assertion Passed - Navigation to login page is successful");
  });

  test("Should verify navigation to customer signup page", async ({
    homePage,
  }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToCustomerSignupPage();
    logger.info(
      "Assertion Passed - Navigation to customer signup page is successful",
    );
  });

  test("Should verify navigation to agent signup page", async ({
    homePage,
  }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToAgentSignupPage();
    logger.info(
      "Assertion Passed - Navigation to agent signup page is successful",
    );
  });

  test("Should verify all quick search tabs are visible", async ({
    homePage,
  }) => {
    await homePage.loadThePage();
    await homePage.verifyAllQuickSearchTabsAreVisible();
    logger.info("Assertion Passed - All quick search tabs are visible");
  });

  test("Should verify featured properties section", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyFeaturedPropertiesSection();
    logger.info(
      "Assertion Passed - Featured properties section is displayed correctly",
    );
  });

  test("Should verify navigation to featured flight booking page", async ({
    homePage,
  }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToFeaturedFlightsPage();
    logger.info(
      "Assertion Passed - Navigation to featured flight booking page is successful",
    );
  });

  test("Should verify popular tours section", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyPopularTowersSection();
    logger.info(
      "Assertion Passed - Popular tours section is displayed correctly",
    );
  });

  test("Should verify featured cars section", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyFeaturedCarsSection();
    logger.info(
      "Assertion Passed - Featured cars section is displayed correctly",
    );
  });

  test("Should verify navigation to download app page", async ({
    homePage,
  }) => {
    await homePage.loadThePage();
    await homePage.verifyDownloadAppSection();
    logger.info(
      "Assertion Passed - Navigation to download app page is successful",
    );
  });

  test("Should navigate to affiliate program page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToAffiliateProgramPage();
    logger.info(
      "Assertion Passed - Navigation to affiliate program page is successful",
    );
  });

  test("Should navigate to investors page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToInvestorsPage();
    logger.info(
      "Assertion Passed - Navigation to investors page is successful",
    );
  });

  test("Should navigate to careers page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToCareersAndJobsPage();
    logger.info(
      "Assertion Passed - Navigation to careers page is successful",
    );
  });

  test("Should navigate to how to book page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToHowToBookPage();
    logger.info(
      "Assertion Passed - Navigation to how to book page is successful",
    );
  });

  test("Should navigate to how to file a claim page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToFileAClaimPage();
    logger.info(
      "Assertion Passed - Navigation to how to file a claim page is successful",
    );
  });

  test("Should navigate to refund policy page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToRefundPolicyPage();
    logger.info(
      "Assertion Passed - Navigation to refund policy page is successful",
    );
  });

  test("Should navigate to best travel deals page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToBestTravelDealsPage();
    logger.info(
      "Assertion Passed - Navigation to best travel deals page is successful",
    );
  });

  test("Should navigate to travel documents page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToTravelDocumentsPage();
    logger.info(
      "Assertion Passed - Navigation to travel documents page is successful",
    );
  });

  test("Should navigate to travel insurance page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToTravelInsurancePage();
    logger.info(
      "Assertion Passed - Navigation to travel insurance page is successful",
    );
  });

  test("Should navigate to disruptions page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToDisruptionsPage();
    logger.info(
      "Assertion Passed - Navigation to disruptions page is successful",
    );
  });

  test("Should navigate to FAQ page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToFAQPage();
    logger.info(
      "Assertion Passed - Navigation to FAQ page is successful",
    );
  });

  test("Should navigate to accessibility page", async ({ homePage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToAccessibilityPage();
    logger.info(
      "Assertion Passed - Navigation to accessibility page is successful",
    );
  });

});
