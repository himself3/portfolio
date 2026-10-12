/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a verification build run alongside `next dev` without clobbering its .next folder.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  experimental: {
    // Icon packs export thousands of components; this rewrites imports so only the
    // icons actually used are compiled (otherwise the dev bundle balloons to ~67 MB).
    optimizePackageImports: [
      'lucide-react',
      'react-icons/si',
      'react-icons/fa6',
      'react-icons/lu',
      'react-icons/tb',
      'react-icons/vsc',
      'framer-motion',
    ],
  },
}

module.exports = nextConfig
