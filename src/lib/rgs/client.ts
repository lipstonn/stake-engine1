import { RGSClient as StakeRGSClient } from 'stake-engine';
import type { AuthResponse, PlayRequest, PlayResponse, RGSError } from './types';

class RGSClientWrapper {
  private client: any;
  private initialized = false;

  constructor() {
    this.client = StakeRGSClient({
      url: window.location.href
    });
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    window.addEventListener('balanceUpdate', this.handleBalanceUpdate.bind(this));
    window.addEventListener('roundActive', this.handleRoundActive.bind(this));
  }

  private handleBalanceUpdate(event: Event): void {
    const customEvent = event as CustomEvent<{ amount: number; currency: string }>;
    console.log('Balance updated:', customEvent.detail);
  }

  private handleRoundActive(event: Event): void {
    const customEvent = event as CustomEvent<{ active: boolean }>;
    console.log('Round active:', customEvent.detail.active);
  }

  async authenticate(): Promise<AuthResponse> {
    try {
      const response = await this.client.Authenticate();
      this.initialized = true;
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async play(amount: number, mode: 'base' | 'bonus' = 'base'): Promise<PlayResponse> {
    if (!this.initialized) {
      throw new Error('RGS client not initialized. Call authenticate() first.');
    }

    try {
      const response = await this.client.Play({
        amount: amount,
        mode
      });
      return response;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async endRound(): Promise<void> {
    try {
      await this.client.EndRound();
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: any): void {
    const rgsError = error as RGSError;
    switch (rgsError.code) {
      case 'ERR_IPB':
        console.error('Insufficient balance');
        break;
      case 'ERR_IS':
        console.error('Invalid session');
        break;
      default:
        console.error('RGS Error:', rgsError.message || error);
    }
  }
}

export const rgsClient = new RGSClientWrapper();