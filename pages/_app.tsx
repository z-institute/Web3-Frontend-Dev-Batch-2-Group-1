import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "buffer";

import { WagmiConfig, createConfig, mainnet } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
} from "connectkit";
import { arbitrum, optimism, polygon } from "wagmi/chains";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

    // Required
    appName: "Cross-Chain Wallet Verifier",

    // Optional
    appDescription: "Cross-Chain wallet verifier with GHO support",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)

    chains: [mainnet, polygon, optimism, arbitrum],
  })
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <Component {...pageProps} />
        <ConnectKitButton />
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
