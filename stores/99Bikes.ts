import {Products} from "../ProductInterfaces";
import {Site} from "../Site";
import {ElementHandle} from "puppeteer";

export class Bikes99 extends Site {
    readonly name: String = "99Bikes";
    protected nextPageSelector: string = ".pages-item-next a";


    getProducts = async (): Promise<Products> => {
        const products: Products = [];

        for await (const p of await this.page.$$(".product-item-info")) {
            const name = await this.page.getAttributeValue(p, "[data-name]");
            const url = await this.page.getPropertyValue(p, "a", "href");
            const images = await this.page.getImageUrls(p);
            const productData = await this.page.getAllAttributes(p, ".product-item-info a", (a) => a.name.startsWith("data-"));
            const prices = await this.getProductPrices(p);
            const product = Object.assign(productData, {name, url, images, prices});

            products.push(product);
        }

        return products;
    };

    private async getProductPrices(p: ElementHandle) {
        const prices: { [index: string]: any } = {};

        for await (const e of await p.$$("[data-price-amount]")) {
            const type = await this.page.getAttributeValue(e, "data-price-type");
            const price = await this.page.getAttributeValue(e, "data-price-amount");

            type && (prices[type] = price);
        }
        return prices;
    }

    initializeProductUrls() {
        return [
            {url: "https://www.99bikes.com.au/accessories?p=1&product_list_limit=72", name: "accessories"},
            {url: "https://www.99bikes.com.au/parts-components?p=1&product_list_limit=72", name: "parts-components"},
            {url: "https://www.99bikes.com.au/helmets?p=1&product_list_limit=72", name: "helmets"},
            {url: "https://www.99bikes.com.au/apparel?p=1&product_list_limit=72", name: "apparel"},
             {url: "https://www.99bikes.com.au/on-sale?p=1&product_list_limit=72", name: "on-sale"},
            {url: "https://www.99bikes.com.au/tools-maintenance?p=1&product_list_limit=72", name: "tools-maintenance"},
            {url: "https://www.99bikes.com.au/car-racks?p=1&product_list_limit=72", name: "car-racks"},
        ];
    }
}
