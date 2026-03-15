import { logger } from "../../../utils/logger/logger";
import { HomeBasePage } from "./homeBasePage";

export class HomePage extends HomeBasePage {
  /**
   * Loads the home page.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async loadThePage(): Promise<void> {
    await this.modulars.browser.loadThePage(this.page);
    await this.modulars.browser.waitForPageLoaderToDisappear("LoadThePage");
  }

  /**
   * Verifies that the home page is loaded by checking the title of the page.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyPageLoaded(): Promise<void> {
    await this.modulars.assertions.assertElementState(
      this.logo,
      "visible",
      "Logo",
      "verifyPageLoaded",
    );
  }

  /**
   * Verifies that all the header navigation links are visible.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyThatHeaderNavLinksAreVisible(): Promise<void> {
    await this.modulars.assertions.assertElementState(
      this.servicesButton,
      "visible",
      "Services",
      "verifyThatAllNavLinksArePresent",
    );
    await this.modulars.assertions.assertElementState(
      this.companyButton,
      "visible",
      "Company",
      "verifyThatAllNavLinksArePresent",
    );
    await this.modulars.assertions.assertElementState(
      this.blogsNavLink,
      "visible",
      "Blogs",
      "verifyThatAllNavLinksArePresent",
    );
    await this.modulars.assertions.assertElementState(
      this.languageButton,
      "visible",
      "Language",
      "verifyThatAllNavLinksArePresent",
    );
    await this.modulars.assertions.assertElementState(
      this.currencyButton,
      "visible",
      "Currency",
      "verifyThatAllNavLinksArePresent",
    );
    await this.modulars.assertions.assertElementState(
      this.loginButton,
      "visible",
      "Login",
      "verifyThatAllNavLinksArePresent",
    );
    await this.modulars.assertions.assertElementState(
      this.signupButton,
      "visible",
      "Signup",
      "verifyThatAllNavLinksArePresent",
    );
  }

  /**
   * Verifies that the visa booking page is navigated to successfully.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToVisaBookingPage(): Promise<void> {
    await this.modulars.elements.clickElement(
      this.servicesButton,
      "Services",
      "verifyNavigationToVisaBookingPage",
    );
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/visa",
      200,
      () =>
        this.modulars.elements.clickElement(
          this.visaBookingNavLink,
          "Visa Booking",
          "verifyNavigationToVisaBookingPage",
        ),
      "GET",
      "Visa Booking Page",
      "verifyNavigationToVisaBookingPage",
    );
  }

  /**
   * Verifies that the tours booking page is navigated to successfully.
   * This test hovers over the services button, waits for the tours booking link to be visible, then clicks on it and waits for the network request to complete with a status code of 200.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToToursBooking(): Promise<void> {
    await this.modulars.elements.hoverElement(
      this.servicesButton,
      "Services",
      "verifyNavigationToToursBooking",
    );
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/tours",
      200,
      () =>
        this.modulars.elements.clickElement(
          this.toursBookingNavLink,
          "Tours",
          "verifyNavigationToToursBooking",
        ),
      "GET",
      "Tours Page",
      "verifyNavigationToToursBooking",
    );
  }

  /**
   * Verifies that the cars booking page is navigated to successfully.
   * This test hovers over the services button, waits for the cars booking link to be visible, then clicks on it and waits for the network request to complete with a status code of 200.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToCarsBooking(): Promise<void> {
    await this.modulars.elements.hoverElement(
      this.servicesButton,
      "Services",
      "verifyNavigationToCarsBooking",
    );
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/cars",
      200,
      () =>
        this.modulars.elements.clickElement(
          this.carsBookingNavLink,
          "Cars",
          "verifyNavigationToCarsBooking",
        ),
      "GET",
      "Cars Page",
      "verifyNavigationToCarsBooking",
    );
  }

  /**
   * Verifies that the flights booking page is navigated to successfully.
   * This test hovers over the services button, waits for the flights booking link to be visible, then clicks on it and waits for the network request to complete with a status code of 200.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToFlightsBooking(): Promise<void> {
    await this.modulars.elements.hoverElement(
      this.servicesButton,
      "Services",
      "verifyNavigationToFlightsBooking",
    );
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/flights",
      200,
      () =>
        this.modulars.elements.clickElement(
          this.flightsBookingNavLink,
          "Flights",
          "verifyNavigationToFlightsBooking",
        ),
      "GET",
      "Flights Page",
      "verifyNavigationToFlightsBooking",
    );
  }

  /**
   * Verifies that the stays booking page is navigated to successfully.
   * This test hovers over the services button, waits for the stays booking link to be visible, then clicks on it and waits for the network request to complete with a status code of 200.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToStaysBooking(): Promise<void> {
    await this.modulars.elements.hoverElement(
      this.servicesButton,
      "Services",
      "verifyNavigationToStaysBooking",
    );
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/stays",
      200,
      () =>
        this.modulars.elements.clickElement(
          this.staysBookingNavLink,
          "Stays",
          "verifyNavigationToStaysBooking",
        ),
      "GET",
      "Stays Page",
      "verifyNavigationToStaysBooking",
    );
  }

  /**
   * Verifies that the contact us page is navigated to successfully.
   * This test hovers over the company button, waits for the contact us link to be visible, then clicks on it and waits for the network request to complete with a status code of 200.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToContactUsPage(): Promise<void> {
    await this.modulars.elements.hoverElement(
      this.companyButton,
      "Company",
      "verifyNavigationToContactUsPage",
    );
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/page/contact-us",
      200,
      () =>
        this.modulars.elements.clickElement(
          this.contactUsNavLink,
          "Contact Us",
          "verifyNavigationToContactUsPage",
        ),
      "GET",
      "Contact Us Page",
      "verifyNavigationToContactUsPage",
    );
    await this.modulars.assertions.assertElementState(
      this.contactUsHeader,
      "visible",
      "Contact Us Header",
      "verifyNavigationToContactUsPage",
    );
    logger.info("Contact Us Page is opened successfully");
  }

  /**
   * Verifies that the about us page is navigated to successfully.
   * This test hovers over the company button, waits for the about us link to be visible, then clicks on it and waits for the network request to complete with a status code of 200.
   * Asserts that the about us header is visible after the page is loaded.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToAboutUsPage(): Promise<void> {
    await this.modulars.elements.hoverElement(
      this.companyButton,
      "Company",
      "verifyNavigationToAboutUsPage",
    );
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/page/about-us",
      200,
      () =>
        this.modulars.elements.clickElement(
          this.aboutUsNavLink,
          "About Us",
          "verifyNavigationToAboutUsPage",
        ),
      "GET",
      "About Us Page",
      "verifyNavigationToAboutUsPage",
    );

    await this.modulars.assertions.assertElementState(
      this.aboutUsHeader,
      "visible",
      "About Us Header",
      "verifyNavigationToAboutUsPage",
    );
    logger.info("About Us Page is opened successfully");
  }

  /**
   * Verifies that the cookies policy page is navigated to successfully.
   * This test hovers over the company button, waits for the cookies policy link to be visible, then clicks on it and waits for the network request to complete with a status code of 200.
   * Asserts that the cookies policy header is visible after the page is loaded.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToCookiesPolicyPage(): Promise<void> {
    await this.modulars.elements.hoverElement(
      this.companyButton,
      "Company",
      "verifyNavigationToCookiesPolicyPage",
    );
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/page/cookies-policy",
      200,
      () =>
        this.modulars.elements.clickElement(
          this.cookiesPolicyNavLink,
          "Cookies Policy",
          "verifyNavigationToCookiesPolicyPage",
        ),
      "GET",
      "Cookies Policy Page",
      "verifyNavigationToCookiesPolicyPage",
    );

    await this.modulars.assertions.assertElementState(
      this.cookiesPolicyHeader,
      "visible",
      "Cookies Policy Header",
      "verifyNavigationToCookiesPolicyPage",
    );
    logger.info("Cookies Policy Page is opened successfully");
  }

  /**
   * Verifies that the privacy policy page is navigated to successfully.
   * This test hovers over the company button, waits for the privacy policy link to be visible, then clicks on it and waits for the network request to complete with a status code of 200.
   * Asserts that the privacy policy header is visible after the page is loaded.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToPrivacyPolicyPage(): Promise<void> {
    await this.modulars.elements.hoverElement(
      this.companyButton,
      "Company",
      "verifyNavigationToPrivacyPolicyPage",
    );
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/page/privacy-policy",
      200,
      () =>
        this.modulars.elements.clickElement(
          this.privacyPolicyNavLink,
          "Privacy Policy",
          "verifyNavigationToPrivacyPolicyPage",
        ),
      "GET",
      "Privacy Policy Page",
      "verifyNavigationToPrivacyPolicyPage",
    );

    await this.modulars.assertions.assertElementState(
      this.privacyPolicyHeader,
      "visible",
      "Privacy Policy Header",
      "verifyNavigationToPrivacyPolicyPage",
    );
    logger.info("Privacy Policy Page is opened successfully");
  }

  /**
   * Verifies that the become a supplier page is navigated to successfully.
   * This test hovers over the company button, waits for the become a supplier link to be visible, then clicks on it and waits for the network request to complete with a status code of 200.
   * Asserts that the become a supplier header is visible after the page is loaded.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToBecomeASupplierPage(): Promise<void> {
    await this.modulars.elements.hoverElement(
      this.companyButton,
      "Company",
      "verifyNavigationToBecomeASupplierPage",
    );
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/page/become-a-supplier",
      200,
      () =>
        this.modulars.elements.clickElement(
          this.becomeASupplierNavLink,
          "Become A Supplier",
          "verifyNavigationToBecomeASupplierPage",
        ),
      "GET",
      "Become A Supplier Page",
      "verifyNavigationToBecomeASupplierPage",
    );

    await this.modulars.assertions.assertElementState(
      this.becomeASupplierHeader,
      "visible",
      "Become A Supplier Header",
      "verifyNavigationToBecomeASupplierPage",
    );
    logger.info("Become A Supplier Page is opened successfully");
  }

  /**
   * Verifies that the terms of use page is navigated to successfully.
   * This test hovers over the company button, waits for the terms of use link to be visible, then clicks on it and waits for the network request to complete with a status code of 200.
   * Asserts that the terms of use header is visible after the page is loaded.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToTermsOfUsePage(): Promise<void> {
    await this.modulars.elements.hoverElement(
      this.companyButton,
      "Company",
      "verifyNavigationToTermsOfUsePage",
    );
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/page/terms-of-use",
      200,
      () =>
        this.modulars.elements.clickElement(
          this.termsOfUseNavLink,
          "Terms Of Use",
          "verifyNavigationToTermsOfUsePage",
        ),
      "GET",
      "Terms Of Use Page",
      "verifyNavigationToTermsOfUsePage",
    );

    await this.modulars.assertions.assertElementState(
      this.termsOfUseHeader,
      "visible",
      "Terms Of Use Header",
      "verifyNavigationToTermsOfUsePage",
    );
    logger.info("Terms Of Use Page is opened successfully");
  }

  /**
   * Verifies that the blogs page is navigated to successfully.
   * This test waits for the blogs link to be visible, then clicks on it and waits for the network request to complete with a status code of 200.
   * Asserts that the blogs header is visible after the page is loaded.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToBlogsPage(): Promise<void> {
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/page/blog",
      200,
      () =>
        this.modulars.elements.jsClick(
          this.blogsNavLink,
          "Blogs",
          "verifyNavigationToBlogsPage",
        ),
      "GET",
      "Blogs Page",
      "verifyNavigationToBlogsPage",
    );

    await this.modulars.assertions.assertElementState(
      this.blogsHeader,
      "visible",
      "Blogs Header",
      "verifyNavigationToBlogsPage",
    );
    logger.info("Blogs Page is opened successfully");
  }

  /**
   * Verifies that the language change is successful.
   * This test waits for the language button to be visible, then clicks on it, waits for the language option to be visible, clicks on it and waits for the language button to have the new language text.
   * Asserts that the language button has the new language text after the page is loaded.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {string} language - The language to change to.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyLanguageChange(language: string): Promise<void> {
    await this.modulars.elements.clickElement(
      this.languageButton,
      "Language",
      "verifyLanguageChange",
    );
    await this.modulars.elements.jsClick(
      this.languageOption(language),
      language,
      "verifyLanguageChange",
    );

    await this.modulars.assertions.assertElementText(
      this.languageButton,
      language,
      "Language Button",
      "verifyLanguageChange",
      "contains",
    );
    logger.info(`Language is changed to ${language}`);
  }

  /**
   * Verifies that the currency change is successful.
   * This test waits for the currency button to be visible, then clicks on it, waits for the currency option to be visible, clicks on it and waits for the currency button to have the new currency text.
   * Asserts that the currency button has the new currency text after the page is loaded.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @param {string} currency - The currency to change to.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyCurrencyChange(currency: string): Promise<void> {
    await this.modulars.elements.clickElement(
      this.currencyButton,
      "Currency",
      "verifyCurrencyChange",
    );
    await this.modulars.elements.jsClick(
      this.currencyOption(currency),
      currency,
      "verifyCurrencyChange",
    );

    await this.modulars.assertions.assertElementText(
      this.currencyButton,
      currency,
      "Currency Button",
      "verifyCurrencyChange",
      "contains",
    );
    logger.info(`Currency is changed to ${currency}`);
  }

  /**
   * Verifies that the login page is navigated to successfully.
   * This test waits for the login button to be visible, then clicks on it and waits for the network request to complete with a status code of 200.
   * Asserts that the sign in to your account button is visible after the page is loaded.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToLoginPage(): Promise<void> {
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/login",
      200,
      () =>
        this.modulars.elements.jsClick(
          this.loginButton,
          "Login",
          "verifyNavigationToLoginPage",
        ),
      "GET",
      "Login Page",
      "verifyNavigationToLoginPage",
    );
    await this.modulars.assertions.assertElementState(
      this.signInToYourAccountButton,
      "visible",
      "Sign In To Your Account Button",
      "verifyNavigationToLoginPage",
    );
    logger.info("Login Page is opened successfully");
  }

  /**
   * Verifies that the customer signup page is navigated to successfully.
   * This test hovers over the signup button, waits for the customer signup link to be visible, then clicks on it and waits for the network request to complete with a status code of 200.
   * Asserts that the agent registration header is not visible after the page is loaded.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToCustomerSignupPage(): Promise<void> {
    await this.modulars.elements.hoverElement(
      this.signupButton,
      "Signup",
      "verifyNavigationToCustomerSignupPage",
    );
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/signup",
      200,
      () =>
        this.modulars.elements.jsClick(
          this.customerSignupButton,
          "Customer Signup",
          "verifyNavigationToCustomerSignupPage",
        ),
      "GET",
      "Customer Signup Page",
      "verifyNavigationToCustomerSignupPage",
    );

    await this.modulars.assertions.assertElementState(
      this.agentRegistrationHeader,
      "hidden",
      "Agent Registration Header",
      "verifyNavigationToCustomerSignupPage",
    );
    logger.info("Customer Signup Page is opened successfully");
  }

  /**
   * Verifies that the agent signup page is navigated to successfully.
   * This test hovers over the signup button, waits for the agent signup link to be visible, then clicks on it and waits for the network request to complete with a status code of 200.
   * Asserts that the agent registration header is visible after the page is loaded.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   **/
  public async verifyNavigationToAgentSignupPage(): Promise<void> {
    await this.modulars.elements.hoverElement(
      this.signupButton,
      "Signup",
      "verifyNavigationToAgentSignupPage",
    );
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/agent-signup",
      200,
      () =>
        this.modulars.elements.clickElement(
          this.agentSignupButton,
          "Agent Signup",
          "verifyNavigationToAgentSignupPage",
        ),
      "GET",
      "Agent Signup Page",
      "verifyNavigationToAgentSignupPage",
    );

    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/signup?type=agent",
      200,
      () =>
        this.modulars.elements.jsClick(
          this.agentSignupLink,
          "Agent Signup link",
          "verifyNavigationToAgentSignupPage",
        ),
      "GET",
      "Agent Signup Page",
      "verifyNavigationToAgentSignupPage",
    );

    await this.modulars.assertions.assertElementState(
      this.agentRegistrationHeader,
      "visible",
      "Agent Registration Header",
      "verifyNavigationToAgentSignupPage",
    );
    logger.info("Agent Signup Page is opened successfully");
  }

  /**
   * Verifies that all quick search tabs are visible.
   * This test clicks on each of the quick search tabs (Visa, Tours, Cars, Flights, Stays) and asserts that the corresponding search button is visible after each tab is clicked.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyAllQuickSearchTabsAreVisible(): Promise<void> {
    await this.modulars.elements.clickElement(
      this.visaQuickSearchTab,
      "Visa Quick Search Tab",
      "verifyAllQuickSearchTabsAreVisible",
    );
    await this.modulars.assertions.assertElementState(
      this.checkVisaSearchButton,
      "visible",
      "Check Visa Search Button",
      "verifyAllQuickSearchTabsAreVisible",
    );
    await this.modulars.elements.clickElement(
      this.toursQuickSearchTab,
      "Tours Quick Search Tab",
      "verifyAllQuickSearchTabsAreVisible",
    );
    await this.modulars.assertions.assertElementState(
      this.toursSearchButton,
      "visible",
      "Tours Search Button",
      "verifyAllQuickSearchTabsAreVisible",
    );
    await this.modulars.elements.clickElement(
      this.carsQuickSearchTab,
      "Cars Quick Search Tab",
      "verifyAllQuickSearchTabsAreVisible",
    );
    await this.modulars.assertions.assertElementState(
      this.carsSearchButton,
      "visible",
      "Cars Search Button",
      "verifyAllQuickSearchTabsAreVisible",
    );
    await this.modulars.elements.clickElement(
      this.flightsQuickSearchTab,
      "Flights Quick Search Tab",
      "verifyAllQuickSearchTabsAreVisible",
    );
    await this.modulars.assertions.assertElementState(
      this.flightsSearchButton,
      "visible",
      "Flights Search Button",
      "verifyAllQuickSearchTabsAreVisible",
    );
    await this.modulars.elements.clickElement(
      this.staysQuickSearchTab,
      "Stays Quick Search Tab",
      "verifyAllQuickSearchTabsAreVisible",
    );
    await this.modulars.assertions.assertElementState(
      this.staysSearchButton,
      "visible",
      "Stays Search Button",
      "verifyAllQuickSearchTabsAreVisible",
    );
  }

  /**
   * Verifies that the featured properties section is displayed correctly.
   * This test clicks on each of the featured property buttons (Barcelona, Lahore, Dubai, New York, Santorini, Tokyo, Maldives) and asserts that the corresponding corresponding badge is visible after each button is clicked.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyFeaturedPropertiesSection(): Promise<void> {
    await this.modulars.elements.jsClick(
      this.barcelonaFeaturedPropertyButton.first(),
      "Barcelona Featured Property Button",
      "verifyFeaturedPropertiesSection",
    );
    await this.modulars.assertions.assertElementState(
      this.barcelonaBadge.first(),
      "visible",
      "Barcelona Badge",
      "verifyFeaturedPropertiesSection",
    );
    await this.modulars.elements.jsClick(
      this.lahoreFeaturedPropertyButton,
      "Lahore Featured Property Button",
      "verifyFeaturedPropertiesSection",
    );
    await this.modulars.assertions.assertElementState(
      this.lahoreBadge.first(),
      "visible",
      "Lahore Badge",
      "verifyFeaturedPropertiesSection",
    );
    await this.modulars.elements.jsClick(
      this.dubaiFeaturedPropertyButton,
      "Dubai Featured Property Button",
      "verifyFeaturedPropertiesSection",
    );
    await this.modulars.assertions.assertElementState(
      this.dubaiBadge.first(),
      "visible",
      "Dubai Badge",
      "verifyFeaturedPropertiesSection",
    );
    await this.modulars.elements.jsClick(
      this.newYorkFeaturedPropertyButton,
      "New York Featured Property Button",
      "verifyFeaturedPropertiesSection",
    );
    await this.modulars.assertions.assertElementState(
      this.newYorkBadge.first(),
      "visible",
      "New York Badge",
      "verifyFeaturedPropertiesSection",
    );
    await this.modulars.elements.jsClick(
      this.santoriniFeaturedPropertyButton,
      "Santorini Featured Property Button",
      "verifyFeaturedPropertiesSection",
    );
    await this.modulars.assertions.assertElementState(
      this.santoriniBadge.first(),
      "visible",
      "Santorini Badge",
      "verifyFeaturedPropertiesSection",
    );
    await this.modulars.elements.jsClick(
      this.tokyoFeaturedPropertyButton,
      "Tokyo Featured Property Button",
      "verifyFeaturedPropertiesSection",
    );
    await this.modulars.assertions.assertElementState(
      this.tokyoBadge.first(),
      "visible",
      "Tokyo Badge",
      "verifyFeaturedPropertiesSection",
    );
    await this.modulars.elements.jsClick(
      this.maldivesFeaturedPropertyButton,
      "Maldives Featured Property Button",
      "verifyFeaturedPropertiesSection",
    );
    await this.modulars.assertions.assertElementState(
      this.maldivesBadge.first(),
      "visible",
      "Maldives Badge",
      "verifyFeaturedPropertiesSection",
    );
  }


  /**
   * Verifies that the popular tours section is displayed correctly.
   * This test clicks on each of the popular tours buttons (Paris, Dubai, Tokyo, Denpasar, New York) and asserts that the corresponding popular tours badge is visible after each button is clicked.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyPopularTowersSection(): Promise<void> {
    await this.modulars.elements.jsClick(
      this.parisPopularToursButton.nth(1),
      "Paris Popular Tours Button",
      "verifyPopularTowersSection",
    );
    await this.modulars.assertions.assertElementState(
      this.parisPopularToursBadge.first(),
      "visible",
      "Paris Popular Tours Badge",
      "verifyPopularTowersSection",
    );
    await this.modulars.elements.jsClick(
      this.dubaiPopularToursButton,
      "Dubai Popular Tours Button",
      "verifyPopularTowersSection",
    );
    await this.modulars.assertions.assertElementState(
      this.dubaiPopularToursBadge.first(),
      "visible",
      "Dubai Popular Tours Badge",
      "verifyPopularTowersSection",
    );
    await this.modulars.elements.jsClick(
      this.tokyoPopularToursButton,
      "Tokyo Popular Tours Button",
      "verifyPopularTowersSection",
    );
    await this.modulars.assertions.assertElementState(
      this.tokyoPopularToursBadge.first(),
      "visible",
      "Tokyo Popular Tours Badge",
      "verifyPopularTowersSection",
    );
    await this.modulars.elements.jsClick(
      this.denpasarPopularToursButton,
      "Denpasar Popular Tours Button",
      "verifyPopularTowersSection",
    );
    await this.modulars.assertions.assertElementState(
      this.denpasarPopularToursBadge.first(),
      "visible",
      "Denpasar Popular Tours Badge",
      "verifyPopularTowersSection",
    );
    await this.modulars.elements.jsClick(
      this.newYorkPopularToursButton,
      "New York Popular Tours Button",
      "verifyPopularTowersSection",
    );
    await this.modulars.assertions.assertElementState(
      this.newYorkPopularToursBadge.first(),
      "visible",
      "New York Popular Tours Badge",
      "verifyPopularTowersSection",
    );
  }

  /**
   * Verifies that the featured cars section is displayed correctly.
   * This test clicks on each of the featured cars buttons (Dubai, Dubai International Airport, Acarigua, Zanaga, Albuq, Barquisimeto, Beverly Springs) and asserts that the corresponding featured cars badge is visible after each button is clicked.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyFeaturedCarsSection(): Promise<void> {
    await this.modulars.elements.jsClick(
      this.dubaiCarsButton,
      "Dubai Cars Button",
      "verifyFeaturedCarsSection",
    );
    await this.modulars.assertions.assertElementState(
      this.dubaiCarsBadge.first(),
      "visible",
      "Dubai Cars Badge",
      "verifyFeaturedCarsSection",
    );
    await this.modulars.elements.jsClick(
      this.dubaiInternationalAirportButton,
      "Dubai International Airport Button",
      "verifyFeaturedCarsSection",
    );
    await this.modulars.assertions.assertElementState(
      this.dubaiInternationalAirportBadge.first(),
      "visible",
      "Dubai International Airport Badge",
      "verifyFeaturedCarsSection",
    );
    await this.modulars.elements.jsClick(
      this.acariguaCarsButton,
      "Acarigua Cars Button",
      "verifyFeaturedCarsSection",
    );
    await this.modulars.assertions.assertElementState(
      this.acariguaCarsBadge.first(),
      "visible",
      "Acarigua Cars Badge",
      "verifyFeaturedCarsSection",
    );
    await this.modulars.elements.jsClick(
      this.zanagaCarsButton,
      "Zanaga Cars Button",
      "verifyFeaturedCarsSection",
    );
    await this.modulars.assertions.assertElementState(
      this.zanagaCarsBadge.first(),
      "visible",
      "Zanaga Cars Badge",
      "verifyFeaturedCarsSection",
    );
    await this.modulars.elements.jsClick(
      this.albuqCarsButton,
      "Albuq Cars Button",
      "verifyFeaturedCarsSection",
    );
    await this.modulars.assertions.assertElementState(
      this.albuqCarsBadge.first(),
      "visible",
      "Albuq Cars Badge",
      "verifyFeaturedCarsSection",
    );
    await this.modulars.elements.jsClick(
      this.zanagaCarsButton,
      "Zanaga Cars Button",
      "verifyFeaturedCarsSection",
    );
    await this.modulars.assertions.assertElementState(
      this.zanagaCarsBadge.first(),
      "visible",
      "Zanaga Cars Badge",
      "verifyFeaturedCarsSection",
    );
    await this.modulars.elements.jsClick(
      this.alghaydahCarsButton,
      "Alghaydah Cars Button",
      "verifyFeaturedCarsSection",
    );
    await this.modulars.assertions.assertElementState(
      this.alghaydahCarsBadge.first(),
      "visible",
      "Alghaydah Cars Badge",
      "verifyFeaturedCarsSection",
    );
    await this.modulars.elements.jsClick(
      this.barquisimetoCarsButton,
      "Barquisimeto Cars Button",
      "verifyFeaturedCarsSection",
    );
    await this.modulars.assertions.assertElementState(
      this.barquisimetoCarsBadge.first(),
      "visible",
      "Barquisimeto Cars Badge",
      "verifyFeaturedCarsSection",
    );
    await this.modulars.elements.jsClick(
      this.beverleySpringsCarsButton,
      "Beverley Springs Cars Button",
      "verifyFeaturedCarsSection",
    );
    await this.modulars.assertions.assertElementState(
      this.beverleySpringsCarsBadge.first(),
      "visible",
      "Beverley Springs Cars Badge",
      "verifyFeaturedCarsSection",
    );
  }

  /**
   * Verifies that the download app section is displayed correctly.
   * This test clicks on the download app navigation link and asserts that the download app badge is visible after the link is clicked.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   * */
  public async verifyDownloadAppSection(): Promise<void> {
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/mobile-app",
      200,
      () =>
        this.modulars.elements.jsClick(
          this.downloadAppNavigationLink,
          "Download App Navigation Link",
          "verifyDownloadAppSection",
        ),
      "GET",
      "Download App Page",
      "verifyDownloadAppSection",
    );
  }

  /**
   * Verifies that the affiliate program page is navigated to successfully.
   * This test clicks on the affiliate program navigation link and waits for the network request to complete with a status code of 200.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToAffiliateProgramPage(): Promise<void> {
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/page/affiliate-program",
      200,
      () =>
        this.modulars.elements.jsClick(
          this.affiliateProgramNavLink,
          "Affiliate Program Navigation Link",
          "verifyNavigationToAffiliateProgramPage",
        ),
      "GET",
      "Affiliate Program Page",
      "verifyNavigationToAffiliateProgramPage",
    );
  }

  /**
   * Verifies that the investors page is navigated to successfully.
   * This test clicks on the investors navigation link and waits for the network request to complete with a status code of 200.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToInvestorsPage(): Promise<void> {
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/page/investors",
      200,
      () =>
        this.modulars.elements.jsClick(
          this.investorsNavLink,
          "Investors Navigation Link",
          "verifyNavigationToInvestorsPage",
        ),
      "GET",
      "Investors Page",
      "verifyNavigationToInvestorsPage",
    );
  }

  /**
   * Verifies that the careers and jobs page is navigated to successfully.
   * This test clicks on the careers and jobs navigation link and waits for the network request to complete with a status code of 200.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToCareersAndJobsPage(): Promise<void> {
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/page/careers-and-jobs",
      200,
      () => this.modulars.elements.jsClick(this.careersAndJobsNavLink, "Careers And Jobs Navigation Link", "verifyNavigationToCareersAndJobsPage"),
      "GET",
      "Careers And Jobs Page",
      "verifyNavigationToCareersAndJobsPage",
    );
  }

  /**
   * Verifies that the how to book page is navigated to successfully.
   * This test clicks on the how to book navigation link and waits for the network request to complete with a status code of 200.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToHowToBookPage(): Promise<void> {
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/page/how-to-book",
      200,
      () => this.modulars.elements.jsClick(this.howToBookNavLink, "How To Book Navigation Link", "verifyNavigationToHowToBookPage"),
      "GET",
      "How To Book Page",
      "verifyNavigationToHowToBookPage",
    );
  }

/**
 * Verifies that the file a claim page is navigated to successfully.
 * This test clicks on the file a claim navigation link and waits for the network request to complete with a status code of 200.
 * Logs an info message if the operation is successful.
 * Logs an error if the operation fails.
 * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
 * @throws {Error} - If the operation fails.
 */  public async verifyNavigationToFileAClaimPage(): Promise<void> {
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/page/file-a-claim",
      200,
      () => this.modulars.elements.jsClick(this.fileAClaimNavLink, "File A Claim Navigation Link", "verifyNavigationToFileAClaimPage"),
      "GET",
      "File A Claim Page",
      "verifyNavigationToFileAClaimPage",
    );
  }

  /**
   * Verifies that the refund policy page is navigated to successfully.
   * This test clicks on the refund policy navigation link and waits for the network request to complete with a status code of 200.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToRefundPolicyPage(): Promise<void> {
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/page/refund-policy",
      200,
      () => this.modulars.elements.jsClick(this.refundPolicyNavLink, "Refund Policy Navigation Link", "verifyNavigationToRefundPolicyPage"),
      "GET",
      "Refund Policy Page",
      "verifyNavigationToRefundPolicyPage",
    );
  }

  /**
   * Verifies that the best travel deals page is navigated to successfully.
   * This test clicks on the best travel deals navigation link and waits for the network request to complete with a status code of 200.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToBestTravelDealsPage(): Promise<void> {
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/page/best-travel-deals",
      200,
      () => this.modulars.elements.jsClick(this.bestTravelDealsNavLink, "Best Travel Deals Navigation Link", "verifyNavigationToBestTravelDealsPage"),
      "GET",
      "Best Travel Deals Page",
      "verifyNavigationToBestTravelDealsPage",
    );
  }

  /**
   * Verifies that the travel documents page is navigated to successfully.
   * This test clicks on the travel documents navigation link and waits for the network request to complete with a status code of 200.
   * Logs an info message if the operation is successful.
   * Logs an error if the operation fails.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToTravelDocumentsPage(): Promise<void> {
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/page/travel-documents",
      200,
      () => this.modulars.elements.jsClick(this.travelDocumentsNavLink, "Travel Documents Navigation Link", "verifyNavigationToTravelDocumentsPage"),
      "GET",
      "Travel Documents Page",
      "verifyNavigationToTravelDocumentsPage",
    );
  }

/**
 * Verifies that the travel insurance page is navigated to successfully.
 * This test clicks on the travel insurance navigation link and waits for the network request to complete with a status code of 200.
 * Logs an info message if the operation is successful.
 * Logs an error if the operation fails.
 * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
 * @throws {Error} - If the operation fails.
 */  public async verifyNavigationToTravelInsurancePage(): Promise<void> {
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/page/travel-insurance",
      200,
      () => this.modulars.elements.jsClick(this.travelInsuranceNavLink, "Travel Insurance Navigation Link", "verifyNavigationToTravelInsurancePage"),
      "GET",
      "Travel Insurance Page",
      "verifyNavigationToTravelInsurancePage",
    );
  }

/**
 * Verifies that the disruptions page is navigated to successfully.
 * This test clicks on the disruptions navigation link and waits for the network request to complete with a status code of 200.
 * Logs an info message if the operation is successful.
 * Logs an error if the operation fails.
 * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
 * @throws {Error} - If the operation fails.
 */
  public async verifyNavigationToDisruptionsPage(): Promise<void> {
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/page/disruption",
      200,
      () => this.modulars.elements.jsClick(this.disruptionNavLink, "Disruptions Navigation Link", "verifyNavigationToDisruptionsPage"),
      "GET",
      "Disruptions Page",
      "verifyNavigationToDisruptionsPage",
    );
  }

/**
 * Verifies that the FAQ page is navigated to successfully.
 * This test clicks on the FAQ navigation link and waits for the network request to complete with a status code of 200.
 * Logs an info message if the operation is successful.
 * Logs an error if the operation fails.
 * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
 * @throws {Error} - If the operation fails.
 */
  public async verifyNavigationToFAQPage(): Promise<void> {
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/page/frequently-asked-questions",
      200,
      () => this.modulars.elements.jsClick(this.faqOrAnswersNavLink, "FAQ Navigation Link", "verifyNavigationToFAQPage"),
      "GET",
      "FAQ Page",
      "verifyNavigationToFAQPage",
    );
  }

  /**
   * Verifies that the accessibility page is navigated to successfully.
   * This test clicks on the accessibility navigation link and waits for the network request to complete with a status code of 200.
   * @returns {Promise<void>} - A promise which resolves if the operation is successful, and rejects if the operation fails.
   * @throws {Error} - If the operation fails.
   */
  public async verifyNavigationToAccessibilityPage(): Promise<void> {
    await this.modulars.network.assertNetworkRequest(
      "https://phptravels.net/page/accessibility",
      200,
      () => this.modulars.elements.jsClick(this.accessibilityNavLink, "Accessibility Navigation Link", "verifyNavigationToAccessibilityPage"),
      "GET",
      "Accessibility Page",
      "verifyNavigationToAccessibilityPage",
    );
  }

  public async verifyNavigationToFacebookPage(): Promise<void> {
    await this.modulars.network.assertNetworkRequest(
      "https://www.facebook.com/phptravels",
      200,
      () => this.modulars.elements.jsClick(this.facebookNavLink, "Facebook Navigation Link", "verifyNavigationToFacebookPage"),
      "GET",
      "Facebook Page",
      "verifyNavigationToFacebookPage",
    );
  }
}
