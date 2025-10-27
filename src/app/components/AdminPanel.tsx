'use client';

import { useState } from 'react';
import { useCryptoUNAMContract } from '../hooks/useCryptoUNAMContract';
import { useAccount } from 'wagmi';

export default function AdminPanel() {
  const { address, isConnected } = useAccount();
  const { setMaxMintsPerAddress, maxMintsPerAddress } = useCryptoUNAMContract();
  const [newLimit, setNewLimit] = useState(10);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdateLimit = async () => {
    if (!isConnected) {
      setMessage('Por favor conecta tu wallet primero');
      return;
    }

    if (newLimit < 1 || newLimit > 100) {
      setMessage('El límite debe estar entre 1 y 100');
      return;
    }

    setIsUpdating(true);
    setMessage('');

    try {
      await setMaxMintsPerAddress(newLimit);
      setMessage(`✅ Límite actualizado exitosamente a ${newLimit} minteos por dirección`);
    } catch (error) {
      console.error('Error actualizando límite:', error);
      setMessage('❌ Error al actualizar el límite. Verifica que seas el owner del contrato.');
    } finally {
      setIsUpdating(false);
    }
  };

  // Solo mostrar si está conectado (el contrato verificará si es owner)
  if (!isConnected) {
    return null;
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
        Panel de Administración
      </h3>
      
      <div className="space-y-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-sm text-white/70 mb-2">Límite actual de minteos por dirección:</div>
          <div className="text-2xl font-bold text-white">{maxMintsPerAddress}</div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-white">
            Nuevo límite de minteos:
          </label>
          <div className="flex space-x-3">
            <input
              type="number"
              min="1"
              max="100"
              value={newLimit}
              onChange={(e) => setNewLimit(Number(e.target.value))}
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: 10"
            />
            <button
              onClick={handleUpdateLimit}
              disabled={isUpdating}
              className={`px-6 py-2 font-semibold rounded-lg transition-all duration-200 ${
                isUpdating
                  ? 'bg-gray-500 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
              }`}
            >
              {isUpdating ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Actualizando...</span>
                </div>
              ) : (
                'Actualizar Límite'
              )}
            </button>
          </div>
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm ${
            message.includes('✅') 
              ? 'bg-green-500/20 text-green-300 border border-green-500/30'
              : 'bg-red-500/20 text-red-300 border border-red-500/30'
          }`}>
            {message}
          </div>
        )}

        <div className="text-xs text-white/50">
          <p>⚠️ Solo el owner del contrato puede cambiar este límite.</p>
          <p>Dirección actual: {address}</p>
        </div>
      </div>
    </div>
  );
}
