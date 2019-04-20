import {ElementHandle} from "puppeteer";
import {ProductImage, Products} from "./ProductInterfaces";
import {Page} from "./Page";

interface Scraper {
    getProducts: (page: Page) => Promise<Products>,
    currentCategoryPage: ProductPage | null,
    getNextPage: (page: Page) => Promise<ProductPage | null>,
}

export interface ProductPage {
    url: string,
    name: string,
}

export abstract class Site implements Scraper {
    public readonly name: String = "Default Site";
    protected readonly nextPageSelector: string ="div";
    private readonly productPages: ProductPage[];
    private _currentCategoryPage: ProductPage | null = null;
    private _page: Page;

    get currentCategoryPage(): ProductPage | null {
        return this._currentCategoryPage;
    }

    protected constructor(page: Page) {
        this._page = page;
        this.productPages = this.initializeProductPages();
    }

    public abstract getProducts(page: Page): Promise<Products>;

    protected abstract initializeProductPages(): ProductPage[];

    getNextPage = async (): Promise<ProductPage | null> => {
        if (!this._currentCategoryPage) {
            this._currentCategoryPage = this.getNextCategoryPage();
            return this._currentCategoryPage;
        }

        this._currentCategoryPage = {url: await this.paginateCategoryPage(), name: this._currentCategoryPage.name};

        if (!this._currentCategoryPage.url) {
            this._currentCategoryPage = null;
            return this.getNextPage();
        }

        return this._currentCategoryPage;
    };

    private async paginateCategoryPage() {
        return await getHref(this.nextPageSelector);
    }

    protected getNextCategoryPage = () => this.productPages.pop() || null;

    protected getElementPropertyValue = async (element: ElementHandle | null, propertyName: string): Promise<string> => {
        const property = element && await element.getProperty(propertyName);
        return property ? await property.jsonValue() : "";
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


}

export interface ProductWebsiteConstructor {
    new(): Site;
}