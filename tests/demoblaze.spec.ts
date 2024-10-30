import { expect, test } from "@playwright/test";
import { ProductInfo } from "../test-data/productInfo";
import { ProductPage } from "../page-objects/productPage";

import { FileHelper } from "../helpers/fileHelper";

import demoblazeData from "../test-data/demoblazeData.json";

let productPage: ProductPage;
let fileHelper: FileHelper;

test.beforeEach(async ({ page }) => {
  await page.goto("/");

  productPage = new ProductPage(page);
  fileHelper = new FileHelper();
});

test.describe("demoblaze product store tests", async () => {

  test('should create text file with product info', async ({ baseURL }) => {

    let productsInPage: ProductInfo[] = [];
    let allProducts: ProductInfo[] = [];
  
    // get products info for first page
    productsInPage = await productPage.getAllProductsInPage()
    allProducts.push(...productsInPage)

    // visit next product page
    await productPage.nextButton.click()
    let productName = await productPage.macBookLocator.textContent()
    expect(productName).toEqual(demoblazeData.macBookAir)   
    
    // get products info for second page
    productsInPage = await productPage.getAllProductsInPage()
    allProducts.push(...productsInPage)

    // write products info to text file
    fileHelper.writeProductsToTextFile(allProducts, baseURL!)
  });
});
