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

    findProducts = (search: string): Products => {
        return this.products.filter(p => p.name.includes(search))
    }
}


const f = new Finder();

f.findProducts("Prime").forEach(p=> console.log(p.name, p.prices));