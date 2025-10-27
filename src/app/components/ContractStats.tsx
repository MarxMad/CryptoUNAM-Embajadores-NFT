'use client';

import { useCryptoUNAMContract } from '../hooks/useCryptoUNAMContract';

export default function ContractStats() {
  const { stats, contractAddress } = useCryptoUNAMContract();

  if (!stats) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="animate-pulse">
          <div className="h-4 bg-white/20 rounded mb-2"></div>
          <div className="h-4 bg-white/20 rounded mb-2"></div>
          <div className="h-4 bg-white/20 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
        Estadísticas del Contrato
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-2xl font-bold text-white mb-1">{stats[0]?.toString() || '0'}</div>
          <div className="text-white/70 text-sm">NFTs Minteados</div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-2xl font-bold text-white mb-1">{stats[1]?.toString() || '0'}</div>
          <div className="text-white/70 text-sm">Propietarios Únicos</div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="text-white/70 text-sm mb-2">Dirección del Contrato:</div>
        <div className="bg-white/5 rounded-lg p-3 font-mono text-sm text-white/80 break-all">
          {contractAddress}
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={`https://sepolia.etherscan.io/address/${contractAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full hover:bg-blue-500/30 transition-colors"
        >
          Ver en Etherscan
        </a>
        <a
          href={`https://sepolia.etherscan.io/address/${contractAddress}#readContract`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full hover:bg-green-500/30 transition-colors"
        >
          Leer Contrato
        </a>
      </div>
    </div>
  );
}
