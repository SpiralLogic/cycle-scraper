import {ProductPage, Products} from "./ProductInterfaces";
import {Page} from "./Page";

export abstract class Site {
    public abstract readonly name: String;
    protected abstract nextPageSelector: string;
    private readonly categoryPageUrls: ProductPage[];
    private _currentPageUrl: ProductPage | null = null;
    protected page: Page;

    get currentPageUrl(): ProductPage | null {
        return this._currentPageUrl;
    }

    public constructor(page: Page) {
        this.page = page;
        this.categoryPageUrls = this.initializeProductUrls();
    }

    public goto = async (url: string) => {
        return await this.page.goto(url)
    }

    public abstract getProducts(): Promise<Products>;

    protected abstract initializeProductUrls(): ProductPage[];

    public getNextPage = async (): Promise<ProductPage | null> => {
        if (!this._currentPageUrl) {
            this._currentPageUrl = this.getNextCategoryUrl();
            return this._currentPageUrl;
        }

        try {
            const url = await this.paginateCategoryPage();
            this._currentPageUrl = {url: url, name: this._currentPageUrl.name};
        } catch (e) {
            console.log("couldn't find next page")
            this._currentPageUrl = null;

            return await this.getNextPage();
        }

        return this._currentPageUrl;
    };

    private paginateCategoryPage = async () => await this.page.getHref(this.nextPageSelector);

    private getNextCategoryUrl = () => this.categoryPageUrls.pop() || null;
}
