/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();

const nextConfig = {
  transpilePackages: ['@jitsi/react-sdk'],
  images: {
    domains: ['gkc-images.s3.amazonaws.com'], // Add your domain or external image source domain here
  },
};

module.exports = nextConfig;
