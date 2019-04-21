import {DirectNavigationOptions, ElementHandle, Page as PageScraper} from "puppeteer";
import {ProductImage} from "./ProductInterfaces";

export class Page {
    private page: PageScraper;
    private readonly options: DirectNavigationOptions;

    constructor(page: PageScraper, options: DirectNavigationOptions) {
        this.page = page;
        this.options = options;
    }

    public goto = async (url: string) => (await this.page.goto(url, this.options));

    public getHref = async (selector: string): Promise<string> => {
        const nextPaginatedPage = await this.page.$(selector);
        const nextPageJHandle = nextPaginatedPage && await nextPaginatedPage.getProperty("href");

        return (nextPageJHandle) ? nextPageJHandle.jsonValue() : "";
    };

    public $$ = (selector: string): Promise<ElementHandle[]> => this.page.$$(selector);

    public getAttributeValue = async (element: ElementHandle, attributeName: string): Promise<string> =>
        (await this.page.evaluate((e, a) => e.getAttribute(a), element, attributeName.replace(/^\[/, "").replace(/]$/, "")));

    public async getAllAttributes(rootElement: ElementHandle, selector: string, filter: (a: Attribute) => boolean = () => true): Promise<Attributes> {
        const elements = await rootElement.$$(selector);

        const attributes = AttributesFactory.new();

        for await (const element of elements) {
            const filteredAttributes = Array.from(await this.getElementsAttributes(element)).filter(filter);
            filteredAttributes.forEach((a) => attributes[a.name] = a.value);
        }

        return attributes;
    }

    async getPropertyValue(p: ElementHandle, selector: string, propertyName: string) {
        const element = await p.$(selector);
        return (!element) ? "" : await this.getElementPropertyValue(element, propertyName);
    }

    private async getElementsAttributes(element: ElementHandle) {
        return await this.page.evaluate((e) =>
            Array.from(e.attributes).map((a: Attr | any) =>
                ({name: a.name, value: a.value})), element);
    }

    getElementPropertyValue = async (element: ElementHandle, propertyName: string): Promise<string> => {
        const property = await element.getProperty(propertyName);
        return property ? await property.jsonValue() : "";
    };

    async getImageUrls(parent: ElementHandle) {
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

interface Attributes {
    [index: string]: any,

    [Symbol.iterator](): IterableIterator<Attribute>,
}

export const AttributesFactory = {
    new: function (): Attributes {
        return {
            [Symbol.iterator]: function* (): IterableIterator<Attribute> {
                for (const key of Object.keys(this)) {
                    yield {name: key, value: this[key]};
                }
            }
        }
    }
};

interface Attribute {
    name: string,
    value: any,
}

