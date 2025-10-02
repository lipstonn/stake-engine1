<script lang="ts">
  import { PAYLINES } from './paytable';

  export let activeLines: number[] = [];
  export let reelWidth: number = 110;
  export let symbolHeight: number = 110;

  const lineColors = [
    '#FF006E', '#00F0FF', '#39FF14', '#FFD700', '#FF4081',
    '#00D9FF', '#7FFF00', '#FFA500', '#FF1493', '#00CED1'
  ];

  function getLinePoints(payline: number[]): string {
    return payline
      .map((row, reelIndex) => {
        const x = reelIndex * (reelWidth + 10) + reelWidth / 2 + 20;
        const y = row * symbolHeight + symbolHeight / 2 + 20;
        return `${x},${y}`;
      })
      .join(' ');
  }

  function getLineColor(index: number): string {
    return lineColors[index % lineColors.length];
  }
</script>

{#if activeLines.length > 0}
  <svg class="win-lines" width="600" height="400">
    {#each activeLines as lineIndex}
      {#if PAYLINES[lineIndex]}
        <polyline
          points={getLinePoints(PAYLINES[lineIndex])}
          fill="none"
          stroke={getLineColor(lineIndex)}
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="win-line"
          style="filter: drop-shadow(0 0 8px {getLineColor(lineIndex)});"
        />
      {/if}
    {/each}
  </svg>
{/if}

<style>
  .win-lines {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 10;
  }

  .win-line {
    animation: line-glow 1s ease-in-out infinite alternate;
  }

  @keyframes line-glow {
    from {
      stroke-width: 3px;
      opacity: 0.7;
    }
    to {
      stroke-width: 5px;
      opacity: 1;
    }
  }
</style>
