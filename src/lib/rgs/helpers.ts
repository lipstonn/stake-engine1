export const API_MULTIPLIER = 1000000;

interface CurrencyMeta {
  symbol: string;
  decimals: number;
}

const CURRENCIES: Record<string, CurrencyMeta> = {
  'USD': { symbol: '$', decimals: 2 },
  'EUR': { symbol: '€', decimals: 2 },
  'TRY': { symbol: '₺', decimals: 2 },
  'GBP': { symbol: '£', decimals: 2 },
  'BTC': { symbol: '₿', decimals: 8 },
  'ETH': { symbol: 'Ξ', decimals: 6 },
};

export function formatBalance(amount: number, currency: string): string {
  const meta = CURRENCIES[currency] || { symbol: currency, decimals: 2 };
  return `${meta.symbol}${amount.toFixed(meta.decimals)}`;
}

export function toApiAmount(betAmount: number): number {
  return Math.round(betAmount * API_MULTIPLIER);
}

export function fromApiAmount(apiAmount: number): number {
  return apiAmount / API_MULTIPLIER;
}

export function parseUrlParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}
