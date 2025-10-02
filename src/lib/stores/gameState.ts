import { writable } from 'svelte/store';
import type { GameState } from '../rgs/types';

export const gameState = writable<GameState>('IDLE');

export const currentBoard = writable<string[][]>([
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]);

export const currentWin = writable<number>(0);
export const lastWin = writable<number>(0);
export const isSpinning = writable<boolean>(false);
export const isBonusMode = writable<boolean>(false);
export const freeSpinsRemaining = writable<number>(0);
export const currentMultiplier = writable<number>(1);
