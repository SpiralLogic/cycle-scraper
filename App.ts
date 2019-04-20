import {Bikes99} from "./stores/99Bikes";
import {BikeBug} from "./stores/BikeBug";
import {ChainReaction} from "./stores/chainreaction";
import {Scraper} from "./Scraper";
import {BrowserEmulator} from "./BrowserEmulator";

(async () => {
    const emulator = await BrowserEmulator.New();

    const scrapers = [
        new Scraper(new BikeBug(), await emulator.newPage()),
        new Scraper(new Bikes99(), await emulator.newPage()),
        new Scraper(new ChainReaction(), await emulator.newPage()),
    ];

    await Promise.all([
        scrapers[0].getProductsForSite(),
        scrapers[1].getProductsForSite(),
        scrapers[2].getProductsForSite(),
    ]);
})();
