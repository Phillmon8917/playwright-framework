import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../basePage/basePage";

export class HomeBasePage extends BasePage {
  protected readonly logo: Locator;

  //Services
  protected readonly servicesButton: Locator;
  protected readonly visaBookingNavLink: Locator;
  protected readonly toursBookingNavLink: Locator;
  protected readonly carsBookingNavLink: Locator;
  protected readonly flightsBookingNavLink: Locator;
  protected readonly staysBookingNavLink: Locator;

  //Company
  protected readonly companyButton: Locator;
  protected readonly contactUsHeader: Locator;
  protected readonly contactUsNavLink: Locator;
  protected readonly aboutUsNavLink: Locator;
  protected readonly aboutUsHeader: Locator;
  protected readonly cookiesPolicyNavLink: Locator;
  protected readonly cookiesPolicyHeader: Locator;
  protected readonly privacyPolicyNavLink: Locator;
  protected readonly privacyPolicyHeader: Locator;
  protected readonly becomeASupplierNavLink: Locator;
  protected readonly becomeASupplierHeader: Locator;
  protected readonly termsOfUseNavLink: Locator;
  protected readonly termsOfUseHeader: Locator;

  //Blogs
  protected readonly blogsNavLink: Locator;
  protected readonly blogsHeader: Locator;

  //language
  protected readonly languageButton: Locator;
  protected readonly languageOption: (choice: string) => Locator;

  //Currency button
  protected readonly currencyButton: Locator;
  protected readonly currencyOption: (choice: string) => Locator;

  //Login
  protected readonly loginButton: Locator;
  protected readonly signInToYourAccountButton: Locator;

  //Signup
  protected readonly signupButton: Locator;
  protected readonly customerSignupButton: Locator;
  protected readonly agentSignupButton: Locator;
  protected readonly agentSignupLink: Locator;
  protected readonly agentRegistrationHeader: Locator;

  //support
  protected readonly affiliateProgramNavLink: Locator;
  protected readonly investorsNavLink: Locator;
  protected readonly careersAndJobsNavLink: Locator;
  protected readonly howToBookNavLink: Locator;
  protected readonly fileAClaimNavLink: Locator;
  protected readonly refundPolicyNavLink: Locator;

  //Explore
  protected readonly bestTravelDealsNavLink: Locator;
  protected readonly travelDocumentsNavLink: Locator;
  protected readonly travelInsuranceNavLink: Locator;
  protected readonly disruptionNavLink: Locator;
  protected readonly faqOrAnswersNavLink: Locator;
  protected readonly accessibilityNavLink: Locator;

  //Media navigation icon
  protected readonly facebookNavLink: Locator;
  protected readonly twitterNavLink: Locator;
  protected readonly instagramNavLink: Locator;
  protected readonly youtubeNavLink: Locator;
  protected readonly linkedinNavLink: Locator;

  //footer
  protected readonly footerPrivacyNavLink: Locator;
  protected readonly footerTermsNavLink: Locator;
  protected readonly footerCookiesNavLink: Locator;
  protected readonly footerRefundNavLink: Locator;

  //others
  protected readonly downloadAppNavigationLink: Locator;
  protected readonly barcelonaFeaturedPropertyButton: Locator;
  protected readonly barcelonaBadge: Locator;
  protected readonly lahoreFeaturedPropertyButton: Locator;
  protected readonly lahoreBadge: Locator;
  protected readonly dubaiFeaturedPropertyButton: Locator;
  protected readonly dubaiBadge: Locator;
  protected readonly newYorkFeaturedPropertyButton: Locator;
  protected readonly newYorkBadge: Locator;
  protected readonly santoriniFeaturedPropertyButton: Locator;
  protected readonly santoriniBadge: Locator;
  protected readonly tokyoFeaturedPropertyButton: Locator;
  protected readonly tokyoBadge: Locator;
  protected readonly maldivesFeaturedPropertyButton: Locator;
  protected readonly maldivesBadge: Locator;
  protected readonly featuredFlightsButton: Locator;
  protected readonly parisPopularToursButton: Locator;
  protected readonly parisPopularToursBadge: Locator;
  protected readonly dubaiPopularToursButton: Locator;
  protected readonly dubaiPopularToursBadge: Locator;
  protected readonly tokyoPopularToursButton: Locator;
  protected readonly tokyoPopularToursBadge: Locator;
  protected readonly denpasarPopularToursButton: Locator;
  protected readonly denpasarPopularToursBadge: Locator;
  protected readonly newYorkPopularToursButton: Locator;
  protected readonly newYorkPopularToursBadge: Locator;

  //Quick Search links
  protected readonly visaQuickSearchTab: Locator;
  protected readonly checkVisaSearchButton: Locator;
  protected readonly toursQuickSearchTab: Locator;
  protected readonly toursSearchButton: Locator;
  protected readonly carsQuickSearchTab: Locator;
  protected readonly carsSearchButton: Locator;
  protected readonly flightsQuickSearchTab: Locator;
  protected readonly flightsSearchButton: Locator;
  protected readonly staysQuickSearchTab: Locator;
  protected readonly staysSearchButton: Locator;

  //Featured Cars
  protected readonly dubaiCarsButton: Locator;
  protected readonly dubaiCarsBadge: Locator;
  protected readonly dubaiInternationalAirportButton: Locator;
  protected readonly dubaiInternationalAirportBadge: Locator;
  protected readonly acariguaCarsButton: Locator;
  protected readonly acariguaCarsBadge: Locator;
  protected readonly zanagaCarsButton: Locator;
  protected readonly zanagaCarsBadge: Locator;
  protected readonly albuqCarsButton: Locator;
  protected readonly albuqCarsBadge: Locator;
  protected readonly alghaydahCarsButton: Locator;
  protected readonly alghaydahCarsBadge: Locator;
  protected readonly barquisimetoCarsButton: Locator;
  protected readonly barquisimetoCarsBadge: Locator;
  protected readonly beverleySpringsCarsButton: Locator;
  protected readonly beverleySpringsCarsBadge: Locator;

  constructor(page: Page) {
    super(page);

    this.logo = page.locator(
      'a[href="https://phptravels.net/"] img[alt="PHPTARVELS"]',
    );

    //Services
    this.servicesButton = page
      .getByRole("navigation")
      .getByRole("button", { name: "Services expand_more" });
    this.visaBookingNavLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "chevron_right Visa Booking" });
    this.toursBookingNavLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "chevron_right Tours Booking" });
    this.carsBookingNavLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "chevron_right Cars Booking" });
    this.flightsBookingNavLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "chevron_right Flights Booking" });
    this.staysBookingNavLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "chevron_right Stays Booking" });

    //Company
    this.companyButton = page.getByRole("button", {
      name: "Company expand_more",
    });
    this.contactUsNavLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "chevron_right Contact us" });
    this.contactUsHeader = page.getByRole("heading", { name: "Contact us" });
    this.aboutUsNavLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "chevron_right About us" });
    this.aboutUsHeader = page.getByRole("heading", { name: "About us" });
    this.cookiesPolicyNavLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "chevron_right Cookies policy" });
    this.cookiesPolicyHeader = page.getByRole("heading", {
      name: "Cookies Policy",
    });
    this.privacyPolicyNavLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "chevron_right Privacy policy" });
    this.privacyPolicyHeader = page.getByRole("heading", {
      name: "Privacy Policy",
    });
    this.becomeASupplierNavLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "chevron_right Become a supplier" });
    this.becomeASupplierHeader = page.getByRole("heading", {
      name: "Become a Supplier",
    });
    this.termsOfUseNavLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "chevron_right Terms of use" });
    this.termsOfUseHeader = page.getByRole("heading", { name: "Terms of Use" });

    //blogs
    this.blogsNavLink = page.getByRole("link", { name: "Blogs" });
    this.blogsHeader = page.locator('h1:text("Blogs")');

    //Language
    this.languageButton = page.getByRole("button", { name: /language/i });
    this.languageOption = (choice: string): Locator => {
      return page.getByRole("link", { name: choice });
    };

    //Currency
    this.currencyButton = page.getByRole("button", { name: /payments/i });
    this.currencyOption = (choice: string): Locator => {
      return page.getByRole("link", { name: choice });
    };

    //Login
    this.loginButton = page.getByRole("link", { name: "login Login" });
    this.signInToYourAccountButton = page.getByRole("button", {
      name: /Sign In to your account/i,
    });

    //Signup
    this.signupButton = page.getByRole("button", {
      name: "person_add Signup expand_more",
    });
    this.customerSignupButton = page.getByRole("link", {
      name: "person Customer Signup",
    });
    this.agentSignupButton = page.getByRole("link", {
      name: "business_center Agent Signup",
    });
    this.agentSignupLink = page.getByRole("link", { name: "Agent Signup" });
    this.agentRegistrationHeader = page.getByRole("heading", {
      name: "Agent Registration",
    });

    //support
    this.affiliateProgramNavLink = page.getByRole("link", {
      name: "chevron_right Affiliate",
    });
    this.investorsNavLink = page.getByRole("link", {
      name: "chevron_right Investors",
    });
    this.careersAndJobsNavLink = page.getByRole("link", {
      name: "chevron_right Careers and Jobs",
    });
    this.howToBookNavLink = page.getByRole("link", {
      name: "chevron_right How to Book",
    });
    this.fileAClaimNavLink = page.getByRole("link", {
      name: "chevron_right File a Claim",
    });
    this.refundPolicyNavLink = page.getByRole("link", {
      name: "chevron_right Refund Policy",
    });

    //Explore
    this.bestTravelDealsNavLink = page.getByRole("link", {
      name: "chevron_right Best Travel",
    });
    this.travelDocumentsNavLink = page.getByRole("link", {
      name: "chevron_right Travel Documents",
    });
    this.travelInsuranceNavLink = page.getByRole("link", {
      name: "chevron_right Travel Insurance",
    });
    this.disruptionNavLink = page.getByRole("link", {
      name: "chevron_right Disruption",
    });
    this.faqOrAnswersNavLink = page.getByRole("link", {
      name: "chevron_right FAQ / Answers",
    });
    this.accessibilityNavLink = page.getByRole("link", {
      name: "chevron_right Accessibility",
    });

    //Media navigation icon
    this.facebookNavLink = page.getByRole("link", { name: "Facebook" });
    this.instagramNavLink = page.getByRole("link", { name: "Instagram" });
    this.twitterNavLink = page.getByRole("link", { name: "Twitter" });
    this.youtubeNavLink = page.getByRole("link", { name: "YouTube" });
    this.linkedinNavLink = page.getByRole("link", { name: "LinkedIn" });

    //footer
    this.footerPrivacyNavLink = page.getByRole("link", {
      name: "shield Privacy",
    });
    this.footerTermsNavLink = page.getByRole("link", {
      name: "description Terms",
    });
    this.footerCookiesNavLink = page.getByRole("link", {
      name: "cookie Cookies",
    });
    this.footerRefundNavLink = page.getByRole("link", {
      name: "currency_exchange Refund",
    });

    //others
    this.downloadAppNavigationLink = page.getByRole("link", {
      name: "Download App",
    });
    this.barcelonaFeaturedPropertyButton = page.getByRole("button", {
      name: "Barcelona",
    });
    this.barcelonaBadge = page.locator("span", { hasText: "Barcelona" });
    this.barcelonaBadge = page.locator("span", { hasText: "Barcelona" });
    this.lahoreFeaturedPropertyButton = page.getByRole("button", {
      name: "Lahore",
    });
    this.lahoreBadge = page.locator("span", { hasText: "Lahore" });
    this.dubaiFeaturedPropertyButton = page
      .getByRole("button", { name: "Dubai" })
      .first();
    this.dubaiBadge = page.locator("span", { hasText: "Dubai" });
    this.newYorkFeaturedPropertyButton = page
      .getByRole("button", { name: "New York" })
      .first();
    this.newYorkBadge = page.locator("span", { hasText: "New York" });
    this.santoriniFeaturedPropertyButton = page.getByRole("button", {
      name: "Santorini",
    });
    this.santoriniBadge = page.locator("span", { hasText: "Santorini" });
    this.tokyoFeaturedPropertyButton = page
      .getByRole("button", { name: "Tokyo" })
      .first();
    this.tokyoBadge = page.locator("span", { hasText: "Tokyo" });
    this.maldivesFeaturedPropertyButton = page.getByRole("button", {
      name: "Maldives",
    });
    this.maldivesBadge = page.locator("span.bg-black\\/60", {
      hasText: "Maldives",
    });
    this.featuredFlightsButton = page.locator(
      'a[href*="flights/dxb/lhe/oneway"]',
    );
    this.parisPopularToursButton = page.getByRole("button", { name: "Paris" });
    this.parisPopularToursBadge = page.locator("span", { hasText: "Paris" });
    this.dubaiPopularToursButton = page
      .getByRole("button", { name: "Dubai" })
      .nth(1);
    this.dubaiPopularToursBadge = page
      .locator("span", { hasText: "Dubai" })
      .nth(1);
    this.tokyoPopularToursButton = page
      .getByRole("button", { name: "Tokyo" })
      .nth(1);
    this.tokyoPopularToursBadge = page
      .locator("span", { hasText: "Tokyo" })
      .nth(1);
    this.denpasarPopularToursButton = page.getByRole("button", {
      name: "Denpasar",
    });
    this.denpasarPopularToursBadge = page.locator("span", {
      hasText: "Denpasar",
    });
    this.newYorkPopularToursButton = page
      .getByRole("button", { name: "New York" })
      .nth(1);
    this.newYorkPopularToursBadge = page
      .locator("span", { hasText: "New York" })
      .nth(1);

    // Quick Search Tabs
    this.visaQuickSearchTab = page.getByRole("tab", {
      name: "card_membership Visa",
    });
    this.toursQuickSearchTab = page.getByRole("tab", { name: "explore Tours" });
    this.carsQuickSearchTab = page.getByRole("tab", {
      name: "directions_car Cars",
    });
    this.flightsQuickSearchTab = page.getByRole("tab", {
      name: "flight_takeoff Flights",
    });
    this.staysQuickSearchTab = page.getByRole("tab", { name: "hotel Stays" });

    // Quick Search Buttons (dynamic text: idle vs searching)
    this.checkVisaSearchButton = page.getByRole("button", {
      name: /Check Visa|Searching/i,
    });
    this.toursSearchButton = page.getByRole("button", {
      name: /Search Tours|Searching/i,
    });
    this.carsSearchButton = page.getByRole("button", {
      name: /Search Cars|Searching/i,
    });
    this.flightsSearchButton = page.getByRole("button", {
      name: /Search Flights|Searching/i,
    });
    this.staysSearchButton = page.getByRole("button", {
      name: /Search Hotels|Searching/i,
    });

    //Featured Cars
    this.dubaiCarsButton = page
      .locator("span.bg-black\\/40", {
        hasText: "Dubai",
      })
      .nth(2);

    // Dubai badge (location badge with icon)
    this.dubaiCarsBadge = page.getByText("location_on Dubai").nth(3);

    // Dubai International Airport button
    this.dubaiInternationalAirportButton = page.locator("button", {
      hasText: "Dubai International Airport",
    });

    // Dubai International Airport badge
    this.dubaiInternationalAirportBadge = page
      .getByText("location_on Dubai International Airport")
      .first();

    // Acarigua button + badge
    this.acariguaCarsButton = page.locator("button", { hasText: "Acarigua" });
    this.acariguaCarsBadge = page.getByText("location_on Acarigua");

    // Zanaga button + badge
    this.zanagaCarsButton = page.locator("button", { hasText: "Zanaga" });
    this.zanagaCarsBadge = page.getByText("location_on Zanaga");

    // Albuq button
    this.albuqCarsButton = page.locator("button", { hasText: "Albuq" });
    this.albuqCarsBadge = page.getByText("location_on Albuq");

    // Al Ghaydah button
    this.alghaydahCarsButton = page.locator("button", {
      hasText: "Al Ghaydah",
    });
    this.alghaydahCarsBadge = page.getByText("location_on Al Ghaydah");

    // Barquisimeto button + badge
    this.barquisimetoCarsButton = page.locator("button", {
      hasText: "Barquisimeto",
    });
    this.barquisimetoCarsBadge = page.getByText("location_on Barquisimeto");

    // Beverley Springs button + badge
    this.beverleySpringsCarsButton = page.locator("button", {
      hasText: "Beverley Springs",
    });
    this.beverleySpringsCarsBadge = page.getByText(
      "location_on Beverley Springs",
    );
  }
}
