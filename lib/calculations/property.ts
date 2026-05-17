/**
 * FincTools — Kredit & Properti Calculations
 */

/* ════════════════════════════════════
   1. LOAN TRUE COST ANALYZER
════════════════════════════════════ */
export function hitungLoanTrueCost(pokok: number, bungaTahunan: number, tenorBulan: number, jenisBunga: 'flat' | 'efektif' | 'anuitas') {
  const r = bungaTahunan / 100 / 12
  let cicilan = 0
  let totalBayar = 0
  let totalBunga = 0

  if (jenisBunga === 'flat') {
    const bungaPerBulan = pokok * r
    const pokokPerBulan = pokok / tenorBulan
    cicilan = pokokPerBulan + bungaPerBulan
    totalBayar = cicilan * tenorBulan
    totalBunga = bungaPerBulan * tenorBulan
  } else {
    // Anuitas / efektif — formula sama untuk cicilan tetap
    if (r > 0) {
      cicilan = pokok * r * Math.pow(1 + r, tenorBulan) / (Math.pow(1 + r, tenorBulan) - 1)
    } else {
      cicilan = pokok / tenorBulan
    }
    totalBayar = cicilan * tenorBulan
    totalBunga = totalBayar - pokok
  }

  const efektifRate = pokok > 0 ? (totalBunga / pokok / (tenorBulan / 12)) * 100 : 0

  return {
    cicilan: Math.round(cicilan),
    totalBayar: Math.round(totalBayar),
    totalBunga: Math.round(totalBunga),
    efektifRate: Math.round(efektifRate * 100) / 100,
    persenBunga: Math.round((totalBunga / totalBayar) * 100 * 10) / 10,
  }
}

/* ════════════════════════════════════
   2. REFINANCING DECISION TOOL
════════════════════════════════════ */
export function hitungRefinancing(
  sisaPokok: number, bungaLama: number, bungaBaru: number,
  sisaTenorBulan: number, biayaRefinancing: number
) {
  const rLama = bungaLama / 100 / 12
  const rBaru = bungaBaru / 100 / 12
  const cicilanLama = sisaPokok * rLama * Math.pow(1 + rLama, sisaTenorBulan) / (Math.pow(1 + rLama, sisaTenorBulan) - 1)
  const cicilanBaru = sisaPokok * rBaru * Math.pow(1 + rBaru, sisaTenorBulan) / (Math.pow(1 + rBaru, sisaTenorBulan) - 1)
  const hematPerBulan = cicilanLama - cicilanBaru
  const breakEvenBulan = hematPerBulan > 0 ? Math.ceil(biayaRefinancing / hematPerBulan) : 999
  const worthIt = breakEvenBulan < sisaTenorBulan && hematPerBulan > 0

  return {
    cicilanLama: Math.round(cicilanLama),
    cicilanBaru: Math.round(cicilanBaru),
    hematPerBulan: Math.round(hematPerBulan),
    hematTotal: Math.round(hematPerBulan * sisaTenorBulan - biayaRefinancing),
    breakEvenBulan,
    worthIt,
    label: worthIt ? 'Refinancing Menguntungkan' : 'Refinancing Tidak Layak',
  }
}

/* ════════════════════════════════════
   3. BUY VS RENT ANALYZER
════════════════════════════════════ */
export function hitungBuyVsRent(
  hargaProperti: number, dpPersen: number, bungaKPR: number, tenorTahun: number,
  sewaBulanan: number, kenaikanSewaTahunan: number, apresiasi: number, tahunAnalisis: number
) {
  const dp = hargaProperti * dpPersen / 100
  const pokok = hargaProperti - dp
  const r = bungaKPR / 100 / 12
  const tenor = tenorTahun * 12
  const cicilan = pokok * r * Math.pow(1 + r, tenor) / (Math.pow(1 + r, tenor) - 1)
  const totalBeliTahunan = cicilan * 12
  const nilaiProperti = hargaProperti * Math.pow(1 + apresiasi / 100, tahunAnalisis)

  let totalSewaBayar = 0
  let sewa = sewaBulanan * 12
  for (let t = 0; t < tahunAnalisis; t++) {
    totalSewaBayar += sewa
    sewa *= 1 + kenaikanSewaTahunan / 100
  }

  const keuntunganBeli = nilaiProperti - hargaProperti
  const selisih = totalSewaBayar - (totalBeliTahunan * Math.min(tahunAnalisis, tenorTahun))

  return {
    cicilanBulanan: Math.round(cicilan),
    dpDibayar: Math.round(dp),
    nilaiPropertiFuture: Math.round(nilaiProperti),
    keuntunganApresiasi: Math.round(keuntunganBeli),
    totalSewaBayar: Math.round(totalSewaBayar),
    totalCicilanBayar: Math.round(totalBeliTahunan * Math.min(tahunAnalisis, tenorTahun)),
    rekomendasiBeli: keuntunganBeli > totalSewaBayar,
    label: keuntunganBeli > 0 ? 'Properti mengalami apresiasi positif' : 'Properti belum apresiasi',
  }
}

/* ════════════════════════════════════
   4. KPR AFFORDABILITY CHECKER
════════════════════════════════════ */
export function hitungKPR(penghasilanBersih: number, totalCicilanLain: number, bungaTahunan: number, tenorTahun: number, dpPersen: number) {
  const MAX_DTI = 0.35 // 35% debt-to-income ratio
  const maxCicilanTotal = penghasilanBersih * MAX_DTI
  const maxCicilanKPR = Math.max(0, maxCicilanTotal - totalCicilanLain)
  const r = bungaTahunan / 100 / 12
  const n = tenorTahun * 12
  const maxPinjaman = r > 0
    ? maxCicilanKPR * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n))
    : maxCicilanKPR * n
  const maxHargaProperti = maxPinjaman / (1 - dpPersen / 100)
  const dpDibutuhkan = maxHargaProperti * dpPersen / 100
  const dtiRatio = (totalCicilanLain + maxCicilanKPR) / penghasilanBersih * 100

  return {
    maxCicilanKPR: Math.round(maxCicilanKPR),
    maxPinjaman: Math.round(maxPinjaman),
    maxHargaProperti: Math.round(maxHargaProperti),
    dpDibutuhkan: Math.round(dpDibutuhkan),
    dtiRatio: Math.round(dtiRatio * 10) / 10,
    status: dtiRatio <= 35 ? 'sehat' : dtiRatio <= 50 ? 'perhatian' : 'kritis',
  }
}

/* ════════════════════════════════════
   5. RENTAL YIELD ANALYZER
════════════════════════════════════ */
export function hitungRentalYield(hargaProperti: number, sewaBulanan: number, biayaTahunan: number, apresiasiTahunan: number, tahun: number) {
  const sewaTahunan = sewaBulanan * 12
  const netSewa = sewaTahunan - biayaTahunan
  const grossYield = (sewaTahunan / hargaProperti) * 100
  const netYield = (netSewa / hargaProperti) * 100
  const nilaiProperti = hargaProperti * Math.pow(1 + apresiasiTahunan / 100, tahun)
  const totalReturnTahunan = netYield + apresiasiTahunan
  const status = grossYield >= 8 ? 'sangat_baik' : grossYield >= 5 ? 'baik' : grossYield >= 3 ? 'cukup' : 'rendah'

  return {
    sewaTahunan: Math.round(sewaTahunan),
    netSewa: Math.round(netSewa),
    grossYield: Math.round(grossYield * 100) / 100,
    netYield: Math.round(netYield * 100) / 100,
    totalReturnTahunan: Math.round(totalReturnTahunan * 100) / 100,
    nilaiPropertiFuture: Math.round(nilaiProperti),
    status,
    label: status === 'sangat_baik' ? '🟢 Yield Sangat Baik' : status === 'baik' ? '🟢 Yield Baik' : status === 'cukup' ? '🟡 Yield Cukup' : '🔴 Yield Rendah',
  }
}

/* ════════════════════════════════════
   6. PROPERTY INVESTMENT ANALYZER
════════════════════════════════════ */
export function hitungPropertyInvestment(
  hargaBeli: number, dpPersen: number, bungaKPR: number, tenorTahun: number,
  sewaBulanan: number, biayaOpBulanan: number, apresiasiTahunan: number, tahunAnalisis: number
) {
  const dp = hargaBeli * dpPersen / 100
  const pinjaman = hargaBeli - dp
  const r = bungaKPR / 100 / 12
  const n = tenorTahun * 12
  const cicilan = pinjaman * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)

  const cashFlowBulanan = sewaBulanan - cicilan - biayaOpBulanan
  const cashFlowTahunan = cashFlowBulanan * 12
  const nilaiPropertiFuture = hargaBeli * Math.pow(1 + apresiasiTahunan / 100, tahunAnalisis)
  const totalCashFlow = cashFlowTahunan * tahunAnalisis
  const capRate = ((sewaBulanan - biayaOpBulanan) * 12 / hargaBeli) * 100
  const cocReturn = dp > 0 ? (cashFlowTahunan / dp) * 100 : 0

  return {
    dp: Math.round(dp),
    cicilan: Math.round(cicilan),
    cashFlowBulanan: Math.round(cashFlowBulanan),
    cashFlowTahunan: Math.round(cashFlowTahunan),
    nilaiPropertiFuture: Math.round(nilaiPropertiFuture),
    totalCashFlow: Math.round(totalCashFlow),
    capRate: Math.round(capRate * 100) / 100,
    cocReturn: Math.round(cocReturn * 100) / 100,
    positifCashFlow: cashFlowBulanan > 0,
    label: cashFlowBulanan > 0 ? '🟢 Cash Flow Positif' : '🔴 Cash Flow Negatif',
  }
}
