import { Chain } from '@rainbow-me/rainbowkit';

export const BinanceTestnetChain: Chain = {
  id: 97,
  name: 'Binance Testnet',
  network: 'binance testnet',
  iconUrl: 'https://cdn.enochdev.com/starget-bucket/public-signup-signin/binance.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Binance Coin',
    symbol: 'BNB'
  },
  rpcUrls: {
    default: 'https://data-seed-prebsc-1-s3.binance.org:8545'
  },
  blockExplorers: {
    default: { name: 'Binance explorer', url: 'https://testnet.bscscan.com/' },
    etherscan: { name: 'Binance explorer', url: 'https://testnet.bscscan.com/' }
  },
  testnet: true
};