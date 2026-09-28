const staticAssetCache = [
  "/brands/:path*",
  "/categories/:path*",
  "/hits/:path*",
  "/products/:path*",
  "/why/:path*",
  "/logo-galaktika-v3.png",
  "/favicon-v2.png",
  "/apple-touch-icon-v2.png",
  "/preview-v2.jpg",
  "/hero-bg.png",
];

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.galaxyopt.ru" }],
        destination: "https://galaxyopt.ru/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return staticAssetCache.map((source) => ({
      source,
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    }));
  },
};

module.exports = nextConfig;
