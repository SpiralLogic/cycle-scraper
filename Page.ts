import {DirectNavigationOptions, ElementHandle, Page as PageScraper} from "puppeteer";
import {ProductImage} from "./ProductInterfaces";

export class Page {
    private page: PageScraper;
    private options: DirectNavigationOptions;

    constructor(page: PageScraper, options: DirectNavigationOptions) {
        this.page = page;
        this.options = options;
    }

    public goto = async (url: string) => {
        return await this.page.goto(url, this.options)
    }

    public getHref = async (selector: string): Promise<string> => {
        const nextPaginatedPage = await this.page.$(selector);
        const nextPageJHandle = nextPaginatedPage && await nextPaginatedPage.getProperty("href");

        if (!nextPageJHandle) throw new Error("Couldn't find element");

        return await nextPageJHandle.jsonValue();
    }

    public getAttributeValue = async (element: ElementHandle, attributeName: string): Promise<string> => {
        return await this.page.evaluate((e, a) => e.getAttribute(a), element, attributeName);
    };

    protected async getAllAttributes(rootElement: ElementHandle, selector: string, filter: (a: any) => boolean): Promise<Object> {
        const elements = await rootElement.$$(selector);
        let attributes = {};
        for await (const element of elements) {
            const filteredAttributes = Array.from(await this.getElementsAttributes(element)).filter(filter);
            attributes = Object.assign(filteredAttributes, attributes);
        }
        return attributes;
    }

    async getPropertyValue(p: ElementHandle, selector: string, propertyName: string) {
        const element = await p.$(selector);
        return await this.getElementPropertyValue(element, propertyName);
    }

    private async getElementsAttributes(element: ElementHandle) {
        return await this.page.evaluate((e) => Array.from(e.attributes).map((a: Attr | any) => {
            return {name: a.name, value: a.value}
        }), element);
    }

    getElementPropertyValue = async (element: ElementHandle | null, propertyName: string): Promise<string> => {
        const property = element && await element.getProperty(propertyName);
        return property ? await property.jsonValue() : "";
    };

    protected async getImageLinks(parent: ElementHandle) {
        const images: ProductImage[] = [];
        for await (const imgElement of await parent.$$("img")) {
            images.push({
                description: await this.getElementPropertyValue(imgElement, "alt"),
                src: await this.getElementPropertyValue(imgElement, "src")
            })
        }
        return images;
    }
}

type Attributes = {
    [index: string]: any,
    length: number
};
