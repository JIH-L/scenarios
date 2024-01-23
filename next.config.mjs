/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
  images: {
    domains: ['scenarios-bucket.s3.amazonaws.com'],
  },
};

export default nextConfig;
