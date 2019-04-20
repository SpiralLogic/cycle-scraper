import * as fs from "fs";
import {Product, Products} from "./ProductInterfaces";

class Finder {
    private readonly products: Products = [];

    constructor() {
        this.products = this.loadProducts();
    }

    loadProducts = (): Products => {
        const products: Products = [];
        const files = fs.readdirSync("data");

        files.forEach(file => {
            const fileContent = fs.readFileSync("data/" + file);
            const read: Products = JSON.parse(fileContent.toString());
            read.forEach((p: Product) => {
                products.push(p);
            });

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
        return s.filter(p => p.name.toUpperCase().includes(upperSearch)).map(p => [p.name, p.prices, (new URL(p.url || "")).hostname]);
    };

    countProducts = (): number => {
        return this.products.length;
    }
}


const f = new Finder();
console.log(f.findProducts("wahoo"));
//console.log(f.countProducts());
//f.findProducts("Prime").forEach(p=> console.log(p.name, p.prices));

//console.log(f.findProducts("c" + f));