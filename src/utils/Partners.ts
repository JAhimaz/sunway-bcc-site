export type PartnerType = {
  id: string;
  name: string;
  logo: string;
  description: string;
  url?: string;
}

const partners = [
  {
    id: "aelf",
    name: "Aelf",
    logo: "aelf.png",
    description: `Aelf is a scalable, high-performance blockchain, empowering everyone to build diverse Web3 applications.`,
    url: "https://aelf.com/"
  },
  {
    id: "aptos",
    name: "Aptos",
    logo: "aptos.png",
    description: `Aptos is an independent Layer 1 blockchain platform focused on safety and scalability driving growth within a decentralized network and developer ecosystem.`,
    url: "https://aptosfoundation.org/"
  },
  {
    id: "coingecko",
    name: "CoinGecko",
    logo: "coingecko.png",
    description: `CoinGecko is a cryptocurrency data platform giving you a 360-degree overview of the market.`,
    url: "https://www.coingecko.com/"
  },
  {
    id: "etherscan",
    name: "Etherscan",
    logo: "etherscan.png",
    description: `Etherscan is a Block Explorer and Analytics Platform for Ethereum, a decentralized smart contracts platform.`,
    url: "https://etherscan.io/"
  },
  {
    id: "ilabs",
    name: "iLabs",
    logo: "ilabs.png",
    description: `Sunway iLabs is a unique smart partnership between Sunway Group and Sunway University who work closely together in a collaborative space to foster entrepreneurship and stimulate market-driven innovations.`,
    url: "https://innovationlabs.sunway.edu.my/"
  },
  {
    id: "luno",
    name: "Luno",
    logo: "luno.png",
    description: `Available in over 40 countries. Luno is a secure cryptocurrency platform that lets you buy, sell, store and trade BTC and ETH.`,
    url: "https://www.luno.com/"
  },
  {
    id: "near",
    name: "NEAR",
    logo: "near.png",
    description: `NEAR is the chain abstraction stack, empowering builders to create apps that scale to billions of users and across all blockchains. `,
    url: "https://near.org/"
  },
  {
    id: "solana",
    name: "Solana",
    logo: "solana.png",
    description: `Bring blockchain to the people. Solana supports experiences for power users, new consumers, and everyone in between.`,
    url: "https://solana.com/"
  },
  {
    id: "stakesaurus",
    name: "Stakesaurus",
    logo: "stakesaurus.png",
    description: `Helping aspiring home-stakers get started with their first ETH validator.`,
    url: "https://www.stakesaurus.com/"
  },
  {
    id: "token2049",
    name: "Token2049",
    logo: "token2049.png",
    description: `TOKEN2049 brings together the global crypto industry, uniting entrepreneurs, investors, developers, industry enthusiasts and global media - and creates unparalleled networking opportunities. This is the community that will define what’s next in the space.`,
    url: "https://www.token2049.com/"
  }
]

export default partners;