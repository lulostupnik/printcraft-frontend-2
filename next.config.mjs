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
    domains: [
      '794e1880-5860-4a69-9aab-68875eb23608-dev.e1-us-cdp-2.choreoapis.dev',
      'vvvlpyyvmavjdmfrkqvw.supabase.co'
    ]
  },
};

export default nextConfig;
