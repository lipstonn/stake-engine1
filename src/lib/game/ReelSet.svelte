<script lang="ts">
  import Reel from './Reel.svelte';
  import { currentBoard } from '../stores/gameState';

  export let winningPositions: Set<string> = new Set();

  $: reels = $currentBoard.length > 0 ? $currentBoard : [
    ['H1', 'A', 'K'],
    ['H2', 'Q', 'J'],
    ['H3', '10', 'A'],
    ['H4', 'K', 'Q'],
    ['H5', 'J', '10']
  ];
</script>

<div class="reel-set">
  {#each reels as symbols, i}
    <Reel
      {symbols}
      reelIndex={i}
      {winningPositions}
    />
  {/each}
</div>

<style>
  .reel-set {
    display: flex;
    gap: 10px;
    justify-content: center;
    padding: 20px;
    background: linear-gradient(135deg, #1A0B2E 0%, #2D1B4E 100%);
    border-radius: 16px;
    box-shadow:
      0 0 40px rgba(0, 240, 255, 0.2),
      inset 0 0 60px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    .reel-set {
      transform: scale(0.8);
      padding: 15px;
    }
  }

  @media (max-width: 480px) {
    .reel-set {
      transform: scale(0.6);
      padding: 10px;
      gap: 5px;
    }
  }
</style>
