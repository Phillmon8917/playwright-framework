import { Page } from "@playwright/test";
import { ElementAssertions } from "../../modulars/assertions/assertions";
import { BrowserActions } from "../../modulars/browser/browser";
import { CalendarNavigator } from "../../modulars/calendar/calenderNavigator";
import { DropdownActions } from "../../modulars/dropdowns/dropdown";
import { ElementActions } from "../../modulars/elements/element";
import { IframeActions } from "../../modulars/iframe/iframe";
import { KeyboardActions } from "../../modulars/keyboard/keyboard";
import { NetworkAssertions } from "../../modulars/network/network";
import { ToggleActions } from "../../modulars/toggle/toggle";

export class ActionsContainer {
  private static instance: ActionsContainer | null = null;

  readonly assertions: ElementAssertions;
  readonly browser: BrowserActions;
  readonly calendar: CalendarNavigator;
  readonly dropdown: DropdownActions;
  readonly elements: ElementActions;
  readonly iframe: IframeActions;
  readonly keyboard: KeyboardActions;
  readonly network: NetworkAssertions;
  readonly toggle: ToggleActions;

  private constructor(page: Page) {
    this.assertions = new ElementAssertions();
    this.browser = new BrowserActions(page);
    this.calendar = new CalendarNavigator(page);
    this.dropdown = new DropdownActions();
    this.elements = new ElementActions();
    this.iframe = new IframeActions();
    this.keyboard = new KeyboardActions(page);
    this.network = new NetworkAssertions(page);
    this.toggle = new ToggleActions();
  }

  static getInstance(page: Page): ActionsContainer {
    if (this.instance === null) {
      this.instance = new ActionsContainer(page);
    }
    return this.instance;
  }
}
