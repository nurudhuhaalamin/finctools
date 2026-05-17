/**
 * FincTools — Trading Calculations (Complete)
 * Semua fungsi murni matematika, tanpa UI dependency
 */

/* ════════════════════════════════════════
   1. RISK MANAGER
════════════════════════════════════════ */
export interface RiskManagerInput { modal: number; risikoPercent: number; stopLossPips: number; pipValue: number }
export interface RiskManagerResult { lotSize: number; modalBerisiko: number; riskLevel: 'safe'|'moderate'|'danger'; riskLabel: string }
export function hitungRiskManager(i: RiskManagerInput): RiskManagerResult {
  const modalBerisiko = (i.modal * i.risikoPercent) / 100
  const lotSize = i.stopLossPips && i.pipValue ? (modalBerisiko / (i.stopLossPips * i.pipValue)) * 0.01 : 0
  const p = i.risikoPercent
  const riskLevel = p <= 2 ? 'safe' : p <= 3 ? 'moderate' : 'danger'
  const riskLabel = p < 1 ? 'Sangat Konservatif' : p <= 2 ? 'Konservatif — Standar Profesional' : p <= 3 ? 'Moderat — Perlu Win Rate Tinggi' : p <= 5 ? 'Agresif — Risiko Drawdown Besar' : 'Sangat Agresif — Tidak Disarankan'
  return { lotSize: Math.round(lotSize * 100) / 100, modalBerisiko: Math.round(modalBerisiko), riskLevel, riskLabel }
}

/* ════════════════════════════════════════
   2. TRADE ANALYZER
════════════════════════════════════════ */
export interface TradeAnalyzerInput { entryPrice: number; stopLoss: number; takeProfit: number; lotSize: number; pipValue: number }
export interface TradeAnalyzerResult { riskPips: number; rewardPips: number; rrRatio: number; potensiProfit: number; potensiLoss: number; riskLevel: 'good'|'moderate'|'bad'; label: string }
export function hitungTradeAnalyzer(i: TradeAnalyzerInput): TradeAnalyzerResult {
  const riskPips   = Math.abs(i.entryPrice - i.stopLoss) * 10000
  const rewardPips = Math.abs(i.takeProfit - i.entryPrice) * 10000
  const rrRatio    = riskPips > 0 ? rewardPips / riskPips : 0
  const potensiLoss   = riskPips * i.pipValue * i.lotSize * 100
  const potensiProfit = rewardPips * i.pipValue * i.lotSize * 100
  const riskLevel = rrRatio >= 2 ? 'good' : rrRatio >= 1 ? 'moderate' : 'bad'
  const label = rrRatio >= 2 ? 'R/R Bagus — Layak Dieksekusi' : rrRatio >= 1 ? 'R/R Minimal — Pertimbangkan Ulang' : 'R/R Buruk — Hindari Trade Ini'
  return { riskPips: Math.round(riskPips*10)/10, rewardPips: Math.round(rewardPips*10)/10, rrRatio: Math.round(rrRatio*100)/100, potensiProfit: Math.round(potensiProfit), potensiLoss: Math.round(potensiLoss), riskLevel, label }
}

/* ════════════════════════════════════════
   3. STOP LOSS OPTIMIZER
════════════════════════════════════════ */
export interface StopLossInput { entryPrice: number; atr: number; multiplier: number; modal: number; risikoPercent: number; pipValue: number; isLong: boolean }
export interface StopLossResult { slPrice: number; slPips: number; lotSize: number; modalBerisiko: number; riskLevel: 'safe'|'moderate'|'danger' }
export function hitungStopLoss(i: StopLossInput): StopLossResult {
  const slPips = i.atr * i.multiplier
  const slPrice = i.isLong ? i.entryPrice - slPips/10000 : i.entryPrice + slPips/10000
  const modalBerisiko = (i.modal * i.risikoPercent) / 100
  const lotSize = slPips && i.pipValue ? (modalBerisiko / (slPips * i.pipValue)) * 0.01 : 0
  const riskLevel = i.risikoPercent <= 2 ? 'safe' : i.risikoPercent <= 3 ? 'moderate' : 'danger'
  return { slPrice: Math.round(slPrice*100000)/100000, slPips: Math.round(slPips*10)/10, lotSize: Math.round(lotSize*100)/100, modalBerisiko: Math.round(modalBerisiko), riskLevel }
}

/* ════════════════════════════════════════
   4. MAX LOSS GUARDIAN
════════════════════════════════════════ */
export interface MaxLossInput { modal: number; maxLossHarianPersen: number; maxLossMingguanPersen: number; risikoPerTrade: number }
export interface MaxLossResult { maxLossHarian: number; maxLossMingguan: number; maxTradeHarian: number; maxTradeMingguan: number; riskLevel: 'safe'|'moderate'|'danger'; label: string }
export function hitungMaxLoss(i: MaxLossInput): MaxLossResult {
  const maxLossHarian   = (i.modal * i.maxLossHarianPersen) / 100
  const maxLossMingguan = (i.modal * i.maxLossMingguanPersen) / 100
  const lossPerTrade    = (i.modal * i.risikoPerTrade) / 100
  const maxTradeHarian  = lossPerTrade > 0 ? Math.floor(maxLossHarian / lossPerTrade) : 0
  const maxTradeMingguan = lossPerTrade > 0 ? Math.floor(maxLossMingguan / lossPerTrade) : 0
  const riskLevel = i.maxLossHarianPersen <= 3 ? 'safe' : i.maxLossHarianPersen <= 6 ? 'moderate' : 'danger'
  const label = i.maxLossHarianPersen <= 3 ? 'Batas Aman' : i.maxLossHarianPersen <= 6 ? 'Perlu Disiplin Ekstra' : 'Terlalu Agresif'
  return { maxLossHarian: Math.round(maxLossHarian), maxLossMingguan: Math.round(maxLossMingguan), maxTradeHarian, maxTradeMingguan, riskLevel, label }
}

/* ════════════════════════════════════════
   5. TRADING PERFORMANCE ANALYZER
════════════════════════════════════════ */
export interface PerformanceInput { totalTrade: number; totalWin: number; avgWin: number; avgLoss: number }
export interface PerformanceResult { winRate: number; lossRate: number; profitFactor: number; expectancy: number; totalProfit: number; riskLevel: 'good'|'moderate'|'bad'; label: string }
export function hitungPerformance(i: PerformanceInput): PerformanceResult {
  const totalLoss = i.totalTrade - i.totalWin
  const winRate   = i.totalTrade > 0 ? (i.totalWin / i.totalTrade) * 100 : 0
  const grossWin  = i.totalWin * i.avgWin
  const grossLoss = totalLoss * i.avgLoss
  const profitFactor = grossLoss > 0 ? grossWin / grossLoss : grossWin > 0 ? 99 : 0
  const expectancy   = ((winRate/100) * i.avgWin) - ((1 - winRate/100) * i.avgLoss)
  const totalProfit  = grossWin - grossLoss
  const riskLevel = profitFactor >= 1.5 ? 'good' : profitFactor >= 1 ? 'moderate' : 'bad'
  const label = profitFactor >= 1.5 ? 'Strategi Sangat Profitable' : profitFactor >= 1 ? 'Profitable — Bisa Ditingkatkan' : 'Merugi — Perlu Evaluasi'
  return { winRate: Math.round(winRate*10)/10, lossRate: Math.round((100-winRate)*10)/10, profitFactor: Math.round(profitFactor*100)/100, expectancy: Math.round(expectancy), totalProfit: Math.round(totalProfit), riskLevel, label }
}

/* ════════════════════════════════════════
   6. WIN RATE & EXPECTANCY TRACKER
════════════════════════════════════════ */
export interface ExpectancyInput { winRate: number; avgWin: number; avgLoss: number; tradePerBulan: number }
export interface ExpectancyResult { expectancy: number; breakEvenWinRate: number; proyeksiPerBulan: number; rrRatio: number; riskLevel: 'good'|'moderate'|'bad'; label: string }
export function hitungExpectancy(i: ExpectancyInput): ExpectancyResult {
  const w = i.winRate / 100
  const expectancy = (w * i.avgWin) - ((1-w) * i.avgLoss)
  const breakEvenWinRate = i.avgLoss / (i.avgWin + i.avgLoss) * 100
  const proyeksiPerBulan = expectancy * i.tradePerBulan
  const rrRatio = i.avgLoss > 0 ? i.avgWin / i.avgLoss : 0
  const riskLevel = expectancy > 0 ? 'good' : expectancy === 0 ? 'moderate' : 'bad'
  const label = expectancy > 0 ? 'Strategi Profitable' : expectancy === 0 ? 'Break Even' : 'Strategi Merugi'
  return { expectancy: Math.round(expectancy), breakEvenWinRate: Math.round(breakEvenWinRate*10)/10, proyeksiPerBulan: Math.round(proyeksiPerBulan), rrRatio: Math.round(rrRatio*100)/100, riskLevel, label }
}

/* ════════════════════════════════════════
   7. DRAWDOWN RECOVERY PLANNER
════════════════════════════════════════ */
export interface DrawdownInput { modalAwal: number; modalSekarang: number; winRate: number; rrRatio: number; risikoPerTrade: number }
export interface DrawdownResult { drawdownPersen: number; drawdownAmount: number; returnDibutuhkan: number; tradeEstimasi: number; riskLevel: 'safe'|'moderate'|'danger'; label: string }
export function hitungDrawdown(i: DrawdownInput): DrawdownResult {
  const drawdownAmount   = i.modalAwal - i.modalSekarang
  const drawdownPersen   = i.modalAwal > 0 ? (drawdownAmount / i.modalAwal) * 100 : 0
  const returnDibutuhkan = i.modalSekarang > 0 ? (drawdownAmount / i.modalSekarang) * 100 : 0
  const w = i.winRate / 100
  const expectancyPersen = (w * i.rrRatio * i.risikoPerTrade) - ((1-w) * i.risikoPerTrade)
  const tradeEstimasi = expectancyPersen > 0 ? Math.ceil(returnDibutuhkan / expectancyPersen) : 999
  const riskLevel = drawdownPersen <= 10 ? 'safe' : drawdownPersen <= 25 ? 'moderate' : 'danger'
  const label = drawdownPersen <= 10 ? 'Drawdown Ringan — Recovery Cepat' : drawdownPersen <= 25 ? 'Drawdown Sedang — Perlu Kesabaran' : 'Drawdown Berat — Evaluasi Strategi'
  return { drawdownPersen: Math.round(drawdownPersen*10)/10, drawdownAmount: Math.round(drawdownAmount), returnDibutuhkan: Math.round(returnDibutuhkan*10)/10, tradeEstimasi, riskLevel, label }
}

/* ════════════════════════════════════════
   8. PIP & PROFIT ANALYZER
════════════════════════════════════════ */
export interface PipProfitInput { lotSize: number; pips: number; pipValue: number; isProfit: boolean }
export interface PipProfitResult { nilaiPip: number; totalPL: number; plPerLot: number; riskLevel: 'good'|'neutral'|'bad' }
export function hitungPipProfit(i: PipProfitInput): PipProfitResult {
  const nilaiPip = i.pipValue * (i.lotSize / 0.01)
  const totalPL  = nilaiPip * i.pips * (i.isProfit ? 1 : -1)
  const plPerLot = i.pips * i.pipValue * 100
  return { nilaiPip: Math.round(nilaiPip), totalPL: Math.round(totalPL), plPerLot: Math.round(plPerLot), riskLevel: i.isProfit ? 'good' : 'bad' }
}

/* ════════════════════════════════════════
   9. MARGIN & LEVERAGE GUARD
════════════════════════════════════════ */
export interface MarginInput { modal: number; leverage: number; lotSize: number; hargaInstrumen: number; contractSize: number }
export interface MarginResult { requiredMargin: number; freeMargin: number; marginLevel: number; maxLot: number; riskLevel: 'safe'|'moderate'|'danger'; label: string }
export function hitungMargin(i: MarginInput): MarginResult {
  const requiredMargin = (i.lotSize * i.contractSize * i.hargaInstrumen) / i.leverage
  const freeMargin     = i.modal - requiredMargin
  const marginLevel    = requiredMargin > 0 ? (i.modal / requiredMargin) * 100 : 0
  const maxLot         = (i.modal * i.leverage) / (i.contractSize * i.hargaInstrumen)
  const riskLevel = marginLevel >= 200 ? 'safe' : marginLevel >= 100 ? 'moderate' : 'danger'
  const label = marginLevel >= 200 ? 'Margin Aman' : marginLevel >= 100 ? 'Margin Perlu Diperhatikan' : 'Margin Kritis — Risiko Margin Call'
  return { requiredMargin: Math.round(requiredMargin), freeMargin: Math.round(freeMargin), marginLevel: Math.round(marginLevel*10)/10, maxLot: Math.round(maxLot*100)/100, riskLevel, label }
}

/* ════════════════════════════════════════
   10. SWAP COST ESTIMATOR
════════════════════════════════════════ */
export interface SwapInput { lotSize: number; swapRate: number; jumlahMalam: number; pipValue: number }
export interface SwapResult { swapPerMalam: number; totalSwap: number; riskLevel: 'safe'|'moderate'|'danger' }
export function hitungSwap(i: SwapInput): SwapResult {
  const swapPerMalam = i.swapRate * i.pipValue * (i.lotSize / 0.01)
  const totalSwap    = swapPerMalam * i.jumlahMalam
  const riskLevel = Math.abs(totalSwap) < 50000 ? 'safe' : Math.abs(totalSwap) < 200000 ? 'moderate' : 'danger'
  return { swapPerMalam: Math.round(swapPerMalam), totalSwap: Math.round(totalSwap), riskLevel }
}

/* ════════════════════════════════════════
   11. KELLY CRITERION OPTIMIZER
════════════════════════════════════════ */
export interface KellyInput { winRate: number; rrRatio: number; modal: number }
export interface KellyResult { kellyPersen: number; halfKellyPersen: number; kellyAmount: number; halfKellyAmount: number; riskLevel: 'safe'|'moderate'|'danger'; label: string }
export function hitungKelly(i: KellyInput): KellyResult {
  const w = i.winRate / 100
  const b = i.rrRatio
  const kelly     = b > 0 ? (((b * w) - (1-w)) / b) * 100 : 0
  const halfKelly = kelly / 2
  const kellyAmount     = (i.modal * Math.max(kelly, 0)) / 100
  const halfKellyAmount = (i.modal * Math.max(halfKelly, 0)) / 100
  const riskLevel = halfKelly <= 5 ? 'safe' : halfKelly <= 10 ? 'moderate' : 'danger'
  const label = kelly <= 0 ? 'Strategi Tidak Profitable' : halfKelly <= 5 ? 'Half Kelly Konservatif — Direkomendasikan' : halfKelly <= 10 ? 'Half Kelly Moderat — Hati-hati' : 'Half Kelly Tinggi — Kurangi Posisi'
  return { kellyPersen: Math.round(kelly*10)/10, halfKellyPersen: Math.round(halfKelly*10)/10, kellyAmount: Math.round(kellyAmount), halfKellyAmount: Math.round(halfKellyAmount), riskLevel, label }
}

/* ════════════════════════════════════════
   12. PROBABILITY OF RUIN ANALYZER
════════════════════════════════════════ */
export interface RuinInput { winRate: number; rrRatio: number; risikoPerTrade: number; targetRuin: number }
export interface RuinResult { probabilitasRuin: number; expectedDrawdown: number; safetyScore: number; riskLevel: 'safe'|'moderate'|'danger'; label: string }
export function hitungProbabilityOfRuin(i: RuinInput): RuinResult {
  const w = i.winRate / 100
  const ratio = w > 0 && w < 1 ? (1-w)/w : 99
  const n = i.targetRuin / i.risikoPerTrade
  const probabilitasRuin = Math.min(Math.pow(ratio, n) * 100, 100)
  const denom = (w * i.rrRatio) - (1-w)
  const expectedDrawdown = denom > 0 ? (i.risikoPerTrade * (1-w)) / denom * 100 : 100
  const safetyScore = Math.max(0, Math.round(100 - probabilitasRuin))
  const riskLevel = probabilitasRuin < 5 ? 'safe' : probabilitasRuin < 25 ? 'moderate' : 'danger'
  const label = probabilitasRuin < 5 ? 'Probabilitas Ruin Sangat Rendah' : probabilitasRuin < 25 ? 'Probabilitas Ruin Moderat' : 'Probabilitas Ruin Tinggi — Perbaiki Strategi'
  return { probabilitasRuin: Math.round(probabilitasRuin*10)/10, expectedDrawdown: Math.round(Math.abs(expectedDrawdown)*10)/10, safetyScore, riskLevel, label }
}

/* ════════════════════════════════════════
   13. STREAK ANALYZER
════════════════════════════════════════ */
export interface StreakInput { winRate: number; streakLength: number; totalTrade: number }
export interface StreakResult { probWinStreak: number; probLossStreak: number; expectedLossStreak: number; expectedWinStreak: number; riskLevel: 'safe'|'moderate'|'danger'; label: string }
export function hitungStreak(i: StreakInput): StreakResult {
  const w = i.winRate / 100
  const l = 1 - w
  const probWinStreak  = Math.pow(w, i.streakLength) * 100
  const probLossStreak = Math.pow(l, i.streakLength) * 100
  const expectedLossStreak = l > 0 ? Math.max(1, Math.round(Math.log(0.5) / Math.log(l))) : 999
  const expectedWinStreak  = w > 0 ? Math.max(1, Math.round(Math.log(0.5) / Math.log(w))) : 999
  const riskLevel = probLossStreak < 1 ? 'safe' : probLossStreak < 10 ? 'moderate' : 'danger'
  const label = probLossStreak < 1 ? 'Probabilitas Loss Streak Rendah' : probLossStreak < 10 ? 'Loss Streak Mungkin Terjadi — Siapkan Mental' : 'Loss Streak Sangat Mungkin — Ketatkan MM'
  return { probWinStreak: Math.round(probWinStreak*100)/100, probLossStreak: Math.round(probLossStreak*100)/100, expectedLossStreak, expectedWinStreak, riskLevel, label }
}
