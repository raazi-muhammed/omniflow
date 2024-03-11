import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { loadEnv } from "@omniflow/common";
import crypto from "crypto";

const randomImageName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString("hex");

const {
    BUCKET_NAME,
    BUCKET_REGION,
    AWS_SECRET_KEY,
    AWS_ACCESS_KEY,
    RESIZED_IMAGE_BUCKET_NAME,
} = loadEnv([
    "BUCKET_NAME",
    "BUCKET_REGION",
    "AWS_SECRET_KEY",
    "AWS_ACCESS_KEY",
    "RESIZED_IMAGE_BUCKET_NAME",
]);

const s3 = new S3Client({
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    },
    region: BUCKET_REGION,
});

export async function uploadImageToS3({
    mimetype,
    imageBuffer,
}: {
    mimetype: string;
    imageBuffer: Buffer;
}) {
    const imageName = randomImageName();

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: imageName,
        Body: imageBuffer,
        ContentType: mimetype,
    });

    await s3.send(command);
    const url = `https://${RESIZED_IMAGE_BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/${imageName}`;
    return url;
}
