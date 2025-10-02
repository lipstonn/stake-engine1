import { GameConfig, SymbolType } from './types';

export const GAME_CONFIG: GameConfig = {
  reelStrips: [
    {
      symbols: [
        'H1', 'A', 'K', 'Q', 'J', '10', 'H2', 'WILD', 'A', 'K',
        'H3', 'Q', 'J', '10', 'H4', 'A', 'SCATTER', 'K', 'H5', 'Q',
        'J', '10', 'H1', 'A', 'BONUS', 'K', 'H2', 'Q', 'J', 'H3'
      ] as SymbolType[]
    },
    {
      symbols: [
        'H2', 'K', 'Q', 'J', '10', 'H3', 'A', 'WILD', 'K', 'H4',
        'Q', 'J', '10', 'H5', 'A', 'SCATTER', 'K', 'H1', 'Q', 'J',
        '10', 'H2', 'A', 'BONUS', 'K', 'H3', 'Q', 'J', 'H4', 'A'
      ] as SymbolType[]
    },
    {
      symbols: [
        'H3', 'Q', 'J', '10', 'H4', 'A', 'K', 'WILD', 'H5', 'Q',
        'J', '10', 'H1', 'A', 'SCATTER', 'K', 'H2', 'Q', 'BONUS', 'J',
        '10', 'H3', 'A', 'K', 'H4', 'Q', 'J', 'H5', 'A', 'K'
      ] as SymbolType[]
    },
    {
      symbols: [
        'H4', 'J', '10', 'H5', 'A', 'K', 'Q', 'WILD', 'H1', 'J',
        '10', 'H2', 'A', 'SCATTER', 'K', 'H3', 'Q', 'J', '10', 'BONUS',
        'H4', 'A', 'K', 'H5', 'Q', 'J', 'H1', 'A', 'K', 'H2'
      ] as SymbolType[]
    },
    {
      symbols: [
        'H5', '10', 'H1', 'A', 'K', 'Q', 'J', 'WILD', 'H2', '10',
        'H3', 'A', 'SCATTER', 'K', 'H4', 'Q', 'J', '10', 'H5', 'BONUS',
        'A', 'K', 'H1', 'Q', 'J', 'H2', 'A', 'K', 'H3', 'Q'
      ] as SymbolType[]
    }
  ],

  paylines: [
    { id: 0, positions: [1, 1, 1, 1, 1] },
    { id: 1, positions: [0, 0, 0, 0, 0] },
    { id: 2, positions: [2, 2, 2, 2, 2] },
    { id: 3, positions: [0, 1, 2, 1, 0] },
    { id: 4, positions: [2, 1, 0, 1, 2] },
    { id: 5, positions: [1, 0, 0, 0, 1] },
    { id: 6, positions: [1, 2, 2, 2, 1] },
    { id: 7, positions: [0, 0, 1, 2, 2] },
    { id: 8, positions: [2, 2, 1, 0, 0] },
    { id: 9, positions: [1, 2, 1, 0, 1] },
    { id: 10, positions: [1, 0, 1, 2, 1] },
    { id: 11, positions: [0, 1, 1, 1, 0] },
    { id: 12, positions: [2, 1, 1, 1, 2] },
    { id: 13, positions: [0, 1, 0, 1, 0] },
    { id: 14, positions: [2, 1, 2, 1, 2] },
    { id: 15, positions: [1, 1, 0, 1, 1] },
    { id: 16, positions: [1, 1, 2, 1, 1] },
    { id: 17, positions: [0, 0, 2, 0, 0] },
    { id: 18, positions: [2, 2, 0, 2, 2] },
    { id: 19, positions: [0, 2, 2, 2, 0] }
  ],

  paytable: [
    { symbol: 'H1', payouts: [0, 0, 50, 200, 1000] },
    { symbol: 'H2', payouts: [0, 0, 30, 100, 500] },
    { symbol: 'H3', payouts: [0, 0, 20, 75, 300] },
    { symbol: 'H4', payouts: [0, 0, 15, 50, 200] },
    { symbol: 'H5', payouts: [0, 0, 10, 40, 100] },
    { symbol: 'A', payouts: [0, 0, 5, 20, 50] },
    { symbol: 'K', payouts: [0, 0, 5, 15, 40] },
    { symbol: 'Q', payouts: [0, 0, 3, 12, 30] },
    { symbol: 'J', payouts: [0, 0, 3, 10, 25] },
    { symbol: '10', payouts: [0, 0, 2, 8, 20] },
    { symbol: 'WILD', payouts: [0, 0, 100, 500, 2000] },
    { symbol: 'SCATTER', payouts: [0, 0, 2, 5, 20] },
    { symbol: 'BONUS', payouts: [0, 0, 0, 0, 0] }
  ],

  rtp: 96.5,
  volatility: 'medium',
  maxWinMultiplier: 10000,

  freeSpinsConfig: {
    scatterCount: 3,
    spinsAwarded: 10,
    multiplier: 3
  }
};

export const SYMBOL_WEIGHTS = {
  base: {
    'H1': 2,
    'H2': 3,
    'H3': 4,
    'H4': 5,
    'H5': 6,
    'A': 8,
    'K': 8,
    'Q': 9,
    'J': 9,
    '10': 10,
    'WILD': 1,
    'SCATTER': 2,
    'BONUS': 2
  },
  freespins: {
    'H1': 3,
    'H2': 4,
    'H3': 5,
    'H4': 6,
    'H5': 7,
    'A': 7,
    'K': 7,
    'Q': 8,
    'J': 8,
    '10': 9,
    'WILD': 2,
    'SCATTER': 3,
    'BONUS': 1
  }
};
