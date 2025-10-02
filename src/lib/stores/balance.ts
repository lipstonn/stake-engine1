import { writable } from 'svelte/store';

export const balance = writable<number>(0);
export const currency = writable<string>('USD');
export const currentBet = writable<number>(1);
export const betLevels = writable<number[]>([0.10, 0.20, 0.40, 0.60, 0.80, 1.00, 2.00, 4.00, 6.00, 8.00, 10.00]);
export const isAuthenticated = writable<boolean>(false);

const API_MULTIPLIER = 1000000;

window.addEventListener('balanceUpdate', (event: Event) => {
  const customEvent = event as CustomEvent<{ amount: number; currency: string }>;
  
  // API formatından normal formata çevir
  balance.set(customEvent.detail.amount / API_MULTIPLIER);
  currency.set(customEvent.detail.currency);
});

window.addEventListener('roundActive', (event: Event) => {
  const customEvent = event as CustomEvent<{ active: boolean }>;
  console.log('Round active event:', customEvent.detail.active);
});