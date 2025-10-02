<script lang="ts">
  import BetSelector from './BetSelector.svelte';
  import { currentBet, balance } from '../stores/balance';
  import { isSpinning } from '../stores/gameState';

  export let onSpin: (betAmount: number) => void;

  let autoPlayCount = 0;
  let isAutoPlay = false;

  function handleSpinClick() {
    if ($isSpinning) return;
    if ($currentBet > $balance) {
      alert('Insufficient balance');
      return;
    }

    // Direkt currentBet'i gönder - backend zaten API formatında bekliyor
    console.log('=== BET DEBUG ===');
    console.log('Current bet (display):', $currentBet);
    console.log('Sending to backend:', $currentBet);
    
    onSpin($currentBet);

    if (isAutoPlay && autoPlayCount > 0) {
      autoPlayCount--;
      if (autoPlayCount === 0) {
        isAutoPlay = false;
      }
    }
  }

  function startAutoPlay() {
    isAutoPlay = true;
    autoPlayCount = 10;
    handleSpinClick();
  }

  function stopAutoPlay() {
    isAutoPlay = false;
    autoPlayCount = 0;
  }
</script>

<div class="control-panel">
  <BetSelector />
  
  <button
    class="spin-button"
    class:spinning={$isSpinning}
    on:click={handleSpinClick}
    disabled={$isSpinning || $currentBet > $balance}
    aria-label="Spin reels"
  >
    {$isSpinning ? 'SPINNING...' : 'SPIN'}
  </button>

  <div class="auto-play">
    {#if !isAutoPlay}
      <button
        class="auto-button"
        on:click={startAutoPlay}
        disabled={$isSpinning}
      >
        AUTO (10x)
      </button>
    {:else}
      <button
        class="auto-button stop"
        on:click={stopAutoPlay}
      >
        STOP ({autoPlayCount})
      </button>
    {/if}
  </div>
</div>

<style>
  .control-panel {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    background: rgba(26, 11, 46, 0.9);
    border: 2px solid #FF006E;
    border-radius: 16px;
    box-shadow: 0 0 40px rgba(255, 0, 110, 0.3);
  }

  .spin-button {
    padding: 20px 60px;
    font-size: 1.5rem;
    font-weight: bold;
    color: #1A0B2E;
    background: linear-gradient(135deg, #39FF14 0%, #00FF88 100%);
    border: 3px solid #39FF14;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow:
      0 0 30px rgba(57, 255, 20, 0.5),
      inset 0 0 20px rgba(255, 255, 255, 0.2);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .spin-button:hover:not(:disabled) {
    transform: translateY(-4px) scale(1.05);
    box-shadow:
      0 0 50px rgba(57, 255, 20, 0.8),
      inset 0 0 30px rgba(255, 255, 255, 0.3);
  }

  .spin-button:active:not(:disabled) {
    transform: translateY(-2px) scale(1.02);
  }

  .spin-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .spin-button.spinning {
    animation: spin-pulse 1s ease-in-out infinite;
  }

  .auto-button {
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: bold;
    color: #FFFFFF;
    background: linear-gradient(135deg, #FF006E 0%, #FF4081 100%);
    border: 2px solid #FF006E;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 20px rgba(255, 0, 110, 0.3);
  }

  .auto-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(255, 0, 110, 0.6);
  }

  .auto-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .auto-button.stop {
    background: linear-gradient(135deg, #FF4444 0%, #CC0000 100%);
    border-color: #FF4444;
  }

  @keyframes spin-pulse {
    0%, 100% {
      box-shadow:
        0 0 30px rgba(57, 255, 20, 0.5),
        inset 0 0 20px rgba(255, 255, 255, 0.2);
    }
    50% {
      box-shadow:
        0 0 50px rgba(57, 255, 20, 0.8),
        inset 0 0 30px rgba(255, 255, 255, 0.3);
    }
  }

  @media (max-width: 768px) {
    .control-panel {
      flex-direction: column;
      gap: 15px;
    }

    .spin-button {
      padding: 16px 48px;
      font-size: 1.25rem;
    }
  }
</style>