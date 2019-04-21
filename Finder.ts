import * as fs from "fs";
import {Product, Products} from "./ProductInterfaces";

class Finder {
    private readonly products: Products = [];
    private readonly sitePriceMap: Map<string, string>;

    constructor() {
        this.products = this.loadProducts();
        this.sitePriceMap = Finder.createSitePriceMap();
    }

    loadProducts = (): Products => {
        const products: Products = [];
        const files = fs.readdirSync("data");

        files.forEach(file => {
            const fileContent = fs.readFileSync("data/" + file);
            const read: Products = JSON.parse(fileContent.toString());
            read.forEach((p: Product) => products.push(p));
        });

        return products;
    };

    public findProducts = (search: string): any => {
        const upperSearch = search.toUpperCase();
        const s = this.products.map(p => {
            if (p["data-name"]) {
                p["name"] = p["data-name"]
            }
            return p
        });

        const r = s.filter(p => p.name.toUpperCase().includes(upperSearch))
            .map(p => [p.name, this.getPrice(p.prices, p.site), p.site]);

        return r.join(",");
    };

    private getPrice(p:{}, site: string) {
        const id = this.sitePriceMap.get(site);
        // @ts-ignore
        return p && p[id];
    }

    countProducts = (): number => this.products.length;

    private static createSitePriceMap = () => {
        const map = new Map<string, string>();
        map.set("BikeBug", "salePrice");
        map.set("99Bikes", "finalPrice");
        map.set("ChainReaction", "salePrice");
        map.set("ProBikeKit", "rrp");
        return map;
    };
}


const f = new Finder();
//console.log(f.findProducts("wahoo"));
//console.log(f.countProducts());
console.log(f.findProducts("LifeLine Bike"));

//console.log(f.findProducts("c" + f));