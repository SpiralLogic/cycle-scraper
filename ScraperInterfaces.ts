import {Page} from "./Page";
import {ProductPage, Products} from "./ProductInterfaces";
import {Metadata} from "aws-sdk/clients/s3";

export interface Writer {
    write(name: string, content: string, metadata?: Metadata): Promise<void>;
}

export interface Scraper {
    getProducts: (page: Page) => Promise<Products>,
    currentCategoryPage: ProductPage,
    getNextPage: (page: Page) => Promise<ProductPage>,
}
