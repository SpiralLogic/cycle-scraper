import * as fs from "fs";
import {Writer} from "./ScraperInterfaces";

export class FileWriter implements Writer {
    private readonly onFinish: (name: string) => void;
    private readonly directory: string;

    constructor(directory: string, success: (name: string) => void) {
        this.onFinish = success;
        this.directory = directory;
    }

    async write(name: string, content: string): Promise<void> {
        fs.writeFile(`${this.directory}/${name}`, content, (err) => {
            if(this.onFinish) this.onFinish(name);
            if (err) throw err;
        });
    }
}

