"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Site_1 = require("../Site");
class BikeBug extends Site_1.Site {
    constructor() {
        super("BikeBug", ".page-item:last-child:not(.active) a");
        this.getProducts = async (page) => {
            const products = [];
            for await (const p of await page.$$(".products-row .card")) {
                const name = await this.getPropertyValue(p, "[itemprop=name]", "innerText");
                const url = await this.getPropertyValue(p, "a:last-child", "href");
                const images = await this.getProductImages(p);
                const productData = await this.getAllAttributeValues(page, p, "[itemprop]", "itemprop", "content");
                const prices = await this.getProductPrices(page, p);
                const product = Object.assign(productData, { name, url, images, prices, image: "", price: "" });
                delete product["image"];
                delete product["price"];
                products.push(product);
            }
            return products;
        };
    }
    ;
    async getProductPrices(page, p, extraPrice) {
        const prices = {};
        const price = await this.getPropertyValue(p, ".price", "textContent");
        const price2 = await this.getPropertyValue(p, ".price", "innerText");
        const price3 = await this.getAttributeValue(page, await p.$("[itemprop=price]"), "content");
        if (price)
            prices["salePrice"] = price.trim();
        if (price2)
            prices["salePrice2"] = price2.trim();
        if (price3)
            prices["salePrice3"] = price3.trim();
        if (extraPrice)
            prices["extraPrice"] = extraPrice;
        return prices;
    }
    initializeProductPages() {
        return [
            { url: "https://www.bikebug.com/groupsets-components-c-55.html", name: "groupsets-components" },
            { url: "https://www.bikebug.com/tyres-tubes-c-180.html", name: "tyres-tubes" },
            { url: "https://www.bikebug.com/shoes-helmets-c-303.html", name: "shoes-helmets" },
        ];
    }
}
exports.BikeBug = BikeBug;
//# sourceMappingURL=BikeBug.js.map