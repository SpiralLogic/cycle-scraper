"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductWebsite_1 = require("../ProductWebsite");
class BikeBug extends ProductWebsite_1.ProductWebsite {
    constructor() {
        super("BikeBug", ".page-item:last-child:not(.active) a");
        this.getProducts = async (page) => {
            const products = [];
            for await (const p of await page.$$(".products-row .card")) {
                const name = await this.getPropertyValue(p, "[itemprop=name]", "innerText");
                const url = await this.getPropertyValue(p, "a:last-child", "href");
                const images = await this.getProductImages(p);
                const productData = await this.getManyAttributeValues(page, p, "[itemprop]", "itemprop", "content");
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
        const price3 = await this.getElementAttributeValue(page, await p.$("[itemprop=price]"), "content");
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
    resetProductPages() {
        return [
            { url: "https://www.bikebug.com/groupsets-components-c-55.html", name: "groupsets-components" },
            { url: "https://www.bikebug.com/tyres-tubes-c-180.html", name: "tyres-tubes" },
            { url: "https://www.bikebug.com/shoes-helmets-c-303.html", name: "shoes-helmets" },
            { url: "https://www.bikebug.com/clothing-c-75.html", name: "clothing" },
            { url: "https://www.bikebug.com/nutrition-c-155.html", name: "nutrition" },
            { url: "https://www.bikebug.com/accessories-c-33.html", name: "accessories" }
        ];
    }
}
exports.BikeBug = BikeBug;
//# sourceMappingURL=BikeBug.js.map