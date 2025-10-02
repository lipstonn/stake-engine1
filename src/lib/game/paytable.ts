import type { SymbolType } from '../rgs/types';

export const PAYTABLE: Record<string, number[]> = {
  'H1': [0, 0, 50, 200, 1000],
  'H2': [0, 0, 30, 100, 500],
  'H3': [0, 0, 20, 75, 300],
  'H4': [0, 0, 15, 50, 200],
  'H5': [0, 0, 10, 40, 100],
  'A': [0, 0, 5, 20, 50],
  'K': [0, 0, 5, 15, 40],
  'Q': [0, 0, 3, 12, 30],
  'J': [0, 0, 3, 10, 25],
  '10': [0, 0, 2, 8, 20],
};

export const SYMBOL_NAMES: Record<string, string> = {
  'H1': 'Diamond',
  'H2': 'Gold Bar',
  'H3': 'Bitcoin',
  'H4': 'Ethereum',
  'H5': 'Safe',
  'A': 'Ace',
  'K': 'King',
  'Q': 'Queen',
  'J': 'Jack',
  '10': 'Ten',
  'WILD': 'Wild',
  'SCATTER': 'Scatter',
  'BONUS': 'Bonus',
  'MULTIPLIER': 'Multiplier',
  'EXPANDING_WILD': 'Expanding Wild'
};

export const PAYLINES: number[][] = [
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2],
  [0, 1, 2, 1, 0],
  [2, 1, 0, 1, 2],
  [1, 0, 0, 0, 1],
  [1, 2, 2, 2, 1],
  [0, 0, 1, 2, 2],
  [2, 2, 1, 0, 0],
  [1, 2, 1, 0, 1],
  [1, 0, 1, 2, 1],
  [0, 1, 1, 1, 0],
  [2, 1, 1, 1, 2],
  [0, 1, 0, 1, 0],
  [2, 1, 2, 1, 2],
  [1, 1, 0, 1, 1],
  [1, 1, 2, 1, 1],
  [0, 0, 2, 0, 0],
  [2, 2, 0, 2, 2],
  [0, 2, 2, 2, 0]
];

export function calculateWin(symbol: string, count: number, betPerLine: number): number {
  if (!PAYTABLE[symbol] || count < 3) return 0;
  return PAYTABLE[symbol][count - 1] * betPerLine;
}

export function getSymbolMultiplier(symbol: string): number {
  if (symbol === 'MULTIPLIER') return 2;
  return 1;
}
