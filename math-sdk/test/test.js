const { SlotEngine, RNG, GAME_CONFIG } = require('../dist/index');

console.log('=== Crypto Vault Heist Math SDK Test ===\n');

const rng = new RNG(12345);
const engine = new SlotEngine(rng);

console.log('Game Configuration:');
console.log(`- RTP: ${GAME_CONFIG.rtp}%`);
console.log(`- Volatility: ${GAME_CONFIG.volatility}`);
console.log(`- Paylines: ${GAME_CONFIG.paylines.length}`);
console.log(`- Max Win: ${GAME_CONFIG.maxWinMultiplier}x`);
console.log(`- Free Spins: ${GAME_CONFIG.freeSpinsConfig.spinsAwarded} spins @ ${GAME_CONFIG.freeSpinsConfig.multiplier}x\n`);

console.log('=== Base Game Spins ===\n');

let totalWagered = 0;
let totalWon = 0;
let winCount = 0;
let freeSpinsTriggered = 0;
let bonusTriggered = 0;

const spinCount = 100;
const betAmount = 1;

for (let i = 0; i < spinCount; i++) {
  const result = engine.spin({ bet: betAmount, mode: 'base' });

  totalWagered += betAmount;
  totalWon += result.totalWin;

  if (result.totalWin > 0) {
    winCount++;
  }

  if (result.freeSpinsTriggered) {
    freeSpinsTriggered++;
  }

  if (result.bonusTriggered) {
    bonusTriggered++;
  }

  if (i < 5) {
    console.log(`Spin ${i + 1}:`);
    console.log('Board:');
    for (let row = 0; row < 3; row++) {
      const rowSymbols = result.board.map(reel => {
        const symbol = reel[row];
        return symbol.padEnd(8);
      }).join(' | ');
      console.log(`  ${rowSymbols}`);
    }

    if (result.wins.length > 0) {
      console.log('Wins:');
      result.wins.forEach(win => {
        console.log(`  - Payline ${win.paylineId}: ${win.count}x ${win.symbol} = ${win.payout.toFixed(2)}`);
      });
      console.log(`Total Win: ${result.totalWin.toFixed(2)}`);
    } else {
      console.log('No wins');
    }

    if (result.freeSpinsTriggered) {
      console.log(`FREE SPINS TRIGGERED! ${result.freeSpinsAwarded} spins awarded`);
    }

    if (result.bonusTriggered) {
      console.log('BONUS GAME TRIGGERED!');
    }

    console.log('');
  }
}

console.log(`\n=== Statistics (${spinCount} spins) ===\n`);
console.log(`Total Wagered: ${totalWagered.toFixed(2)}`);
console.log(`Total Won: ${totalWon.toFixed(2)}`);
console.log(`RTP: ${((totalWon / totalWagered) * 100).toFixed(2)}%`);
console.log(`Hit Frequency: ${((winCount / spinCount) * 100).toFixed(2)}%`);
console.log(`Free Spins Triggered: ${freeSpinsTriggered} (${((freeSpinsTriggered / spinCount) * 100).toFixed(2)}%)`);
console.log(`Bonus Triggered: ${bonusTriggered} (${((bonusTriggered / spinCount) * 100).toFixed(2)}%)`);

console.log('\n=== Free Spins Test ===\n');

const freeSpinResult = engine.spin({
  bet: betAmount,
  mode: 'freespins',
  freeSpinsRemaining: 10
});

console.log('Free Spin Board:');
for (let row = 0; row < 3; row++) {
  const rowSymbols = freeSpinResult.board.map(reel => {
    const symbol = reel[row];
    return symbol.padEnd(8);
  }).join(' | ');
  console.log(`  ${rowSymbols}`);
}

if (freeSpinResult.wins.length > 0) {
  console.log(`\nWins (${freeSpinResult.multiplier}x multiplier):`);
  freeSpinResult.wins.forEach(win => {
    console.log(`  - Payline ${win.paylineId}: ${win.count}x ${win.symbol} = ${win.payout.toFixed(2)}`);
  });
  console.log(`Total Win: ${freeSpinResult.totalWin.toFixed(2)}`);
} else {
  console.log('\nNo wins');
}

console.log('\n=== Paytable ===\n');

const paytable = engine.getPaytable();
console.log('Symbol | 3-of-a-kind | 4-of-a-kind | 5-of-a-kind');
console.log('-------|-------------|-------------|------------');
paytable.forEach(entry => {
  const sym = entry.symbol.padEnd(6);
  const pay3 = entry.payouts[2].toString().padStart(11);
  const pay4 = entry.payouts[3].toString().padStart(11);
  const pay5 = entry.payouts[4].toString().padStart(11);
  console.log(`${sym} | ${pay3} | ${pay4} | ${pay5}`);
});

console.log('\n=== Test Complete ===');
