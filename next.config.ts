 

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.pexels.com",
//       },
//     ],
//   },

//   // 🔥 ADD THIS
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
} as unknown as NextConfig;

export default nextConfig;