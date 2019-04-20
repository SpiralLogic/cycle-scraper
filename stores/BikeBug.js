"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Site_1 = require("../Site");
class BikeBug extends Site_1.Site {
    constructor() {
        super(...arguments);
        this.nextPageSelector = ".page-item:last-child:not(.active) a";
        this.name = "BikeBug";
        this.getProducts = async () => {
            const products = [];
            for await (const p of await this.page.$$(".products-row .card")) {
                const name = await this.page.getPropertyValue(p, "[itemprop=name]", "innerText");
                const url = await this.page.getPropertyValue(p, "a:last-child", "href");
                const images = await this.page.getImageUrls(p);
                const productData = await this.page.getAllAttributes(p, "[itemprop]", (a) => a.value);
                const prices = await this.getProductPrices(p);
                const product = Object.assign(productData, { name, url, images, prices });
                products.push(product);
            }
            return products;
        };
    }
    async getProductPrices(p, extraPrice) {
        const prices = {};
        const price = await this.page.getPropertyValue(p, ".price", "textContent");
        const price2 = await this.page.getPropertyValue(p, ".price", "innerText");
        if (price)
            prices["salePrice"] = price.trim();
        if (price2)
            prices["salePrice2"] = price2.trim();
        if (extraPrice)
            prices["extraPrice"] = extraPrice;
        return prices;
    }
    initializeProductUrls() {
        return [
            { url: "https://www.bikebug.com/groupsets-components-c-55.html", name: "groupsets-components" },
            { url: "https://www.bikebug.com/tyres-tubes-c-180.html", name: "tyres-tubes" },
            { url: "https://www.bikebug.com/shoes-helmets-c-303.html", name: "shoes-helmets" },
        ];
    }
}
exports.BikeBug = BikeBug;
//# sourceMappingURL=BikeBug.js.map