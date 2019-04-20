import * as fs from "fs";
import {DirectNavigationOptions} from "puppeteer";
import {Products} from "./ProductInterfaces";
import {ProductPage, SiteScraper} from "./SiteScraper";
import {BrowserEmulator} from "./BrowserEmulator";

const writeProductsToJson = async (site: SiteScraper, filename: string, products: Products) => {
    const category = site.currentCategoryPage!.name;
    const file = site.name + "_" + category + "_" + filename + ".json";

    return await fs.writeFile("data/" + file, JSON.stringify(products), (err) => {
        if (err) throw err;
        console.log("wrote file: " + file);
    });
};

export const getProductsForSite = async (site: SiteScraper) => {
    const emulator = await BrowserEmulator.New();

    const page = await emulator.newPage();

    const allProducts: Products = [];
    let completedPage: ProductPage | null = null;
    let currentPage: ProductPage | null;

    try {
        while ((currentPage = await site.getNextPage(page))) {
            if (completedPage && currentPage.name !== completedPage.name) {
                allProducts.length = 0;
            }

            console.log(`Doing page: ${currentPage.url}`);

            await page.goto(currentPage.url, waitOptions);
            const products = await site.getProducts(page);
            allProducts.push(...products);

            await writeProductsToJson(site, "products", allProducts);

            completedPage = currentPage;
        }
    } catch (e) {
        console.log(e);
    }

    await emulator.close();
    console.log(`Finished: ${site.name}`);
};