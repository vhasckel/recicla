/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    serverComponentsExternalPackages: ['pg', 'pg-hstore'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, 'pg', 'pg-hstore'];
      config.module.noParse = /^(pg|pg-hstore)$/;
    }
    return config;
  },
  images: {
    domains: ['api.mapbox.com'],
  },
};

export default nextConfig;
