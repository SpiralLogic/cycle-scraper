import {Bikes99} from "./stores/99Bikes";
import {BikeBug} from "./stores/BikeBug";
import {ChainReaction} from "./stores/chainreaction";
import {getProductsForSite} from "./Scraper";

(async () => {
    await Promise.all([
        getProductsForSite(new BikeBug()),
        getProductsForSite(new Bikes99()),
        getProductsForSite(new ChainReaction()),
    ]);
})();
