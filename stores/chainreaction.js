"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Site_1 = require("../Site");
class ChainReaction extends Site_1.Site {
    constructor() {
        super("ChainReaction", ".pagination a.active + a");
        this.getProducts = async (page) => {
            const products = [];
            const productElements = await page.$$(".products_details");
            for await (const p of productElements) {
                const url = await this.getAttributeValue(page, await p.$("a"), "href");
                const rrPrice = { type: "rrp", amount: await this.getPropertyValue(p, ".rrpamount", "innerText") };
                const salePrice = { type: "sale", amount: await this.getPropertyValue(p, ".fromamt", "innerText") };
                const name = await this.getPropertyValue(p, ".description", "innerText");
                const images = await this.getProductImages(p);
                const product = {
                    name, url,
                    category: this.currentCategoryPage.name,
                    prices: [rrPrice, salePrice],
                    images: images,
                };
                products.push(product);
            }
            return products;
        };
    }
    initializeProductPages() {
        return [
            { url: "https://www.chainreactioncycles.com/au/en/bmx-bikes", name: "bmx-bikes" },
            { url: "https://www.chainreactioncycles.com/au/en/bike-trailers", name: "bike-trailers" },
            { url: "https://www.chainreactioncycles.com/au/en/cyclo-cross-bikes", name: "cyclo-cross-bikes" },
            { url: "https://www.chainreactioncycles.com/au/en/electric-bikes", name: "electric-bikes" },
            { url: "https://www.chainreactioncycles.com/au/en/hybrid-city-bikes", name: "hybrid-city-bikes" },
            { url: "https://www.chainreactioncycles.com/au/en/kids-bikes", name: "kids-bikes" },
            { url: "https://www.chainreactioncycles.com/au/en/mountain-bikes", name: "mountain-bikes" },
            { url: "https://www.chainreactioncycles.com/au/en/road-bikes", name: "road-bikes" },
            { url: "https://www.chainreactioncycles.com/au/en/tt-bikes", name: "tt-bikes" },
            { url: "https://www.chainreactioncycles.com/au/en/bmx-frames", name: "bmx-frames" },
            { url: "https://www.chainreactioncycles.com/au/en/forks", name: "forks" },
            { url: "https://www.chainreactioncycles.com/au/en/frame-protection", name: "frame-protection" },
            { url: "https://www.chainreactioncycles.com/au/en/frame-spares", name: "frame-spares" },
            { url: "https://www.chainreactioncycles.com/au/en/hybrid-frames", name: "hybrid-frames" },
            { url: "https://www.chainreactioncycles.com/au/en/mtb-frames", name: "mtb-frames" },
            { url: "https://www.chainreactioncycles.com/au/en/road-frames", name: "road-frames" },
            { url: "https://www.chainreactioncycles.com/au/en/bmx-seats", name: "bmx-seats" },
            { url: "https://www.chainreactioncycles.com/au/en/bar-end-plugs", name: "bar-end-plugs" },
            { url: "https://www.chainreactioncycles.com/au/en/bar-ends", name: "bar-ends" },
            { url: "https://www.chainreactioncycles.com/au/en/bash-guards", name: "bash-guards" },
            { url: "https://www.chainreactioncycles.com/au/en/bottom-brackets", name: "bottom-brackets" },
            { url: "https://www.chainreactioncycles.com/au/en/brake-cables", name: "brake-cables" },
            { url: "https://www.chainreactioncycles.com/au/en/brake-levers", name: "brake-levers" },
            { url: "https://www.chainreactioncycles.com/au/en/brake-pads", name: "brake-pads" },
            { url: "https://www.chainreactioncycles.com/au/en/brake-spares", name: "brake-spares" },
            { url: "https://www.chainreactioncycles.com/au/en/brakes", name: "brakes" },
            { url: "https://www.chainreactioncycles.com/au/en/cassettes", name: "cassettes" },
            { url: "https://www.chainreactioncycles.com/au/en/chain-guides", name: "chain-guides" },
            { url: "https://www.chainreactioncycles.com/au/en/chainring-bolts", name: "chainring-bolts" },
            { url: "https://www.chainreactioncycles.com/au/en/chainrings", name: "chainrings" },
            { url: "https://www.chainreactioncycles.com/au/en/chains", name: "chains" },
            { url: "https://www.chainreactioncycles.com/au/en/crank-bolts", name: "crank-bolts" },
            { url: "https://www.chainreactioncycles.com/au/en/cranksets", name: "cranksets" },
            { url: "https://www.chainreactioncycles.com/au/en/derailleurs", name: "derailleurs" },
            { url: "https://www.chainreactioncycles.com/au/en/gear-cables", name: "gear-cables" },
            { url: "https://www.chainreactioncycles.com/au/en/gear-shifters", name: "gear-shifters" },
            { url: "https://www.chainreactioncycles.com/au/en/grips", name: "grips" },
            { url: "https://www.chainreactioncycles.com/au/en/groupsets", name: "groupsets" },
            { url: "https://www.chainreactioncycles.com/au/en/handlebar-tape", name: "handlebar-tape" },
            { url: "https://www.chainreactioncycles.com/au/en/handlebars", name: "handlebars" },
            { url: "https://www.chainreactioncycles.com/au/en/headset-spacers", name: "headset-spacers" },
            { url: "https://www.chainreactioncycles.com/au/en/headsets", name: "headsets" },
            { url: "https://www.chainreactioncycles.com/au/en/pedals", name: "pedals" },
            { url: "https://www.chainreactioncycles.com/au/en/pegs", name: "pegs" },
            { url: "https://www.chainreactioncycles.com/au/en/power-meters", name: "power-meters" },
            { url: "https://www.chainreactioncycles.com/au/en/rear-shock-springs", name: "rear-shock-springs" },
            { url: "https://www.chainreactioncycles.com/au/en/rear-shocks", name: "rear-shocks" },
            { url: "https://www.chainreactioncycles.com/au/en/saddles", name: "saddles" },
            { url: "https://www.chainreactioncycles.com/au/en/seatclamps", name: "seatclamps" },
            { url: "https://www.chainreactioncycles.com/au/en/seatposts", name: "seatposts" },
            { url: "https://www.chainreactioncycles.com/au/en/stems", name: "stems" },
            { url: "https://www.chainreactioncycles.com/au/en/hubs", name: "hubs" },
            { url: "https://www.chainreactioncycles.com/au/en/nipples", name: "nipples" },
            { url: "https://www.chainreactioncycles.com/au/en/quick-releases", name: "quick-releases" },
            { url: "https://www.chainreactioncycles.com/au/en/rim-tape", name: "rim-tape" },
            { url: "https://www.chainreactioncycles.com/au/en/rims", name: "rims" },
            { url: "https://www.chainreactioncycles.com/au/en/spokes", name: "spokes" },
            { url: "https://www.chainreactioncycles.com/au/en/tubeless-kits", name: "tubeless-kits" },
            { url: "https://www.chainreactioncycles.com/au/en/tubes", name: "tubes" },
            { url: "https://www.chainreactioncycles.com/au/en/tyres", name: "tyres" },
            { url: "https://www.chainreactioncycles.com/au/en/valve-caps", name: "valve-caps" },
            { url: "https://www.chainreactioncycles.com/au/en/wheels", name: "wheels" },
            { url: "https://www.chainreactioncycles.com/au/en/anti-pollution-masks", name: "anti-pollution-masks" },
            { url: "https://www.chainreactioncycles.com/au/en/arm-warmers", name: "arm-warmers" },
            { url: "https://www.chainreactioncycles.com/au/en/base-layers", name: "base-layers" },
            { url: "https://www.chainreactioncycles.com/au/en/beanies-and-caps", name: "beanies-and-caps" },
            { url: "https://www.chainreactioncycles.com/au/en/belts", name: "belts" },
            { url: "https://www.chainreactioncycles.com/au/en/clothing-care", name: "clothing-care" },
            { url: "https://www.chainreactioncycles.com/au/en/compression-wear", name: "compression-wear" },
            { url: "https://www.chainreactioncycles.com/au/en/cycle-caps", name: "cycle-caps" },
        ];
    }
}
exports.ChainReaction = ChainReaction;
//# sourceMappingURL=chainreaction.js.map