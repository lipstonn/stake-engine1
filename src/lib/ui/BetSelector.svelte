<script lang="ts">
  import { currentBet, betLevels } from '../stores/balance';
  import { isSpinning } from '../stores/gameState';

  let selectedBetIndex = 0;

  $: if ($betLevels.length > 0) {
    currentBet.set($betLevels[selectedBetIndex]);
  }

  function increaseBet() {
    if (selectedBetIndex < $betLevels.length - 1) {
      selectedBetIndex++;
    }
  }

  function decreaseBet() {
    if (selectedBetIndex > 0) {
      selectedBetIndex--;
    }
  }

  function setMaxBet() {
    selectedBetIndex = $betLevels.length - 1;
  }
</script>

<div class="bet-selector">
  <button
    class="bet-button"
    on:click={decreaseBet}
    disabled={$isSpinning || selectedBetIndex === 0}
    aria-label="Decrease bet"
  >
    −
  </button>

  <div class="bet-display">
    <div class="label">Bet</div>
    <div class="amount">${$currentBet.toFixed(2)}</div>
  </div>

  <button
    class="bet-button"
    on:click={increaseBet}
    disabled={$isSpinning || selectedBetIndex === $betLevels.length - 1}
    aria-label="Increase bet"
  >
    +
  </button>

  <button
    class="max-button"
    on:click={setMaxBet}
    disabled={$isSpinning}
  >
    MAX
  </button>
</div>

<style>
  .bet-selector {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .bet-button,
  .max-button {
    padding: 10px 16px;
    font-size: 1.25rem;
    font-weight: bold;
    color: #FFFFFF;
    background: linear-gradient(135deg, #00F0FF 0%, #0080FF 100%);
    border: 2px solid #00F0FF;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
  }

  .bet-button:hover:not(:disabled),
  .max-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(0, 240, 255, 0.6);
  }

  .bet-button:disabled,
  .max-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .max-button {
    padding: 10px 20px;
    font-size: 0.875rem;
  }

  .bet-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px 24px;
    background: rgba(57, 255, 20, 0.1);
    border: 2px solid #39FF14;
    border-radius: 8px;
    min-width: 100px;
  }

  .label {
    font-size: 0.75rem;
    color: #39FF14;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .amount {
    font-size: 1.25rem;
    font-weight: bold;
    color: #FFFFFF;
    text-shadow: 0 0 10px #39FF14;
  }

  @media (max-width: 768px) {
    .bet-selector {
      flex-wrap: wrap;
      justify-content: center;
    }

    .bet-button,
    .max-button {
      padding: 8px 12px;
      font-size: 1rem;
    }

    .bet-display {
      min-width: 80px;
      padding: 6px 16px;
    }
  }
</style>
