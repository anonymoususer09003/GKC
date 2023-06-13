/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();

const nextConfig = {
    transpilePackages: ["@jitsi/react-sdk"],
};

module.exports = nextConfig;