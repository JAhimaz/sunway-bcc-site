"use client"

import { WagmiProvider, createConfig, http } from "wagmi";
import { polygon, polygonAmoy } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { defineChain } from "viem";

const AbstractMainnet = defineChain({
  id: 2741,
  name: 'Abstract',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://api.mainnet.abs.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'ABScan',
      url: 'https://abscan.org/',
      apiUrl: 'https://api.abscan.org/api',
    },
  }
})


export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [AbstractMainnet, polygon],
    transports: {
      // RPC URL for each chain
      [polygon.id]: http(
        `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      ),
      [AbstractMainnet.id]: http(
        `https://abstract-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
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

