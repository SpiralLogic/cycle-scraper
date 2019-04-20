import {Page} from "./Page";
import {ProductPage, Products} from "./ProductInterfaces";


export interface Scraper {
    getProducts: (page: Page) => Promise<Products>,
    currentCategoryPage: ProductPage,
    getNextPage: (page: Page) => Promise<ProductPage>,
}
