import {ElementHandle, Page} from "puppeteer";
import {ProductImage, Products} from "./ProductInterfaces";

interface Scraper {
    getProducts: (page: Page) => Promise<Products>,
    currentCategoryPage: ProductPage | null,
    getNextPage: (page: Page) => Promise<ProductPage | null>,
}

export interface ProductPage {
    url: string,
    name: string,
}

export abstract class SiteScraper implements Scraper {
    public readonly name: String;
    protected readonly nextPageSelector: string;
    private readonly productPages: ProductPage[];
    private _currentCategoryPage: ProductPage | null = null;

    get currentCategoryPage(): ProductPage | null {
        return this._currentCategoryPage;
    }

    protected constructor(name: String, nextPageSelector: string) {
        this.name = name;
        this.nextPageSelector = nextPageSelector;
        this.productPages = this.resetProductPages();
    }

    public abstract getProducts(page: Page): Promise<Products>;

    protected abstract resetProductPages(): ProductPage[];

    getNextPage = async (page: Page): Promise<ProductPage | null> => {
        if (!this._currentCategoryPage) {
            this._currentCategoryPage = this.getNextCategoryPage();
            return this._currentCategoryPage;
        }

        this._currentCategoryPage = {url: await this.paginateCategoryPage(page), name: this._currentCategoryPage.name};

        if (!this._currentCategoryPage.url) {
            this._currentCategoryPage = null;
            return this.getNextPage(page);
        }

        return this._currentCategoryPage;
    };

    private async paginateCategoryPage(page: Page) {
        const nextPaginatedPage = await page.$(this.nextPageSelector);
        const nextPageJHandle = nextPaginatedPage && await nextPaginatedPage.getProperty("href");

        return (nextPageJHandle && await nextPageJHandle.jsonValue()) || null;
    }

    protected getNextCategoryPage = () => this.productPages.pop() || null;

    protected getElementPropertyValue = async (element: ElementHandle | null, propertyName: string): Promise<string> => {
        const property = element && await element.getProperty(propertyName);
        return property ? await property.jsonValue() : "";
    };

    protected getElementAttributeValue = async (page: Page, element: ElementHandle | null, attributeName: string): Promise<string> => {
        if (!element) return "";
        return await page.evaluate((e, a) => e.getAttribute(a), element, attributeName);
    };

    protected async getProductImages(parent: ElementHandle) {
        const images: ProductImage[] = [];
        for await (const imgElement of await parent.$$("img")) {
            images.push({
                description: await this.getElementPropertyValue(imgElement, "alt"),
                src: await this.getElementPropertyValue(imgElement, "src")
            })
        }

        return images;
    }

    protected async getPropertyValue(p: ElementHandle, selector: string, propertyName: string) {
        const element = await p.$(selector);
        return await this.getElementPropertyValue(element, propertyName);
    }

    protected async getManyAttributeValues(page: Page, p: ElementHandle, selector: string, propertySelector: string, valueSelector: string): Promise<Object> {
        const metaData = [];
        for await (const element of await p.$$(selector)) {
            const name = await this.getElementAttributeValue(page, element, propertySelector);
            const value = await this.getElementAttributeValue(page, element, valueSelector);

            if (name) metaData.push({name, value});
        }

        return this.reduceMetaDataArrays(metaData);
    }

    private reduceMetaDataArrays(metaData: { name: string, value: any }[]): Object {
        return metaData.reduce((a: { [index: string]: any }, c: any) => {
            a[c.name] = c.value;
            return a;
        }, {});
    }

    protected async getAllElementsAttributes(page: Page, elementHandle: ElementHandle, selector: string, filter: (a: any) => boolean): Promise<Object> {
        const element = await elementHandle.$(selector);
        if (!element) return {};
        const attributes = await this.getAttributes(page, element);

        const metaData = attributes.filter(filter).map(a => {
            return {name: a.name.slice(5), value: a.value}
        });

        return this.reduceMetaDataArrays(metaData);
    }

    private async getAttributes(page: Page, element: ElementHandle) {
        return await page.evaluate((e) => Array.from(e.attributes).map((a: Attr | any) => {
            return {name: a.name, value: a.value}
        }), element);
    }
}

export interface ProductWebsiteConstructor {
    new(): SiteScraper;
}