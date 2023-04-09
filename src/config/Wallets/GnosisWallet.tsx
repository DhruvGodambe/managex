import { Chain, Wallet, getWalletConnectConnector } from '@rainbow-me/rainbowkit';
export interface MyWalletOptions {
  chains: Chain[];
}

const GnosisWallet = ({ chains }: MyWalletOptions): Wallet => ({
  id: 'Gnosis-Wallet',
  name: 'Gnosis Wallet',
  iconUrl: 'https://miro.medium.com/max/1000/1*ZIYSw-qPVOT5ucrGJuVO3A.png',
  iconBackground: '#000000',
  downloadUrls: {
    android: 'https://gnosis-safe.io/',
    ios: 'https://gnosis-safe.io/',
    qrCode: 'https://gnosis-safe.io/'
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

export default GnosisWallet;