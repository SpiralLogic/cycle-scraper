"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Site_1 = require("../Site");
class Bikes99 extends Site_1.Site {
    constructor() {
        super(...arguments);
        this.name = "99Bikes";
        this.nextPageSelector = ".pages-item-next a";
        this.getProducts = async () => {
            const products = [];
            for await (const p of await this.page.$$(".product-item-info")) {
                const name = await this.page.getAttributeValue(p, `data-name`);
                const url = await this.page.getPropertyValue(p, "a", "href");
                const images = await this.page.getImageUrls(p);
                //const prices = await this.page.getAllAttributeValues(p, "[data-price-amount]", "data-price-type", "data-price-amount");
                const productData = await this.page.getAllAttributes(p, ".product-item-info a", (a) => a.name.startsWith("data-"));
                const prices = await this.getProductPrices(p);
                const product = Object.assign(productData, { name, url, images, prices });
                products.push(Object.assign(productData, product));
            }
            return products;
        };
    }
    async getProductPrices(p) {
        const prices = {};
        for await (const e of await p.$$("[data-price-amount]")) {
            const type = await this.page.getAttributeValue(e, "data-price-type");
            const price = await this.page.getAttributeValue(e, "data-price-amount");
            type && (prices[type] = price);
        }
        return prices;
    }
    initializeProductUrls() {
        return [
            { url: "https://www.99bikes.com.au/accessories?p=1&product_list_limit=72", name: "accessories" },
        ];
    }
}
exports.Bikes99 = Bikes99;
//# sourceMappingURL=99Bikes.js.map