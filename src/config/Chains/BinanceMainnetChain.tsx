import { Chain } from '@rainbow-me/rainbowkit';

export const BinanceMainnetChain: Chain = {
  id: 56,
  name: 'Binance Mainnet',
  network: 'binance mainnet',
  iconUrl: 'https://cdn.enochdev.com/starget-bucket/public-signup-signin/binance.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Binance Coin',
    symbol: 'BNB'
  },
  rpcUrls: {
    default: 'https://bsc-dataseed1.binance.org'
  },
  blockExplorers: {
    default: { name: 'Binance explorer', url: 'https://testnet.bscscan.com/' },
    etherscan: { name: 'Binance explorer', url: 'https://testnet.bscscan.com/' }
  },
  testnet: false
};