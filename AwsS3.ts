import * as S3 from 'aws-sdk/clients/s3';
import {PutObjectRequest} from "aws-sdk/clients/s3";

export class AwsS3 {
    private readonly bucketName: string = 'part-scraper';
    private s3: S3;

    constructor() {
        this.s3 = new S3({apiVersion: '2006-03-01', region: 'ap-southeast-2'})
    }

    uploadToBucket = async (stream: S3.Body, key: string, bucketName?: string) => {
        try {
            const params = this.createFileUploadParams(stream, key, bucketName);
            await this.s3.putObject(params).promise();
        } catch (err) {
            return console.log("Error", err);
        }
    };

   private createFileUploadParams = (body: S3.Body, key: string, bucketName: string = this.bucketName): PutObjectRequest => {
        return {
            Bucket: bucketName,
            Key: key,
            Body: body
        }
    };
}
