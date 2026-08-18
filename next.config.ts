import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: isDev ? "SAMEORIGIN" : "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://images.shulcloud.com",
      "font-src 'self'",
      "connect-src 'self' ws: wss:",
      "frame-src https://www.google.com https://maps.google.com",
      `frame-ancestors ${isDev ? "'self'" : "'none'"}`,
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.shulcloud.com",
        pathname: "/1505/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/services", destination: "/times", permanent: true },
      { source: "/zmanim", destination: "/times", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/history", destination: "/about", permanent: true },
      { source: "/message-from-rabbi", destination: "/about", permanent: true },
      { source: "/message-from-president", destination: "/about", permanent: true },
      { source: "/staff", destination: "/about", permanent: true },
      { source: "/location", destination: "/locations", permanent: true },
      { source: "/visit-charleston.html", destination: "/visit", permanent: true },
      { source: "/faq-visiti-charleston.html", destination: "/visit", permanent: true },
      { source: "/eruv.html", destination: "/eruv", permanent: true },
      { source: "/mikvah.html", destination: "/mikvah", permanent: true },
      { source: "/kosher.html", destination: "/kosher", permanent: true },
      { source: "/hotels.html", destination: "/hotels", permanent: true },
      { source: "/sisterhood.html", destination: "/community", permanent: true },
      { source: "/brotherhood.html", destination: "/community", permanent: true },
      { source: "/chevra-kadisha.html", destination: "/community", permanent: true },
      { source: "/weekly-classes.html", destination: "/community", permanent: true },
      { source: "/membership.html", destination: "/membership", permanent: true },
      { source: "/rentals", destination: "/community", permanent: true },
      { source: "/schools", destination: "/community", permanent: true },
      { source: "/photo_gallery.php", destination: "/gallery", permanent: true },
    ];
  },
};

export default nextConfig;
