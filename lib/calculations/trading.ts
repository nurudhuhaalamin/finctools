/**
 * FincTools — Trading Calculations
 * Semua fungsi murni matematika, tanpa UI dependency
 */

/* ─── Risk Manager ─── */
export interface RiskManagerInput {
  modal: number        // Rupiah
  risikoPercent: number // 0.5 – 10
  stopLossPips: number
  pipValue: number     // Rupiah per pip per 0.01 lot
}

export interface RiskManagerResult {
  lotSize: number
  modalBerisiko: number
  modalBerisikoPersen: number
  riskLevel: 'safe' | 'moderate' | 'danger'
  riskLabel: string
}

export function hitungRiskManager(input: RiskManagerInput): RiskManagerResult {
  const { modal, risikoPercent, stopLossPips, pipValue } = input

  if (!modal || !risikoPercent || !stopLossPips || !pipValue) {
    return {
      lotSize: 0,
      modalBerisiko: 0,
      modalBerisikoPersen: 0,
      riskLevel: 'safe',
      riskLabel: 'Isi semua field',
    }
  }

  const modalBerisiko = (modal * risikoPercent) / 100
  // Lot = Modal Berisiko ÷ (Stop Loss pips × Pip Value per 0.01 lot) × 0.01
  const lotSize = modalBerisiko / (stopLossPips * pipValue) * 0.01

  const persen = risikoPercent

  let riskLevel: RiskManagerResult['riskLevel']
  let riskLabel: string

  if (persen < 1) {
    riskLevel = 'safe'; riskLabel = 'Sangat Konservatif'
  } else if (persen <= 2) {
    riskLevel = 'safe'; riskLabel = 'Konservatif — Standar Profesional'
  } else if (persen <= 3) {
    riskLevel = 'moderate'; riskLabel = 'Moderat — Perlu Win Rate Tinggi'
  } else if (persen <= 5) {
    riskLevel = 'danger'; riskLabel = 'Agresif — Risiko Drawdown Besar'
  } else {
    riskLevel = 'danger'; riskLabel = 'Sangat Agresif — Tidak Disarankan'
  }

  return {
    lotSize:              Math.round(lotSize * 100) / 100,
    modalBerisiko:        Math.round(modalBerisiko),
    modalBerisikoPersen:  risikoPercent,
    riskLevel,
    riskLabel,
  }
}

/* ─── Trade Analyzer (R/R) ─── */
export interface TradeAnalyzerInput {
  entryPrice: number
  stopLoss: number
  takeProfit: number
  lotSize: number
  pipValue: number
}

export interface TradeAnalyzerResult {
  riskPips: number
  rewardPips: number
  rrRatio: number
  potensiProfit: number
  potensiLoss: number
  riskLevel: 'good' | 'moderate' | 'bad'
}

export function hitungTradeAnalyzer(input: TradeAnalyzerInput): TradeAnalyzerResult {
  const { entryPrice, stopLoss, takeProfit, lotSize, pipValue } = input

  const riskPips   = Math.abs(entryPrice - stopLoss) * 10000
  const rewardPips = Math.abs(takeProfit - entryPrice) * 10000
  const rrRatio    = rewardPips / riskPips

  const potensiLoss   = riskPips * pipValue * lotSize * 100
  const potensiProfit = rewardPips * pipValue * lotSize * 100

  let riskLevel: TradeAnalyzerResult['riskLevel']
  if (rrRatio >= 2)      riskLevel = 'good'
  else if (rrRatio >= 1) riskLevel = 'moderate'
  else                   riskLevel = 'bad'

  return {
    riskPips:     Math.round(riskPips * 10) / 10,
    rewardPips:   Math.round(rewardPips * 10) / 10,
    rrRatio:      Math.round(rrRatio * 100) / 100,
    potensiProfit: Math.round(potensiProfit),
    potensiLoss:   Math.round(potensiLoss),
    riskLevel,
  }
}

/* ─── Win Rate & Expectancy ─── */
export interface ExpectancyInput {
  winRate: number       // persen 0–100
  avgWin: number        // Rupiah
  avgLoss: number       // Rupiah
}

export interface ExpectancyResult {
  expectancy: number
  expectancyPersen: number
  breakEvenWinRate: number
  riskLevel: 'good' | 'moderate' | 'bad'
  label: string
}

export function hitungExpectancy(input: ExpectancyInput): ExpectancyResult {
  const { winRate, avgWin, avgLoss } = input
  const w = winRate / 100
  const l = 1 - w

  const expectancy        = (w * avgWin) - (l * avgLoss)
  const expectancyPersen  = (expectancy / avgLoss) * 100
  const breakEvenWinRate  = avgLoss / (avgWin + avgLoss) * 100

  let riskLevel: ExpectancyResult['riskLevel']
  let label: string

  if (expectancy > 0) {
    riskLevel = 'good'; label = 'Strategi Profitable'
  } else if (expectancy === 0) {
    riskLevel = 'moderate'; label = 'Break Even'
  } else {
    riskLevel = 'bad'; label = 'Strategi Merugi'
  }

  return {
    expectancy:       Math.round(expectancy),
    expectancyPersen: Math.round(expectancyPersen * 10) / 10,
    breakEvenWinRate: Math.round(breakEvenWinRate * 10) / 10,
    riskLevel,
    label,
  }
}
