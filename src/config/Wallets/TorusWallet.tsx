import { Chain, Wallet, getWalletConnectConnector } from '@rainbow-me/rainbowkit';
export interface MyWalletOptions {
  chains: Chain[];
}

const TorusWallet = ({ chains }: MyWalletOptions): Wallet => ({
  id: 'Torus-Wallet',
  name: 'Torus Wallet',
  iconUrl: 'https://tor.us/images/Wallet.svg',
  iconBackground: '#000000',
  downloadUrls: {
    android: 'https://tor.us/',
    ios: 'https://tor.us/',
    qrCode: 'https://tor.us/'
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ chains });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return uri;
        }
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl: 'https://my-wallet/learn-more',
          steps: [
            {
              description:
                'We recommend putting My Wallet on your home screen for faster access to your wallet.',
              step: 'install',
              title: 'Open the My Wallet app'
            },
            {
              description:
                'After you scan, a connection prompt will appear for you to connect your wallet.',
              step: 'scan',
              title: 'Tap the scan button'
            }
          ]
        }
      }
    };
  }
});

export default TorusWallet;