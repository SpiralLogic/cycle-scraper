import * as fs from "fs";
import {AwsS3} from "./AwsS3";

export interface Writer {
    write(name: string, content: string): Promise<void>;
}

export class FileWriter implements Writer {
    private readonly onFinish: (name: string) => void;

    constructor(success: (name: string) => void) {
        this.onFinish = success;
    }

    async write(name: string, content: string): Promise<void> {
        fs.writeFile(name, content, (err) => {
            if(this.onFinish) this.onFinish(name);
            if (err) throw err;
        });
    }
}

export class S3Writer implements Writer {
    private readonly onFinish: (name: string) => void;
    private s3: AwsS3;

    constructor(success: (name: string) => void) {
        this.onFinish = success;
        this.s3 = new AwsS3();
    }

    async write(name: string, content: string): Promise<void> {
        await this.s3.uploadToBucket(content, name, 'part-scraper');
        if(this.onFinish) this.onFinish(name);
    }
}
