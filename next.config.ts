const nextConfig = {
  
  reactStrictMode: false,
 
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'unsplash.com' },
      { protocol: 'https', hostname: '**.unsplash.com' },
      { protocol: 'https', hostname: 'fourrays.s3.amazonaws.com' },
    ],
  },
};

export default nextConfig;
