import { test as setup } from "../../main/fixtures/fixture.ts";
import { CredentialsProvider } from "../../main/utils/credentialsProvider/credentialsProvider.utils.ts";
import { logger } from "../../main/utils/logger/logger.ts";

setup.describe("Customer Authentication Tests", () => {
  setup("Agent Login Test", async ({ homePage, loginPage }) => {
    await homePage.loadThePage();
    await homePage.verifyNavigationToLoginPage();
    const credentials = CredentialsProvider.getCredentials("customer");
    await loginPage.agentLogin(credentials[0], credentials[1], true);
    logger.info("Customer login test passed");
  });
});
