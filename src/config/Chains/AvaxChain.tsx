import { Chain } from '@rainbow-me/rainbowkit';

export const AvaxChain: Chain = {
  id: 43114,
  name: 'Avalanche Mainnet',
  network: 'avalanche',
  iconUrl: 'https://cdn.enochdev.com/starget-bucket/public-signup-signin/avalanche.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX'
  },
  rpcUrls: {
    default: 'https://api.avax.network/ext/bc/C/rpc'
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io/' },
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io/' }
  },
  testnet: false
};