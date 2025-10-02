<script lang="ts">
  import Symbol from './Symbol.svelte';
  import { isSpinning } from '../stores/gameState';

  export let symbols: string[] = ['', '', ''];
  export let reelIndex: number = 0;
  export let winningPositions: Set<string> = new Set();

  let animationOffset = 0;

  $: if ($isSpinning) {
    startSpinAnimation();
  } else {
    stopSpinAnimation();
  }

  function startSpinAnimation() {
    const duration = 2000 + (reelIndex * 200);
    const startTime = Date.now();

    function animate() {
      if (!$isSpinning) {
        animationOffset = 0;
        return;
      }

      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      animationOffset = Math.sin(progress * Math.PI * 6) * 500;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        animationOffset = 0;
      }
    }

    animate();
  }

  function stopSpinAnimation() {
    animationOffset = 0;
  }

  function isSymbolWinning(rowIndex: number): boolean {
    return winningPositions.has(`${reelIndex}-${rowIndex}`);
  }
</script>

<div class="reel">
  <div
    class="reel-strip"
    style="transform: translateY({animationOffset}px);"
  >
    {#each symbols as symbol, i}
      <div class="symbol-container">
        <Symbol
          {symbol}
          isWinning={isSymbolWinning(i)}
          size={100}
        />
      </div>
    {/each}
  </div>
</div>

<style>
  .reel {
    width: 110px;
    height: 330px;
    overflow: hidden;
    border: 2px solid #00F0FF;
    border-radius: 8px;
    background: rgba(10, 5, 20, 0.9);
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
  }

  .reel-strip {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 5px;
    transition: transform 0.1s linear;
  }

  .symbol-container {
    flex-shrink: 0;
  }
</style>
