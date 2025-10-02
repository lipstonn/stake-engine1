<script lang="ts">
  import type { SymbolType } from '../rgs/types';

  export let symbol: string = '';
  export let isWinning: boolean = false;
  export let size: number = 100;

  const symbolColors: Record<string, string> = {
    'H1': '#FFD700',
    'H2': '#FFA500',
    'H3': '#F7931A',
    'H4': '#627EEA',
    'H5': '#C0C0C0',
    'A': '#FF006E',
    'K': '#00F0FF',
    'Q': '#39FF14',
    'J': '#FF006E',
    '10': '#00F0FF',
    'WILD': '#FFD700',
    'SCATTER': '#39FF14',
    'BONUS': '#FF006E',
    'MULTIPLIER': '#00F0FF',
    'EXPANDING_WILD': '#FFD700'
  };

  const symbolEmoji: Record<string, string> = {
    'H1': '💎',
    'H2': '🏆',
    'H3': '₿',
    'H4': 'Ξ',
    'H5': '🔐',
    'A': 'A',
    'K': 'K',
    'Q': 'Q',
    'J': 'J',
    '10': '10',
    'WILD': '⭐',
    'SCATTER': '🌟',
    'BONUS': '🎁',
    'MULTIPLIER': '✖️',
    'EXPANDING_WILD': '💫'
  };

  $: color = symbolColors[symbol] || '#FFFFFF';
  $: displaySymbol = symbolEmoji[symbol] || symbol;
</script>

<div
  class="symbol"
  class:winning={isWinning}
  style="width: {size}px; height: {size}px; border-color: {color};"
>
  <div class="symbol-content" style="color: {color};">
    {displaySymbol}
  </div>
  {#if isWinning}
    <div class="glow" style="box-shadow: 0 0 20px {color}, 0 0 40px {color};"></div>
  {/if}
</div>

<style>
  .symbol {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(26, 11, 46, 0.8);
    border: 2px solid;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }

  .symbol-content {
    font-size: 2.5rem;
    font-weight: bold;
    text-shadow: 0 0 10px currentColor;
    z-index: 2;
  }

  .symbol.winning {
    animation: pulse 0.5s ease-in-out infinite alternate;
  }

  .glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    z-index: 1;
    animation: glow-pulse 1s ease-in-out infinite alternate;
  }

  @keyframes pulse {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.05);
    }
  }

  @keyframes glow-pulse {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }
</style>
