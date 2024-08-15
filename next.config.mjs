/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/',
          destination: '/pages',
        },
      ]
    },
  }
  
  export default nextConfig
