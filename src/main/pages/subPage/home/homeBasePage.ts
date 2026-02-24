import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../basePage/basePage";

export class HomeBasePage extends BasePage {
  //Services
  protected readonly servicesButton: Locator;
  protected readonly visaBookingNavLink: Locator;
  protected readonly toursBookingNavLink: Locator;
  protected readonly carsBookingNavLink: Locator;
  protected readonly flightsBookingNavLink: Locator;
  protected readonly staysBookingNavLink: Locator;

  //Company
  protected readonly companyButton: Locator;
  protected readonly contactUsNavLink: Locator;
  protected readonly aboutUsNavLink: Locator;
  protected readonly cookiesPolicyNavLink: Locator;
  protected readonly privacyPolicyNavLink: Locator;
  protected readonly becomeASupplierNavLink: Locator;
  protected readonly termsOfUseNavLink: Locator;

  //Blogs
  protected readonly blogNavLink: Locator;

  //language
  protected readonly languageButton: Locator;
  protected readonly languageSelect: (choice: string) => Locator;

  //Currency button
  protected readonly currencyButton: Locator;
  protected readonly currencySelect: (choice: string) => Locator;

  //Login
  protected readonly loginButton: Locator;

  //Signup
  protected readonly signupButton: Locator;
  protected readonly customerSignupButton: Locator;
  protected readonly agentSignupButton: Locator;

  //support
  protected readonly affiliateProgramNavLink: Locator;
  protected readonly investorsNavLink: Locator;
  protected readonly careersAndJobsNavLink: Locator;
  protected readonly howToBookNavLink: Locator;
  protected readonly fileAClaimNavLink: Locator;
  protected readonly refundPolicyNavLink: Locator;

  //Company - @footer
  protected readonly footerContactUsNavLink: Locator;
  protected readonly footerAboutUsNavLink: Locator;
  protected readonly footerCookiesPolicyNavLink: Locator;
  protected readonly footerPrivacyPolicyNavLink: Locator;
  protected readonly footerBecomeASupplierNavLink: Locator;
  protected readonly footerTermsOfUseNavLink: Locator;

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
  protected readonly lahoreFeaturedPropertyButton: Locator;
  protected readonly dubaiFeaturedPropertyButton: Locator;
  protected readonly newYorkFeaturedPropertyButton: Locator;
  protected readonly santoriniFeaturedPropertyButton: Locator;
  protected readonly tokyoFeaturedPropertyButton: Locator;
  protected readonly maldivesFeaturedPropertyButton: Locator;
  protected readonly featuredFlightsButton: Locator;
  protected readonly parisPopularToursButton: Locator;
  protected readonly dubaiPopularToursButton: Locator;
  protected readonly tokyoPopularToursButton: Locator;
  protected readonly denpasarPopularToursButton: Locator;
  protected readonly newYorkPopularToursButton: Locator;

  //Quick Search links
  protected readonly visaQuickSearchTab: Locator;
  protected readonly toursQuickSearchTab: Locator;
  protected readonly carsQuickSearchTab: Locator;
  protected readonly flightsQuickSearchTab: Locator;
  protected readonly staysQuickSearchTab: Locator;

  constructor(page: Page) {
    super(page);

    //Services
    this.servicesButton = page.getByRole("button", {
      name: "Services expand_more",
    });
    this.visaBookingNavLink = page.getByRole("link", {
      name: "chevron_right Visa Booking",
    });
    this.toursBookingNavLink = page.getByRole("link", {
      name: "chevron_right Tours Booking",
    });
    this.carsBookingNavLink = page.getByRole("link", {
      name: "chevron_right Cars Booking",
    });
    this.flightsBookingNavLink = page.getByRole("link", {
      name: "chevron_right Flights Booking",
    });
    this.staysBookingNavLink = page.getByRole("link", {
      name: "chevron_right Stays Booking",
    });

    //Company
    this.companyButton = page.getByRole("button", {
      name: "Company expand_more",
    });
    this.contactUsNavLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "chevron_right Contact us" });
    this.aboutUsNavLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "chevron_right About us" });
    this.cookiesPolicyNavLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "chevron_right Cookies policy" });
    this.privacyPolicyNavLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "chevron_right Privacy policy" });
    this.becomeASupplierNavLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "chevron_right Become a supplier" });
    this.termsOfUseNavLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "chevron_right Terms of use" });

    //blogs
    this.blogNavLink = page.getByRole("link", { name: "Blogs" });

    //Language
    this.languageButton = page.getByRole("button", { name: /language/i });
    this.languageSelect = (choice: string): Locator => {
      return page.getByRole("link", { name: choice });
    };

    //Currency
    this.currencyButton = page.getByRole("button", { name: /payments/i });
    this.currencySelect = (choice: string): Locator => {
      return page.getByRole("link", { name: choice });
    };

    //Login
    this.loginButton = page.getByRole("link", { name: "login Login" });

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

    //Company - @footer
    this.footerContactUsNavLink = page.getByRole("link", {
      name: "chevron_right Contact us",
    });
    this.footerAboutUsNavLink = page.getByRole("link", {
      name: "chevron_right About us",
    });
    this.footerCookiesPolicyNavLink = page.getByRole("link", {
      name: "chevron_right Cookies Policy",
    });
    this.footerPrivacyPolicyNavLink = page.getByRole("link", {
      name: "chevron_right Privacy Policy",
    });
    this.footerTermsOfUseNavLink = page.getByRole("link", {
      name: "chevron_right Terms of Use",
    });
    this.footerBecomeASupplierNavLink = page.getByRole("link", {
      name: "chevron_right Become a",
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
    this.lahoreFeaturedPropertyButton = page.getByRole("button", {
      name: "Lahore",
    });
    this.dubaiFeaturedPropertyButton = page
      .getByRole("button", { name: "Dubai" })
      .first();
    this.newYorkFeaturedPropertyButton = page
      .getByRole("button", { name: "New York" })
      .first();
    this.santoriniFeaturedPropertyButton = page.getByRole("button", {
      name: "Santorini",
    });
    this.tokyoFeaturedPropertyButton = page
      .getByRole("button", { name: "Tokyo" })
      .first();
    this.maldivesFeaturedPropertyButton = page.getByRole("button", {
      name: "Maldives",
    });
    this.featuredFlightsButton = page.getByRole("link", {
      name: "DXB flight LHE Dubai airlines",
    });
    this.parisPopularToursButton = page.getByRole("button", { name: "Paris" });
    this.dubaiPopularToursButton = page
      .getByRole("button", { name: "Dubai" })
      .nth(1);
    this.tokyoPopularToursButton = page
      .getByRole("button", { name: "Tokyo" })
      .nth(1);
    this.denpasarPopularToursButton = page.getByRole("button", {
      name: "Denpasar",
    });
    this.newYorkPopularToursButton = page
      .getByRole("button", { name: "New York" })
      .nth(1);

    //Quick Search links
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
  }
}
