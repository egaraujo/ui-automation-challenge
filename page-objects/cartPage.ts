import { Locator, Page } from "@playwright/test";

import demoblazeData from "../test-data/demoblazeData.json";

export class CartPage {
    readonly page: Page;

    readonly placeOrderButton: Locator;
    readonly cartNameLocator: Locator;
    readonly cartCountryLocator: Locator;
    readonly cartCityLocator: Locator;
    readonly cartCardLocator: Locator;
    readonly cartMonthLocator: Locator;
    readonly cartYearLocator: Locator;
    readonly purchaseButton: Locator;
    readonly purchaseAlert: Locator

    constructor(page: Page) {
        this.page = page;

        this.placeOrderButton = this.page.getByRole('button', { name: 'Place Order' });
        this.cartNameLocator = this.page.locator('input#name.form-control');
        this.cartCountryLocator = this.page.locator('input#country.form-control');
        this.cartCityLocator = this.page.locator('input#city.form-control');
        this.cartCardLocator = this.page.locator('input#card.form-control');
        this.cartMonthLocator = this.page.locator('input#month.form-control');
        this.cartYearLocator = this.page.locator('input#year.form-control');
        this.purchaseButton = this.page.getByRole('button', { name: 'Purchase' });
        this.purchaseAlert = this.page.locator('div.sweet-alert.showSweetAlert.visible');
    }

    async fillOrderData() {
        await this.cartNameLocator.fill(demoblazeData.cartName);
        await this.cartCountryLocator.fill(demoblazeData.cartCountry);
        await this.cartCityLocator.fill(demoblazeData.cartCity);
        await this.cartCardLocator.fill(demoblazeData.cartCard);
        await this.cartMonthLocator.fill(demoblazeData.cartMonth);
        await this.cartYearLocator.fill(demoblazeData.cartYear);
    }
}