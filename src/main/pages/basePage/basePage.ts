import { Page } from "@playwright/test";
import { ActionsContainer } from "../basePage/actionContainer";

export class BasePage {
  protected readonly page: Page;
  protected readonly modulars: ActionsContainer;

  constructor(page: Page) {
    this.page = page;
    this.modulars = new ActionsContainer(page);
  }
}
