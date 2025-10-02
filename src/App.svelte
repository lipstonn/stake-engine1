<script lang="ts">
  import GameEngine from './lib/game/GameEngine.svelte';
  import ReelSet from './lib/game/ReelSet.svelte';
  import Particles from './lib/game/Particles.svelte';
  import WinLines from './lib/game/WinLines.svelte';
  import BalanceDisplay from './lib/ui/BalanceDisplay.svelte';
  import WinDisplay from './lib/ui/WinDisplay.svelte';
  import ControlPanel from './lib/ui/ControlPanel.svelte';
  import FreeSpinsOverlay from './lib/ui/FreeSpinsOverlay.svelte';
  import BonusGame from './lib/ui/BonusGame.svelte';

  import { currentWin } from './lib/stores/gameState';

  let activeWinLines: number[] = [];
  let showParticles = false;
  let particleX = 0;
  let particleY = 0;
  let showBonusGame = false;

  function handleBonusComplete(event: CustomEvent<{ totalWin: number }>) {
    console.log('Bonus game complete, total win:', event.detail.totalWin);
    showBonusGame = false;
  }

  $: if ($currentWin > 0) {
    showParticles = true;
    particleX = window.innerWidth / 2;
    particleY = window.innerHeight / 2;
  } else {
    showParticles = false;
  }
</script>

<GameEngine let:spin let:errorMessage let:clearError let:isInitializing>
  <main class="game-container">
    <header class="game-header">
      <h1 class="game-title neon-text">
        <span class="vault-icon">🏦</span>
        Crypto Vault Heist
        <span class="vault-icon">💎</span>
      </h1>
      <BalanceDisplay />
    </header>

    {#if isInitializing}
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Connecting to game server...</p>
      </div>
    {:else}
      <section class="game-area">
        <div class="reel-container">
          <ReelSet />
          <WinLines {activeWinLines} />
        </div>

        <div class="win-section">
          <WinDisplay />
        </div>
      </section>

      <section class="controls-area">
        <ControlPanel onSpin={spin} />
      </section>

      {#if errorMessage}
        <div class="error-notification" role="alert">
          <p>{errorMessage}</p>
          <button on:click={clearError} aria-label="Close error message">✕</button>
        </div>
      {/if}
    {/if}

    <FreeSpinsOverlay />
    <BonusGame active={showBonusGame} on:complete={handleBonusComplete} />

    {#if showParticles}
      <Particles active={true} x={particleX} y={particleY} count={40} />
    {/if}

    <footer class="game-footer">
      <p>Crypto Vault Heist v1.0 | Powered by Stake Engine</p>
    </footer>
  </main>
</GameEngine>

<style>
  .game-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 100vh;
    padding: 20px;
  }

  .game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: rgba(26, 11, 46, 0.8);
    border: 2px solid var(--color-primary);
    border-radius: 16px;
    box-shadow: 0 0 40px rgba(0, 240, 255, 0.3);
  }

  .game-title {
    font-size: 2.5rem;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 15px;
    animation: neon-pulse 3s ease-in-out infinite;
  }

  .vault-icon {
    font-size: 2rem;
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    min-height: 400px;
  }

  .game-area {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  .reel-container {
    position: relative;
  }

  .win-section {
    display: flex;
    justify-content: center;
  }

  .controls-area {
    display: flex;
    justify-content: center;
  }

  .error-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 25px;
    background: rgba(255, 0, 0, 0.9);
    border: 2px solid #FF0000;
    border-radius: 8px;
    color: white;
    box-shadow: 0 0 30px rgba(255, 0, 0, 0.5);
    z-index: 3000;
    animation: slide-in 0.3s ease;
  }

  .error-notification button {
    background: transparent;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    line-height: 1;
  }

  .game-footer {
    margin-top: auto;
    padding: 20px;
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.875rem;
  }

  @keyframes slide-in {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    .game-container {
      padding: 10px;
      gap: 15px;
    }

    .game-header {
      flex-direction: column;
      gap: 15px;
      padding: 15px;
    }

    .game-title {
      font-size: 1.5rem;
    }

    .vault-icon {
      font-size: 1.25rem;
    }

    .error-notification {
      top: 10px;
      right: 10px;
      left: 10px;
      padding: 12px 20px;
    }
  }

  @media (max-width: 480px) {
    .game-title {
      font-size: 1.25rem;
    }
  }
</style>
