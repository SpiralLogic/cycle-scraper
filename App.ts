import {BrowserEmulator} from "./BrowserEmulator";
import {Bikes99} from "./stores/99Bikes";
import {ProBikeKit} from "./stores/ProBikeKit";
import {BikeBug} from "./stores/BikeBug";
import {ChainReaction} from "./stores/chainreaction";
import {Scraper} from "./Scraper";
import {Page} from "./Page";
import { S3Writer} from "./FileWriter";

(async () => {
    const emulators: BrowserEmulator[] = [];

    const pageMaker = async (): Promise<Page> => {
        emulators.unshift(await BrowserEmulator.New());
        return await emulators[0].newPage();
    };

    const sites = [
        new Scraper(new ProBikeKit(await pageMaker()), new S3Writer(console.log)),
        new Scraper(new BikeBug(await pageMaker()), new S3Writer(console.log)),
        new Scraper(new Bikes99(await pageMaker()), new S3Writer(console.log)),
        new Scraper(new ChainReaction(await pageMaker()), new S3Writer(console.log)),
    ];

    await Promise.all(sites.map(async s => (await s.getProductsForSite())));
    for await (const emulator of emulators) {
        await emulator.close();
    }
})();