import {DirectNavigationOptions, ElementHandle, Page as PageScraper} from "puppeteer";

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

    protected async getElementsAttributes(element: ElementHandle): Promise<Attributes> {
        const findAttributes = (e: Element) => Array.from(e.attributes).reduce((a: Attributes, c: any) => a[c.name] = c.value && a, {length: 0});
        return await this.page.evaluate(findAttributes, element);
    }

    protected async getAllAttributes(rootElement: ElementHandle, selector: string, filter: (a: any) => boolean): Promise<Object> {
        const elements = await rootElement.$$(selector);
        let attributes = {};
        for await (const element of elements) {
            const filteredAttributes = Array.from(await this.getElementsAttributes(element)).filter(filter);
            attributes = Object.assign(filteredAttributes, attributes);
        }
        return attributes;
    }
}

type Attributes = {
    [index: string]: any,
    length: number
};
