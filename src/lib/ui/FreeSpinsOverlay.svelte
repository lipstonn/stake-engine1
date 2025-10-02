<script lang="ts">
  import { freeSpinsRemaining, currentMultiplier } from '../stores/gameState';

  $: showOverlay = $freeSpinsRemaining > 0;
</script>

{#if showOverlay}
  <div class="free-spins-overlay">
    <div class="overlay-content">
      <div class="title">FREE SPINS!</div>
      <div class="spins-remaining">{$freeSpinsRemaining} Spins Left</div>
      <div class="multiplier">x{$currentMultiplier} Multiplier</div>
    </div>
  </div>
{/if}

<style>
  .free-spins-overlay {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    pointer-events: none;
  }

  .overlay-content {
    background: rgba(57, 255, 20, 0.2);
    border: 3px solid #39FF14;
    border-radius: 16px;
    padding: 30px 50px;
    text-align: center;
    box-shadow:
      0 0 50px rgba(57, 255, 20, 0.6),
      inset 0 0 30px rgba(57, 255, 20, 0.2);
    animation: pulse-overlay 2s ease-in-out infinite;
  }

  .title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #39FF14;
    text-shadow: 0 0 20px #39FF14;
    margin-bottom: 10px;
  }

  .spins-remaining {
    font-size: 1.5rem;
    color: #FFFFFF;
    text-shadow: 0 0 10px #39FF14;
    margin-bottom: 5px;
  }

  .multiplier {
    font-size: 2rem;
    font-weight: bold;
    color: #FFD700;
    text-shadow: 0 0 15px #FFD700;
  }

  @keyframes pulse-overlay {
    0%, 100% {
      opacity: 0.8;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    .overlay-content {
      padding: 20px 30px;
    }

    .title {
      font-size: 2rem;
    }

    .spins-remaining {
      font-size: 1.25rem;
    }

    .multiplier {
      font-size: 1.5rem;
    }
  }
</style>
