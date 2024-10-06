// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       domains: ['vvvlpyyvmavjdmfrkqvw.supabase.co'],
//     },
//   };
  
//   export default nextConfig;
  
// /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vvvlpyyvmavjdmfrkqvw.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
