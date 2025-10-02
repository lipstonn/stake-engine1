<script lang="ts">
  import { balance, currency } from '../stores/balance';
  import { formatBalance } from '../rgs/helpers';

  $: displayBalance = formatBalance($balance, $currency);
</script>

<div class="balance-display">
  <div class="label">Balance</div>
  <div class="amount">{displayBalance}</div>
</div>

<style>
  .balance-display {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    padding: 12px 20px;
    background: rgba(0, 240, 255, 0.1);
    border: 2px solid #00F0FF;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
  }

  .label {
    font-size: 0.75rem;
    color: #00F0FF;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .amount {
    font-size: 1.5rem;
    font-weight: bold;
    color: #FFFFFF;
    text-shadow: 0 0 10px #00F0FF;
  }

  @media (max-width: 768px) {
    .balance-display {
      padding: 8px 16px;
    }

    .amount {
      font-size: 1.25rem;
    }
  }
</style>
