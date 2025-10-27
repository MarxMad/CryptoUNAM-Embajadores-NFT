'use client';

import { useState } from 'react';
import CryptoPersonalityTest from './components/CryptoPersonalityTest';
import NFTCard from './components/NFTCard';
import WalletConnection from './components/WalletConnection';
import ContractStats from './components/ContractStats';
import AdminPanel from './components/AdminPanel';
import { CryptoProfile } from './types/crypto';

export default function Home() {
  const [cryptoProfile, setCryptoProfile] = useState<CryptoProfile | null>(null);
  const [showTest, setShowTest] = useState(true);

  const handleTestComplete = (profile: CryptoProfile) => {
    setCryptoProfile(profile);
    setShowTest(false);
  };

  const resetTest = () => {
    setCryptoProfile(null);
    setShowTest(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">CryptoUNAM Embajadores</h1>
                <p className="text-sm text-white/70">Universidad Nacional Autónoma de México</p>
              </div>
            </div>
            <WalletConnection />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {showTest ? (
          <div className="text-center mb-12">
            {/* Hero Section */}
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 shadow-lg">
                <span className="text-white text-3xl">🎓</span>
              </div>
              <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                ¿Qué tipo de <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Crypto</span> eres?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                Descubre tu perfil cripto único y obtén tu <span className="font-semibold text-yellow-300">certificado NFT</span> como embajador oficial de CryptoUNAM
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white mb-1">10</div>
                  <div className="text-white/70 text-sm">Perfiles Únicos</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white mb-1">5</div>
                  <div className="text-white/70 text-sm">Niveles de Rareza</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white mb-1">100%</div>
                  <div className="text-white/70 text-sm">Gratuito</div>
                </div>
              </div>
            </div>

            <CryptoPersonalityTest onComplete={handleTestComplete} />
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-4 shadow-lg">
                <span className="text-white text-2xl">🎉</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                ¡Tu Certificado NFT está listo!
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Has completado el análisis de personalidad cripto. Tu certificado único como embajador de CryptoUNAM está generado.
              </p>
            </div>
            
            {cryptoProfile && (
              <div className="flex flex-col items-center space-y-8">
                <NFTCard profile={cryptoProfile} />
                <button
                  onClick={resetTest}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Crear otro Certificado
                </button>
              </div>
            )}
          </div>
        )}

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-white text-2xl">🎯</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Análisis Personalizado</h3>
            <p className="text-white/70 leading-relaxed">
              Descubre tu perfil cripto único basado en tus preferencias de inversión, tolerancia al riesgo y visión tecnológica
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-white text-2xl">🏆</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Certificado NFT Único</h3>
            <p className="text-white/70 leading-relaxed">
              Cada embajador recibe un certificado NFT personalizado con su perfil cripto, nivel de rareza y características únicas
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-white text-2xl">🚀</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Comunidad CryptoUNAM</h3>
            <p className="text-white/70 leading-relaxed">
              Únete a la comunidad de embajadores más innovadora del ecosistema cripto universitario en México
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
            <h3 className="text-3xl font-bold text-white mb-4">
              ¿Listo para descubrir tu perfil cripto?
            </h3>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Únete a miles de estudiantes y profesionales que ya descubrieron su identidad en el mundo cripto
            </p>
            {showTest && (
              <div className="text-sm text-white/60">
                ⬆️ Responde el test de arriba para comenzar
              </div>
            )}
          </div>
        </div>

        {/* Panel de Administración */}
        <div className="mt-12 max-w-4xl mx-auto">
          <AdminPanel />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-white font-semibold">CryptoUNAM Embajadores</span>
            </div>
            <p className="text-white/60 text-sm">
              Universidad Nacional Autónoma de México • {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
