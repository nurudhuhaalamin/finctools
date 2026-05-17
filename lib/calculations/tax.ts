/**
 * FincTools — Tax Calculations (Indonesia)
 * Berdasarkan UU HPP No. 7 Tahun 2021
 * Tarif & PTKP berlaku per 2024
 */

/* ════════════════════════════════════════
   KONSTANTA PAJAK INDONESIA
════════════════════════════════════════ */

// PTKP 2024 (per tahun)
export const PTKP: Record<string, number> = {
  'TK/0': 54_000_000,
  'TK/1': 58_500_000,
  'TK/2': 63_000_000,
  'TK/3': 67_500_000,
  'K/0':  58_500_000,
  'K/1':  63_000_000,
  'K/2':  67_500_000,
  'K/3':  72_000_000,
}

// Tarif PPh 21 Progresif (UU HPP 2021)
export const TARIF_PPH21 = [
  { batas: 60_000_000,        tarif: 0.05 },
  { batas: 250_000_000,       tarif: 0.15 },
  { batas: 500_000_000,       tarif: 0.25 },
  { batas: 5_000_000_000,     tarif: 0.30 },
  { batas: Infinity,          tarif: 0.35 },
]

// Hitung PPh progresif dari PKP
export function hitungPPhProgresif(pkp: number): number {
  if (pkp <= 0) return 0
  let pph = 0
  let sisa = pkp
  let prev = 0
  for (const { batas, tarif } of TARIF_PPH21) {
    const layer = Math.min(sisa, batas - prev)
    if (layer <= 0) break
    pph += layer * tarif
    sisa -= layer
    prev = batas
    if (sisa <= 0) break
  }
  return Math.round(pph)
}

/* ════════════════════════════════════════
   1. TAX OPTIMIZER PPh 21
════════════════════════════════════════ */
export interface PPh21Input {
  gajiPokok: number         // per bulan
  tunjanganTetap: number    // per bulan
  tunjanganTidakTetap: number // per bulan
  statusPTKP: string        // 'TK/0', 'K/1', dst
  iburNPWP: boolean         // tidak punya NPWP kena 20% lebih
}

export interface PPh21Result {
  penghasilanBruto: number  // per bulan
  penghasilanBrutoTahunan: number
  biayaJabatan: number      // 5% maks 500rb/bln
  penghasilanNeto: number   // per bulan
  ptkp: number
  pkp: number               // per tahun
  pphTahunan: number
  pphBulanan: number
  pphBulananFinal: number   // sudah termasuk koreksi NPWP
  takehomePay: number       // per bulan
  rincianTarif: { layer: string; tarif: string; pajak: number }[]
}

export function hitungPPh21(i: PPh21Input): PPh21Result {
  const penghasilanBruto = i.gajiPokok + i.tunjanganTetap + i.tunjanganTidakTetap
  const penghasilanBrutoTahunan = penghasilanBruto * 12
  const biayaJabatan = Math.min(penghasilanBruto * 0.05, 500_000)
  const penghasilanNeto = penghasilanBruto - biayaJabatan
  const penghasilanNetoTahunan = penghasilanNeto * 12
  const ptkp = PTKP[i.statusPTKP] || PTKP['TK/0']
  const pkp = Math.max(0, Math.round(penghasilanNetoTahunan - ptkp) / 1000) * 1000
  const pphTahunan = hitungPPhProgresif(pkp)
  const pphBulanan = Math.round(pphTahunan / 12)
  const pphBulananFinal = i.iburNPWP
    ? Math.round(pphBulanan * 1.2)
    : pphBulanan
  const takehomePay = penghasilanBruto - pphBulananFinal

  // Rincian per layer
  const rincianTarif: { layer: string; tarif: string; pajak: number }[] = []
  let sisa = pkp; let prev = 0
  const labels = ['0 – 60 jt', '60 – 250 jt', '250 – 500 jt', '500 jt – 5 M', '> 5 M']
  for (let idx = 0; idx < TARIF_PPH21.length; idx++) {
    const { batas, tarif } = TARIF_PPH21[idx]
    const layer = Math.min(sisa, batas - prev)
    if (layer <= 0) break
    rincianTarif.push({ layer: labels[idx], tarif: `${tarif * 100}%`, pajak: Math.round(layer * tarif) })
    sisa -= layer; prev = batas
    if (sisa <= 0) break
  }

  return { penghasilanBruto, penghasilanBrutoTahunan, biayaJabatan, penghasilanNeto, ptkp, pkp, pphTahunan, pphBulanan, pphBulananFinal, takehomePay, rincianTarif }
}

/* ════════════════════════════════════════
   2. THR TAX PLANNER
════════════════════════════════════════ */
export interface THRInput {
  gajiPokok: number
  tunjanganTetap: number
  thrAmount: number
  statusPTKP: string
}

export interface THRResult {
  penghasilanTahunanTanpaTHR: number
  penghasilanTahunanDenganTHR: number
  ptkp: number
  pkpTanpaTHR: number
  pkpDenganTHR: number
  pphTanpaTHR: number
  pphDenganTHR: number
  pphTHR: number           // selisih = pajak atas THR
  thrBersih: number        // THR setelah pajak
  efektifTarifTHR: number  // persentase pajak dari THR
}

export function hitungTHR(i: THRInput): THRResult {
  const brutoPerBulan = i.gajiPokok + i.tunjanganTetap
  const biayaJabatanPerBulan = Math.min(brutoPerBulan * 0.05, 500_000)
  const netoPerBulan = brutoPerBulan - biayaJabatanPerBulan
  const ptkp = PTKP[i.statusPTKP] || PTKP['TK/0']

  const penghasilanTahunanTanpaTHR = netoPerBulan * 12
  const penghasilanTahunanDenganTHR = penghasilanTahunanTanpaTHR + i.thrAmount

  const pkpTanpaTHR = Math.max(0, Math.round((penghasilanTahunanTanpaTHR - ptkp) / 1000) * 1000)
  const pkpDenganTHR = Math.max(0, Math.round((penghasilanTahunanDenganTHR - ptkp) / 1000) * 1000)

  const pphTanpaTHR = hitungPPhProgresif(pkpTanpaTHR)
  const pphDenganTHR = hitungPPhProgresif(pkpDenganTHR)
  const pphTHR = pphDenganTHR - pphTanpaTHR
  const thrBersih = i.thrAmount - pphTHR
  const efektifTarifTHR = i.thrAmount > 0 ? (pphTHR / i.thrAmount) * 100 : 0

  return { penghasilanTahunanTanpaTHR, penghasilanTahunanDenganTHR, ptkp, pkpTanpaTHR, pkpDenganTHR, pphTanpaTHR, pphDenganTHR, pphTHR, thrBersih, efektifTarifTHR: Math.round(efektifTarifTHR * 10) / 10 }
}

/* ════════════════════════════════════════
   3. FREELANCER TAX ESTIMATOR
════════════════════════════════════════ */
export interface FreelancerTaxInput {
  penghasilanBrutoPerBulan: number
  normaPersenase: number   // % norma penghitungan penghasilan neto
  statusPTKP: string
  bulanKerja: number       // 1-12
}

export interface FreelancerTaxResult {
  penghasilanBrutoTahunan: number
  penghasilanNeto: number  // setelah norma
  ptkp: number
  pkp: number
  pphTahunan: number
  pphBulanan: number
  efektifTarif: number
}

export function hitungFreelancerTax(i: FreelancerTaxInput): FreelancerTaxResult {
  const penghasilanBrutoTahunan = i.penghasilanBrutoPerBulan * i.bulanKerja
  const penghasilanNeto = penghasilanBrutoTahunan * (i.normaPersenase / 100)
  const ptkp = PTKP[i.statusPTKP] || PTKP['TK/0']
  const pkp = Math.max(0, Math.round((penghasilanNeto - ptkp) / 1000) * 1000)
  const pphTahunan = hitungPPhProgresif(pkp)
  const pphBulanan = Math.round(pphTahunan / i.bulanKerja)
  const efektifTarif = penghasilanBrutoTahunan > 0 ? (pphTahunan / penghasilanBrutoTahunan) * 100 : 0
  return { penghasilanBrutoTahunan, penghasilanNeto, ptkp, pkp, pphTahunan, pphBulanan, efektifTarif: Math.round(efektifTarif * 10) / 10 }
}

/* ════════════════════════════════════════
   4. INVESTMENT TAX REPORT GENERATOR
════════════════════════════════════════ */
export interface InvestmentTaxInput {
  nilaiJualSaham: number      // PPh final 0.1% dari nilai jual
  bungaDeposito: number       // PPh final 20%
  bungaObligasi: number       // PPh final 10%
  dividenLokal: number        // PPh final 10%
  dividenLuar: number         // PPh 20% (bisa dikreditkan)
}

export interface InvestmentTaxResult {
  pphSaham: number
  pphDeposito: number
  pphObligasi: number
  pphDividenLokal: number
  pphDividenLuar: number
  totalPph: number
  rincian: { instrumen: string; penghasilan: number; tarif: string; pajak: number }[]
}

export function hitungInvestmentTax(i: InvestmentTaxInput): InvestmentTaxResult {
  const pphSaham       = Math.round(i.nilaiJualSaham * 0.001)
  const pphDeposito    = Math.round(i.bungaDeposito * 0.20)
  const pphObligasi    = Math.round(i.bungaObligasi * 0.10)
  const pphDividenLokal = Math.round(i.dividenLokal * 0.10)
  const pphDividenLuar  = Math.round(i.dividenLuar * 0.20)
  const totalPph = pphSaham + pphDeposito + pphObligasi + pphDividenLokal + pphDividenLuar
  const rincian = [
    { instrumen: 'Penjualan Saham', penghasilan: i.nilaiJualSaham, tarif: '0.1% (final)', pajak: pphSaham },
    { instrumen: 'Bunga Deposito', penghasilan: i.bungaDeposito, tarif: '20% (final)', pajak: pphDeposito },
    { instrumen: 'Bunga Obligasi', penghasilan: i.bungaObligasi, tarif: '10% (final)', pajak: pphObligasi },
    { instrumen: 'Dividen Lokal', penghasilan: i.dividenLokal, tarif: '10% (final)', pajak: pphDividenLokal },
    { instrumen: 'Dividen Luar Negeri', penghasilan: i.dividenLuar, tarif: '20%', pajak: pphDividenLuar },
  ].filter(r => r.penghasilan > 0)
  return { pphSaham, pphDeposito, pphObligasi, pphDividenLokal, pphDividenLuar, totalPph, rincian }
}

/* ════════════════════════════════════════
   5. ZAKAT & TAX PLANNER
════════════════════════════════════════ */
export interface ZakatInput {
  penghasilanBulanan: number
  tabungan: number
  investasi: number
  emas: number             // gram
  hargaEmasPerGram: number // Rp
  hutang: number
}

export interface ZakatResult {
  totalHarta: number
  nisabRupiah: number      // 85 gram emas
  hartaBersih: number      // harta - hutang
  zakatMal: number         // 2.5% dari harta bersih di atas nisab
  zakatPenghasilan: number // 2.5% dari penghasilan/bulan jika > nisab
  wajibZakatMal: boolean
  wajibZakatPenghasilan: boolean
}

export function hitungZakat(i: ZakatInput): ZakatResult {
  const nilaiEmas = i.emas * i.hargaEmasPerGram
  const totalHarta = i.tabungan + i.investasi + nilaiEmas
  const hartaBersih = Math.max(0, totalHarta - i.hutang)
  const nisabRupiah = 85 * i.hargaEmasPerGram // nisab = 85 gram emas
  const wajibZakatMal = hartaBersih >= nisabRupiah
  const zakatMal = wajibZakatMal ? Math.round(hartaBersih * 0.025) : 0
  const penghasilanTahunan = i.penghasilanBulanan * 12
  const wajibZakatPenghasilan = penghasilanTahunan >= nisabRupiah
  const zakatPenghasilan = wajibZakatPenghasilan ? Math.round(i.penghasilanBulanan * 0.025) : 0
  return { totalHarta, nisabRupiah: Math.round(nisabRupiah), hartaBersih, zakatMal, zakatPenghasilan, wajibZakatMal, wajibZakatPenghasilan }
}

/* ════════════════════════════════════════
   6. UMKM TAX ESTIMATOR
════════════════════════════════════════ */
export interface UMKMTaxInput {
  omzetPerBulan: number
  bulanBerjalan: number    // sudah berapa bulan berjalan di tahun ini
}

export interface UMKMTaxResult {
  omzetTahunan: number
  pphFinalPerBulan: number  // 0.5%
  pphFinalTahunan: number
  omzetSisaBebas: number    // sisa sampai Rp 500 juta (batas bebas pajak UMKM perorangan)
  melebihiBatas: boolean    // omzet > 500 juta
  catatanPajak: string
}

export function hitungUMKMTax(i: UMKMTaxInput): UMKMTaxResult {
  const omzetTahunan = i.omzetPerBulan * 12
  const BATAS_BEBAS = 500_000_000  // WP OP UMKM bebas PPh sampai Rp 500 juta
  const melebihiBatas = omzetTahunan > BATAS_BEBAS

  // Hanya omzet di atas Rp 500 juta yang kena 0.5% untuk WP Orang Pribadi
  const omzetKenaPajak = Math.max(0, omzetTahunan - BATAS_BEBAS)
  const pphFinalTahunan = Math.round(omzetKenaPajak * 0.005)
  const pphFinalPerBulan = Math.round(pphFinalTahunan / 12)
  const omzetSisaBebas = Math.max(0, BATAS_BEBAS - omzetTahunan)
  const catatanPajak = !melebihiBatas
    ? 'Omzet di bawah Rp 500 juta — BEBAS PPh (WP OP UMKM)'
    : 'PPh Final 0.5% hanya dari omzet di atas Rp 500 juta'

  return { omzetTahunan, pphFinalPerBulan, pphFinalTahunan, omzetSisaBebas, melebihiBatas, catatanPajak }
}

/* ════════════════════════════════════════
   7. PPN TRACKER
════════════════════════════════════════ */
export interface PPNInput {
  harga: number
  isInklusive: boolean     // harga sudah termasuk PPN atau belum
  tarifPPN: number         // default 11%
}

export interface PPNResult {
  dpp: number              // Dasar Pengenaan Pajak
  ppn: number
  hargaTotal: number
  tarifEfektif: number
}

export function hitungPPN(i: PPNInput): PPNResult {
  const tarif = i.tarifPPN / 100
  let dpp: number, ppn: number, hargaTotal: number
  if (i.isInklusive) {
    // Harga sudah termasuk PPN: DPP = Harga × 100/(100+tarif)
    dpp = Math.round(i.harga * 100 / (100 + i.tarifPPN))
    ppn = i.harga - dpp
    hargaTotal = i.harga
  } else {
    // Harga belum termasuk PPN
    dpp = i.harga
    ppn = Math.round(i.harga * tarif)
    hargaTotal = dpp + ppn
  }
  const tarifEfektif = dpp > 0 ? (ppn / dpp) * 100 : 0
  return { dpp, ppn, hargaTotal, tarifEfektif: Math.round(tarifEfektif * 10) / 10 }
}
