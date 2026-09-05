import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
const hostedStudioUrl = (
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL?.startsWith("https://")
    ? process.env.NEXT_PUBLIC_SANITY_STUDIO_URL
    : "https://bsbisynagogue.sanity.studio"
).replace(/\/$/, "");

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
      "img-src 'self' data: blob: https://images.shulcloud.com https://cdn.sanity.io",
      "font-src 'self' data:",
      "connect-src 'self' ws: wss: https://*.api.sanity.io https://*.apicdn.sanity.io https://*.sanity.io",
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
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
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
      ...(isDev
        ? [
            { source: "/studio", destination: "http://localhost:3333", permanent: false },
            { source: "/studio/:path*", destination: "http://localhost:3333/:path*", permanent: false },
          ]
        : [
            { source: "/studio", destination: hostedStudioUrl, permanent: false },
            { source: "/studio/:path*", destination: `${hostedStudioUrl}/:path*`, permanent: false },
          ]),
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
