export type Products = Product[];

export interface Product {
    name: string,
    images: ProductImage[],
    url: string | null,
    [x: string]: any,
}

export interface ProductImage {
    description: string | null;
    src: string | null;
}

export interface ProductPage {
    url?: string,
    name?: string,
}

