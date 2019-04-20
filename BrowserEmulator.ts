import * as puppeteer from "puppeteer";
import {DirectNavigationOptions} from "puppeteer";

export class BrowserEmulator implements Disposable {
    private browser: any;
    public readonly WAIT_OPTIONS: DirectNavigationOptions;

    private constructor() {
        this.WAIT_OPTIONS = Object.freeze({waitUntil: 'networkidle2', timeout: 100000});
    }

    public newPage = async () => await this.browser.newPage();
    public close = async () => await this.browser.close();

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