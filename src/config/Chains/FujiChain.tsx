import { Chain } from '@rainbow-me/rainbowkit';

export const FujiChain: Chain = {
  id: 43113,
  name: 'Avalanche FUJI Testnet',
  network: 'avalanche',
  iconUrl: 'https://cdn.enochdev.com/starget-bucket/public-signup-signin/avalanche.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX'
  },
  rpcUrls: {
    default: 'https://api.avax-test.network/ext/bc/C/rpc'
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io/' },
    etherscan: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io/' }
  },
  testnet: true
};