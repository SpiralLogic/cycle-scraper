import {BikeBug} from "./stores/BikeBug";
import {Scraper} from "./Scraper";
import {BrowserEmulator} from "./BrowserEmulator";
import {Bikes99} from "./stores/99Bikes";
import {ChainReaction} from "./stores/chainreaction";

(async () => {
    const emulator = await BrowserEmulator.New();
    const emulator1 = await BrowserEmulator.New();
    const emulator2 = await BrowserEmulator.New();

    const scrapers = [
        new Scraper(new BikeBug(await emulator.newPage())),
        new Scraper(new Bikes99(await emulator1.newPage())),
        new Scraper(new ChainReaction(await emulator2.newPage())),
    ];
    Promise.all([
        scrapers[0].getProductsForSite(),
        scrapers[2].getProductsForSite(),
        scrapers[3].getProductsForSite(),
    ]).then(async () => {
        await emulator.close();
        await emulator1.close();
        await emulator2.close();
    }).then(() => {
        console.log("finished!");
    });
})();
