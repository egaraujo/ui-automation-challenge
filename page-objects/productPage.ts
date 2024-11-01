import { Locator, Page } from "@playwright/test";
import { ProductInfo } from "../test-data/productInfo";

export class ProductPage {
    readonly page: Page;

    readonly nextButton: Locator;
    readonly macBookLocator: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly productLink: Locator;
    readonly productLocators: Locator;
    readonly monitorsLocator: Locator;
    readonly appleMonitorLocator: Locator;
    readonly cartLink: Locator;
    readonly loginLink: Locator;
    readonly loginUserInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginButton: Locator;
    readonly signUpLink: Locator;
    readonly signUpUserInput: Locator;
    readonly signUpPasswordInput: Locator;
    readonly signUpButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.nextButton = this.page.locator('#next2.page-link');
        this.macBookLocator = this.page.getByRole('link', { name: 'MacBook air' });
        this.productName = this.page.locator('div.card-block h4.card-title a');
        this.productPrice = this.page.locator('div.card-block h5');
        this.productLink = this.page.locator('div.card-block h4.card-title a.hrefch');
        this.productLocators = this.page.locator("div#tbodyid.row div.card-block");
        this.monitorsLocator = this.page.getByRole('link', { name: 'Monitors' });
        this.appleMonitorLocator = this.page.getByRole('link', { name: 'Apple monitor' });
        this.cartLink = this.page.getByRole('link', { name: 'Cart', exact: true });
        this.loginLink = this.page.getByRole('link', { name: 'Log in' });
        this.loginUserInput = this.page.locator('#loginusername');
        this.loginPasswordInput = this.page.locator('#loginpassword');
        this.loginButton = this.page.getByRole('button', { name: 'Log in' });
        this.signUpLink = this.page.getByRole('link', { name: 'Sign up' });
        this.signUpButton = this.page.getByRole('button', { name: 'Sign up' });
        this.signUpUserInput = this.page.locator('#sign-username');
        this.signUpPasswordInput = this.page.locator('#sign-password');
    }

    async getSingleProductInfo(productIndex: number): Promise<ProductInfo> {

        let name = await this.productName.nth(productIndex).textContent();
        let price = await this.productPrice.nth(productIndex).textContent();
        let link = await this.productLink.nth(productIndex).getAttribute('href');
    
        let productInfo = new ProductInfo(name!, price!, link!);

        return productInfo;
    }

    async getAllProductsInPage(): Promise<ProductInfo[]> {
        let productList: ProductInfo[] = [];

        let productLocators = this.productLocators;
        let products = await productLocators.all();

        for (let product=0; product < products.length; product++) {
            let productInfo = await this.getSingleProductInfo(product);
            productList.push(productInfo);
        }

        return productList;
    }

    async addMonitorToCart() {
        await this.monitorsLocator.click();
        await this.appleMonitorLocator.click();
    }

    async handleBrowserDialog() {
        this.page.once('dialog', dialog => {
            dialog.dismiss().catch(() => {});
        });
    }

    async login(user: string, password: string) {
        await this.loginUserInput.fill(user);
        await this.loginPasswordInput.fill(password);
    }

    async signup(user: string, password: string) {
        await this.signUpUserInput.fill(user);
        await this.signUpPasswordInput.fill(password);
    }
}