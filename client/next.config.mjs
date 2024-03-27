/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "omniflow-images.s3.eu-north-1.amazonaws.com",
            "omniflow-images-resized.s3.eu-north-1.amazonaws.com",
            "aceternity.com",
        ],
    },
};

export default nextConfig;
