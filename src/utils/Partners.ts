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
  },
  {
    id: "coinw",
    name: "CoinW",
    logo: "coinw.png",
    description: "Buy & Sell Crypto on CoinW, a Secure & Reliable Crypto Exchange, Low Fees, Wide Variety of Cryptocurrencies & Excellent Customer Support.",
    url: "https://www.coinw.com/frontweb/en_US"
  },
  {
    id: "coreum",
    name: "Coreum",
    logo: "coreum.png",
    description: "The World’s First Superledger. Enterprise-Grade Blockchain Solutions with Smart Tokens",
    url: "https://www.coreum.com/"
  },
  {
    id: "haya",
    name: "Haya Finance",
    logo: "haya.png",
    description: "In the long-term race against the market, few cross the finish line ahead. Even expert investors commonly lag behind market averages over prolonged periods. $H20 is Haya’s Zero-Fee on-chain ETF, giving you access to the top 20 Cryptocurrencies with just one token. Diversify your portfolio and invest with $H20.",
    url: "https://haya.finance/"
  },
  {
    id: "jupiter",
    name: "Jupiter Exchange",
    logo: "jupiterexchange.png",
    description: "Jupiter: The best swap aggregator on Solana. Built for smart traders who like money.",
    url: "https://jup.ag/"
  },
  {
    id: "malaysiablockchainweek",
    name: "Malaysia Blockchain Week",
    logo: "malaysiablockchainweek.png",
    description: "The HOTTEST premier blockchain event right in the hidden gem of Asia. Don't miss out on your opportunity to write the future of blockchain in Malaysia",
    url: "https://myblockchainweek.com/"
  },
  {
    id: "manta",
    name: "Manta Network",
    logo: "manta.png",
    description: "Manta Pacific Mainnet is Live · Manta Pacific is the first EVM-equivalent ZK-application platform that is scalable and secure through Celestia DA and Polygon",
    url: "https://manta.network/"
  },
  {
    id: "mdec",
    name: "MDEC",
    logo: "mdec.png",
    description: "Malaysia Digital Economy Corporation (MDEC), a government agency under the purview of the Ministry of Digital, was established in 1996",
    url: "https://mdec.my/"
  },
  {
    id: "metaschool",
    name: "Metaschool",
    logo: "metaschool.png",
    description: "Metaschool is one of the few ed-tech startups that is aimed at making Web3 education accessible to everyone.",
    url: "https://metaschool.so/"
  },
  {
    id: "shardeum",
    name: "Shardeum",
    logo: "shardeum.png",
    description: "Shardeum is an EVM-based, linearly scalable network offering low gas fees forever while maintaining true decentralization and solid security.",
    url: "https://shardeum.org/"
  },
  {
    id: "virtuals",
    name: "Virtuals Protocol",
    logo: "virtuals.png",
    description: "Dive into infinite adventure with Never Ending Games, where AI crafts dynamic scenario RPGs. Powered by cutting-edge technology, each quest adapts in real-time",
    url: "https://www.virtuals.io/"
  }
]

export default partners;