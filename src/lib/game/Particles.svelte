<script lang="ts">
  import { onMount } from 'svelte';

  export let active: boolean = false;
  export let x: number = 0;
  export let y: number = 0;
  export let count: number = 30;

  interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
  }

  let particles: Particle[] = [];
  let animationFrame: number;

  const colors = ['#00F0FF', '#FF006E', '#39FF14', '#FFD700'];

  $: if (active) {
    createParticles();
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        id: i,
        x,
        y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    animate();
  }

  function animate() {
    particles = particles
      .map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        vy: p.vy + 0.2,
        life: p.life - 0.02
      }))
      .filter(p => p.life > 0);

    if (particles.length > 0) {
      animationFrame = requestAnimationFrame(animate);
    }
  }

  onMount(() => {
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  });
</script>

<div class="particles-container">
  {#each particles as particle (particle.id)}
    <div
      class="particle"
      style="
        left: {particle.x}px;
        top: {particle.y}px;
        opacity: {particle.life};
        background: {particle.color};
        box-shadow: 0 0 10px {particle.color};
      "
    />
  {/each}
</div>

<style>
  .particles-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1000;
  }

  .particle {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    pointer-events: none;
  }
</style>
