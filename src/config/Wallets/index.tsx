import {
    argentWallet,
    braveWallet,
    coinbaseWallet,
    imTokenWallet,
    ledgerWallet,
    metaMaskWallet,
    omniWallet,
    trustWallet,
    injectedWallet,
    rainbowWallet,
    walletConnectWallet
  } from '@rainbow-me/rainbowkit/wallets';
  import GnosisWallet from './GnosisWallet';
  import TorusWallet from './TorusWallet';
  
  export const getRecommendedWallets = (chains: any) => {
    return [
      injectedWallet({ chains }),
      rainbowWallet({ chains }),
      walletConnectWallet({ chains }),
      TorusWallet({ chains }),
      GnosisWallet({ chains })
    ];
  };
  
  export const getOtherWallets = (chains: any) => {
    return [
      argentWallet({ chains }),
      braveWallet({ chains }),
      coinbaseWallet({ chains, appName: 'Enoch wallet' }),
      imTokenWallet({ chains }),
      ledgerWallet({ chains }),
      metaMaskWallet({ chains }),
      omniWallet({ chains }),
      trustWallet({ chains })
    ];
  };