"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductWebsite_1 = require("../ProductWebsite");
class Bikes99 extends ProductWebsite_1.ProductWebsite {
    constructor() {
        super("99Bikes", ".pages-item-next a");
        this.getProducts = async (page) => {
            const products = [];
            for await (const p of await page.$$(".product-item-info")) {
                const name = await this.getElementAttributeValue(page, await p.$(`[data-name]`), `data-name`);
                const url = await this.getElementPropertyValue(await p.$(".product-item-info a"), "href");
                const images = await this.getProductImages(p);
                const prices = await this.getManyAttributeValues(page, p, "[data-price-amount]", "data-price-type", "data-price-amount");
                const productData = await this.getAllElementsAttributes(page, p, ".product-item-info .photo", (a) => a.name.startsWith("data-"));
                const product = { name, url, images, prices };
                products.push(Object.assign(productData, product));
            }
            return products;
        };
    }
    ;
    resetProductPages() {
        return [
            { url: "https://www.99bikes.com.au/accessories?p=1&product_list_limit=72", name: "accessories" },
            { url: "https://www.99bikes.com.au/parts-components?p=1&product_list_limit=72", name: "parts-components" },
            { url: "https://www.99bikes.com.au/helmets?p=1&product_list_limit=72", name: "helmets" },
            { url: "https://www.99bikes.com.au/apparel?p=1&product_list_limit=72", name: "apparel" },
            { url: "https://www.99bikes.com.au/on-sale?p=1&product_list_limit=72", name: "on-sale" },
            { url: "https://www.99bikes.com.au/tools-maintenance?p=1&product_list_limit=72", name: "tools-maintenance" },
            { url: "https://www.99bikes.com.au/car-racks?p=1&product_list_limit=72", name: "car-racks" },
        ];
    }
}
exports.Bikes99 = Bikes99;
//# sourceMappingURL=99Bikes.js.map