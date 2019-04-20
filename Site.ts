import {ProductPage, Products} from "./ProductInterfaces";
import {Page} from "./Page";


export abstract class Site {
    public readonly name: String = "Default Site";
    protected readonly nextPageSelector: string = "div";
    private readonly categoryPageUrls: ProductPage[];
    private _currentPageUrl: ProductPage | null = null;
    private page: Page;

    get currentPageUrl(): ProductPage | null {
        return this._currentPageUrl;
    }

    protected constructor(page: Page) {
        this.page = page;
        this.categoryPageUrls = this.initializeProductUrls();
    }

    public abstract getProducts(page: Page): Promise<Products>;
    protected abstract initializeProductUrls(): ProductPage[];

    public getNextPage = async (): Promise<ProductPage | null> => {
        if (!this._currentPageUrl) {
            this._currentPageUrl = this.getNextCategoryUrl();
            return this._currentPageUrl;
        }

        this._currentPageUrl = {url: await this.paginateCategoryPage(), name: this._currentPageUrl.name};

        if (!this._currentPageUrl.url) {
            this._currentPageUrl = null;
            return this.getNextPage();
        }
        return this._currentPageUrl;
    };

    private paginateCategoryPage= async  () => await this.page.getHref(this.nextPageSelector);

    private getNextCategoryUrl = () => this.categoryPageUrls.pop() || null;
}
