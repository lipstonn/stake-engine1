export type SymbolType =
  | 'H1' | 'H2' | 'H3' | 'H4' | 'H5'
  | 'A' | 'K' | 'Q' | 'J' | '10'
  | 'WILD' | 'SCATTER' | 'BONUS';

export interface ReelStrip {
  symbols: SymbolType[];
}

export interface PaylineConfig {
  id: number;
  positions: [number, number, number, number, number];
}

export interface PaytableEntry {
  symbol: SymbolType;
  payouts: number[];
}

export interface SpinRequest {
  bet: number;
  mode: 'base' | 'freespins' | 'bonus';
  freeSpinsRemaining?: number;
}

export interface WinLineResult {
  paylineId: number;
  symbol: SymbolType;
  count: number;
  positions: number[][];
  payout: number;
}

export interface SpinResult {
  board: SymbolType[][];
  wins: WinLineResult[];
  totalWin: number;
  freeSpinsTriggered: boolean;
  freeSpinsAwarded?: number;
  bonusTriggered: boolean;
  multiplier: number;
}

export interface GameConfig {
  reelStrips: ReelStrip[];
  paylines: PaylineConfig[];
  paytable: PaytableEntry[];
  rtp: number;
  volatility: 'low' | 'medium' | 'high';
  maxWinMultiplier: number;
  freeSpinsConfig: {
    scatterCount: number;
    spinsAwarded: number;
    multiplier: number;
  };
}
