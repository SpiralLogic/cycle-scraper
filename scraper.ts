import {ProductPage, Products, ProductWebsite} from "./ProductWebsite";
import * as puppeteer from 'puppeteer';
import * as fs from "fs";
import {DirectNavigationOptions} from "puppeteer";
import {Bikes99} from "./99Bikes";
import {BikeBug} from "./BikeBug";
import {ChainReaction} from "./chainreaction";

const writeSiteProducts = async (site: ProductWebsite, filename: string, products: Products) => {
    const category = site.currentCategoryPage!.name;
    const file = site.name + "_" + category + "_" + filename + ".json";

    return await fs.writeFile("data/" + file, JSON.stringify(products), (err) => {
        if (err) throw err;
        console.log("wrote file: " + file);
    });
};

const getProductsForSite = async (site: ProductWebsite) => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {width: 1000, height: 1000}
    });
    const page = await browser.newPage();
    const waitOptions: DirectNavigationOptions = {waitUntil: 'networkidle2', timeout: 100000};
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

            await writeSiteProducts(site, "products", allProducts);

            completedPage = currentPage;
        }
    } catch (e) {
        console.log(e);
    }

    await browser.close();
    console.log(`Finished: ${site.name}`);
};

(async () => {
    await Promise.all([
        getProductsForSite(new BikeBug()),
        getProductsForSite(new Bikes99()),
        getProductsForSite(new ChainReaction()),
    ]);
})();
