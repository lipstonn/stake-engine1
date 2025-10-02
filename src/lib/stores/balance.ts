import { writable } from 'svelte/store';

export const balance = writable<number>(0);
export const currency = writable<string>('USD');
export const currentBet = writable<number>(1);
export const betLevels = writable<number[]>([0.11, 0.5, 1, 2, 5, 10, 20, 50, 100]);
export const isAuthenticated = writable<boolean>(false);

window.addEventListener('balanceUpdate', (event: Event) => {
  const customEvent = event as CustomEvent<{ amount: number; currency: string }>;
  balance.set(customEvent.detail.amount);
  currency.set(customEvent.detail.currency);
});

window.addEventListener('roundActive', (event: Event) => {
  const customEvent = event as CustomEvent<{ active: boolean }>;
  console.log('Round active event:', customEvent.detail.active);
});