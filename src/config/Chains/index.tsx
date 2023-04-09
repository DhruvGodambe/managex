import {avalancheFuji, goerli, polygonMumbai, polygon, mainnet } from "@wagmi/core/chains";

export const allChains = [
  mainnet,
  polygon,
  polygonMumbai
];
export const testnetChains = [ polygonMumbai];
export const mainnetChains = [mainnet, polygon];

export const appChains = {
  allChains,
  testnetChains,
  mainnetChains
};