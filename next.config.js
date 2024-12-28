/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    // Check if there's any misconfiguration here
    return config;
  },
  experimental: {
    // appDir: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com", "cdn.sanity.io"],
  },
};
