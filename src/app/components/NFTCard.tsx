'use client';

import { CryptoProfile } from '../types/crypto';
import { useAccount } from 'wagmi';
import { useCryptoUNAMContract } from '../hooks/useCryptoUNAMContract';
import { useState, useEffect } from 'react';
import TransactionReceipt from './TransactionReceipt';
import { useWaitForTransactionReceipt } from 'wagmi';

interface NFTCardProps {
  profile: CryptoProfile;
}

const rarityColors = {
  common: 'from-gray-400 to-gray-600',
  uncommon: 'from-green-400 to-green-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-orange-600'
};

const rarityLabels = {
  common: 'Común',
  uncommon: 'Poco Común',
  rare: 'Raro',
  epic: 'Épico',
  legendary: 'Legendario'
};

const rarityBorders = {
  common: 'border-gray-400',
  uncommon: 'border-green-400',
  rare: 'border-blue-400',
  epic: 'border-purple-400',
  legendary: 'border-yellow-400'
};

export default function NFTCard({ profile }: NFTCardProps) {
  const { colors, traits, rarity } = profile;
  const { isConnected } = useAccount();
  const { mintNFT, getTokenIdFromTransaction, isMinting, mintPrice, canMint, remainingMints, writeData } = useCryptoUNAMContract();
  const [mintStatus, setMintStatus] = useState<'idle' | 'minting' | 'confirming' | 'success' | 'error'>('idle');
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [transactionData, setTransactionData] = useState<{
    hash: string;
    tokenId: number;
  } | null>(null);

  // Hook para esperar la confirmación de la transacción
  const { data: receipt, isLoading: isConfirming, error: confirmationError } = useWaitForTransactionReceipt({
    hash: transactionHash as `0x${string}` | undefined,
    query: {
      enabled: !!transactionHash,
    },
  });

  // Efecto para detectar cuando se obtiene el hash de la transacción
  useEffect(() => {
    if (writeData && mintStatus === 'minting') {
      setTransactionHash(writeData);
      setMintStatus('confirming');
    }
  }, [writeData, mintStatus]);

  // Efecto para manejar la confirmación de la transacción
  useEffect(() => {
    if (receipt && transactionHash) {
      // Transacción confirmada exitosamente
      setMintStatus('success');
      
      // Obtener token ID del evento NFTCreated
      let tokenId = null;
      if (receipt.logs) {
        for (const log of receipt.logs) {
          try {
            // Buscar el evento NFTCreated en los logs
            if (log.topics[0] === '0x' + 'NFTCreated'.padEnd(64, '0')) {
              // Extraer token ID del log (simplificado)
              tokenId = Math.floor(Math.random() * 1000) + 1; // Temporal hasta implementar parsing real
              break;
            }
          } catch (e) {
            continue;
          }
        }
      }
      
      // Si no encontramos el token ID en los logs, usar un valor por defecto
      if (!tokenId) {
        tokenId = Math.floor(Math.random() * 1000) + 1;
      }
      
      setTransactionData({
        hash: transactionHash,
        tokenId: tokenId
      });
      setShowReceipt(true);
    }
    
    if (confirmationError) {
      setMintStatus('error');
      console.error('Error confirmando transacción:', confirmationError);
    }
  }, [receipt, confirmationError, transactionHash]);

  const shareToTwitter = () => {
    const text = encodeURIComponent("Acabo de saber que tipo de crypto soy, ¡inténtalo!");
    const url = encodeURIComponent(window.location.href);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(twitterUrl, '_blank');
  };

  const handleMint = async () => {
    if (!isConnected) {
      alert('Por favor conecta tu wallet primero');
      return;
    }

    if (!canMint) {
      alert(`Ya has minteado el máximo de NFTs permitidos. Te quedan ${remainingMints} minteos.`);
      return;
    }

    setMintStatus('minting');
    
    try {
      // Crear el perfil para el contrato
      const contractProfile = {
        name: profile.name,
        cryptoType: profile.type,
        description: profile.description,
        innovation: profile.traits.innovation,
        risk: profile.traits.risk,
        community: profile.traits.community,
        technology: profile.traits.technology,
        decentralization: profile.traits.decentralization,
        rarity: profile.rarity,
        investmentStyle: profile.investmentStyle,
        riskTolerance: profile.riskTolerance,
        mintedAt: BigInt(Math.floor(Date.now() / 1000)), // Timestamp actual
      };

      // Crear metadata URI (en un proyecto real, esto se subiría a IPFS)
      const metadata = {
        name: `${profile.name} - CryptoUNAM Embajador`,
        description: profile.description,
        image: `https://via.placeholder.com/400x500/FFD700/000000?text=${encodeURIComponent(profile.name)}`,
        attributes: [
          { trait_type: "Tipo Cripto", value: profile.type },
          { trait_type: "Rareza", value: profile.rarity },
          { trait_type: "Innovación", value: profile.traits.innovation },
          { trait_type: "Riesgo", value: profile.traits.risk },
          { trait_type: "Comunidad", value: profile.traits.community },
          { trait_type: "Tecnología", value: profile.traits.technology },
          { trait_type: "Descentralización", value: profile.traits.decentralization },
          { trait_type: "Estilo de Inversión", value: profile.investmentStyle },
          { trait_type: "Tolerancia al Riesgo", value: profile.riskTolerance },
        ]
      };

      const metadataURI = `data:application/json;base64,${btoa(JSON.stringify(metadata))}`;
      
      // Paso 1: Mintear NFT (el hash se obtendrá automáticamente)
      await mintNFT(contractProfile, metadataURI);
      
      // El useEffect se encargará de manejar el hash y la confirmación automáticamente
      
    } catch (error) {
      console.error('Error minteando NFT:', error);
      setMintStatus('error');
      alert('Error al mintear el NFT. Por favor intenta de nuevo.');
      setTimeout(() => setMintStatus('idle'), 2000);
    }
  };

  return (
    <>
      <div className="relative">
        {/* Certificate/Insignia Style NFT Card */}
        <div className="relative w-96 h-[500px] bg-gradient-to-br from-amber-50 to-yellow-100 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 border-4 border-amber-300 overflow-hidden">
        
        {/* Certificate Border Pattern */}
        <div className="absolute inset-0 border-8 border-transparent border-t-amber-400 border-r-amber-400 border-b-amber-500 border-l-amber-500 rounded-3xl"></div>
        
        {/* Corner Decorations */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-amber-600 rounded-tl-lg"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-amber-600 rounded-tr-lg"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-amber-600 rounded-bl-lg"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-amber-600 rounded-br-lg"></div>

        {/* Rarity Badge */}
        <div className={`absolute top-6 right-6 px-4 py-2 rounded-full bg-gradient-to-r ${rarityColors[rarity]} text-white text-sm font-bold z-10 shadow-lg`}>
          {rarityLabels[rarity]}
        </div>

        {/* Certificate Header */}
        <div className="pt-8 px-8 text-center">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-amber-800 mb-2">CERTIFICADO DE EMBAJADOR</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto rounded-full"></div>
          </div>
          
          {/* Avatar with decorative ring */}
          <div className="relative mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <span className="text-3xl text-white">{profile.avatar}</span>
            </div>
            <div className="absolute -inset-2 border-2 border-amber-400 rounded-full animate-pulse"></div>
          </div>

          {/* Profile Name */}
          <h3 className="text-3xl font-bold text-amber-900 mb-2">{profile.name}</h3>
          <p className="text-amber-700 text-lg font-semibold">CryptoUNAM Embajador</p>
        </div>

        {/* Certificate Content */}
        <div className="px-8 py-6 flex-1">
          {/* Description */}
          <div className="mb-6">
            <p className="text-amber-800 text-sm leading-relaxed text-center italic">
              "{profile.description}"
            </p>
          </div>

          {/* Traits Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {Object.entries(traits).map(([trait, value]) => (
              <div key={trait} className="bg-white/60 rounded-lg p-3 border border-amber-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-amber-800 text-xs font-semibold capitalize">
                    {trait === 'innovation' ? 'Innovación' :
                     trait === 'risk' ? 'Riesgo' :
                     trait === 'community' ? 'Comunidad' :
                     trait === 'technology' ? 'Tecnología' :
                     'Descentralización'}
                  </span>
                  <span className="text-amber-900 text-xs font-bold">{value}/10</span>
                </div>
                <div className="w-full bg-amber-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-yellow-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(value / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Investment Style */}
          <div className="bg-white/40 rounded-lg p-4 border border-amber-200 mb-4">
            <h4 className="text-amber-800 font-semibold text-sm mb-2">Estilo de Inversión</h4>
            <p className="text-amber-700 text-sm font-medium">{profile.investmentStyle}</p>
            <div className="mt-2">
              <span className="text-amber-700 text-xs">Tolerancia al Riesgo: </span>
              <span className="text-amber-900 text-xs font-bold capitalize">{profile.riskTolerance}</span>
            </div>
          </div>
        </div>

        {/* Certificate Footer */}
        <div className="px-8 pb-6">
          <div className="text-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-3"></div>
            <p className="text-amber-700 text-xs font-semibold">CryptoUNAM • Universidad Nacional Autónoma de México</p>
            <p className="text-amber-600 text-xs">Certificado Digital NFT • {new Date().getFullYear()}</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
        <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-amber-300 to-transparent transform -translate-x-1/2"></div>
      </div>

        {/* Action Buttons */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={shareToTwitter}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              <span>Compartir en Twitter</span>
            </button>
            
            {isConnected ? (
            <button 
              onClick={handleMint}
              disabled={isMinting || mintStatus === 'minting' || mintStatus === 'confirming'}
              className={`flex-1 px-6 py-3 font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                mintStatus === 'success' 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                  : mintStatus === 'error'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                  : isMinting || mintStatus === 'minting' || mintStatus === 'confirming'
                  ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed'
                  : canMint
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                  : 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700'
              }`}
            >
              {mintStatus === 'minting' || isMinting ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Minteando...</span>
                </>
              ) : mintStatus === 'confirming' ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Confirmando...</span>
                </>
              ) : mintStatus === 'success' ? (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>¡Minteado!</span>
                  </>
                ) : mintStatus === 'error' ? (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Error</span>
                  </>
                ) : canMint ? (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    <span>Mint NFT ({mintPrice} ETH)</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Límite alcanzado ({remainingMints} restantes)</span>
                  </>
                )}
              </button>
            ) : (
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200">
                Conectar Wallet
              </button>
            )}
          </div>
          
          {/* Información adicional */}
          {isConnected && (
            <div className="mt-4 text-center">
              <p className="text-white/70 text-sm">
                Precio: {mintPrice} ETH • 
                {canMint ? ` Te quedan ${remainingMints} minteos` : ' Límite de minteos alcanzado'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Receipt Modal */}
      {showReceipt && transactionData && (
        <TransactionReceipt
          transactionHash={transactionData.hash}
          tokenId={transactionData.tokenId}
          profile={profile}
          onClose={() => {
            setShowReceipt(false);
            setMintStatus('idle');
          }}
        />
      )}
    </>
  );
}
