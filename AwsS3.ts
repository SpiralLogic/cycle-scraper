import * as S3 from 'aws-sdk/clients/s3';
import {Metadata, PutObjectRequest} from "aws-sdk/clients/s3";

type Body = S3.Body;
type UploadParams=PutObjectRequest;

export class AwsS3 {
    private readonly bucketName: string;
    private s3: S3;

    constructor(bucketName: string) {
        this.bucketName = bucketName;
        this.s3 = new S3({apiVersion: '2006-03-01', region: 'ap-southeast-2'})
    }

    uploadToBucket = async (body: Body, params:UploadParams) => {
        try {
            params.Body=body;
            await this.s3.putObject(params).promise();
        } catch (err) {
            return console.log("Error", err);
        }
    };

     createUploadParams = (key: string, metadata: Metadata):UploadParams => {
        return {
            Bucket: this.bucketName,
            Key: key,
            Metadata:metadata
        }
    };
}
