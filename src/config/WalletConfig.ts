import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, connectorsForWallets, darkTheme } from '@rainbow-me/rainbowkit';

import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { allChains, appChains } from './Chains/index';
import myCustomTheme from './Themes/myCustomTheme';
import { getRecommendedWallets, getOtherWallets } from './Wallets/index';
let supportedChains;

const walletConfig = {
  walletEnv: process.env.NEXT_PUBLIC_APP_ENVIRONMENT || 'mainnet'
};

if (walletConfig.walletEnv && walletConfig.walletEnv.toLowerCase() == 'mainnet') {
  supportedChains = appChains.mainnetChains;
} else {
  supportedChains = appChains.testnetChains;
}

const { chains, provider } = configureChains(appChains.testnetChains, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHECMY_RPC_URL || '' }),
  publicProvider()
]);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: getRecommendedWallets(chains)
  },
  {
    groupName: 'Others',
    wallets: getOtherWallets(chains)
  }
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

const appInfo = {
  appName: 'Enoch App',
  learnMoreUrl: 'https://www.enochdev.com/'
};

export const Config = {
  client: wagmiClient,
  appInfo: appInfo,
  supportedChains: chains,
  theme: myCustomTheme
};
