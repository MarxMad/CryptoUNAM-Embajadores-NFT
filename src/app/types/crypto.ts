export interface CryptoProfile {
  id: string;
  name: string;
  type: CryptoType;
  description: string;
  traits: CryptoTraits;
  rarity: RarityLevel;
  colors: ColorScheme;
  avatar: string;
  strengths: string[];
  weaknesses: string[];
  investmentStyle: string;
  riskTolerance: RiskLevel;
}

export type CryptoType = 
  | 'bitcoin-maximalist'
  | 'ethereum-evangelist'
  | 'defi-degen'
  | 'nft-collector'
  | 'dao-governor'
  | 'layer2-scaling'
  | 'privacy-focused'
  | 'gaming-crypto'
  | 'yield-farmer'
  | 'hodler-conservative';

export interface CryptoTraits {
  innovation: number; // 1-10
  risk: number; // 1-10
  community: number; // 1-10
  technology: number; // 1-10
  decentralization: number; // 1-10
}

export type RarityLevel = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export type RiskLevel = 'conservative' | 'moderate' | 'aggressive' | 'extreme';

export interface TestQuestion {
  id: string;
  question: string;
  options: TestOption[];
  category: 'investment' | 'technology' | 'community' | 'risk' | 'innovation';
}

export interface TestOption {
  id: string;
  text: string;
  scores: Partial<CryptoTraits>;
  type?: CryptoType;
}
