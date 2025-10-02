import { GAME_CONFIG } from './config';
import { RNG, defaultRNG } from './rng';
import {
  SpinRequest,
  SpinResult,
  SymbolType,
  WinLineResult,
  PaylineConfig
} from './types';

export class SlotEngine {
  private rng: RNG;

  constructor(rng: RNG = defaultRNG) {
    this.rng = rng;
  }

  spin(request: SpinRequest): SpinResult {
    const board = this.generateBoard(request.mode);
    const multiplier = request.mode === 'freespins' ? GAME_CONFIG.freeSpinsConfig.multiplier : 1;
    const wins = this.evaluateWins(board, request.bet, multiplier);
    const totalWin = wins.reduce((sum, win) => sum + win.payout, 0);

    const scatterCount = this.countScatters(board);
    const freeSpinsTriggered = scatterCount >= GAME_CONFIG.freeSpinsConfig.scatterCount;
    const bonusTriggered = this.countBonus(board) >= 3;

    return {
      board,
      wins,
      totalWin,
      freeSpinsTriggered,
      freeSpinsAwarded: freeSpinsTriggered ? GAME_CONFIG.freeSpinsConfig.spinsAwarded : undefined,
      bonusTriggered,
      multiplier
    };
  }

  private generateBoard(mode: 'base' | 'freespins' | 'bonus'): SymbolType[][] {
    const board: SymbolType[][] = [];

    for (let reelIndex = 0; reelIndex < 5; reelIndex++) {
      const reelStrip = GAME_CONFIG.reelStrips[reelIndex];
      const stopPosition = this.rng.nextInt(0, reelStrip.symbols.length - 1);

      const reel: SymbolType[] = [];
      for (let row = 0; row < 3; row++) {
        const symbolIndex = (stopPosition + row) % reelStrip.symbols.length;
        reel.push(reelStrip.symbols[symbolIndex]);
      }

      board.push(reel);
    }

    return board;
  }

  private evaluateWins(
    board: SymbolType[][],
    bet: number,
    multiplier: number
  ): WinLineResult[] {
    const wins: WinLineResult[] = [];
    const betPerLine = bet / GAME_CONFIG.paylines.length;

    for (const payline of GAME_CONFIG.paylines) {
      const symbols = this.getPaylineSymbols(board, payline);
      const winResult = this.checkPaylineWin(symbols, payline, betPerLine, multiplier);

      if (winResult) {
        wins.push(winResult);
      }
    }

    return wins;
  }

  private getPaylineSymbols(board: SymbolType[][], payline: PaylineConfig): SymbolType[] {
    const symbols: SymbolType[] = [];

    for (let reelIndex = 0; reelIndex < 5; reelIndex++) {
      const row = payline.positions[reelIndex];
      symbols.push(board[reelIndex][row]);
    }

    return symbols;
  }

  private checkPaylineWin(
    symbols: SymbolType[],
    payline: PaylineConfig,
    betPerLine: number,
    multiplier: number
  ): WinLineResult | null {
    let firstSymbol = symbols[0];
    let count = 1;

    if (firstSymbol === 'SCATTER' || firstSymbol === 'BONUS') {
      return null;
    }

    for (let i = 1; i < symbols.length; i++) {
      const currentSymbol = symbols[i];

      if (currentSymbol === firstSymbol || currentSymbol === 'WILD') {
        count++;
      } else if (firstSymbol === 'WILD') {
        firstSymbol = currentSymbol;
        count++;
      } else {
        break;
      }
    }

    if (count < 3) {
      return null;
    }

    const paytableEntry = GAME_CONFIG.paytable.find(p => p.symbol === firstSymbol);
    if (!paytableEntry) {
      return null;
    }

    const basePayout = paytableEntry.payouts[count - 1];
    if (basePayout === 0) {
      return null;
    }

    const positions: number[][] = [];
    for (let i = 0; i < count; i++) {
      positions.push([i, payline.positions[i]]);
    }

    return {
      paylineId: payline.id,
      symbol: firstSymbol,
      count,
      positions,
      payout: basePayout * betPerLine * multiplier
    };
  }

  private countScatters(board: SymbolType[][]): number {
    let count = 0;
    for (const reel of board) {
      for (const symbol of reel) {
        if (symbol === 'SCATTER') {
          count++;
        }
      }
    }
    return count;
  }

  private countBonus(board: SymbolType[][]): number {
    let count = 0;
    for (const reel of board) {
      for (const symbol of reel) {
        if (symbol === 'BONUS') {
          count++;
        }
      }
    }
    return count;
  }

  getPaytable() {
    return GAME_CONFIG.paytable;
  }

  getPaylines() {
    return GAME_CONFIG.paylines;
  }

  getRTP(): number {
    return GAME_CONFIG.rtp;
  }

  getMaxWin(): number {
    return GAME_CONFIG.maxWinMultiplier;
  }
}
