import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // La landing es 100 % estática: `npm run build` genera la carpeta `out/`,
  // que es lo que Cloudflare publica (build command: `npm run build`,
  // output directory: `out`).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
