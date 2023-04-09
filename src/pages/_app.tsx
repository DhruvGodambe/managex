import { Navbar } from "@/components/core/navbar";
import "@/styles/globals.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { WagmiConfig } from "wagmi";
import { Config } from "../config/WalletConfig";
import {goerli, polygonMumbai} from "@wagmi/core/chains";
import "@/styles/Modal.css";

export default function App({ Component, pageProps }: AppProps) {
  const [initialChain, setInitialChain] = useState(polygonMumbai);

  const setDefaultChain = (newChain: any) => {
    setInitialChain(polygonMumbai);
  };

  return (
    <div>
      <WagmiConfig client={Config.client}>
        <RainbowKitProvider
          appInfo={Config.appInfo}
          chains={[polygonMumbai]}
          initialChain={initialChain}
          modalSize="compact"
          theme={Config.theme}
        >
          <Navbar />
          <ToastContainer theme="colored" draggable={false} />
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  )
}
