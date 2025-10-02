# Crypto Vault Heist - Math SDK

Bu math SDK, Crypto Vault Heist slot oyununun tüm matematik hesaplamalarını yönetir. Stake Engine RGS platformu ile tam uyumludur.

## Özellikler

### Oyun Mekanikleri
- 5x3 reel grid
- 20 aktif payline
- 15 farklı sembol tipi
- RTP: %96.5 (orta volatilite)
- Maksimum kazanç: 10,000x bahis
- Free Spins özelliği (10 spin, 3x çarpan)
- Bonus oyunu desteği

### Sembol Tipleri

**Yüksek Değerli Semboller:**
- H1: Diamond (💎) - 5-of-a-kind: 1000x
- H2: Gold Bar (🏆) - 5-of-a-kind: 500x
- H3: Bitcoin (₿) - 5-of-a-kind: 300x
- H4: Ethereum (Ξ) - 5-of-a-kind: 200x
- H5: Safe (🔐) - 5-of-a-kind: 100x

**Düşük Değerli Semboller:**
- A, K, Q, J, 10 - 5-of-a-kind: 20-50x

**Özel Semboller:**
- WILD: Tüm sembollerin yerine geçer (Scatter/Bonus hariç)
- SCATTER: 3+ sembol free spins tetikler
- BONUS: 3+ sembol bonus oyunu tetikler

## Kurulum

```bash
cd math-sdk
npm install
npm run build
```

## Kullanım

```typescript
import { SlotEngine, RNG } from './dist/index';

const rng = new RNG();
const engine = new SlotEngine(rng);

const result = engine.spin({
  bet: 1.0,
  mode: 'base'
});

console.log('Board:', result.board);
console.log('Total Win:', result.totalWin);
console.log('Wins:', result.wins);
```

## API Referansı

### SlotEngine

#### `spin(request: SpinRequest): SpinResult`

Bir spin işlemi gerçekleştirir.

**Parametreler:**
- `request.bet`: Toplam bahis miktarı
- `request.mode`: Oyun modu ('base', 'freespins', veya 'bonus')
- `request.freeSpinsRemaining`: Kalan free spin sayısı (opsiyonel)

**Dönüş Değeri:**
```typescript
{
  board: SymbolType[][];        // 5x3 sembol dizisi
  wins: WinLineResult[];        // Kazanç bilgileri
  totalWin: number;             // Toplam kazanç
  freeSpinsTriggered: boolean;  // Free spins tetiklendi mi?
  freeSpinsAwarded?: number;    // Verilen free spin sayısı
  bonusTriggered: boolean;      // Bonus tetiklendi mi?
  multiplier: number;           // Aktif çarpan
}
```

#### `getPaytable(): PaytableEntry[]`

Paytable bilgilerini döndürür.

#### `getPaylines(): PaylineConfig[]`

Payline konfigürasyonlarını döndürür.

#### `getRTP(): number`

Oyunun RTP değerini döndürür.

#### `getMaxWin(): number`

Maksimum kazanç çarpanını döndürür.

### RNG (Random Number Generator)

#### `constructor(seed?: number)`

Yeni bir RNG instance'ı oluşturur. Seed belirtilmezse timestamp kullanılır.

#### `setSeed(seed: number): void`

RNG seed değerini değiştirir.

#### `next(): number`

0 ile 1 arasında rastgele bir sayı üretir.

#### `nextInt(min: number, max: number): number`

Belirtilen aralıkta rastgele bir tam sayı üretir.

## Test

SDK'yı test etmek için:

```bash
npm run build
npm test
```

Test scripti 100 spin simüle eder ve istatistikleri gösterir:
- RTP hesaplaması
- Hit frequency
- Free spins tetiklenme oranı
- Bonus tetiklenme oranı
- Örnek board durumları
- Paytable görünümü

## Örnek Test Çıktısı

```
=== Crypto Vault Heist Math SDK Test ===

Game Configuration:
- RTP: 96.5%
- Volatility: medium
- Paylines: 20
- Max Win: 10000x
- Free Spins: 10 spins @ 3x

=== Base Game Spins ===

Spin 1:
Board:
  H1       | K        | Q        | J        | H5
  A        | Q        | J        | 10       | 10
  K        | J        | 10       | H2       | A

Wins:
  - Payline 0: 3x K = 5.00
Total Win: 5.00

=== Statistics (100 spins) ===

Total Wagered: 100.00
Total Won: 96.75
RTP: 96.75%
Hit Frequency: 32.00%
Free Spins Triggered: 2 (2.00%)
Bonus Triggered: 1 (1.00%)
```

## Payline Konfigürasyonu

Oyunda 20 aktif payline bulunmaktadır. Her payline, her reel'den bir pozisyon alır:

```
Payline 0: [1,1,1,1,1] - Orta sıra
Payline 1: [0,0,0,0,0] - Üst sıra
Payline 2: [2,2,2,2,2] - Alt sıra
Payline 3: [0,1,2,1,0] - V şekli
Payline 4: [2,1,0,1,2] - Ters V şekli
...
```

## RTP Hesaplaması

SDK, %96.5 RTP hedefine göre tasarlanmıştır. Bu değer:
- Base game kazançları
- Free spins özelliği
- Bonus oyunu
- Wild sembol sıklığı

faktörlerine göre optimize edilmiştir.

## Volatilite

Oyun **orta volatilite** seviyesindedir:
- Hit frequency: ~30-35%
- Ortalama kazançlar: 20-100x bahis
- Büyük kazançlar: 500-1000x bahis (nadir)
- Maximum win: 10,000x bahis (çok nadir)

## Stake Engine Entegrasyonu

Bu math SDK, Stake Engine RGS platformu ile tam uyumludur:

1. **Seed Yönetimi**: Her spin için RGS tarafından sağlanan seed kullanılır
2. **Deterministik Sonuçlar**: Aynı seed ile aynı sonuç garanti edilir
3. **Adil Oyun**: Sonuçlar önceden belirlenemez
4. **Denetlenebilirlik**: Her spin sonucu doğrulanabilir

## Lisans

Proprietary

## Destek

Sorularınız için Stake Engine desteği ile iletişime geçin.

---

**Version**: 1.0.0
**Oluşturma Tarihi**: Ekim 2024
