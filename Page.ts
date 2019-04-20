import {Page as PageScraper} from "puppeteer";

export class Page {
    private page: PageScraper;

    constructor(page: PageScraper) {
        this.page = page;
    }
}