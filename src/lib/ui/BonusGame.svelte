<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let active: boolean = false;

  const dispatch = createEventDispatcher();

  interface Vault {
    id: number;
    revealed: boolean;
    prize: number;
  }

  let vaults: Vault[] = [];
  let picksRemaining = 3;
  let totalWin = 0;

  $: if (active && vaults.length === 0) {
    initializeVaults();
  }

  function initializeVaults() {
    vaults = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      revealed: false,
      prize: Math.floor(Math.random() * 50) + 10
    }));
    picksRemaining = 3;
    totalWin = 0;
  }

  function pickVault(vaultId: number) {
    if (picksRemaining === 0) return;

    const vault = vaults.find(v => v.id === vaultId);
    if (!vault || vault.revealed) return;

    vault.revealed = true;
    totalWin += vault.prize;
    picksRemaining--;

    if (picksRemaining === 0) {
      setTimeout(() => {
        dispatch('complete', { totalWin });
        close();
      }, 2000);
    }
  }

  function close() {
    active = false;
    vaults = [];
  }
</script>

{#if active}
  <div class="bonus-game-overlay">
    <div class="bonus-game">
      <div class="header">
        <h2>CRACK THE SAFE</h2>
        <div class="info">
          <div>Picks Remaining: {picksRemaining}</div>
          <div>Total Win: ${totalWin}</div>
        </div>
      </div>

      <div class="vaults-grid">
        {#each vaults as vault}
          <button
            class="vault"
            class:revealed={vault.revealed}
            on:click={() => pickVault(vault.id)}
            disabled={vault.revealed || picksRemaining === 0}
          >
            {#if vault.revealed}
              <div class="prize">${vault.prize}</div>
            {:else}
              <div class="lock">🔒</div>
            {/if}
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .bonus-game-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    animation: fade-in 0.3s ease;
  }

  .bonus-game {
    background: linear-gradient(135deg, #1A0B2E 0%, #2D1B4E 100%);
    border: 3px solid #FFD700;
    border-radius: 16px;
    padding: 40px;
    max-width: 800px;
    box-shadow: 0 0 60px rgba(255, 215, 0, 0.6);
  }

  .header {
    text-align: center;
    margin-bottom: 30px;
  }

  .header h2 {
    font-size: 2.5rem;
    color: #FFD700;
    text-shadow: 0 0 20px #FFD700;
    margin: 0 0 20px 0;
  }

  .info {
    display: flex;
    justify-content: space-around;
    font-size: 1.25rem;
    color: #FFFFFF;
    text-shadow: 0 0 10px #00F0FF;
  }

  .vaults-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }

  .vault {
    aspect-ratio: 1;
    background: rgba(0, 240, 255, 0.1);
    border: 2px solid #00F0FF;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
  }

  .vault:hover:not(:disabled) {
    transform: scale(1.1);
    box-shadow: 0 0 40px rgba(0, 240, 255, 0.6);
  }

  .vault:disabled {
    cursor: not-allowed;
  }

  .vault.revealed {
    background: rgba(255, 215, 0, 0.2);
    border-color: #FFD700;
    animation: reveal 0.5s ease;
  }

  .lock {
    font-size: 3rem;
  }

  .prize {
    font-size: 1.5rem;
    font-weight: bold;
    color: #FFD700;
    text-shadow: 0 0 15px #FFD700;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes reveal {
    0% {
      transform: rotateY(0deg);
    }
    50% {
      transform: rotateY(90deg);
    }
    100% {
      transform: rotateY(0deg);
    }
  }

  @media (max-width: 768px) {
    .bonus-game {
      padding: 20px;
      max-width: 90%;
    }

    .header h2 {
      font-size: 2rem;
    }

    .vaults-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
  }
</style>
