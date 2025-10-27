import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, arbitrum, optimism, base, sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'CryptoUNAM Embajadores',
  projectId: 'YOUR_PROJECT_ID', // Get this from WalletConnect Cloud
  chains: [mainnet, polygon, arbitrum, optimism, base, sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
