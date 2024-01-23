/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scenarios-bucket.s3.us-east-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
