"use client";
import dynamic from "next/dynamic";

const NetworkBackground = dynamic(() => import("@/components/network-background"), { ssr: false });

export default function NetworkBackgroundClient() {
  return <NetworkBackground />;
}
