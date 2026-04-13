import { test as setup} from "../../main/fixtures/fixture.ts";
import { CredentialsProvider } from "../../main/utils/credentialsProvider/credentialsProvider.utils.ts";
import {logger } from "../../main/utils/logger/logger.ts";

setup.describe("Authentication Tests", () => {
    setup("Customer Login Test", async ({ 
        homePage, 
        loginPage 
    }) => {
        await homePage.loadThePage();
        await homePage.verifyNavigationToLoginPage();
        const credentials = CredentialsProvider.getCredentials("customer");
        await loginPage.customerLogin(credentials[0], credentials[1], true);
        logger.info("Customer login test passed");
    });

    setup("Agent Login Test", async ({ 
        homePage, 
        loginPage 
    }) => {
        await homePage.loadThePage();
        await homePage.verifyNavigationToLoginPage();
        const credentials = CredentialsProvider.getCredentials("agent");
        await loginPage.agentLogin(credentials[0], credentials[1], true);
        logger.info("Agent login test passed");
    });

    setup("Admin Login Test", async ({ 
        homePage, 
        loginPage 
    }) => {
        await homePage.loadThePage();
        await homePage.verifyNavigationToLoginPage();
        const credentials = CredentialsProvider.getCredentials("admin");
        await loginPage.adminLogin(credentials[0], credentials[1], true);
        logger.info("Admin login test passed"); 
    });
});