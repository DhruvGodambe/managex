import {avalancheFuji, goerli, polygonMumbai, polygon, mainnet } from "@wagmi/core/chains";
import { AvaxChain } from './AvaxChain';
import { FujiChain } from './FujiChain';
import { BinanceMainnetChain } from './BinanceMainnetChain';
import { BinanceTestnetChain } from './BinanceTestnetChain';

export const allChains = [
  goerli,
  mainnet,
  polygon,
  polygonMumbai,
  AvaxChain,
  FujiChain,
  BinanceMainnetChain,
  BinanceTestnetChain
];
export const testnetChains = [ polygonMumbai];
export const mainnetChains = [mainnet, polygon, AvaxChain, BinanceMainnetChain];

export const appChains = {
  allChains,
  testnetChains,
  mainnetChains
};