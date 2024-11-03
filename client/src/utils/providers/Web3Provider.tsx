"use client"

import { WagmiProvider, createConfig, http } from "wagmi";
import { polygon, polygonAmoy } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { createClient } from "viem";

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [polygon],
    transports: {
      // RPC URL for each chain
      [polygon.id]: http(
        `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      ),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID as string,

    // Required App Info
    appName: "Sunway Blockchain Club",

    // Optional App Info
    appDescription: "The Sunway Blockchain Club Application to view your profile and event details.",
    appUrl: "https://sunwayblockchain.com", 
    appIcon: "https://sunwayblockchain.com/favicon.ico",
  }),
);


const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};