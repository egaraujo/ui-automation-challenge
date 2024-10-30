import * as fs from "fs";
import { ProductInfo } from "../test-data/productInfo";

import demoblazeData from "../test-data/demoblazeData.json";

export class FileHelper {
  async writeProductsToTextFile(products: ProductInfo[], baseURL: string) {
    let text = "";
    let newLine = "\n";

    products.forEach((product) => {
      text += product.name.trim() + newLine;
      text += product.price.trim() + newLine;
      text += baseURL + product.link.trim() + newLine + newLine;
    });

    fs.writeFile(demoblazeData.productsFileName, text, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(demoblazeData.textFileSuccess);
      }
    });
  }
}
