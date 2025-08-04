/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aws-0-eu-west-2.pooler.supabase.com',
      },
      {
        protocol: 'https',
        hostname: 'myqrmfkldofkwiiovcdh.supabase.co',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "media-src 'self' https:",
              "connect-src 'self' https://westbourne-advisory-backend-production.up.railway.app https://aws-0-eu-west-2.pooler.supabase.com https://myqrmfkldofkwiiovcdh.supabase.co http://localhost:1337 https://vercel.live wss://vercel.live",
              "frame-ancestors 'none'",
            ].join('; ')
          }
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/strapi/:path*',
          destination: 'https://westbourne-advisory-backend-production.up.railway.app/api/:path*',
        },
      ],
    };
  },
}

module.exports = nextConfig;