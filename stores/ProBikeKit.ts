import {Products} from "../ProductInterfaces";
import {Site} from "../Site";
import {ElementHandle} from "puppeteer";

export class ProBikeKit extends Site {
    readonly name: String = "ProBikeKit";
    protected nextPageSelector: string = ".responsivePageSelectors [data-page-active] + a";


    getProducts = async (): Promise<Products> => {
        const products: Products = [];

        for await (const p of await this.page.$$(".productBlock")) {
            const name = await this.page.getPropertyValue(p, ".productBlock_title", "innerText");
            const url = await this.page.getPropertyValue(p, "a", "href");
            const images = await this.page.getImageUrls(p);
            const productData = await this.page.getAllAttributes(p, ".js-enhanced-ecommerce-data", (a) => a.name.startsWith("data-product-"));
            const prices = await this.getProductPrices(p);
            const product = Object.assign(productData, {name, url, images, prices});

            products.push(product);
        }

        return products;
    };

    private async getProductPrices(p: ElementHandle) {
        const prices: { [index: string]: any } = {};

        for await (const e of await p.$$(".productBlock_priceBlock div")) {
            const type = (await this.page.getPropertyValue(e, "span:first-child", "textContent")) || "rrp";
            const price = await this.page.getPropertyValue(e, "span:last-child", "textContent");

            type && (prices[type] = price);
        }
        return prices;
    }

    initializeProductUrls() {
        return [
            {name: "Accessories & Tools", url: "https://www.probikekit.com.au/accessories-tools.list"},
            {name: "Accessories", url: "https://www.probikekit.com.au/accessories.list"},
            {name: "Bike Lights & Torches", url: "https://www.probikekit.com.au/accessories/bike-lights-torches.list"},
            {name: "Mudguards", url: "https://www.probikekit.com.au/accessories/mudguards.list"},
            {name: "Backpacks & Kit Bags", url: "https://www.probikekit.com.au/accessories/backpacks-kit-bags.list"},
            {name: "Bike Bags", url: "https://www.probikekit.com.au/accessories/bike-transportation.list"},
            {name: "Bike Wheel Bags", url: "https://www.probikekit.com.au/accessories/bike-wheel-bags.list"},
            {name: "Bike Locks & Security", url: "https://www.probikekit.com.au/accessories/bike-locks-security.list"},
            {name: "Bike Bottle Cage", url: "https://www.probikekit.com.au/accessories/bike-bottle-cages.list"},
            {name: "Cycling Bottles", url: "https://www.probikekit.com.au/accessories/cycling-bottles.list"},
            {name: "Hydration", url: "https://www.probikekit.com.au/accessories/hydration.list"},
            {name: "Panniers & Luggage", url: "https://www.probikekit.com.au/accessories/panniers-luggage.list"},
            {name: "Saddle Bags", url: "https://www.probikekit.com.au/accessories/saddle-bags.list"},
            {name: "Handlebar Tape", url: "https://www.probikekit.com.au/accessories/handlebar-tape.list"},
            {name: "Child Seats & Trailers", url: "https://www.probikekit.com.au/accessories/child-seats-trailers.list"},
            {name: "Tools & Maintenance", url: "https://www.probikekit.com.au/tools-maintenance.list"},
            {name: "Bike Workshop Tools", url: "https://www.probikekit.com.au/tools-maintenance/bike-workshop-tools.list"},
            {name: "Bike Multi Tools & Levers", url: "https://www.probikekit.com.au/tools-maintenance/bike-multi-tools-levers.list"},
            {name: "Bike Pumps", url: "https://www.probikekit.com.au/tools-maintenance/bike-pumps.list"},
            {name: "Bike Workstands", url: "https://www.probikekit.com.au/tools-maintenance/bike-workstands.list"},
            {name: "Bike Storage", url: "https://www.probikekit.com.au/tools-maintenance/bike-storage.list"},
            {name: "Bikes & Frames", url: "https://www.probikekit.com.au/frames-forks.list"},
            {name: "Frames", url: "https://www.probikekit.com.au/frames-forks/all-frames.list"},
            {name: "Forks", url: "https://www.probikekit.com.au/frames-forks/forks.list"},
            {name: "Bikes", url: "https://www.probikekit.com.au/frames-forks/bikes.list"},
            {name: "Clothing", url: "https://www.probikekit.com.au/cycling-clothing.list"},
            {name: "Baselayers", url: "https://www.probikekit.com.au/cycling-clothing/baselayers.list"},
            {name: "Bib-shorts", url: "https://www.probikekit.com.au/cycling-clothing/bib-shorts.list"},
            {name: "Compression", url: "https://www.probikekit.com.au/cycling-clothing/compression.list"},
            {name: "Footwear", url: "https://www.probikekit.com.au/cycling-clothing/footwear.list"},
            {name: "Gilets", url: "https://www.probikekit.com.au/cycling-clothing/gilets.list"},
            {name: "Gloves", url: "https://www.probikekit.com.au/cycling-clothing/gloves.list"},
            {name: "Headwear", url: "https://www.probikekit.com.au/cycling-clothing/headwear.list"},
            {name: "Helmets", url: "https://www.probikekit.com.au/bike-helmets.list"},
            {name: "Jackets", url: "https://www.probikekit.com.au/cycling-clothing/jackets.list"},
            {name: "Jerseys", url: "https://www.probikekit.com.au/cycling-clothing/jerseys.list"},
            {name: "Overshoes", url: "https://www.probikekit.com.au/cycling-clothing/overshoes.list"},
            {name: "Shorts", url: "https://www.probikekit.com.au/cycling-clothing/shorts.list"},
            {name: "Skin Suits", url: "https://www.probikekit.com.au/cycling-clothing/skin-suits.list"},
            {name: "Socks", url: "https://www.probikekit.com.au/cycling-clothing/socks.list"},
            {name: "Sunglasses", url: "https://www.probikekit.com.au/cycling-clothing/sunglasses.list"},
            {name: "Tights & Trousers", url: "https://www.probikekit.com.au/cycling-clothing/tights-and-trousers.list"},
            {name: "Warmers", url: "https://www.probikekit.com.au/cycling-clothing/warmers.list"},
            {name: "Fifty Four Degree Apparel", url: "https://www.probikekit.com.au/brands/fifty-four-degree-apparel.list"},
            {name: "Autumn Winter", url: "https://www.probikekit.com.au/autumn-winter.list"},
            {name: "Spring Summer", url: "https://www.probikekit.com.au/spring-summer.list"},
            {name: "The Broom Wagon", url: "https://www.probikekit.com.au/brands/the-broom-wagon/all-products.list"},
            {name: "Team Kits", url: "https://www.probikekit.com.au/teams.list"},
            {name: "Components", url: "https://www.probikekit.com.au/components.list"},
            {name: "Gear Levers & Shifters", url: "https://www.probikekit.com.au/components/gear-levers-shifters.list"},
            {name: "Gear & Brake Cables", url: "https://www.probikekit.com.au/components/gear-brake-cables.list"},
            {name: "Brakes & Pads", url: "https://www.probikekit.com.au/components/brakes-pads.list"},
            {name: "Brake Levers", url: "https://www.probikekit.com.au/components/brake-levers.list"},
            {name: "Chains", url: "https://www.probikekit.com.au/components/chains.list"},
            {name: "Rear Derailleurs", url: "https://www.probikekit.com.au/components/rear-derailleurs.list"},
            {name: "Front Derailleurs", url: "https://www.probikekit.com.au/components/front-derailleurs.list"},
            {name: "Cassettes & Sprockets", url: "https://www.probikekit.com.au/components/cassettes-sprockets.list"},
            {name: "Cranksets & Chainrings", url: "https://www.probikekit.com.au/components/cranksets-chainrings.list"},
            {name: "Bottom Brackets, Cups & Spares", url: "https://www.probikekit.com.au/components/bottom-brackets-cups-spares.list"},
            {name: "Groupsets", url: "https://www.probikekit.com.au/components/groupsets.list"},
            {name: "Electronic Components", url: "https://www.probikekit.com.au/components/electronic-components.list"},
            {name: "Handlebars & Stems", url: "https://www.probikekit.com.au/components/handlebars-stems.list"},
            {name: "Handlebar Tape & Grips", url: "https://www.probikekit.com.au/components/handlebar-tape-grips.list"},
            {name: "Handlebar Spares & Accessories", url: "https://www.probikekit.com.au/components/handlebar-spares-accessories.list"},
            {name: "Pedals & Cleats", url: "https://www.probikekit.com.au/components/pedals-cleats.list"},
            {name: "Saddles & Seatposts", url: "https://www.probikekit.com.au/components/saddles-seatposts.list"},
            {name: "Headsets", url: "https://www.probikekit.com.au/components/headsets.list"},
            {name: "Energy & Nutrition", url: "https://www.probikekit.com.au/energy-nutrition.list"},
            {name: "Energy & Recovery Drink", url: "https://www.probikekit.com.au/energy-nutrition/energy-recovery-drink.list"},
            {name: "Energy & Recovery Food", url: "https://www.probikekit.com.au/energy-nutrition/energy-recovery-food.list"},
            {name: "Energy & Recovery Gels", url: "https://www.probikekit.com.au/energy-nutrition/energy-recovery-gels.list"},
            {name: "Supplements", url: "https://www.probikekit.com.au/energy-nutrition/supplements.list"},
            {name: "Training & Performance", url: "https://www.probikekit.com.au/training-performance.list"},
            {name: "Chamois Cream & Muscle Rubs", url: "https://www.probikekit.com.au/training-performance/chamois-cream-muscle-rubs.list"},
            {name: "Cycling Computers", url: "https://www.probikekit.com.au/training-performance/cycling-computers.list"},
            {name: "GPS Cycling Computers", url: "https://www.probikekit.com.au/training-performance/gps-cycling-computers.list"},
            {name: "Heart Rate Monitors", url: "https://www.probikekit.com.au/training-performance/heart-rate-monitors.list"},
            {name: "Power Meters", url: "https://www.probikekit.com.au/training-performance/power-meters.list"},
            {name: "Sport Cameras", url: "https://www.probikekit.com.au/training-performance/sport-cameras.list"},
            {name: "Sport Headphones", url: "https://www.probikekit.com.au/training-performance/headphones.list"},
            {name: "Turbo Trainers & Cycle Rollers", url: "https://www.probikekit.com.au/training-performance/turbo-trainers-cycle-rollers.list"},
            {name: "Watches & Wrist Computers", url: "https://www.probikekit.com.au/training-performance/watches-wrist-computers.list"},
            {name: "Tyres & Wheels", url: "https://www.probikekit.com.au/tyres-wheels.list"},
            {name: "Tyres & Tubes", url: "https://www.probikekit.com.au/tyres-tubes.list"},
            {name: "Bike Tyre & Tubular Accessories", url: "https://www.probikekit.com.au/tyres-tubes/bike-tyre-tubular-accessories.list"},
            {name: "Clincher Bicycle Tyres", url: "https://www.probikekit.com.au/tyres-tubes/clincher-bicycle-tyres.list"},
            {name: "Tubular Bicycle Tyres", url: "https://www.probikekit.com.au/tyres-tubes/tubular-bicycle-tyres.list"},
            {name: "Cyclocross Tyres & Tubulars", url: "https://www.probikekit.com.au/tyres-tubes/cyclocross-tyres-tubulars.list"},
            {name: "MTB Tyres", url: "https://www.probikekit.com.au/mtb/tyres.list"},
            {name: "Inner Tubes", url: "https://www.probikekit.com.au/tyres-tubes/inner-tubes.list"},
            {name: "Wheels", url: "https://www.probikekit.com.au/components/wheels.list"},
            {name: "Road Wheels", url: "https://www.probikekit.com.au/components/road-wheels.list"},
            {name: "Aero & Time Trial Wheels", url: "https://www.probikekit.com.au/components/aero-time-trial-wheels.list"},
            {name: "Wheel Spares & Accessories", url: "https://www.probikekit.com.au/components/wheel-spares-accessories.list"},
            {name: "Bike Wheel Bags", url: "https://www.probikekit.com.au/components/bike-wheel-bags.list"},
            {name: "Running", url: "https://www.probikekit.com.au/running.list"},
            {name: "Men's", url: "https://www.probikekit.com.au/running/men.list"},
            {name: "Running Tops & Vests", url: "https://www.probikekit.com.au/running/men/tops-vests.list"},
            {name: "Running Jackets", url: "https://www.probikekit.com.au/running/men/jackets.list"},
            {name: "Running Shorts", url: "https://www.probikekit.com.au/running/men/shorts.list"},
            {name: "Running Tights & Leggings", url: "https://www.probikekit.com.au/running/men/tights-leggings.list"},
            {name: "Running Socks", url: "https://www.probikekit.com.au/running/men/socks.list"},
            {name: "Running Shoes", url: "https://www.probikekit.com.au/running/men/shoes.list"},
            {name: "Running Accessories", url: "https://www.probikekit.com.au/running/men/accessories.list"},
            {name: "Running Baselayers", url: "https://www.probikekit.com.au/running/men/baselayers.list"},
            {name: "Compression Clothing", url: "https://www.probikekit.com.au/running/men/compression.list"},
            {name: "Women's", url: "https://www.probikekit.com.au/running/women.list"},
            {name: "Running Tops & Vests", url: "https://www.probikekit.com.au/running/women/tops-vests.list"},
            {name: "Running Jackets", url: "https://www.probikekit.com.au/running/women/jackets.list"},
            {name: "Running Shorts", url: "https://www.probikekit.com.au/running/women/shorts.list"},
            {name: "Running Tights & Leggings", url: "https://www.probikekit.com.au/running/women/tights-leggings.list"},
            {name: "Running Socks", url: "https://www.probikekit.com.au/running/women/socks.list"},
            {name: "Running Shoes", url: "https://www.probikekit.com.au/running/women/shoes.list"},
            {name: "Running Accessories", url: "https://www.probikekit.com.au/running/women/accessories.list"},
            {name: "Running Baselayers", url: "https://www.probikekit.com.au/running/women/baselayers.list"},
            {name: "Compression Clothing", url: "https://www.probikekit.com.au/running/women/compression.list"},
            {name: "Clearance", url: "https://www.probikekit.com.au/clearance.list"},
            // {name: "Accessories", url: "https://www.probikekit.com.au/clearance/clearance-accessories.list"},
            // {name: "Clothing", url: "https://www.probikekit.com.au/clearance/clearance-clothing.list"},
            // {name: "Components", url: "https://www.probikekit.com.au/clearance/clearance-components.list"},
            // {name: "Running", url: "https://www.probikekit.com.au/clearance/clearance-running.list"},
            // {name: "Training & Performance", url: "https://www.probikekit.com.au/clearance/clearance-training-performance.list"},
            // {name: "Wheels", url: "https://www.probikekit.com.au/clearance/clearance-wheels.list"}
        ];
    }
}
