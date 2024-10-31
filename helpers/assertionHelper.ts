import { expect, Page } from "@playwright/test";

export class AssertionHelper {
  readonly page: Page;

  constructor(page: Page) {
    this.page= page;
  }
  
  performDialogAssert(expectedMessage: string) {
    this.page.once('dialog', dialog => {
      expect(dialog.message()).toEqual(expectedMessage);
      dialog.dismiss().catch(() => {});
    });
  }
}
