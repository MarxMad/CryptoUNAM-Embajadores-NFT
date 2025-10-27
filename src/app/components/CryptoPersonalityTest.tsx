'use client';

import { useState } from 'react';
import { CryptoProfile, TestQuestion, CryptoTraits, CryptoType, RarityLevel } from '../types/crypto';

interface CryptoPersonalityTestProps {
  onComplete: (profile: CryptoProfile) => void;
}

const questions: TestQuestion[] = [
  {
    id: '1',
    question: '¿Cuál es tu enfoque principal en criptomonedas?',
    category: 'investment',
    options: [
      {
        id: 'a',
        text: 'Bitcoin como reserva de valor',
        scores: { innovation: 3, risk: 2, community: 7, technology: 4, decentralization: 9 },
        type: 'bitcoin-maximalist'
      },
      {
        id: 'b',
        text: 'Ethereum y aplicaciones descentralizadas',
        scores: { innovation: 8, risk: 6, community: 8, technology: 9, decentralization: 7 },
        type: 'ethereum-evangelist'
      },
      {
        id: 'c',
        text: 'Protocolos DeFi y yield farming',
        scores: { innovation: 9, risk: 8, community: 6, technology: 8, decentralization: 6 },
        type: 'defi-degen'
      },
      {
        id: 'd',
        text: 'NFTs y arte digital',
        scores: { innovation: 7, risk: 5, community: 9, technology: 6, decentralization: 5 },
        type: 'nft-collector'
      }
    ]
  },
  {
    id: '2',
    question: '¿Cómo manejas el riesgo en tus inversiones?',
    category: 'risk',
    options: [
      {
        id: 'a',
        text: 'Solo inversiones seguras y establecidas',
        scores: { innovation: 2, risk: 1, community: 5, technology: 3, decentralization: 6 },
        type: 'hodler-conservative'
      },
      {
        id: 'b',
        text: 'Equilibrio entre riesgo y estabilidad',
        scores: { innovation: 5, risk: 4, community: 6, technology: 6, decentralization: 7 },
        type: 'dao-governor'
      },
      {
        id: 'c',
        text: 'Busco proyectos de alto riesgo y alta recompensa',
        scores: { innovation: 9, risk: 9, community: 4, technology: 7, decentralization: 5 },
        type: 'defi-degen'
      },
      {
        id: 'd',
        text: 'Me enfoco en la tecnología, no en el precio',
        scores: { innovation: 8, risk: 6, community: 7, technology: 9, decentralization: 8 },
        type: 'ethereum-evangelist'
      }
    ]
  },
  {
    id: '3',
    question: '¿Qué aspecto de la tecnología blockchain te emociona más?',
    category: 'technology',
    options: [
      {
        id: 'a',
        text: 'Escalabilidad y soluciones Layer 2',
        scores: { innovation: 8, risk: 5, community: 5, technology: 9, decentralization: 6 },
        type: 'layer2-scaling'
      },
      {
        id: 'b',
        text: 'Privacidad y transacciones anónimas',
        scores: { innovation: 7, risk: 7, community: 4, technology: 8, decentralization: 9 },
        type: 'privacy-focused'
      },
      {
        id: 'c',
        text: 'Gaming y metaverso',
        scores: { innovation: 6, risk: 6, community: 8, technology: 7, decentralization: 4 },
        type: 'gaming-crypto'
      },
      {
        id: 'd',
        text: 'Gobernanza descentralizada y DAOs',
        scores: { innovation: 7, risk: 4, community: 9, technology: 6, decentralization: 8 },
        type: 'dao-governor'
      }
    ]
  },
  {
    id: '4',
    question: '¿Cómo participas en la comunidad cripto?',
    category: 'community',
    options: [
      {
        id: 'a',
        text: 'Soy un hodler silencioso',
        scores: { innovation: 3, risk: 2, community: 3, technology: 4, decentralization: 7 },
        type: 'hodler-conservative'
      },
      {
        id: 'b',
        text: 'Participo activamente en DAOs',
        scores: { innovation: 6, risk: 5, community: 9, technology: 6, decentralization: 8 },
        type: 'dao-governor'
      },
      {
        id: 'c',
        text: 'Colecciono NFTs únicos',
        scores: { innovation: 5, risk: 4, community: 8, technology: 5, decentralization: 4 },
        type: 'nft-collector'
      },
      {
        id: 'd',
        text: 'Busco constantemente nuevos protocolos',
        scores: { innovation: 9, risk: 8, community: 5, technology: 8, decentralization: 6 },
        type: 'defi-degen'
      }
    ]
  },
  {
    id: '5',
    question: '¿Cuál es tu visión del futuro de las criptomonedas?',
    category: 'innovation',
    options: [
      {
        id: 'a',
        text: 'Bitcoin será la moneda global',
        scores: { innovation: 4, risk: 3, community: 6, technology: 5, decentralization: 8 },
        type: 'bitcoin-maximalist'
      },
      {
        id: 'b',
        text: 'Ethereum será la base de la web3',
        scores: { innovation: 8, risk: 6, community: 7, technology: 9, decentralization: 7 },
        type: 'ethereum-evangelist'
      },
      {
        id: 'c',
        text: 'DeFi reemplazará el sistema financiero tradicional',
        scores: { innovation: 9, risk: 7, community: 6, technology: 8, decentralization: 6 },
        type: 'defi-degen'
      },
      {
        id: 'd',
        text: 'Los NFTs transformarán la propiedad digital',
        scores: { innovation: 7, risk: 5, community: 8, technology: 6, decentralization: 5 },
        type: 'nft-collector'
      }
    ]
  }
];

const cryptoProfiles: Record<CryptoType, Partial<CryptoProfile>> = {
  'bitcoin-maximalist': {
    name: 'Bitcoin Maximalist',
    description: 'Crees firmemente en Bitcoin como la única criptomoneda necesaria. Valoras la seguridad, la descentralización y el almacenamiento de valor a largo plazo.',
    strengths: ['Visión a largo plazo', 'Comprensión de la escasez', 'Resistencia a la volatilidad'],
    weaknesses: ['Resistencia al cambio', 'Falta de diversificación'],
    investmentStyle: 'HODL a largo plazo',
    riskTolerance: 'conservative'
  },
  'ethereum-evangelist': {
    name: 'Ethereum Evangelist',
    description: 'Eres un defensor de Ethereum y su ecosistema. Te emociona la innovación, los smart contracts y el potencial de la web3.',
    strengths: ['Visión técnica', 'Adaptabilidad', 'Comprensión de la innovación'],
    weaknesses: ['Complejidad técnica', 'Dependencia de Ethereum'],
    investmentStyle: 'Inversión en ecosistema',
    riskTolerance: 'moderate'
  },
  'defi-degen': {
    name: 'DeFi Degen',
    description: 'Eres un explorador de protocolos DeFi. Buscas constantemente nuevas oportunidades de yield farming y protocolos innovadores.',
    strengths: ['Análisis de protocolos', 'Tolerancia al riesgo', 'Conocimiento técnico'],
    weaknesses: ['Alto riesgo', 'Complejidad de gestión'],
    investmentStyle: 'Yield farming agresivo',
    riskTolerance: 'aggressive'
  },
  'nft-collector': {
    name: 'NFT Collector',
    description: 'Te apasiona el arte digital y los NFTs. Valoras la creatividad, la comunidad y el potencial cultural de los tokens no fungibles.',
    strengths: ['Sentido artístico', 'Comprensión cultural', 'Construcción de comunidad'],
    weaknesses: ['Volatilidad del mercado', 'Dependencia de tendencias'],
    investmentStyle: 'Colección y trading',
    riskTolerance: 'moderate'
  },
  'dao-governor': {
    name: 'DAO Governor',
    description: 'Te enfocas en la gobernanza descentralizada y la construcción de comunidades. Crees en el poder de la organización autónoma descentralizada.',
    strengths: ['Liderazgo comunitario', 'Comprensión de gobernanza', 'Visión sistémica'],
    weaknesses: ['Complejidad organizacional', 'Tiempo de implementación'],
    investmentStyle: 'Participación en DAOs',
    riskTolerance: 'moderate'
  },
  'layer2-scaling': {
    name: 'Layer 2 Scaling',
    description: 'Te enfocas en soluciones de escalabilidad. Entiendes la importancia de hacer blockchain más eficiente y accesible.',
    strengths: ['Comprensión técnica', 'Visión de escalabilidad', 'Análisis de eficiencia'],
    weaknesses: ['Complejidad técnica', 'Dependencia de Layer 1'],
    investmentStyle: 'Inversión en infraestructura',
    riskTolerance: 'moderate'
  },
  'privacy-focused': {
    name: 'Privacy Focused',
    description: 'Valoras la privacidad y el anonimato en las transacciones. Te preocupas por la protección de datos y la libertad financiera.',
    strengths: ['Comprensión de privacidad', 'Visión de libertad', 'Análisis de seguridad'],
    weaknesses: ['Regulaciones restrictivas', 'Adopción limitada'],
    investmentStyle: 'Enfoque en privacidad',
    riskTolerance: 'aggressive'
  },
  'gaming-crypto': {
    name: 'Gaming Crypto',
    description: 'Te emociona la intersección entre gaming y blockchain. Crees en el potencial de los juegos play-to-earn y el metaverso.',
    strengths: ['Comprensión del gaming', 'Visión del metaverso', 'Construcción de comunidad'],
    weaknesses: ['Volatilidad del mercado', 'Dependencia de adopción'],
    investmentStyle: 'Inversión en gaming',
    riskTolerance: 'aggressive'
  },
  'yield-farmer': {
    name: 'Yield Farmer',
    description: 'Eres un experto en optimización de rendimientos. Buscas constantemente las mejores oportunidades de farming y staking.',
    strengths: ['Análisis de rendimientos', 'Optimización de capital', 'Conocimiento de protocolos'],
    weaknesses: ['Riesgo impermanente', 'Complejidad de gestión'],
    investmentStyle: 'Farming optimizado',
    riskTolerance: 'aggressive'
  },
  'hodler-conservative': {
    name: 'HODLer Conservative',
    description: 'Eres un inversor conservador que cree en el valor a largo plazo. Prefieres la estabilidad sobre la especulación.',
    strengths: ['Paciencia', 'Visión a largo plazo', 'Gestión de riesgo'],
    weaknesses: ['Oportunidades perdidas', 'Falta de diversificación'],
    investmentStyle: 'HODL conservador',
    riskTolerance: 'conservative'
  }
};

const colorSchemes: Record<CryptoType, CryptoProfile['colors']> = {
  'bitcoin-maximalist': {
    primary: '#F7931A',
    secondary: '#FFD700',
    accent: '#FFA500',
    background: '#1a1a1a'
  },
  'ethereum-evangelist': {
    primary: '#627EEA',
    secondary: '#4F46E5',
    accent: '#8B5CF6',
    background: '#1e1b4b'
  },
  'defi-degen': {
    primary: '#00D4AA',
    secondary: '#10B981',
    accent: '#34D399',
    background: '#064e3b'
  },
  'nft-collector': {
    primary: '#EC4899',
    secondary: '#F59E0B',
    accent: '#F97316',
    background: '#7c2d12'
  },
  'dao-governor': {
    primary: '#3B82F6',
    secondary: '#1D4ED8',
    accent: '#60A5FA',
    background: '#1e3a8a'
  },
  'layer2-scaling': {
    primary: '#8B5CF6',
    secondary: '#7C3AED',
    accent: '#A78BFA',
    background: '#4c1d95'
  },
  'privacy-focused': {
    primary: '#6B7280',
    secondary: '#374151',
    accent: '#9CA3AF',
    background: '#111827'
  },
  'gaming-crypto': {
    primary: '#EF4444',
    secondary: '#DC2626',
    accent: '#F87171',
    background: '#7f1d1d'
  },
  'yield-farmer': {
    primary: '#10B981',
    secondary: '#059669',
    accent: '#34D399',
    background: '#064e3b'
  },
  'hodler-conservative': {
    primary: '#6B7280',
    secondary: '#4B5563',
    accent: '#9CA3AF',
    background: '#1f2937'
  }
};

const avatars: Record<CryptoType, string> = {
  'bitcoin-maximalist': '₿',
  'ethereum-evangelist': 'Ξ',
  'defi-degen': '🌾',
  'nft-collector': '🎨',
  'dao-governor': '🏛️',
  'layer2-scaling': '⚡',
  'privacy-focused': '🔒',
  'gaming-crypto': '🎮',
  'yield-farmer': '💰',
  'hodler-conservative': '💎'
};

export default function CryptoPersonalityTest({ onComplete }: CryptoPersonalityTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateProfile();
    }
  };

  const calculateProfile = () => {
    const traits: CryptoTraits = {
      innovation: 0,
      risk: 0,
      community: 0,
      technology: 0,
      decentralization: 0
    };

    const typeCounts: Record<CryptoType, number> = {} as Record<CryptoType, number>;

    // Calcular puntuaciones
    questions.forEach(question => {
      const answer = answers[question.id];
      const option = question.options.find(opt => opt.id === answer);
      
      if (option) {
        Object.keys(traits).forEach(trait => {
          traits[trait as keyof CryptoTraits] += option.scores[trait as keyof CryptoTraits] || 0;
        });
        
        if (option.type) {
          typeCounts[option.type] = (typeCounts[option.type] || 0) + 1;
        }
      }
    });

    // Normalizar puntuaciones
    Object.keys(traits).forEach(trait => {
      traits[trait as keyof CryptoTraits] = Math.round(traits[trait as keyof CryptoTraits] / questions.length);
    });

    // Determinar tipo principal
    const mainType = Object.entries(typeCounts).reduce((a, b) => 
      (typeCounts[a[0] as CryptoType] || 0) > (typeCounts[b[0] as CryptoType] || 0) ? a : b
    )[0] as CryptoType;

    // Determinar rareza basada en puntuaciones
    const totalScore = Object.values(traits).reduce((sum, score) => sum + score, 0);
    let rarity: RarityLevel = 'common';
    
    if (totalScore >= 40) rarity = 'legendary';
    else if (totalScore >= 35) rarity = 'epic';
    else if (totalScore >= 30) rarity = 'rare';
    else if (totalScore >= 25) rarity = 'uncommon';

    const profile: CryptoProfile = {
      id: `crypto-profile-${Date.now()}`,
      name: cryptoProfiles[mainType]?.name || 'Crypto Explorer',
      type: mainType,
      description: cryptoProfiles[mainType]?.description || 'Un explorador del mundo cripto',
      traits,
      rarity,
      colors: colorSchemes[mainType],
      avatar: avatars[mainType],
      strengths: cryptoProfiles[mainType]?.strengths || [],
      weaknesses: cryptoProfiles[mainType]?.weaknesses || [],
      investmentStyle: cryptoProfiles[mainType]?.investmentStyle || 'Diversificado',
      riskTolerance: cryptoProfiles[mainType]?.riskTolerance || 'moderate'
    };

    setIsComplete(true);
    setTimeout(() => onComplete(profile), 1000);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isComplete) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-4">
          <span className="text-white text-2xl">✓</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">¡Análisis completado!</h3>
        <p className="text-white/80">Generando tu NFT personalizado...</p>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-white/60 mb-2">
          <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 mb-6">
        <h3 className="text-2xl font-semibold text-white mb-6 text-center">
          {currentQ.question}
        </h3>
        
        <div className="space-y-4">
          {currentQ.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(currentQ.id, option.id)}
              className="w-full p-4 text-left bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
            >
              <span className="text-white font-medium">{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
