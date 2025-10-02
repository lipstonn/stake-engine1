export interface AuthResponse {
  balance: number;
  currency: string;
  betLevels: number[];
  config: Record<string, any>;
}

export interface PlayRequest {
  amount: number;
  mode: 'base' | 'bonus';
}

export interface GameEvent {
  type: string;
  board?: string[][];
  totalWin?: number;
  wins?: WinInfo[];
  [key: string]: any;
}

export interface WinInfo {
  paylineId: number;
  symbol: string;
  count: number;
  positions: number[][];
  amount: number;
}

export interface PlayResponse {
  round: {
    id: string;
    state: GameEvent[];
    totalWin: number;
  };
  balance: number;
}

export interface BalanceUpdateEvent {
  amount: number;
  currency: string;
}

export interface RoundActiveEvent {
  active: boolean;
}

export interface RGSError extends Error {
  code: string;
  message: string;
}

export type GameState =
  | 'IDLE'
  | 'BETTING'
  | 'SPINNING'
  | 'REVEALING'
  | 'WINNING'
  | 'BONUS_TRIGGER'
  | 'BONUS_PLAY';

export type SymbolType =
  | 'H1' | 'H2' | 'H3' | 'H4' | 'H5'
  | 'A' | 'K' | 'Q' | 'J' | '10'
  | 'WILD' | 'SCATTER' | 'BONUS' | 'MULTIPLIER' | 'EXPANDING_WILD';
