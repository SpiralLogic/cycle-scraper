import {Site} from "./Site";
import {ProductPage, Products} from "./ProductInterfaces";
import * as fs from "fs";

export class Scraper {
    private readonly site: Site;

    constructor(site: Site) {
        this.site = site;
    }

    public getProductsForSite = async () => {
        const allProducts: Products = [];
        let completedPage: ProductPage = {};

        try {
            while (await this.site.getNextPage()) {
                if (!this.site.currentPageUrl.url) return;

                if (completedPage.url && this.site.currentPageUrl.name !== completedPage.name) {
                    allProducts.length = 0;
                }

                console.log(`Doing page: ${this.site.currentPageUrl.url}`);

                await this.site.goto(this.site.currentPageUrl);
                const products = await this.site.getProducts();
                allProducts.push(...products);

                await writeProductsToJson(this.site.name + "_" + this.site.currentPageUrl.name, "products", allProducts);

                completedPage = this.site.currentPageUrl;
            }
        } catch (e) {
            console.log(e);
        }
    };
}

const writeProductsToJson = async (prefix: string, filename: string, products: Products) => {
    const file = prefix + "_" + filename + ".json";

    return await fs.writeFile("data/" + file, JSON.stringify(products), (err) => {
        if (err) throw err;
        console.log("wrote file: " + file);
    });
};