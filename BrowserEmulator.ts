import * as puppeteer from "puppeteer";
import {DirectNavigationOptions} from "puppeteer";

export class BrowserEmulator implements Disposable {
    private browser: any;
    public readonly WAIT_OPTIONS: DirectNavigationOptions;

    private constructor() {
        this.WAIT_OPTIONS = Object.freeze({waitUntil: 'networkidle2', timeout: 100000});
    }

    public async newPage() {
        return await this.browser.newPage();
    }

    public static async New() {
        const instance = new BrowserEmulator();
        await instance.setupBrowser();

        return instance;
    }

    private async setupBrowser() {
        this.browser = await puppeteer.launch({
            headless: false,
            defaultViewport: {width: 1000, height: 1000}
        });
    }
}