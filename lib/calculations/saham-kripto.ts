/**
 * FincTools — Saham Calculations
 */

/* ════════════════════════════════════
   1. AVERAGING STRATEGY BUILDER
════════════════════════════════════ */
export function hitungAveraging(posisi: { harga: number; lot: number }[]) {
  const totalLot = posisi.reduce((s, p) => s + p.lot, 0)
  const totalNilai = posisi.reduce((s, p) => s + p.harga * p.lot * 100, 0)
  const avgHarga = totalLot > 0 ? totalNilai / (totalLot * 100) : 0
  return {
    avgHarga: Math.round(avgHarga),
    totalLot,
    totalNilai: Math.round(totalNilai),
    posisiCount: posisi.length,
  }
}

export function hitungAveragingSimple(hargaAwal: number, lotAwal: number, hargaBaru: number, lotBaru: number) {
  const totalLot = lotAwal + lotBaru
  const totalNilai = (hargaAwal * lotAwal + hargaBaru * lotBaru) * 100
  const avgHarga = totalNilai / (totalLot * 100)
  const persenPerubahan = hargaBaru < hargaAwal
    ? ((hargaAwal - avgHarga) / hargaAwal) * 100
    : ((avgHarga - hargaAwal) / hargaAwal) * 100
  return {
    avgHarga: Math.round(avgHarga),
    totalLot,
    totalNilai: Math.round(totalNilai),
    persenPerubahan: Math.round(persenPerubahan * 100) / 100,
    isAverageDown: hargaBaru < hargaAwal,
  }
}

/* ════════════════════════════════════
   2. ENTRY PRICE OPTIMIZER
════════════════════════════════════ */
export function hitungEntryPrice(hargaTarget: number, stopLossPersen: number, targetProfitPersen: number, modal: number, risikoPerTrade: number) {
  const stopLossHarga = hargaTarget * (1 - stopLossPersen / 100)
  const takeProfitHarga = hargaTarget * (1 + targetProfitPersen / 100)
  const rrRatio = targetProfitPersen / stopLossPersen
  const modalBerisiko = modal * risikoPerTrade / 100
  const lotOptimal = Math.floor(modalBerisiko / (hargaTarget * stopLossPersen / 100 * 100))
  const nilaiPosisi = lotOptimal * hargaTarget * 100

  return {
    entryHarga: Math.round(hargaTarget),
    stopLossHarga: Math.round(stopLossHarga),
    takeProfitHarga: Math.round(takeProfitHarga),
    rrRatio: Math.round(rrRatio * 100) / 100,
    modalBerisiko: Math.round(modalBerisiko),
    lotOptimal,
    nilaiPosisi: Math.round(nilaiPosisi),
    riskLevel: rrRatio >= 2 ? 'good' : rrRatio >= 1 ? 'moderate' : 'bad',
    label: rrRatio >= 2 ? 'R/R Bagus — Layak Dieksekusi' : rrRatio >= 1 ? 'R/R Minimal' : 'R/R Buruk — Hindari',
  }
}

/* ════════════════════════════════════
   3. BREAK-EVEN ANALYZER
════════════════════════════════════ */
export function hitungBreakEven(hargaBeli: number, jumlahLot: number, feeBeli: number, feeBroker: number) {
  const nilaiPembelian = hargaBeli * jumlahLot * 100
  const totalFeeBeli = nilaiPembelian * feeBeli / 100
  const totalModal = nilaiPembelian + totalFeeBeli
  // Cari harga jual minimum agar balik modal setelah fee jual
  // nilaiJual - nilaiJual * feeJual = totalModal
  // nilaiJual * (1 - feeJual) = totalModal
  const feeJual = feeBroker / 100
  const nilaiJualMin = totalModal / (1 - feeJual)
  const hargaJualMin = Math.ceil(nilaiJualMin / (jumlahLot * 100))
  const totalFeeJual = nilaiJualMin * feeJual
  const selisihHarga = hargaJualMin - hargaBeli
  const persenSelisih = (selisihHarga / hargaBeli) * 100

  return {
    hargaBeli,
    hargaJualMin,
    selisihHarga,
    persenSelisih: Math.round(persenSelisih * 100) / 100,
    totalFeeBeli: Math.round(totalFeeBeli),
    totalFeeJual: Math.round(totalFeeJual),
    totalFee: Math.round(totalFeeBeli + totalFeeJual),
    nilaiPembelian: Math.round(nilaiPembelian),
  }
}

/* ══════════════════════════════════════════════
   KRIPTO CALCULATIONS
══════════════════════════════════════════════ */

/* 1. CRYPTO DCA SIMULATOR */
export function hitungCryptoDCA(investasiPerPeriode: number, jumlahPeriode: number, hargaSekarang: number, targetHarga: number) {
  const totalInvestasi = investasiPerPeriode * jumlahPeriode
  const koinPerPeriode = investasiPerPeriode / hargaSekarang
  const totalKoin = koinPerPeriode * jumlahPeriode
  const nilaiSekarang = totalKoin * hargaSekarang
  const nilaiTarget = totalKoin * targetHarga
  const keuntunganTarget = nilaiTarget - totalInvestasi
  const returnTarget = (keuntunganTarget / totalInvestasi) * 100
  return {
    totalInvestasi: Math.round(totalInvestasi),
    totalKoin: Math.round(totalKoin * 100000) / 100000,
    nilaiSekarang: Math.round(nilaiSekarang),
    nilaiTarget: Math.round(nilaiTarget),
    keuntunganTarget: Math.round(keuntunganTarget),
    returnTarget: Math.round(returnTarget * 10) / 10,
    avgHargaBeli: Math.round(hargaSekarang),
  }
}

/* 2. STAKING REWARD PROJECTOR */
export function hitungStaking(jumlahKoin: number, hargaKoin: number, apyPersen: number, periodeHari: number, compoundHarian: boolean) {
  const nilaiAwal = jumlahKoin * hargaKoin
  const apyHarian = apyPersen / 365 / 100
  let koinAkhir: number
  if (compoundHarian) {
    koinAkhir = jumlahKoin * Math.pow(1 + apyHarian, periodeHari)
  } else {
    koinAkhir = jumlahKoin * (1 + apyPersen / 100 * periodeHari / 365)
  }
  const rewardKoin = koinAkhir - jumlahKoin
  const nilaiReward = rewardKoin * hargaKoin
  const nilaiAkhir = koinAkhir * hargaKoin
  return {
    koinAkhir: Math.round(koinAkhir * 100000) / 100000,
    rewardKoin: Math.round(rewardKoin * 100000) / 100000,
    nilaiAwal: Math.round(nilaiAwal),
    nilaiReward: Math.round(nilaiReward),
    nilaiAkhir: Math.round(nilaiAkhir),
    returnPersen: Math.round((rewardKoin / jumlahKoin) * 100 * 100) / 100,
  }
}

/* 3. CRYPTO RISK MANAGER */
export function hitungCryptoRisk(modal: number, risikoPercent: number, entryHarga: number, stopLossHarga: number) {
  const modalBerisiko = modal * risikoPercent / 100
  const stopLossPersen = Math.abs(entryHarga - stopLossHarga) / entryHarga * 100
  const jumlahKoin = stopLossPersen > 0 ? modalBerisiko / (entryHarga * stopLossPersen / 100) : 0
  const nilaiPosisi = jumlahKoin * entryHarga
  const leverage = modal > 0 ? nilaiPosisi / modal : 0
  return {
    modalBerisiko: Math.round(modalBerisiko),
    jumlahKoin: Math.round(jumlahKoin * 100000) / 100000,
    nilaiPosisi: Math.round(nilaiPosisi),
    stopLossPersen: Math.round(stopLossPersen * 100) / 100,
    efektifLeverage: Math.round(leverage * 100) / 100,
    riskLevel: risikoPercent <= 2 ? 'safe' : risikoPercent <= 5 ? 'moderate' : 'danger',
  }
}

/* 4. LIQUIDATION PRICE ANALYZER */
export function hitungLiquidasi(entryHarga: number, leverage: number, maintenanceMargin: number, isLong: boolean) {
  const initialMarginRate = 1 / leverage
  const liquidasiRate = isLong
    ? entryHarga * (1 - initialMarginRate + maintenanceMargin / 100)
    : entryHarga * (1 + initialMarginRate - maintenanceMargin / 100)
  const jarakLiquidasi = Math.abs(entryHarga - liquidasiRate)
  const jarakPersen = (jarakLiquidasi / entryHarga) * 100
  const riskLevel = jarakPersen < 5 ? 'danger' : jarakPersen < 15 ? 'moderate' : 'safe'
  return {
    liquidasiHarga: Math.round(liquidasiRate * 100) / 100,
    jarakLiquidasi: Math.round(jarakLiquidasi * 100) / 100,
    jarakPersen: Math.round(jarakPersen * 100) / 100,
    riskLevel,
    label: riskLevel === 'danger' ? '🔴 Sangat Dekat Likuidasi' : riskLevel === 'moderate' ? '🟡 Waspadai Likuidasi' : '🟢 Jarak Aman dari Likuidasi',
  }
}

/* 5. FUNDING RATE COST ESTIMATOR */
export function hitungFundingRate(nilaiPosisi: number, fundingRate: number, periodeHari: number, fundingPerHari: number) {
  const fundingPerPeriode = fundingRate / 100
  const biayaPerFunding = nilaiPosisi * fundingPerPeriode
  const jumlahFunding = periodeHari * fundingPerHari
  const totalBiaya = biayaPerFunding * jumlahFunding
  const biayaPerHari = biayaPerFunding * fundingPerHari
  const riskLevel = Math.abs(totalBiaya) / nilaiPosisi * 100
  return {
    biayaPerFunding: Math.round(biayaPerFunding),
    biayaPerHari: Math.round(biayaPerHari),
    totalBiaya: Math.round(totalBiaya),
    persenDariPosisi: Math.round((Math.abs(totalBiaya) / nilaiPosisi) * 100 * 100) / 100,
    isPositive: fundingRate > 0,
    riskLevel: riskLevel > 5 ? 'danger' : riskLevel > 2 ? 'moderate' : 'safe',
  }
}
