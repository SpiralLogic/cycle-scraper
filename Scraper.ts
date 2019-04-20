import { Site} from "./Site";
import {ProductPage, Products} from "./ProductInterfaces";
import * as fs from "fs";
import {BrowserEmulator} from "./BrowserEmulator";
import {Page} from "./Page";

export class Scraper {
    private readonly site: Site;

    constructor(site: Site) {
        this.site = site;
    }

    public getProductsForSite = async () => {
        const allProducts: Products = [];
        let completedPage: ProductPage | null = null;
        let currentPage: ProductPage | null;

        try {
            while ((currentPage = await this.site.getNextPage())) {
                if (completedPage && currentPage.name !== completedPage.name) {
                    allProducts.length = 0;
                }

                console.log(`Doing page: ${currentPage.url}`);

                await this.site.goto(currentPage.url);
                const products = await this.site.getProducts();
                allProducts.push(...products);

                await writeProductsToJson(this.site, "products", allProducts);

                completedPage = currentPage;
            }
        } catch (e) {
            console.log(e);
        }
    };
}

const writeProductsToJson = async (site: Site, filename: string, products: Products) => {
    const category = site.currentPageUrl!.name;
    const file = site.name + "_" + category + "_" + filename + ".json";

    return await fs.writeFile("data/" + file, JSON.stringify(products), (err) => {
        if (err) throw err;
        console.log("wrote file: " + file);
    });
};