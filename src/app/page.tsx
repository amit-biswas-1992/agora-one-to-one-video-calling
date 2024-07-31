"use client";
import dynamic from "next/dynamic";
import App from "@/agora/App";
import AgoraRTC from "agora-rtc-sdk-ng";

// Dynamic import to disable SSR for AgoraRTCProvider
const AgoraRTCProvider = dynamic(
  () => import("agora-rtc-react").then((mod) => mod.AgoraRTCProvider),
  { ssr: false }
);

export default function Home() {
  const agoraConfig: any = {
    // codec: "h264",
    codec: "vp8",
    mode: "rtc",
  };
  const client: any = AgoraRTC.createClient(agoraConfig);

  if (!client) {
    return <p>Loading...</p>;
  }

  return (
    <AgoraRTCProvider client={client}>
      <App />
    </AgoraRTCProvider>
  );
}
