import {Page} from "puppeteer";
import {ProductPage, Site} from "./Site";
import {Products} from "./ProductInterfaces";
import * as fs from "fs";
import {BrowserEmulator} from "./BrowserEmulator";

export class Scraper {
    private readonly site: Site;
    private page: Page;

    constructor(site: Site, page: Page) {
        this.site = site;
        this.page = page;
    }

    public getProductsForSite = async () => {
        const emulator = await BrowserEmulator.New();

        const page = await emulator.newPage();

        const allProducts: Products = [];
        let completedPage: ProductPage | null = null;
        let currentPage: ProductPage | null;

        try {
            while ((currentPage = await this.site.getNextPage(page))) {
                if (completedPage && currentPage.name !== completedPage.name) {
                    allProducts.length = 0;
                }

                console.log(`Doing page: ${currentPage.url}`);

                await page.goto(currentPage.url, BrowserEmulator.DEFAULT_WAIT_OPTIONS);
                const products = await this.site.getProducts(page);
                allProducts.push(...products);

                await writeProductsToJson(this.site, "products", allProducts);

                completedPage = currentPage;
            }
        } catch (e) {
            console.log(e);
        }

        await emulator.close();
    };
}

const writeProductsToJson = async (site: Site, filename: string, products: Products) => {
    const category = site.currentCategoryPage!.name;
    const file = site.name + "_" + category + "_" + filename + ".json";

    return await fs.writeFile("data/" + file, JSON.stringify(products), (err) => {
        if (err) throw err;
        console.log("wrote file: " + file);
    });
};