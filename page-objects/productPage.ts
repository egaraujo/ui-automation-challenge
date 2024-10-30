import { Locator, Page } from "@playwright/test"
import { ProductInfo } from "../test-data/productInfo"

export class ProductPage {
    readonly page: Page

    readonly nextButton: Locator
    readonly macBookLocator: Locator
    readonly productName: Locator
    readonly productPrice: Locator
    readonly productLink: Locator
    readonly productLocators: Locator

    constructor(page: Page) {
        this.page = page

        this.nextButton = this.page.locator('#next2.page-link')
        this.macBookLocator = this.page.getByRole('link', { name: 'MacBook air' })
        this.productName = this.page.locator('div.card-block h4.card-title a')
        this.productPrice = this.page.locator('div.card-block h5')
        this.productLink = this.page.locator('div.card-block h4.card-title a.hrefch')
        this.productLocators = this.page.locator("div#tbodyid.row div.card-block")
    }

    async getSingleProductInfo(productIndex: number): Promise<ProductInfo> {

        let name = await this.productName.nth(productIndex).textContent()
        let price = await this.productPrice.nth(productIndex).textContent()
        let link = await this.productLink.nth(productIndex).getAttribute('href')
    
        let productInfo = new ProductInfo(name!, price!, link!)

        return productInfo
    }

    async getAllProductsInPage(): Promise<ProductInfo[]> {
        let productList: ProductInfo[] = [];

        let productLocators = this.productLocators
        let products = await productLocators.all()

        for (let product=0; product < products.length; product++) {
            let productInfo = await this.getSingleProductInfo(product);
            productList.push(productInfo);
        }

        return productList
    }
}