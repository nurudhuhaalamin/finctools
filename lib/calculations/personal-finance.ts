/**
 * FincTools — Personal Finance Calculations
 */

/* ════════════════════════════════════
   1. WEALTH FREEDOM PLANNER (FIRE)
════════════════════════════════════ */
export function hitungFIRE(pengeluaranBulanan: number, returnTahunan: number, inflasiTahunan: number) {
  const pengeluaranTahunan = pengeluaranBulanan * 12
  const safeWithdrawalRate = 0.04 // 4% rule
  const fireNumber = pengeluaranTahunan / safeWithdrawalRate
  const realReturn = (returnTahunan - inflasiTahunan) / 100
  return {
    fireNumber: Math.round(fireNumber),
    pengeluaranTahunan: Math.round(pengeluaranTahunan),
    safeWithdrawalRate: safeWithdrawalRate * 100,
    realReturn: Math.round(realReturn * 1000) / 10,
  }
}

export function hitungWealthFreedom(tabunganSekarang: number, investasiPerBulan: number, fireNumber: number, returnTahunan: number) {
  const r = returnTahunan / 100 / 12
  if (r <= 0 || fireNumber <= tabunganSekarang) {
    return { tahunMencapai: 0, bulanMencapai: 0, sudahFIRE: tabunganSekarang >= fireNumber }
  }
  // FV = PV*(1+r)^n + PMT*((1+r)^n-1)/r = target
  // Solve for n numerically
  let n = 0
  let nilai = tabunganSekarang
  while (nilai < fireNumber && n < 12000) {
    nilai = nilai * (1 + r) + investasiPerBulan
    n++
  }
  return {
    tahunMencapai: Math.floor(n / 12),
    bulanMencapai: n % 12,
    sudahFIRE: false,
    totalBulan: n,
  }
}

/* ════════════════════════════════════
   2. EMERGENCY SHIELD BUILDER
════════════════════════════════════ */
export function hitungDanaDarurat(pengeluaranBulanan: number, bulanTarget: number, tabunganSaatIni: number, tabunganPerBulan: number) {
  const targetDana = pengeluaranBulanan * bulanTarget
  const kekurangan = Math.max(0, targetDana - tabunganSaatIni)
  const bulanMencapai = tabunganPerBulan > 0 ? Math.ceil(kekurangan / tabunganPerBulan) : 999
  const persenTercapai = tabunganSaatIni > 0 ? Math.min(100, (tabunganSaatIni / targetDana) * 100) : 0
  const status = persenTercapai >= 100 ? 'tercapai' : persenTercapai >= 50 ? 'setengah' : 'kurang'
  return {
    targetDana: Math.round(targetDana),
    kekurangan: Math.round(kekurangan),
    bulanMencapai,
    persenTercapai: Math.round(persenTercapai * 10) / 10,
    status,
  }
}

/* ════════════════════════════════════
   3. INFLATION GUARD
════════════════════════════════════ */
export function hitungInflasi(jumlah: number, inflasiPersen: number, tahun: number) {
  const faktor = Math.pow(1 + inflasiPersen / 100, tahun)
  const nilaiMasaDepan = jumlah * faktor
  const dayaBeli = jumlah / faktor
  const kehilanganDayaBeli = jumlah - dayaBeli
  return {
    nilaiMasaDepan: Math.round(nilaiMasaDepan),
    dayaBeli: Math.round(dayaBeli),
    kehilanganDayaBeli: Math.round(kehilanganDayaBeli),
    penurunanPersen: Math.round((kehilanganDayaBeli / jumlah) * 100 * 10) / 10,
    faktorInflasi: Math.round(faktor * 100) / 100,
  }
}

/* ════════════════════════════════════
   4. BUDGET ARCHITECT (50-30-20)
════════════════════════════════════ */
export function hitungBudget(penghasilanBersih: number, kebutuhanPersen = 50, keinginanPersen = 30, tabunganPersen = 20) {
  return {
    kebutuhan: Math.round(penghasilanBersih * kebutuhanPersen / 100),
    keinginan: Math.round(penghasilanBersih * keinginanPersen / 100),
    tabungan:  Math.round(penghasilanBersih * tabunganPersen / 100),
    kebutuhanPersen, keinginanPersen, tabunganPersen,
  }
}

/* ════════════════════════════════════
   5. DEBT DESTROYER
════════════════════════════════════ */
export interface DebtItem { nama: string; saldo: number; bungaBulanan: number; cicilanMin: number }
export interface DebtResult { totalSaldo: number; totalBunga: number; metodeLunasan: { nama: string; bulanLunasan: number; totalBungaBayar: number }[]; rekomendasiUrutan: string[] }

export function hitungDebt(utang: DebtItem[], metodeTambahan: number) {
  const totalSaldo = utang.reduce((s, d) => s + d.saldo, 0)
  const totalBunga = utang.reduce((s, d) => s + d.saldo * d.bungaBulanan / 100, 0)

  // Avalanche method (highest interest first)
  const urutanAvalanche = [...utang].sort((a, b) => b.bungaBulanan - a.bungaBulanan).map(d => d.nama)
  // Snowball method (lowest balance first)
  const urutanSnowball = [...utang].sort((a, b) => a.saldo - b.saldo).map(d => d.nama)

  return {
    totalSaldo: Math.round(totalSaldo),
    totalBungaBulanan: Math.round(totalBunga),
    urutanAvalanche,
    urutanSnowball,
    tambahanPerBulan: metodeTambahan,
  }
}

/* ════════════════════════════════════
   6. NET WORTH TRACKER
════════════════════════════════════ */
export function hitungNetWorth(aset: { kas: number; investasi: number; properti: number; kendaraan: number; lainnya: number }, liabilitas: { kpr: number; kendaraan: number; kartuKredit: number; pinjaman: number; lainnya: number }) {
  const totalAset = Object.values(aset).reduce((s, v) => s + v, 0)
  const totalLiabilitas = Object.values(liabilitas).reduce((s, v) => s + v, 0)
  const netWorth = totalAset - totalLiabilitas
  const debtRatio = totalAset > 0 ? (totalLiabilitas / totalAset) * 100 : 0
  const status = debtRatio < 30 ? 'sehat' : debtRatio < 50 ? 'perhatian' : 'kritis'
  return { totalAset: Math.round(totalAset), totalLiabilitas: Math.round(totalLiabilitas), netWorth: Math.round(netWorth), debtRatio: Math.round(debtRatio * 10) / 10, status }
}

/* ════════════════════════════════════
   7. SAVINGS GROWTH SIMULATOR
════════════════════════════════════ */
export function hitungSavingsGrowth(tabunganAwal: number, tabunganPerBulan: number, bungaTahunan: number, tahun: number) {
  const r = bungaTahunan / 100 / 12
  const n = tahun * 12
  const nilaiAkhir = r > 0
    ? tabunganAwal * Math.pow(1 + r, n) + tabunganPerBulan * ((Math.pow(1 + r, n) - 1) / r)
    : tabunganAwal + tabunganPerBulan * n
  const totalSetor = tabunganAwal + tabunganPerBulan * n
  const totalBunga = nilaiAkhir - totalSetor
  return {
    nilaiAkhir: Math.round(nilaiAkhir),
    totalSetor: Math.round(totalSetor),
    totalBunga: Math.round(totalBunga),
    returnPersen: Math.round((totalBunga / totalSetor) * 100 * 10) / 10,
  }
}

/* ════════════════════════════════════
   8. GOAL ACHIEVER PLANNER
════════════════════════════════════ */
export function hitungGoal(targetJumlah: number, tabunganSaatIni: number, targetBulan: number, bungaTahunan: number) {
  const r = bungaTahunan / 100 / 12
  const kekurangan = Math.max(0, targetJumlah - tabunganSaatIni * Math.pow(1 + r, targetBulan))
  const tabunganPerBulan = r > 0
    ? kekurangan / ((Math.pow(1 + r, targetBulan) - 1) / r)
    : kekurangan / targetBulan
  const nilaiSaatIniDiTarget = tabunganSaatIni * Math.pow(1 + r, targetBulan)
  return {
    tabunganPerBulan: Math.round(tabunganPerBulan),
    nilaiSaatIniDiTarget: Math.round(nilaiSaatIniDiTarget),
    kekurangan: Math.round(kekurangan),
    persenTercapaiDariTabungan: Math.min(100, Math.round((nilaiSaatIniDiTarget / targetJumlah) * 100 * 10) / 10),
  }
}
