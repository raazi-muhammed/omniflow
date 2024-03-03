export type IGenerateVerificationCode = () => number;
export type IUploadImage = ({}: {
    mimetype: string;
    imageBuffer: Buffer;
}) => Promise<string>;
