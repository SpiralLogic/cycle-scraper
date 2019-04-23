import {Page} from "./Page";
import {ProductPage, Products} from "./ProductInterfaces";

export abstract class Site {
    get currentPageUrl(): ProductPage {
        return this._currentPageUrl;
    }

    public abstract readonly name: string;
    protected abstract nextPageSelector: string;
    protected page: Page;
    private readonly categoryPageUrls: ProductPage[];
    private _currentPageUrl: ProductPage = {};

    public constructor(page: Page) {
        this.page = page;
        this.categoryPageUrls = this.initializeProductUrls();
    }

    public goto = async (page: ProductPage) => page.url && (await this.page.goto(page.url));

    public abstract getProducts(): Promise<Products>;

    public getNextPage = async (): Promise<ProductPage> => {
        if (!this._currentPageUrl.url) {
            this._currentPageUrl = this.getNextCategoryUrl();
            return this._currentPageUrl;
        }

        this._currentPageUrl = {name: this._currentPageUrl.name, url: await this.paginateCategoryPage()};
        if (!this._currentPageUrl.url) {
            console.log("couldn't find next page");

            this._currentPageUrl = {};
            return await this.getNextPage();
        }

        return this._currentPageUrl;
    };

    protected abstract initializeProductUrls(): ProductPage[];

    private paginateCategoryPage = async (): Promise<string> => {
        return await this.page.getHref(this.nextPageSelector);
    };

    private getNextCategoryUrl = (): ProductPage => {
        return this.categoryPageUrls.pop() || {};
    }

    protected addProductMetaData = (products: Products): Products => {
        products.forEach(p => {
            p["site"] = this.name;
            p["category"] = this._currentPageUrl.name;
        });
        return products;
    }
}
