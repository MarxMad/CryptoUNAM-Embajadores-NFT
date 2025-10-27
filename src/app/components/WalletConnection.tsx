'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export default function WalletConnection() {
  const { isConnected, address } = useAccount();

  return (
    <div className="flex items-center space-x-4">
      <ConnectButton />
      {isConnected && (
        <div className="text-sm text-white/80">
          <span className="hidden sm:inline">Conectado: </span>
          <span className="font-mono">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>
      )}
    </div>
  );
}
