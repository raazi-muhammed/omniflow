import {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import sharp from "sharp";

const S3 = new S3Client();
const DEST_BUCKET = process.env.DEST_BUCKET;
const THUMBNAIL_WIDTH = 1080;

export const handler = async (event, context) => {
    const { eventTime, s3 } = event.Records[0];
    const srcBucket = s3.bucket.name;

    // Object key may have spaces or unicode non-ASCII characters
    const srcKey = decodeURIComponent(s3.object.key.replace(/\+/g, " "));

    console.log(`${eventTime} - ${srcBucket}/${srcKey}`);

    // Get the image from the source bucket
    try {
        const { Body, ContentType } = await S3.send(
            new GetObjectCommand({
                Bucket: srcBucket,
                Key: srcKey,
            })
        );
        const image = await Body.transformToByteArray();

        const outputBuffer = await sharp(image)
            .resize({
                height: THUMBNAIL_WIDTH,
                width: THUMBNAIL_WIDTH,
                fit: "cover",
            })
            .toBuffer();

        // store new image in the destination bucket
        await S3.send(
            new PutObjectCommand({
                Bucket: DEST_BUCKET,
                Key: srcKey,
                Body: outputBuffer,
                ContentType,
            })
        );
        const message = `Successfully resized ${srcBucket}/${srcKey} and uploaded to ${DEST_BUCKET}/${srcKey}`;
        console.log(message);
        return {
            statusCode: 200,
            body: message,
        };
    } catch (error) {
        console.log(error);
    }
};
