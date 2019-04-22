import * as fs from "fs";

export interface Writer {
    write(stream: string, name: string): Promise<void>;
}

export class FileWriter implements Writer {
    private readonly onFinish: (name: string) => void;

    constructor(success: (name: string) => void) {
        this.onFinish = success;
    }

    async write(name: string, string: string): Promise<void> {
        fs.writeFile(name, string, (err) => {
            this.onFinish(name);
            if (err) throw err;
        });
    }
}
