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
        text: 'Bitcoin como reserva de valor digital',
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
        text: 'Balance entre riesgo y estabilidad',
        scores: { innovation: 5, risk: 4, community: 6, technology: 5, decentralization: 6 },
        type: 'yield-farmer'
      },
      {
        id: 'c',
        text: 'Busco altos rendimientos con riesgo moderado',
        scores: { innovation: 7, risk: 6, community: 7, technology: 7, decentralization: 5 },
        type: 'defi-degen'
      },
      {
        id: 'd',
        text: 'Me gusta el riesgo extremo y la volatilidad',
        scores: { innovation: 9, risk: 9, community: 8, technology: 8, decentralization: 4 },
        type: 'gaming-crypto'
      }
    ]
  },
  {
    id: '3',
    question: '¿Qué te motiva más en el ecosistema crypto?',
    category: 'community',
    options: [
      {
        id: 'a',
        text: 'La revolución financiera y libertad económica',
        scores: { innovation: 6, risk: 5, community: 8, technology: 6, decentralization: 9 },
        type: 'bitcoin-maximalist'
      },
      {
        id: 'b',
        text: 'La innovación tecnológica y desarrollo',
        scores: { innovation: 9, risk: 6, community: 7, technology: 9, decentralization: 7 },
        type: 'ethereum-evangelist'
      },
      {
        id: 'c',
        text: 'Las oportunidades de ganancia y trading',
        scores: { innovation: 7, risk: 8, community: 5, technology: 6, decentralization: 4 },
        type: 'defi-degen'
      },
      {
        id: 'd',
        text: 'La comunidad y cultura crypto',
        scores: { innovation: 6, risk: 4, community: 9, technology: 5, decentralization: 6 },
        type: 'nft-collector'
      }
    ]
  },
  {
    id: '4',
    question: '¿Cuál es tu nivel de conocimiento técnico?',
    category: 'technology',
    options: [
      {
        id: 'a',
        text: 'Principiante - Aprendiendo conceptos básicos',
        scores: { innovation: 3, risk: 3, community: 6, technology: 2, decentralization: 5 },
        type: 'hodler-conservative'
      },
      {
        id: 'b',
        text: 'Intermedio - Entiendo la mayoría de conceptos',
        scores: { innovation: 6, risk: 5, community: 7, technology: 6, decentralization: 6 },
        type: 'yield-farmer'
      },
      {
        id: 'c',
        text: 'Avanzado - Puedo leer código y entender protocolos',
        scores: { innovation: 8, risk: 6, community: 8, technology: 8, decentralization: 7 },
        type: 'ethereum-evangelist'
      },
      {
        id: 'd',
        text: 'Experto - Desarrollo o auditoría de contratos',
        scores: { innovation: 9, risk: 7, community: 9, technology: 9, decentralization: 8 },
        type: 'dao-governor'
      }
    ]
  },
  {
    id: '5',
    question: '¿Qué opinas sobre la privacidad en blockchain?',
    category: 'privacy',
    options: [
      {
        id: 'a',
        text: 'La privacidad es fundamental para la libertad',
        scores: { innovation: 7, risk: 6, community: 8, technology: 8, decentralization: 9 },
        type: 'privacy-focused'
      },
      {
        id: 'b',
        text: 'Es importante pero la transparencia también',
        scores: { innovation: 6, risk: 5, community: 7, technology: 6, decentralization: 7 },
        type: 'ethereum-evangelist'
      },
      {
        id: 'c',
        text: 'No me preocupa mucho la privacidad',
        scores: { innovation: 5, risk: 4, community: 6, technology: 5, decentralization: 5 },
        type: 'nft-collector'
      },
      {
        id: 'd',
        text: 'Prefiero transparencia total',
        scores: { innovation: 4, risk: 3, community: 5, technology: 4, decentralization: 6 },
        type: 'bitcoin-maximalist'
      }
    ]
  },
  {
    id: '6',
    question: '¿Cómo participas en la gobernanza de protocolos?',
    category: 'governance',
    options: [
      {
        id: 'a',
        text: 'Activamente voto en DAOs importantes',
        scores: { innovation: 8, risk: 5, community: 9, technology: 7, decentralization: 8 },
        type: 'dao-governor'
      },
      {
        id: 'b',
        text: 'Ocasionalmente participo en votaciones',
        scores: { innovation: 6, risk: 4, community: 7, technology: 6, decentralization: 6 },
        type: 'yield-farmer'
      },
      {
        id: 'c',
        text: 'Solo observo pero no participo',
        scores: { innovation: 5, risk: 3, community: 6, technology: 5, decentralization: 5 },
        type: 'hodler-conservative'
      },
      {
        id: 'd',
        text: 'No me interesa la gobernanza',
        scores: { innovation: 4, risk: 4, community: 4, technology: 4, decentralization: 3 },
        type: 'gaming-crypto'
      }
    ]
  },
  {
    id: '7',
    question: '¿Qué opinas sobre las Layer 2 solutions?',
    category: 'technology',
    options: [
      {
        id: 'a',
        text: 'Son esenciales para escalar blockchain',
        scores: { innovation: 9, risk: 6, community: 8, technology: 9, decentralization: 6 },
        type: 'layer2-scaling'
      },
      {
        id: 'b',
        text: 'Son útiles pero prefiero Layer 1',
        scores: { innovation: 7, risk: 5, community: 7, technology: 7, decentralization: 7 },
        type: 'ethereum-evangelist'
      },
      {
        id: 'c',
        text: 'No entiendo bien su propósito',
        scores: { innovation: 4, risk: 3, community: 5, technology: 3, decentralization: 4 },
        type: 'hodler-conservative'
      },
      {
        id: 'd',
        text: 'Solo me interesan si son más baratas',
        scores: { innovation: 5, risk: 6, community: 5, technology: 5, decentralization: 4 },
        type: 'defi-degen'
      }
    ]
  },
  {
    id: '8',
    question: '¿Cómo inviertes en crypto?',
    category: 'investment',
    options: [
      {
        id: 'a',
        text: 'DCA (Dollar Cost Averaging) a largo plazo',
        scores: { innovation: 4, risk: 2, community: 6, technology: 4, decentralization: 7 },
        type: 'bitcoin-maximalist'
      },
      {
        id: 'b',
        text: 'Staking y yield farming',
        scores: { innovation: 7, risk: 5, community: 7, technology: 7, decentralization: 6 },
        type: 'yield-farmer'
      },
      {
        id: 'c',
        text: 'Trading activo y arbitraje',
        scores: { innovation: 8, risk: 8, community: 6, technology: 7, decentralization: 5 },
        type: 'defi-degen'
      },
      {
        id: 'd',
        text: 'Inversión en proyectos tempranos',
        scores: { innovation: 9, risk: 9, community: 8, technology: 8, decentralization: 6 },
        type: 'gaming-crypto'
      }
    ]
  },
  {
    id: '9',
    question: '¿Qué opinas sobre los memecoins?',
    category: 'community',
    options: [
      {
        id: 'a',
        text: 'Son una distracción del verdadero valor',
        scores: { innovation: 3, risk: 2, community: 4, technology: 3, decentralization: 6 },
        type: 'bitcoin-maximalist'
      },
      {
        id: 'b',
        text: 'Algunos tienen valor comunitario',
        scores: { innovation: 6, risk: 6, community: 8, technology: 4, decentralization: 5 },
        type: 'nft-collector'
      },
      {
        id: 'c',
        text: 'Son oportunidades de trading',
        scores: { innovation: 7, risk: 8, community: 6, technology: 5, decentralization: 4 },
        type: 'defi-degen'
      },
      {
        id: 'd',
        text: 'Me divierten y pueden ser rentables',
        scores: { innovation: 8, risk: 9, community: 9, technology: 6, decentralization: 3 },
        type: 'gaming-crypto'
      }
    ]
  },
  {
    id: '10',
    question: '¿Cómo ves el futuro de las criptomonedas?',
    category: 'future',
    options: [
      {
        id: 'a',
        text: 'Bitcoin será la moneda global',
        scores: { innovation: 4, risk: 3, community: 7, technology: 4, decentralization: 9 },
        type: 'bitcoin-maximalist'
      },
      {
        id: 'b',
        text: 'Ethereum será la base de la web3',
        scores: { innovation: 8, risk: 5, community: 8, technology: 9, decentralization: 7 },
        type: 'ethereum-evangelist'
      },
      {
        id: 'c',
        text: 'Múltiples blockchains coexistirán',
        scores: { innovation: 7, risk: 6, community: 7, technology: 7, decentralization: 6 },
        type: 'dao-governor'
      },
      {
        id: 'd',
        text: 'La tecnología evolucionará completamente',
        scores: { innovation: 9, risk: 7, community: 8, technology: 9, decentralization: 6 },
        type: 'privacy-focused'
      }
    ]
  },
  {
    id: '11',
    question: '¿Qué tipo de proyectos te interesan más?',
    category: 'innovation',
    options: [
      {
        id: 'a',
        text: 'Infraestructura blockchain',
        scores: { innovation: 8, risk: 5, community: 7, technology: 9, decentralization: 8 },
        type: 'ethereum-evangelist'
      },
      {
        id: 'b',
        text: 'Protocolos DeFi innovadores',
        scores: { innovation: 9, risk: 7, community: 6, technology: 8, decentralization: 6 },
        type: 'defi-degen'
      },
      {
        id: 'c',
        text: 'Plataformas de gaming y metaverso',
        scores: { innovation: 8, risk: 6, community: 8, technology: 7, decentralization: 4 },
        type: 'gaming-crypto'
      },
      {
        id: 'd',
        text: 'Herramientas de privacidad',
        scores: { innovation: 7, risk: 6, community: 8, technology: 8, decentralization: 9 },
        type: 'privacy-focused'
      }
    ]
  },
  {
    id: '12',
    question: '¿Cómo manejas la volatilidad del mercado?',
    category: 'risk',
    options: [
      {
        id: 'a',
        text: 'Mantengo la calma y no vendo',
        scores: { innovation: 4, risk: 2, community: 6, technology: 4, decentralization: 7 },
        type: 'bitcoin-maximalist'
      },
      {
        id: 'b',
        text: 'Ajusto mi estrategia según el mercado',
        scores: { innovation: 6, risk: 5, community: 7, technology: 6, decentralization: 6 },
        type: 'yield-farmer'
      },
      {
        id: 'c',
        text: 'Veo oportunidades en la volatilidad',
        scores: { innovation: 7, risk: 7, community: 6, technology: 6, decentralization: 5 },
        type: 'defi-degen'
      },
      {
        id: 'd',
        text: 'Me emociona la volatilidad extrema',
        scores: { innovation: 8, risk: 9, community: 7, technology: 7, decentralization: 4 },
        type: 'gaming-crypto'
      }
    ]
  },
  {
    id: '13',
    question: '¿Qué opinas sobre la regulación crypto?',
    category: 'governance',
    options: [
      {
        id: 'a',
        text: 'Debe ser completamente descentralizada',
        scores: { innovation: 6, risk: 5, community: 8, technology: 6, decentralization: 9 },
        type: 'bitcoin-maximalist'
      },
      {
        id: 'b',
        text: 'Necesita regulación balanceada',
        scores: { innovation: 7, risk: 4, community: 7, technology: 7, decentralization: 6 },
        type: 'ethereum-evangelist'
      },
      {
        id: 'c',
        text: 'La regulación puede ser beneficiosa',
        scores: { innovation: 5, risk: 3, community: 6, technology: 5, decentralization: 4 },
        type: 'hodler-conservative'
      },
      {
        id: 'd',
        text: 'Prefiero evitar jurisdicciones restrictivas',
        scores: { innovation: 8, risk: 7, community: 8, technology: 7, decentralization: 8 },
        type: 'privacy-focused'
      }
    ]
  },
  {
    id: '14',
    question: '¿Cómo aprendes sobre crypto?',
    category: 'community',
    options: [
      {
        id: 'a',
        text: 'Documentación técnica y whitepapers',
        scores: { innovation: 8, risk: 5, community: 7, technology: 9, decentralization: 7 },
        type: 'ethereum-evangelist'
      },
      {
        id: 'b',
        text: 'Comunidades en Discord y Telegram',
        scores: { innovation: 6, risk: 5, community: 9, technology: 6, decentralization: 6 },
        type: 'nft-collector'
      },
      {
        id: 'c',
        text: 'YouTube y podcasts',
        scores: { innovation: 5, risk: 4, community: 7, technology: 5, decentralization: 5 },
        type: 'yield-farmer'
      },
      {
        id: 'd',
        text: 'Experimentando directamente',
        scores: { innovation: 9, risk: 8, community: 8, technology: 8, decentralization: 7 },
        type: 'defi-degen'
      }
    ]
  },
  {
    id: '15',
    question: '¿Qué te preocupa más en crypto?',
    category: 'risk',
    options: [
      {
        id: 'a',
        text: 'La seguridad de mis fondos',
        scores: { innovation: 4, risk: 2, community: 6, technology: 5, decentralization: 7 },
        type: 'bitcoin-maximalist'
      },
      {
        id: 'b',
        text: 'La escalabilidad de las redes',
        scores: { innovation: 8, risk: 5, community: 7, technology: 9, decentralization: 6 },
        type: 'layer2-scaling'
      },
      {
        id: 'c',
        text: 'La adopción masiva',
        scores: { innovation: 6, risk: 4, community: 8, technology: 6, decentralization: 5 },
        type: 'ethereum-evangelist'
      },
      {
        id: 'd',
        text: 'La regulación excesiva',
        scores: { innovation: 7, risk: 6, community: 8, technology: 7, decentralization: 8 },
        type: 'privacy-focused'
      }
    ]
  },
  {
    id: '16',
    question: '¿Cómo defines el éxito en crypto?',
    category: 'philosophy',
    options: [
      {
        id: 'a',
        text: 'Libertad financiera personal',
        scores: { innovation: 5, risk: 4, community: 7, technology: 5, decentralization: 8 },
        type: 'bitcoin-maximalist'
      },
      {
        id: 'b',
        text: 'Contribuir al desarrollo tecnológico',
        scores: { innovation: 9, risk: 6, community: 8, technology: 9, decentralization: 7 },
        type: 'ethereum-evangelist'
      },
      {
        id: 'c',
        text: 'Maximizar rendimientos financieros',
        scores: { innovation: 7, risk: 8, community: 5, technology: 6, decentralization: 4 },
        type: 'defi-degen'
      },
      {
        id: 'd',
        text: 'Construir comunidad y cultura',
        scores: { innovation: 6, risk: 4, community: 9, technology: 5, decentralization: 6 },
        type: 'nft-collector'
      }
    ]
  },
  {
    id: '17',
    question: '¿Qué opinas sobre el staking?',
    category: 'investment',
    options: [
      {
        id: 'a',
        text: 'Es una forma segura de generar ingresos',
        scores: { innovation: 6, risk: 3, community: 7, technology: 6, decentralization: 6 },
        type: 'yield-farmer'
      },
      {
        id: 'b',
        text: 'Ayuda a la seguridad de la red',
        scores: { innovation: 7, risk: 4, community: 8, technology: 7, decentralization: 7 },
        type: 'ethereum-evangelist'
      },
      {
        id: 'c',
        text: 'Prefiero mantener control total',
        scores: { innovation: 4, risk: 2, community: 6, technology: 4, decentralization: 8 },
        type: 'bitcoin-maximalist'
      },
      {
        id: 'd',
        text: 'Busco los mejores rendimientos',
        scores: { innovation: 8, risk: 7, community: 6, technology: 7, decentralization: 5 },
        type: 'defi-degen'
      }
    ]
  },
  {
    id: '18',
    question: '¿Cómo interactúas con NFTs?',
    category: 'community',
    options: [
      {
        id: 'a',
        text: 'Los colecciono por su valor artístico',
        scores: { innovation: 6, risk: 4, community: 9, technology: 5, decentralization: 5 },
        type: 'nft-collector'
      },
      {
        id: 'b',
        text: 'Los uso en aplicaciones prácticas',
        scores: { innovation: 7, risk: 5, community: 7, technology: 7, decentralization: 6 },
        type: 'ethereum-evangelist'
      },
      {
        id: 'c',
        text: 'Los tradeo por ganancias',
        scores: { innovation: 7, risk: 7, community: 6, technology: 6, decentralization: 4 },
        type: 'defi-degen'
      },
      {
        id: 'd',
        text: 'No me interesan mucho',
        scores: { innovation: 4, risk: 3, community: 4, technology: 4, decentralization: 6 },
        type: 'bitcoin-maximalist'
      }
    ]
  },
  {
    id: '19',
    question: '¿Qué opinas sobre las criptomonedas centralizadas?',
    category: 'philosophy',
    options: [
      {
        id: 'a',
        text: 'Van contra los principios de crypto',
        scores: { innovation: 5, risk: 4, community: 7, technology: 5, decentralization: 9 },
        type: 'bitcoin-maximalist'
      },
      {
        id: 'b',
        text: 'Tienen su lugar en el ecosistema',
        scores: { innovation: 6, risk: 4, community: 6, technology: 6, decentralization: 4 },
        type: 'hodler-conservative'
      },
      {
        id: 'c',
        text: 'Son útiles para la adopción',
        scores: { innovation: 7, risk: 5, community: 7, technology: 6, decentralization: 5 },
        type: 'ethereum-evangelist'
      },
      {
        id: 'd',
        text: 'Prefiero alternativas descentralizadas',
        scores: { innovation: 8, risk: 6, community: 8, technology: 7, decentralization: 8 },
        type: 'privacy-focused'
      }
    ]
  },
  {
    id: '20',
    question: '¿Cómo manejas la información de mercado?',
    category: 'trading',
    options: [
      {
        id: 'a',
        text: 'Sigo análisis fundamental',
        scores: { innovation: 6, risk: 4, community: 7, technology: 6, decentralization: 6 },
        type: 'ethereum-evangelist'
      },
      {
        id: 'b',
        text: 'Uso análisis técnico',
        scores: { innovation: 7, risk: 6, community: 6, technology: 6, decentralization: 5 },
        type: 'defi-degen'
      },
      {
        id: 'c',
        text: 'Confío en mi instinto',
        scores: { innovation: 5, risk: 7, community: 6, technology: 5, decentralization: 5 },
        type: 'gaming-crypto'
      },
      {
        id: 'd',
        text: 'No sigo el mercado de cerca',
        scores: { innovation: 4, risk: 2, community: 6, technology: 4, decentralization: 7 },
        type: 'bitcoin-maximalist'
      }
    ]
  },
  {
    id: '21',
    question: '¿Qué opinas sobre el gaming crypto?',
    category: 'gaming',
    options: [
      {
        id: 'a',
        text: 'Es el futuro del entretenimiento',
        scores: { innovation: 8, risk: 6, community: 8, technology: 7, decentralization: 4 },
        type: 'gaming-crypto'
      },
      {
        id: 'b',
        text: 'Tiene potencial pero está en desarrollo',
        scores: { innovation: 7, risk: 5, community: 7, technology: 6, decentralization: 5 },
        type: 'ethereum-evangelist'
      },
      {
        id: 'c',
        text: 'Es más especulación que gaming',
        scores: { innovation: 6, risk: 7, community: 6, technology: 5, decentralization: 4 },
        type: 'defi-degen'
      },
      {
        id: 'd',
        text: 'No me interesa el gaming',
        scores: { innovation: 3, risk: 3, community: 4, technology: 3, decentralization: 6 },
        type: 'bitcoin-maximalist'
      }
    ]
  },
  {
    id: '22',
    question: '¿Cómo defines la descentralización?',
    category: 'philosophy',
    options: [
      {
        id: 'a',
        text: 'Sin puntos únicos de falla',
        scores: { innovation: 7, risk: 5, community: 7, technology: 7, decentralization: 8 },
        type: 'bitcoin-maximalist'
      },
      {
        id: 'b',
        text: 'Control distribuido entre usuarios',
        scores: { innovation: 8, risk: 5, community: 8, technology: 7, decentralization: 8 },
        type: 'dao-governor'
      },
      {
        id: 'c',
        text: 'Sin autoridades centrales',
        scores: { innovation: 6, risk: 6, community: 8, technology: 6, decentralization: 9 },
        type: 'privacy-focused'
      },
      {
        id: 'd',
        text: 'Acceso abierto y transparente',
        scores: { innovation: 7, risk: 4, community: 7, technology: 7, decentralization: 7 },
        type: 'ethereum-evangelist'
      }
    ]
  },
  {
    id: '23',
    question: '¿Qué te motiva a seguir en crypto?',
    category: 'future',
    options: [
      {
        id: 'a',
        text: 'La revolución financiera',
        scores: { innovation: 6, risk: 4, community: 8, technology: 6, decentralization: 8 },
        type: 'bitcoin-maximalist'
      },
      {
        id: 'b',
        text: 'La innovación tecnológica',
        scores: { innovation: 9, risk: 6, community: 7, technology: 9, decentralization: 6 },
        type: 'ethereum-evangelist'
      },
      {
        id: 'c',
        text: 'Las oportunidades de ganancia',
        scores: { innovation: 7, risk: 7, community: 6, technology: 6, decentralization: 4 },
        type: 'defi-degen'
      },
      {
        id: 'd',
        text: 'La comunidad y cultura',
        scores: { innovation: 6, risk: 4, community: 9, technology: 5, decentralization: 6 },
        type: 'nft-collector'
      }
    ]
  },
  {
    id: '24',
    question: '¿Cómo ves la adopción institucional?',
    category: 'future',
    options: [
      {
        id: 'a',
        text: 'Es necesaria para el crecimiento',
        scores: { innovation: 6, risk: 4, community: 6, technology: 6, decentralization: 4 },
        type: 'hodler-conservative'
      },
      {
        id: 'b',
        text: 'Debe ser gradual y regulada',
        scores: { innovation: 7, risk: 4, community: 7, technology: 7, decentralization: 5 },
        type: 'ethereum-evangelist'
      },
      {
        id: 'c',
        text: 'Creará nuevas oportunidades',
        scores: { innovation: 8, risk: 6, community: 7, technology: 7, decentralization: 5 },
        type: 'defi-degen'
      },
      {
        id: 'd',
        text: 'Puede comprometer la descentralización',
        scores: { innovation: 6, risk: 5, community: 8, technology: 6, decentralization: 8 },
        type: 'privacy-focused'
      }
    ]
  },
  {
    id: '25',
    question: '¿Cuál es tu visión a 10 años?',
    category: 'future',
    options: [
      {
        id: 'a',
        text: 'Bitcoin como reserva global',
        scores: { innovation: 4, risk: 3, community: 7, technology: 4, decentralization: 9 },
        type: 'bitcoin-maximalist'
      },
      {
        id: 'b',
        text: 'Web3 completamente desarrollada',
        scores: { innovation: 9, risk: 5, community: 8, technology: 9, decentralization: 6 },
        type: 'ethereum-evangelist'
      },
      {
        id: 'c',
        text: 'DeFi reemplazando finanzas tradicionales',
        scores: { innovation: 8, risk: 6, community: 7, technology: 8, decentralization: 6 },
        type: 'defi-degen'
      },
      {
        id: 'd',
        text: 'Múltiples ecosistemas coexistiendo',
        scores: { innovation: 7, risk: 5, community: 8, technology: 7, decentralization: 7 },
        type: 'dao-governor'
      }
    ]
  }
];

const cryptoTypeConfigs: Record<CryptoType, CryptoProfile> = {
  'bitcoin-maximalist': {
    id: 'bitcoin-maximalist',
    name: 'Bitcoin Maximalist',
    type: 'bitcoin-maximalist',
    description: 'Crees firmemente en Bitcoin como la única criptomoneda necesaria. Valoras la descentralización, la seguridad y la simplicidad por encima de todo.',
    traits: { innovation: 3, risk: 2, community: 7, technology: 4, decentralization: 9 },
    rarity: 'rare',
    colors: { primary: '#f7931a', secondary: '#ffd700', accent: '#ff6b35', background: '#1a1a1a' },
    avatar: '₿',
    strengths: ['Seguridad', 'Descentralización', 'Simplicidad'],
    weaknesses: ['Escalabilidad', 'Funcionalidad limitada'],
    investmentStyle: 'HODL a largo plazo',
    riskTolerance: 'conservative'
  },
  'ethereum-evangelist': {
    id: 'ethereum-evangelist',
    name: 'Ethereum Evangelist',
    type: 'ethereum-evangelist',
    description: 'Eres un defensor de Ethereum y su ecosistema. Crees en el potencial de los contratos inteligentes y las aplicaciones descentralizadas.',
    traits: { innovation: 8, risk: 6, community: 8, technology: 9, decentralization: 7 },
    rarity: 'uncommon',
    colors: { primary: '#627eea', secondary: '#4f46e5', accent: '#8b5cf6', background: '#1e1b4b' },
    avatar: 'Ξ',
    strengths: ['Innovación', 'Tecnología', 'Comunidad'],
    weaknesses: ['Complejidad', 'Costos de gas'],
    investmentStyle: 'Inversión en ecosistema',
    riskTolerance: 'moderate'
  },
  'defi-degen': {
    id: 'defi-degen',
    name: 'DeFi Degen',
    type: 'defi-degen',
    description: 'Eres un experto en protocolos DeFi. Buscas constantemente nuevas oportunidades de yield farming y estrategias de optimización.',
    traits: { innovation: 9, risk: 8, community: 6, technology: 8, decentralization: 6 },
    rarity: 'epic',
    colors: { primary: '#00d4aa', secondary: '#00a86b', accent: '#32cd32', background: '#0d2818' },
    avatar: '🌾',
    strengths: ['Optimización', 'Rendimientos', 'Innovación'],
    weaknesses: ['Riesgo alto', 'Complejidad'],
    investmentStyle: 'Yield farming agresivo',
    riskTolerance: 'aggressive'
  },
  'nft-collector': {
    id: 'nft-collector',
    name: 'NFT Collector',
    type: 'nft-collector',
    description: 'Te apasiona el arte digital y los NFTs. Valoras la creatividad, la comunidad y el aspecto cultural del ecosistema crypto.',
    traits: { innovation: 7, risk: 5, community: 9, technology: 6, decentralization: 5 },
    rarity: 'uncommon',
    colors: { primary: '#ff6b9d', secondary: '#c44569', accent: '#f8b500', background: '#2d1b69' },
    avatar: '🎨',
    strengths: ['Creatividad', 'Comunidad', 'Arte'],
    weaknesses: ['Volatilidad', 'Especulación'],
    investmentStyle: 'Colección y arte',
    riskTolerance: 'moderate'
  },
  'dao-governor': {
    id: 'dao-governor',
    name: 'DAO Governor',
    type: 'dao-governor',
    description: 'Eres un líder en gobernanza descentralizada. Participas activamente en DAOs y crees en el poder de la toma de decisiones colectiva.',
    traits: { innovation: 8, risk: 5, community: 9, technology: 7, decentralization: 8 },
    rarity: 'rare',
    colors: { primary: '#6366f1', secondary: '#4f46e5', accent: '#8b5cf6', background: '#1e1b4b' },
    avatar: '🏛️',
    strengths: ['Liderazgo', 'Gobernanza', 'Comunidad'],
    weaknesses: ['Complejidad', 'Tiempo requerido'],
    investmentStyle: 'Participación en DAOs',
    riskTolerance: 'moderate'
  },
  'layer2-scaling': {
    id: 'layer2-scaling',
    name: 'Layer 2 Enthusiast',
    type: 'layer2-scaling',
    description: 'Te enfocas en soluciones de escalabilidad. Crees que Layer 2 es clave para la adopción masiva de blockchain.',
    traits: { innovation: 9, risk: 6, community: 8, technology: 9, decentralization: 6 },
    rarity: 'epic',
    colors: { primary: '#10b981', secondary: '#059669', accent: '#34d399', background: '#064e3b' },
    avatar: '⚡',
    strengths: ['Escalabilidad', 'Tecnología', 'Innovación'],
    weaknesses: ['Complejidad', 'Centralización'],
    investmentStyle: 'Inversión en infraestructura',
    riskTolerance: 'moderate'
  },
  'privacy-focused': {
    id: 'privacy-focused',
    name: 'Privacy Advocate',
    type: 'privacy-focused',
    description: 'La privacidad es tu prioridad. Te enfocas en tecnologías que protegen la información personal y la libertad individual.',
    traits: { innovation: 7, risk: 6, community: 8, technology: 8, decentralization: 9 },
    rarity: 'rare',
    colors: { primary: '#8b5cf6', secondary: '#7c3aed', accent: '#a78bfa', background: '#2e1065' },
    avatar: '🔒',
    strengths: ['Privacidad', 'Seguridad', 'Descentralización'],
    weaknesses: ['Adopción', 'Regulación'],
    investmentStyle: 'Proyectos de privacidad',
    riskTolerance: 'moderate'
  },
  'gaming-crypto': {
    id: 'gaming-crypto',
    name: 'Gaming Crypto',
    type: 'gaming-crypto',
    description: 'Te apasiona la intersección entre gaming y crypto. Buscas proyectos que combinen entretenimiento con tecnología blockchain.',
    traits: { innovation: 8, risk: 7, community: 8, technology: 7, decentralization: 4 },
    rarity: 'uncommon',
    colors: { primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24', background: '#451a03' },
    avatar: '🎮',
    strengths: ['Gaming', 'Comunidad', 'Innovación'],
    weaknesses: ['Especulación', 'Centralización'],
    investmentStyle: 'Gaming y metaverso',
    riskTolerance: 'aggressive'
  },
  'yield-farmer': {
    id: 'yield-farmer',
    name: 'Yield Farmer',
    type: 'yield-farmer',
    description: 'Eres un experto en optimización de rendimientos. Buscas constantemente las mejores oportunidades de staking y farming.',
    traits: { innovation: 7, risk: 5, community: 7, technology: 7, decentralization: 6 },
    rarity: 'uncommon',
    colors: { primary: '#10b981', secondary: '#059669', accent: '#34d399', background: '#064e3b' },
    avatar: '🌱',
    strengths: ['Optimización', 'Rendimientos', 'Estrategia'],
    weaknesses: ['Complejidad', 'Riesgo'],
    investmentStyle: 'Staking y farming',
    riskTolerance: 'moderate'
  },
  'hodler-conservative': {
    id: 'hodler-conservative',
    name: 'HODLer Conservative',
    type: 'hodler-conservative',
    description: 'Eres conservador y paciente. Prefieres inversiones a largo plazo con menor riesgo y mayor estabilidad.',
    traits: { innovation: 4, risk: 2, community: 6, technology: 4, decentralization: 7 },
    rarity: 'common',
    colors: { primary: '#6b7280', secondary: '#4b5563', accent: '#9ca3af', background: '#111827' },
    avatar: '💎',
    strengths: ['Paciencia', 'Estabilidad', 'Disciplina'],
    weaknesses: ['Oportunidades perdidas', 'Innovación'],
    investmentStyle: 'HODL conservador',
    riskTolerance: 'conservative'
  }
};

export default function CryptoPersonalityTest({ onComplete }: CryptoPersonalityTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 300);
    } else {
      setTimeout(() => {
        setIsComplete(true);
        calculateProfile();
      }, 300);
    }
  };

  const calculateProfile = () => {
    const traitScores: CryptoTraits = {
      innovation: 0,
      risk: 0,
      community: 0,
      technology: 0,
      decentralization: 0
    };

    const typeVotes: Record<CryptoType, number> = {} as Record<CryptoType, number>;

    // Calcular puntuaciones
    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = questions.find(q => q.id === questionId);
      const option = question?.options.find(opt => opt.id === answerId);
      
      if (option) {
        // Sumar puntuaciones de traits
        Object.keys(traitScores).forEach(trait => {
          traitScores[trait as keyof CryptoTraits] += option.scores[trait as keyof CryptoTraits] || 0;
        });

        // Contar votos por tipo
        if (option.type) {
          typeVotes[option.type] = (typeVotes[option.type] || 0) + 1;
        }
      }
    });

    // Determinar tipo principal
    const mainType = Object.entries(typeVotes).reduce((a, b) => 
      typeVotes[a[0] as CryptoType] > typeVotes[b[0] as CryptoType] ? a : b
    )[0] as CryptoType;

    // Normalizar puntuaciones (0-10)
    const totalQuestions = Object.keys(answers).length;
    Object.keys(traitScores).forEach(trait => {
      traitScores[trait as keyof CryptoTraits] = Math.round(
        (traitScores[trait as keyof CryptoTraits] / totalQuestions) * 2
      );
    });

    // Determinar rareza basada en puntuaciones
    const avgScore = Object.values(traitScores).reduce((a, b) => a + b, 0) / 5;
    let rarity: RarityLevel;
    if (avgScore >= 8) rarity = 'legendary';
    else if (avgScore >= 6.5) rarity = 'epic';
    else if (avgScore >= 5) rarity = 'rare';
    else if (avgScore >= 3.5) rarity = 'uncommon';
    else rarity = 'common';

    const profile = cryptoTypeConfigs[mainType];
    profile.traits = traitScores;
    profile.rarity = rarity;

    onComplete(profile);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isComplete) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <h3 className="text-2xl font-bold text-white mb-2">Analizando tu perfil...</h3>
        <p className="text-white/70">Calculando tu tipo de crypto único</p>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/70 text-sm">Pregunta {currentQuestion + 1} de {questions.length}</span>
          <span className="text-white/70 text-sm">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">{question.question}</h2>
        <p className="text-white/60 text-sm capitalize">{question.category}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswer(question.id, option.id)}
            className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-200 text-left group"
          >
            <div className="text-white font-medium group-hover:text-blue-300 transition-colors">
              {option.text}
            </div>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          ← Anterior
        </button>
        
        <div className="text-white/60 text-sm">
          {currentQuestion + 1} / {questions.length}
        </div>
        
        <button
          onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
          disabled={currentQuestion === questions.length - 1}
          className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}