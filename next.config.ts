import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

// Allow the addresses used to open this dev server on the local network.
// Read them at startup so a Wi-Fi/DHCP address change needs no code edit.
const localAddresses = Object.values(networkInterfaces()).flatMap((addresses) =>
  (addresses ?? [])
    .filter((address) => address.family === "IPv4" && !address.internal)
    .map((address) => address.address),
);

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", ...localAddresses],
};

export default nextConfig;
