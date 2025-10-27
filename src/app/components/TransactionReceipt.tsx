'use client';

import { useState } from 'react';

interface TransactionReceiptProps {
  transactionHash: string;
  tokenId: number;
  profile: any;
  onClose: () => void;
}

export default function TransactionReceipt({ 
  transactionHash, 
  tokenId, 
  profile, 
  onClose 
}: TransactionReceiptProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  const openInSepoliaScan = () => {
    window.open(`https://sepolia.etherscan.io/tx/${transactionHash}`, '_blank');
  };

  const openNFTInSepoliaScan = () => {
    window.open(`https://sepolia.etherscan.io/token/0x401e5f040842f487c875aac83d164ad3d62e7b36?a=${tokenId}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold">¡NFT Minteado Exitosamente!</h2>
                <p className="text-green-100">Transacción confirmada en Sepolia</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* NFT Preview */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center text-2xl">
                {profile.avatar}
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-800">{profile.name}</h3>
                <p className="text-amber-600">{profile.type}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    profile.rarity === 'legendary' ? 'bg-purple-100 text-purple-800' :
                    profile.rarity === 'epic' ? 'bg-blue-100 text-blue-800' :
                    profile.rarity === 'rare' ? 'bg-green-100 text-green-800' :
                    profile.rarity === 'uncommon' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {profile.rarity.toUpperCase()}
                  </span>
                  <span className="text-amber-600 text-sm">Token ID: #{tokenId}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Detalles de la Transacción</h4>
            
            {/* Transaction Hash */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hash de Transacción</p>
                  <p className="text-sm text-gray-800 font-mono break-all">
                    {transactionHash}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(transactionHash)}
                    className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                  >
                    {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                  <button
                    onClick={openInSepoliaScan}
                    className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                  >
                    Ver en Etherscan
                  </button>
                </div>
              </div>
            </div>

            {/* Contract Address */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Dirección del Contrato</p>
                  <p className="text-sm text-gray-800 font-mono">
                    0x401e5f040842f487c875aac83d164ad3d62e7b36
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard('0x401e5f040842f487c875aac83d164ad3d62e7b36')}
                  className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                >
                  Copiar
                </button>
              </div>
            </div>

            {/* Network Info */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-800">Red</p>
                  <p className="text-sm text-blue-600">Ethereum Sepolia Testnet</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={openInSepoliaScan}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Ver Transacción</span>
            </button>
            
            <button
              onClick={openNFTInSepoliaScan}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Ver NFT</span>
            </button>
          </div>

          {/* Share Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <h5 className="text-sm font-semibold text-purple-800 mb-2">¡Comparte tu NFT!</h5>
            <p className="text-sm text-purple-600 mb-3">
              Muestra al mundo tu perfil cripto único de CryptoUNAM
            </p>
            <button
              onClick={() => {
                const text = `¡Acabo de mintear mi NFT de CryptoUNAM! Soy un ${profile.name} 🚀\n\nToken ID: #${tokenId}\nVer en Etherscan: https://sepolia.etherscan.io/tx/${transactionHash}`;
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                window.open(twitterUrl, '_blank');
              }}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              <span>Compartir en Twitter</span>
            </button>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
            <p>Tu NFT está ahora almacenado permanentemente en la blockchain de Ethereum</p>
            <p className="mt-1">¡Felicidades por ser parte de la comunidad CryptoUNAM! 🎉</p>
          </div>
        </div>
      </div>
    </div>
  );
}
