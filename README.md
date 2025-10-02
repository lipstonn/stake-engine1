# Crypto Vault Heist - Stake Engine Slot Game

A production-ready 5x3 slot game with 20 paylines featuring a cyberpunk crypto heist theme. Built with Svelte + Vite and fully integrated with Stake Engine RGS.

## Features

### Game Mechanics
- 5x3 Reel Grid with 20 active paylines
- 15 Symbol Types: High-value (Diamond, Gold Bar, Bitcoin, Ethereum, Safe), Low-value (A, K, Q, J, 10), Special symbols (Wild, Scatter, Bonus, Multiplier, Expanding Wild)
- Comprehensive Paytable with wins up to 1000x bet per line
- Free Spins Feature triggered by 3+ Scatter symbols (10 spins with 3x multiplier)
- Bonus Game "Crack the Safe" mini-game with instant prizes

### Visual Design
- Cyberpunk Neon Theme with Electric Blue, Hot Pink, and Neon Green colors
- Animated Reels with smooth 2-second spin animations
- Win Celebrations with particle effects and glowing symbols
- Responsive Design optimized for desktop, tablet, and mobile devices
- Accessibility Features including keyboard navigation and reduced motion support

### RGS Integration
- Full Stake Engine RGS API integration
- Proper authentication and session management
- Real-time balance updates
- Secure round lifecycle (Play → Reveal → EndRound)
- Comprehensive error handling (insufficient balance, session expiry)
- 6-decimal precision money formatting (API_MULTIPLIER = 1,000,000)

## Technology Stack

- Framework: Svelte 4 + TypeScript
- Build Tool: Vite 5
- RGS Client: stake-engine (latest)
- Styling: Custom CSS with cyberpunk neon theme
- Font: Orbitron (Google Fonts)

## Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment to Stake Engine.

## Deployment to Stake Engine

### Pre-Deployment Checklist

- Vite config has base: './' (critical for Stake Engine)
- All RGS API calls implemented (Authenticate, Play, EndRound)
- Balance update event listener active
- Round active event listener implemented
- Error handling for ERR_IPB and ERR_IS
- Money formatting uses API_MULTIPLIER (1,000,000)
- Build completes without errors
- Responsive design tested

### Deployment Steps

1. Build the project: `npm run build`
2. Upload the entire `dist/` folder contents to Stake Engine "Frontend Files"
3. Test with the provided Stake Engine test URL

## RGS Integration

### Authentication
```typescript
const response = await rgsClient.authenticate();
```

### Play Round
```typescript
const response = await rgsClient.play(betAmount, 'base');
```

### Event Listeners
Global events for balance updates and round state changes are automatically handled.

## Game States

IDLE → BETTING → SPINNING → REVEALING → WINNING → BONUS_TRIGGER → BONUS_PLAY

## Keyboard Controls

- Space: Spin reels
- Arrow Up: Increase bet
- Arrow Down: Decrease bet

## Version

1.0.0 - Built for Stake Engine Platform
