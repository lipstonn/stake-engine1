<script lang="ts">
  import { currentWin } from '../stores/gameState';
  import { formatBalance } from '../rgs/helpers';
  import { currency } from '../stores/balance';

  $: displayWin = formatBalance($currentWin, $currency);
  $: isBigWin = $currentWin > 0;
</script>

<div class="win-display" class:big-win={isBigWin}>
  <div class="label">Win</div>
  <div class="amount">{displayWin}</div>
</div>

<style>
  .win-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 12px 20px;
    background: rgba(255, 0, 110, 0.1);
    border: 2px solid #FF006E;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(255, 0, 110, 0.3);
    transition: all 0.3s ease;
  }

  .win-display.big-win {
    animation: win-pulse 0.5s ease-in-out infinite alternate;
  }

  .label {
    font-size: 0.75rem;
    color: #FF006E;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .amount {
    font-size: 1.5rem;
    font-weight: bold;
    color: #FFFFFF;
    text-shadow: 0 0 10px #FF006E;
  }

  @keyframes win-pulse {
    from {
      transform: scale(1);
      box-shadow: 0 0 20px rgba(255, 0, 110, 0.3);
    }
    to {
      transform: scale(1.05);
      box-shadow: 0 0 40px rgba(255, 0, 110, 0.6);
    }
  }

  @media (max-width: 768px) {
    .win-display {
      padding: 8px 16px;
    }

    .amount {
      font-size: 1.25rem;
    }
  }
</style>
