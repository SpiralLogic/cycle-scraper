import {Site} from "./Site";
import {ProductPage, Products} from "./ProductInterfaces";
import {Writer} from "./FileWriter";

export class Scraper {
    private readonly site: Site;
    private readonly writer: Writer;

    constructor(site: Site, writer: Writer) {
        this.site = site;
        this.writer = writer;
    }

    public getProductsForSite = async () => {
        const allProducts: Products = [];
        let writePromise: Promise<void> = Promise.resolve();
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

                const name = `data/${this.site.name}_${this.site.currentPageUrl.name}.json`;
                writePromise = writePromise.then(() => this.writer.write(name, JSON.stringify(allProducts)));

                completedPage = this.site.currentPageUrl;
            }

            await writePromise;
        } catch (e) {
            console.log(e);
        }
    };
}

