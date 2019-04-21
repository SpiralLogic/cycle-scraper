import {Products} from "../ProductInterfaces";
import {Site} from "../Site";
import {ElementHandle} from "puppeteer";

export class ChainReaction extends Site {
    public readonly name = "ChainReaction";
    protected nextPageSelector: string = ".pagination a.active + a";

    getProducts = async (): Promise<Products> => {
        const products: Products = [];
        for await (const p of await this.page.$$(".products_details")) {
            const name = await this.page.getPropertyValue(p, ".description", "innerText");
            const url = await this.page.getPropertyValue(p, "a", "href");
            const prices = await this.getProductPrices(p);
            const images = (await this.page.getImageUrls(p)).filter(i => i.description);

            products.push({name, url, images, prices});
        }

        return this.addProductMetaData(products);
    };

    private async getProductPrices(p: ElementHandle) {
        const prices: { [index: string]: any } = {};
        prices["rrp"] = await this.page.getPropertyValue(p, ".rrpamount", "innerText");
        prices["salePrice"] = await this.page.getPropertyValue(p, ".fromamt", "innerText");
        prices["savedAmount"] = await this.page.getPropertyValue(p, ".savedamount", "innerText");

        return prices;
    }

    initializeProductUrls() {
        return [
            {url: "https://www.chainreactioncycles.com/au/en/bmx-bikes", name: "bmx-bikes"},
            {url: "https://www.chainreactioncycles.com/au/en/bike-trailers", name: "bike-trailers"},
            {url: "https://www.chainreactioncycles.com/au/en/cyclo-cross-bikes", name: "cyclo-cross-bikes"},
            {url: "https://www.chainreactioncycles.com/au/en/electric-bikes", name: "electric-bikes"},
            {url: "https://www.chainreactioncycles.com/au/en/hybrid-city-bikes", name: "hybrid-city-bikes"},
            {url: "https://www.chainreactioncycles.com/au/en/kids-bikes", name: "kids-bikes"},
            {url: "https://www.chainreactioncycles.com/au/en/mountain-bikes", name: "mountain-bikes"},
            {url: "https://www.chainreactioncycles.com/au/en/road-bikes", name: "road-bikes"},
            {url: "https://www.chainreactioncycles.com/au/en/tt-bikes", name: "tt-bikes"},
            {url: "https://www.chainreactioncycles.com/au/en/bmx-frames", name: "bmx-frames"},
            {url: "https://www.chainreactioncycles.com/au/en/forks", name: "forks"},
            {url: "https://www.chainreactioncycles.com/au/en/frame-protection", name: "frame-protection"},
            {url: "https://www.chainreactioncycles.com/au/en/frame-spares", name: "frame-spares"},
            {url: "https://www.chainreactioncycles.com/au/en/hybrid-frames", name: "hybrid-frames"},
            {url: "https://www.chainreactioncycles.com/au/en/mtb-frames", name: "mtb-frames"},
            {url: "https://www.chainreactioncycles.com/au/en/road-frames", name: "road-frames"},
            {url: "https://www.chainreactioncycles.com/au/en/bmx-seats", name: "bmx-seats"},
            {url: "https://www.chainreactioncycles.com/au/en/bar-end-plugs", name: "bar-end-plugs"},
            {url: "https://www.chainreactioncycles.com/au/en/bar-ends", name: "bar-ends"},
            {url: "https://www.chainreactioncycles.com/au/en/bash-guards", name: "bash-guards"},
            {url: "https://www.chainreactioncycles.com/au/en/bottom-brackets", name: "bottom-brackets"},
            {url: "https://www.chainreactioncycles.com/au/en/brake-cables", name: "brake-cables"},
            {url: "https://www.chainreactioncycles.com/au/en/brake-levers", name: "brake-levers"},
            {url: "https://www.chainreactioncycles.com/au/en/brake-pads", name: "brake-pads"},
            {url: "https://www.chainreactioncycles.com/au/en/brake-spares", name: "brake-spares"},
            {url: "https://www.chainreactioncycles.com/au/en/brakes", name: "brakes"},
            {url: "https://www.chainreactioncycles.com/au/en/cassettes", name: "cassettes"},
            {url: "https://www.chainreactioncycles.com/au/en/chain-guides", name: "chain-guides"},
            {url: "https://www.chainreactioncycles.com/au/en/chainring-bolts", name: "chainring-bolts"},
            {url: "https://www.chainreactioncycles.com/au/en/chainrings", name: "chainrings"},
            {url: "https://www.chainreactioncycles.com/au/en/chains", name: "chains"},
            {url: "https://www.chainreactioncycles.com/au/en/crank-bolts", name: "crank-bolts"},
            {url: "https://www.chainreactioncycles.com/au/en/cranksets", name: "cranksets"},
            {url: "https://www.chainreactioncycles.com/au/en/derailleurs", name: "derailleurs"},
            {url: "https://www.chainreactioncycles.com/au/en/gear-cables", name: "gear-cables"},
            {url: "https://www.chainreactioncycles.com/au/en/gear-shifters", name: "gear-shifters"},
            {url: "https://www.chainreactioncycles.com/au/en/grips", name: "grips"},
            {url: "https://www.chainreactioncycles.com/au/en/groupsets", name: "groupsets"},
            {url: "https://www.chainreactioncycles.com/au/en/handlebar-tape", name: "handlebar-tape"},
            {url: "https://www.chainreactioncycles.com/au/en/handlebars", name: "handlebars"},
            {url: "https://www.chainreactioncycles.com/au/en/headset-spacers", name: "headset-spacers"},
            {url: "https://www.chainreactioncycles.com/au/en/headsets", name: "headsets"},
            {url: "https://www.chainreactioncycles.com/au/en/pedals", name: "pedals"},
            {url: "https://www.chainreactioncycles.com/au/en/pegs", name: "pegs"},
            {url: "https://www.chainreactioncycles.com/au/en/power-meters", name: "power-meters"},
            {url: "https://www.chainreactioncycles.com/au/en/rear-shock-springs", name: "rear-shock-springs"},
            {url: "https://www.chainreactioncycles.com/au/en/rear-shocks", name: "rear-shocks"},
            {url: "https://www.chainreactioncycles.com/au/en/saddles", name: "saddles"},
            {url: "https://www.chainreactioncycles.com/au/en/seatclamps", name: "seatclamps"},
            {url: "https://www.chainreactioncycles.com/au/en/seatposts", name: "seatposts"},
            {url: "https://www.chainreactioncycles.com/au/en/stems", name: "stems"},
            {url: "https://www.chainreactioncycles.com/au/en/hubs", name: "hubs"},
            {url: "https://www.chainreactioncycles.com/au/en/nipples", name: "nipples"},
            {url: "https://www.chainreactioncycles.com/au/en/quick-releases", name: "quick-releases"},
            {url: "https://www.chainreactioncycles.com/au/en/rim-tape", name: "rim-tape"},
            {url: "https://www.chainreactioncycles.com/au/en/rims", name: "rims"},
            {url: "https://www.chainreactioncycles.com/au/en/spokes", name: "spokes"},
            {url: "https://www.chainreactioncycles.com/au/en/tubeless-kits", name: "tubeless-kits"},
            {url: "https://www.chainreactioncycles.com/au/en/tubes", name: "tubes"},
            {url: "https://www.chainreactioncycles.com/au/en/tyres", name: "tyres"},
            {url: "https://www.chainreactioncycles.com/au/en/valve-caps", name: "valve-caps"},
            {url: "https://www.chainreactioncycles.com/au/en/wheels", name: "wheels"},
            {url: "https://www.chainreactioncycles.com/au/en/anti-pollution-masks", name: "anti-pollution-masks"},
            {url: "https://www.chainreactioncycles.com/au/en/arm-warmers", name: "arm-warmers"},
            {url: "https://www.chainreactioncycles.com/au/en/base-layers", name: "base-layers"},
            {url: "https://www.chainreactioncycles.com/au/en/beanies-and-caps", name: "beanies-and-caps"},
            {url: "https://www.chainreactioncycles.com/au/en/belts", name: "belts"},
            {url: "https://www.chainreactioncycles.com/au/en/clothing-care", name: "clothing-care"},
            {url: "https://www.chainreactioncycles.com/au/en/compression-wear", name: "compression-wear"},
            {url: "https://www.chainreactioncycles.com/au/en/cycle-caps", name: "cycle-caps"},
            {url: "https://www.chainreactioncycles.com/au/en/gilets-cycle", name: "gilets-cycle"},
            {url: "https://www.chainreactioncycles.com/au/en/gloves", name: "gloves"},
            {url: "https://www.chainreactioncycles.com/au/en/high-viz", name: "high-viz"},
            {url: "https://www.chainreactioncycles.com/au/en/jackets-casual", name: "jackets-casual"},
            {url: "https://www.chainreactioncycles.com/au/en/jackets-cycle", name: "jackets-cycle"},
            {url: "https://www.chainreactioncycles.com/au/en/jackets-run", name: "jackets-run"},
            {url: "https://www.chainreactioncycles.com/au/en/jeans-pants", name: "jeans-pants"},
            {url: "https://www.chainreactioncycles.com/au/en/jerseys-cycle", name: "jerseys-cycle"},
            {url: "https://www.chainreactioncycles.com/au/en/leg-warmers", name: "leg-warmers"},
            {url: "https://www.chainreactioncycles.com/au/en/pants-cycle", name: "pants-cycle"},
            {url: "https://www.chainreactioncycles.com/au/en/running-accessories", name: "running-accessories"},
            {url: "https://www.chainreactioncycles.com/au/en/shirts", name: "shirts"},
            {url: "https://www.chainreactioncycles.com/au/en/shorts-casual", name: "shorts-casual"},
            {url: "https://www.chainreactioncycles.com/au/en/shorts-cycle", name: "shorts-cycle"},
            {url: "https://www.chainreactioncycles.com/au/en/shorts-run", name: "shorts-run"},
            {url: "https://www.chainreactioncycles.com/au/en/socks", name: "socks"},
            {url: "https://www.chainreactioncycles.com/au/en/sports-bras", name: "sports-bras"},
            {url: "https://www.chainreactioncycles.com/au/en/sports-headwear", name: "sports-headwear"},
            {url: "https://www.chainreactioncycles.com/au/en/swim-accessories", name: "swim-accessories"},
            {url: "https://www.chainreactioncycles.com/au/en/swim-training-aids", name: "swim-training-aids"},
            {url: "https://www.chainreactioncycles.com/au/en/swimwear", name: "swimwear"},
            {url: "https://www.chainreactioncycles.com/au/en/tee-shirts", name: "tee-shirts"},
            {url: "https://www.chainreactioncycles.com/au/en/tights", name: "tights"},
            {url: "https://www.chainreactioncycles.com/au/en/tops", name: "tops"},
            {url: "https://www.chainreactioncycles.com/au/en/tri-race-wear", name: "tri-race-wear"},
            {url: "https://www.chainreactioncycles.com/au/en/overshoes", name: "overshoes"},
            {url: "https://www.chainreactioncycles.com/au/en/shoes-casual", name: "shoes-casual"},
            {url: "https://www.chainreactioncycles.com/au/en/shoes-cycle", name: "shoes-cycle"},
            {url: "https://www.chainreactioncycles.com/au/en/shoes-run", name: "shoes-run"},
            {url: "https://www.chainreactioncycles.com/au/en/body-armour", name: "body-armour"},
            {url: "https://www.chainreactioncycles.com/au/en/goggles", name: "goggles"},
            {url: "https://www.chainreactioncycles.com/au/en/helmets", name: "helmets"},
            {url: "https://www.chainreactioncycles.com/au/en/neck-braces", name: "neck-braces"},
            {url: "https://www.chainreactioncycles.com/au/en/body-maintenance", name: "body-maintenance"},
            {url: "https://www.chainreactioncycles.com/au/en/gps", name: "gps"},
            {url: "https://www.chainreactioncycles.com/au/en/heart-rate-monitors", name: "heart-rate-monitors"},
            {url: "https://www.chainreactioncycles.com/au/en/nutrition", name: "nutrition"},
            {url: "https://www.chainreactioncycles.com/au/en/training-aids", name: "training-aids"},
            {url: "https://www.chainreactioncycles.com/au/en/tri-accessories", name: "tri-accessories"},
            {url: "https://www.chainreactioncycles.com/au/en/turbo-trainers", name: "turbo-trainers"},
            {url: "https://www.chainreactioncycles.com/au/en/bolts", name: "bolts"},
            {url: "https://www.chainreactioncycles.com/au/en/lubes-cleaning", name: "lubes-cleaning"},
            {url: "https://www.chainreactioncycles.com/au/en/pressure-washers", name: "pressure-washers"},
            {url: "https://www.chainreactioncycles.com/au/en/tools", name: "tools"},
            {url: "https://www.chainreactioncycles.com/au/en/workstands", name: "workstands"},
            {url: "https://www.chainreactioncycles.com/au/en/bags", name: "bags"},
            {url: "https://www.chainreactioncycles.com/au/en/baskets", name: "baskets"},
            {url: "https://www.chainreactioncycles.com/au/en/bells", name: "bells"},
            {url: "https://www.chainreactioncycles.com/au/en/bike-covers", name: "bike-covers"},
            {url: "https://www.chainreactioncycles.com/au/en/bike-racks", name: "bike-racks"},
            {url: "https://www.chainreactioncycles.com/au/en/child-seats", name: "child-seats"},
            {url: "https://www.chainreactioncycles.com/au/en/computers", name: "computers"},
            {url: "https://www.chainreactioncycles.com/au/en/cycle-mirrors", name: "cycle-mirrors"},
            {url: "https://www.chainreactioncycles.com/au/en/first-aid-kits", name: "first-aid-kits"},
            {url: "https://www.chainreactioncycles.com/au/en/gift-vouchers", name: "gift-vouchers"},
            {url: "https://www.chainreactioncycles.com/au/en/helmet-cameras", name: "helmet-cameras"},
            {url: "https://www.chainreactioncycles.com/au/en/hydration-packs", name: "hydration-packs"},
            {url: "https://www.chainreactioncycles.com/au/en/keyrings", name: "keyrings"},
            {url: "https://www.chainreactioncycles.com/au/en/lights", name: "lights"},
            {url: "https://www.chainreactioncycles.com/au/en/locks", name: "locks"},
            {url: "https://www.chainreactioncycles.com/au/en/miscellaneous", name: "miscellaneous"},
            {url: "https://www.chainreactioncycles.com/au/en/mudguards", name: "mudguards"},
            {url: "https://www.chainreactioncycles.com/au/en/mugs-glasses", name: "mugs-glasses"},
            {url: "https://www.chainreactioncycles.com/au/en/pannier-racks", name: "pannier-racks"},
            {url: "https://www.chainreactioncycles.com/au/en/pumps", name: "pumps"},
            {url: "https://www.chainreactioncycles.com/au/en/stickers", name: "stickers"},
            {url: "https://www.chainreactioncycles.com/au/en/sunglasses", name: "sunglasses"},
            {url: "https://www.chainreactioncycles.com/au/en/watches", name: "watches"},
            {url: "https://www.chainreactioncycles.com/au/en/water-bottle-cages", name: "water-bottle-cages"},
            {url: "https://www.chainreactioncycles.com/au/en/water-bottles", name: "water-bottles"}
        ];
    }

}
