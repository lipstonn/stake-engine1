<script lang="ts">
  import { onMount } from 'svelte';
  import { rgsClient } from '../rgs/client';
  import { gameState, currentBoard, currentWin, isSpinning, isBonusMode } from '../stores/gameState';
  import { balance, currency, currentBet, isAuthenticated } from '../stores/balance';
  import { fromApiAmount } from '../rgs/helpers';
  import type { PlayResponse } from '../rgs/types';

  let errorMessage = '';
  let isInitializing = true;

  onMount(async () => {
    try {
      const authResponse = await rgsClient.authenticate();
      balance.set(fromApiAmount(authResponse.balance));
      currency.set(authResponse.currency);

      if (authResponse.betLevels && authResponse.betLevels.length > 0) {
        const convertedBetLevels = authResponse.betLevels.map(fromApiAmount);
        currentBet.set(convertedBetLevels[0]);
      }

      isAuthenticated.set(true);
      gameState.set('IDLE');
    } catch (error: any) {
      errorMessage = error.message || 'Failed to initialize game';
      console.error('Authentication error:', error);
    } finally {
      isInitializing = false;
    }
  });

  export async function spin(betAmount: number): Promise<void> {
    if ($gameState !== 'IDLE') return;

    try {
      gameState.set('BETTING');
      isSpinning.set(true);
      currentWin.set(0);

      const mode = $isBonusMode ? 'bonus' : 'base';
      const response: PlayResponse = await rgsClient.play(betAmount, mode);

      gameState.set('SPINNING');

      await new Promise(resolve => setTimeout(resolve, 2000));

      gameState.set('REVEALING');

      const events = response.round.state;
      const revealEvent = events.find(e => e.type === 'reveal');

      if (revealEvent && revealEvent.board) {
        currentBoard.set(revealEvent.board);
      }

      await new Promise(resolve => setTimeout(resolve, 500));

      const winInfo = events.find(e => e.type === 'winInfo');
      if (winInfo && winInfo.totalWin && winInfo.totalWin > 0) {
        gameState.set('WINNING');
        currentWin.set(fromApiAmount(winInfo.totalWin));
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      await rgsClient.endRound();

      gameState.set('IDLE');
      isSpinning.set(false);

    } catch (error: any) {
      errorMessage = getErrorMessage(error);
      gameState.set('IDLE');
      isSpinning.set(false);
      console.error('Spin error:', error);
    }
  }

  function getErrorMessage(error: any): string {
    if (error.code === 'ERR_IPB') {
      return 'Insufficient balance';
    } else if (error.code === 'ERR_IS') {
      return 'Session expired. Please refresh.';
    }
    return 'An error occurred. Please try again.';
  }

  export function clearError(): void {
    errorMessage = '';
  }
</script>

<slot {spin} {errorMessage} {clearError} {isInitializing} />
