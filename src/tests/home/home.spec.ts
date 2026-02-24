import {test} from "../../../src/main/fixtures/fixture";
import {logger} from "../../main/utils/logger/logger";

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
});