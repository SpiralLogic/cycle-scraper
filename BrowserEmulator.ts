import * as puppeteer from "puppeteer";
import {DirectNavigationOptions} from "puppeteer";
import {Page} from "./Page";

export class BrowserEmulator {
    private browser: any;
    public static readonly DEFAULT_WAIT_OPTIONS: DirectNavigationOptions = Object.freeze({waitUntil: 'networkidle2', timeout: 100000});

    private constructor() {
    }

    public static async New() {
        const instance = new BrowserEmulator();
        await instance.setupBrowser();

        return instance;
    }

    public newPage = async () => {
        const page = await this.browser.newPage();
        return new Page(page, BrowserEmulator.DEFAULT_WAIT_OPTIONS);
    };

    public close = async () => await this.browser.close();

    private async setupBrowser() {
        this.browser = await puppeteer.launch({
            //    headless: false,
            defaultViewport: {width: 1600, height: 1200}
        });
    }
}

