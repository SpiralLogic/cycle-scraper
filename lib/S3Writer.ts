import {AwsS3} from "./AwsS3";
import {Writer} from "./ScraperInterfaces";
import {Metadata} from "aws-sdk/clients/s3";

export class S3Writer implements Writer {
    private readonly onFinish: (name: string) => void;
    private s3: AwsS3;

    constructor(success: (name: string) => void) {
        this.onFinish = success;
        this.s3 = new AwsS3('part-scraper');
    }

    async write(name: string, content: string, metadata: Metadata): Promise<void> {
        const params = this.s3.createUploadParams(name, metadata);
        await this.s3.uploadToBucket(content, params);
        if (this.onFinish) this.onFinish(name);
    }
}