import { Page } from "@playwright/test";
import { ElementAssertions } from "../../modulars/assertions/assertions.ts";
import { BrowserActions } from "../../modulars/browser/browser.ts";
import { CalendarNavigator } from "../../modulars/calendar/calenderNavigator.ts";
import { DropdownActions } from "../../modulars/dropdowns/dropdown.ts";
import { ElementActions } from "../../modulars/elements/element.ts";
import { IframeActions } from "../../modulars/iframe/iframe.ts";
import { KeyboardActions } from "../../modulars/keyboard/keyboard.ts";
import { NetworkAssertions } from "../../modulars/network/network.ts";
import { ToggleActions } from "../../modulars/toggle/toggle.ts";

export class ActionsContainer {
  readonly assertions: ElementAssertions;
  readonly browser: BrowserActions;
  readonly calendar: CalendarNavigator;
  readonly dropdown: DropdownActions;
  readonly elements: ElementActions;
  readonly iframe: IframeActions;
  readonly keyboard: KeyboardActions;
  readonly network: NetworkAssertions;
  readonly toggle: ToggleActions;

  constructor(page: Page) {
    this.assertions = new ElementAssertions();
    this.dropdown = new DropdownActions();
    this.elements = new ElementActions();
    this.iframe = new IframeActions();
    this.toggle = new ToggleActions();
    this.browser = new BrowserActions(page);
    this.calendar = new CalendarNavigator(page);
    this.keyboard = new KeyboardActions(page);
    this.network = new NetworkAssertions(page);
  }
}
