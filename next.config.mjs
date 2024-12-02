/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['btt.triumphdigital.co.th'], // Add allowed image domains
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL, // For example, define the API base URL
  },
};

export default nextConfig;
