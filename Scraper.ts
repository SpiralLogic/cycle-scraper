import {Site} from "./Site";
import {Page} from "puppeteer";

export class Scraper {
    private site: Site;
    private page: Page;

    constructor(site: Site,page:Page) {
        this.site = site;
        this.page = page;
    }

}