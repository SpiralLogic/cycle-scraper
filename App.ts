import {BikeBug} from "./stores/BikeBug";
import {Scraper} from "./Scraper";
import {BrowserEmulator} from "./BrowserEmulator";
import {Bikes99} from "./stores/99Bikes";

(async () => {
    const emulator = await BrowserEmulator.New();

    const scrapers = [
      //  new Scraper(new BikeBug(await emulator.newPage())),
            new Scraper(new Bikes99( await emulator.newPage())),
        //    new Scraper(new ChainReaction(), await emulator.newPage()),
    ];
    await scrapers[0].getProductsForSite();
    await emulator.close();
})();
