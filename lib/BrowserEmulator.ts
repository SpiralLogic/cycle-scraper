import * as puppeteer from "puppeteer";
import {DirectNavigationOptions} from "puppeteer";
import {Page} from "./Page";
const launchChrome = require('@serverless-chrome/lambda');
const request = require('superagent');

const getChrome = async () => {
    const chrome = await launchChrome();

    const response = await request
        .get(`${chrome.url}/json/version`)
        .set('Content-Type', 'application/json');

    const endpoint = response.body.webSocketDebuggerUrl;

    return {
        endpoint,
        instance: chrome,
    };
};


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
        const chrome = await getChrome();
        this.browser = await puppeteer.connect({
            browserWSEndpoint: chrome.endpoint
        });
    }
}
