import {Products, ProductWebsite} from "./ProductWebsite";
import {ElementHandle, Page} from "puppeteer";

export class BikeBug extends ProductWebsite {
    constructor() {
        super("BikeBug", ".page-item:last-child:not(.active) a");
    };

    getProducts = async (page: Page): Promise<Products> => {
        const products: Products = [];

        for await (const p of  await page.$$(".products-row .card")) {
            const name = await this.getPropertyValue(p, "[itemprop=name]", "innerText");
            const url = await this.getPropertyValue(p, "a:last-child", "href");
            const images = await this.getProductImages(p);
            const productData = await this.getManyAttributeValues(page, p, "[itemprop]", "itemprop", "content");
            const prices = await this.getProductPrices(page, p);
            const product = Object.assign(productData, {name, url, images, prices, image: ""});

            delete product["image"];
            products.push(product);
        }

        return products;
    };

    private async getProductPrices(page: Page, p: ElementHandle, extraPrice?: string) {
        const prices: { [index: string]: any } = {};
        const price = await this.getPropertyValue(p, ".price", "textContent");
        console.log(price);
        if (price) prices["salePrice"] = price;
        if (extraPrice) prices["extraPrice"] = extraPrice;

        return prices;
    }


    resetProductPages() {
        return [
            //{url: "https://www.bikebug.com/groupsets-components-c-55.html", name: "groupsets-components"},
            //{url: "https://www.bikebug.com/tyres-tubes-c-180.html", name: "tyres-tubes"},
            {url: "https://www.bikebug.com/shoes-helmets-c-303.html", name: "shoes-helmets"},
            {url: "https://www.bikebug.com/clothing-c-75.html", name: "clothing"},
            {url: "https://www.bikebug.com/nutrition-c-155.html", name: "nutrition"},
            // {url: "https://www.bikebug.com/accessories-c-33.html", name: "accessories"}
        ];
    }
}
