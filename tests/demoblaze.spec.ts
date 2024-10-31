import { expect, test } from "@playwright/test";
import { ProductInfo } from "../test-data/productInfo";
import { ProductPage } from "../page-objects/productPage";
import { CartPage } from "../page-objects/cartPage";

import { FileHelper } from "../helpers/fileHelper";
import { AssertionHelper } from "../helpers/assertionHelper";
import { ValueHelper } from "../helpers/valueHelper";

import demoblazeData from "../test-data/demoblazeData.json";

let fileHelper: FileHelper;
let assertionHelper: AssertionHelper;
let valueHelper: ValueHelper;

test.beforeEach(async ({ page }) => {
  await page.goto("/");

  fileHelper = new FileHelper();
  assertionHelper = new AssertionHelper(page);
  valueHelper = new ValueHelper();
});

test.describe("demoblaze product store tests", async () => {

  test('should create text file with product info', async ({ page, baseURL }) => {

    const productPage = new ProductPage(page);

    let productsInPage: ProductInfo[] = [];
    let allProducts: ProductInfo[] = [];
  
    productsInPage = await productPage.getAllProductsInPage();
    allProducts.push(...productsInPage);

    await productPage.nextButton.click();
    let productName = await productPage.macBookLocator.textContent();
    expect(productName).toEqual(demoblazeData.macBookAir);
    
    productsInPage = await productPage.getAllProductsInPage();
    allProducts.push(...productsInPage);

    fileHelper.writeProductsToTextFile(allProducts, baseURL!);
  });

  test('should purchase product', async ({ page }) => {

    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    productPage.addMonitorToCart();
    await productPage.cartLink.click();
    productPage.handleBrowserDialog();

    await cartPage.placeOrderButton.click();
    await cartPage.fillOrderData();
    await cartPage.purchaseButton.click();

    expect(cartPage.purchaseAlert).toBeVisible();
    expect(cartPage.purchaseAlert).toContainText(demoblazeData.thankAlert);
    expect(cartPage.purchaseAlert).toContainText(`${demoblazeData.cardAlert} ${demoblazeData.cartCard}`);
    expect(cartPage.purchaseAlert).toContainText(`${demoblazeData.nameAlert} ${demoblazeData.cartName}`);
  });

  test('should not login user with wrong password', async ({ page }) => {

    const productPage = new ProductPage(page);

    await productPage.loginLink.click();

    await productPage.login(demoblazeData.loginUser, demoblazeData.loginPassword);
    assertionHelper.performDialogAssert(demoblazeData.wrongPassword);

    await productPage.loginButton.click();
  });

  test('should sign up new user', async ({ page }) => {

    const productPage = new ProductPage(page);

    await productPage.signUpLink.click();

    let uuid = valueHelper.getUUID();
    let user = `${demoblazeData.loginUser}${uuid}`;
    let password = `${demoblazeData.loginPassword}${uuid}`;

    await productPage.signup(user, password);
    assertionHelper.performDialogAssert(demoblazeData.signUpSuccessful);

    await productPage.signUpButton.click();
  });
});
