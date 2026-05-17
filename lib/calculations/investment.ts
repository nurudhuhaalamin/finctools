/**
 * FincTools — Investment Calculations
 * Reksa Dana, Obligasi, Emas, Dividen
 */

/* ════════════════════════════════════════
   1. DCA SIMULATOR
════════════════════════════════════════ */
export interface DCAInput {
  investasiPerPeriode: number   // Rp
  jumlahPeriode: number         // bulan
  returnTahunan: number         // % per tahun
  frekuensi: 'bulanan' | 'mingguan' | 'tahunan'
}

export interface DCAResult {
  totalInvestasi: number
  nilaiAkhir: number
  totalKeuntungan: number
  returnTotal: number           // %
  cagr: number                  // % per tahun
  rincianTahunan: { tahun: number; totalInvestasi: number; nilaiPortofolio: number }[]
}

export function hitungDCA(i: DCAInput): DCAResult {
  const periodeFaktor = i.frekuensi === 'mingguan' ? 52 : i.frekuensi === 'tahunan' ? 1 : 12
  const returnPerPeriode = i.returnTahunan / 100 / periodeFaktor
  const jumlahPeriode = i.frekuensi === 'mingguan'
    ? i.jumlahPeriode * 52 / 12
    : i.frekuensi === 'tahunan'
    ? i.jumlahPeriode / 12
    : i.jumlahPeriode

  // Future Value of Annuity: PMT × ((1+r)^n - 1) / r
  let nilaiAkhir = 0
  if (returnPerPeriode > 0) {
    nilaiAkhir = i.investasiPerPeriode * ((Math.pow(1 + returnPerPeriode, jumlahPeriode) - 1) / returnPerPeriode) * (1 + returnPerPeriode)
  } else {
    nilaiAkhir = i.investasiPerPeriode * jumlahPeriode
  }

  const totalInvestasi = i.investasiPerPeriode * i.jumlahPeriode
  const totalKeuntungan = nilaiAkhir - totalInvestasi
  const returnTotal = totalInvestasi > 0 ? (totalKeuntungan / totalInvestasi) * 100 : 0
  const tahunTotal = i.jumlahPeriode / 12
  const cagr = tahunTotal > 0 && totalInvestasi > 0
    ? (Math.pow(nilaiAkhir / totalInvestasi, 1 / tahunTotal) - 1) * 100
    : 0

  // Rincian per tahun (maks 10 tahun)
  const rincianTahunan: DCAResult['rincianTahunan'] = []
  const maxTahun = Math.min(Math.floor(i.jumlahPeriode / 12), 10)
  for (let t = 1; t <= maxTahun; t++) {
    const n = t * 12
    const nilai = returnPerPeriode > 0
      ? i.investasiPerPeriode * ((Math.pow(1 + returnPerPeriode, n) - 1) / returnPerPeriode) * (1 + returnPerPeriode)
      : i.investasiPerPeriode * n
    rincianTahunan.push({ tahun: t, totalInvestasi: i.investasiPerPeriode * n, nilaiPortofolio: Math.round(nilai) })
  }

  return {
    totalInvestasi: Math.round(totalInvestasi),
    nilaiAkhir: Math.round(nilaiAkhir),
    totalKeuntungan: Math.round(totalKeuntungan),
    returnTotal: Math.round(returnTotal * 10) / 10,
    cagr: Math.round(cagr * 10) / 10,
    rincianTahunan,
  }
}

/* ════════════════════════════════════════
   2. SBN MATURITY PLANNER
════════════════════════════════════════ */
export interface SBNInput {
  nominal: number        // Rp
  kuponPersen: number    // % per tahun
  tenorTahun: number
  pajakKupon: number     // % (default 10% untuk SBR/ORI)
}

export interface SBNResult {
  kuponPerTahun: number
  kuponBersihPerTahun: number
  kuponPerBulan: number
  kuponBersihPerBulan: number
  totalKuponKotor: number
  totalKuponBersih: number
  totalTerima: number    // nominal + kupon bersih
  yieldBersih: number    // % efektif setelah pajak
}

export function hitungSBN(i: SBNInput): SBNResult {
  const kuponPerTahun = Math.round(i.nominal * i.kuponPersen / 100)
  const pajakFaktor = 1 - i.pajakKupon / 100
  const kuponBersihPerTahun = Math.round(kuponPerTahun * pajakFaktor)
  const kuponPerBulan = Math.round(kuponPerTahun / 12)
  const kuponBersihPerBulan = Math.round(kuponBersihPerTahun / 12)
  const totalKuponKotor = kuponPerTahun * i.tenorTahun
  const totalKuponBersih = kuponBersihPerTahun * i.tenorTahun
  const totalTerima = i.nominal + totalKuponBersih
  const yieldBersih = i.kuponPersen * pajakFaktor

  return { kuponPerTahun, kuponBersihPerTahun, kuponPerBulan, kuponBersihPerBulan, totalKuponKotor, totalKuponBersih, totalTerima, yieldBersih: Math.round(yieldBersih * 100) / 100 }
}

/* ════════════════════════════════════════
   3. COUPON INCOME PLANNER
════════════════════════════════════════ */
export interface CouponInput {
  nominal: number
  kuponPersen: number
  frekuensiPerTahun: number  // 1, 2, 4, 12
  pajakPersen: number
  tenorTahun: number
}

export interface CouponResult {
  kuponPerPembayaran: number
  kuponBersihPerPembayaran: number
  kuponPerTahun: number
  kuponBersihPerTahun: number
  totalKuponBersih: number
  efektifYield: number
}

export function hitungCoupon(i: CouponInput): CouponResult {
  const kuponPerTahun = Math.round(i.nominal * i.kuponPersen / 100)
  const kuponPerPembayaran = Math.round(kuponPerTahun / i.frekuensiPerTahun)
  const pajakFaktor = 1 - i.pajakPersen / 100
  const kuponBersihPerPembayaran = Math.round(kuponPerPembayaran * pajakFaktor)
  const kuponBersihPerTahun = Math.round(kuponPerTahun * pajakFaktor)
  const totalKuponBersih = kuponBersihPerTahun * i.tenorTahun
  const efektifYield = i.kuponPersen * pajakFaktor

  return { kuponPerPembayaran, kuponBersihPerPembayaran, kuponPerTahun, kuponBersihPerTahun, totalKuponBersih, efektifYield: Math.round(efektifYield * 100) / 100 }
}

/* ════════════════════════════════════════
   4. BOND YIELD ANALYZER
════════════════════════════════════════ */
export interface BondYieldInput {
  hargaBeli: number      // Rp per lembar (bisa berbeda dari nominal)
  nominal: number        // Rp (face value)
  kuponPersen: number    // % per tahun
  sisaTenor: number      // tahun
  pajakPersen: number    // %
}

export interface BondYieldResult {
  currentYield: number        // % kupon / harga
  currentYieldBersih: number
  ytm: number                 // yield to maturity %
  ytmBersih: number
  premiumDiskon: number       // Rp (positif = premium, negatif = diskon)
  premiumDiskonPersen: number
  label: 'premium' | 'par' | 'diskon'
}

export function hitungBondYield(i: BondYieldInput): BondYieldResult {
  const kuponTahunan = i.nominal * i.kuponPersen / 100
  const currentYield = (kuponTahunan / i.hargaBeli) * 100
  const pajakFaktor = 1 - i.pajakPersen / 100
  const currentYieldBersih = currentYield * pajakFaktor

  // YTM approximation: (Kupon + (Nominal-Harga)/Tenor) / ((Nominal+Harga)/2)
  const ytm = ((kuponTahunan + (i.nominal - i.hargaBeli) / i.sisaTenor) / ((i.nominal + i.hargaBeli) / 2)) * 100
  const ytmBersih = ytm * pajakFaktor

  const premiumDiskon = i.hargaBeli - i.nominal
  const premiumDiskonPersen = (premiumDiskon / i.nominal) * 100
  const label: BondYieldResult['label'] = premiumDiskon > 0 ? 'premium' : premiumDiskon < 0 ? 'diskon' : 'par'

  return {
    currentYield: Math.round(currentYield * 100) / 100,
    currentYieldBersih: Math.round(currentYieldBersih * 100) / 100,
    ytm: Math.round(ytm * 100) / 100,
    ytmBersih: Math.round(ytmBersih * 100) / 100,
    premiumDiskon: Math.round(premiumDiskon),
    premiumDiskonPersen: Math.round(premiumDiskonPersen * 100) / 100,
    label,
  }
}

/* ════════════════════════════════════════
   5. GOLD DCA SIMULATOR
════════════════════════════════════════ */
export interface GoldDCAInput {
  investasiPerBulan: number   // Rp
  jumlahBulan: number
  hargaEmasSekarang: number   // Rp per gram
  targetHarga: number         // Rp per gram (proyeksi)
}

export interface GoldDCAResult {
  totalInvestasi: number
  gramTerkumpul: number
  nilaiSekarang: number
  nilaiTarget: number
  keuntunganTarget: number
  returnTarget: number        // %
  avgHargaBeli: number        // per gram (sama karena DCA di harga tetap)
}

export function hitungGoldDCA(i: GoldDCAInput): GoldDCAResult {
  const totalInvestasi = i.investasiPerBulan * i.jumlahBulan
  const gramPerBulan = i.investasiPerBulan / i.hargaEmasSekarang
  const gramTerkumpul = gramPerBulan * i.jumlahBulan
  const nilaiSekarang = gramTerkumpul * i.hargaEmasSekarang
  const nilaiTarget = gramTerkumpul * i.targetHarga
  const keuntunganTarget = nilaiTarget - totalInvestasi
  const returnTarget = totalInvestasi > 0 ? (keuntunganTarget / totalInvestasi) * 100 : 0

  return {
    totalInvestasi: Math.round(totalInvestasi),
    gramTerkumpul: Math.round(gramTerkumpul * 100) / 100,
    nilaiSekarang: Math.round(nilaiSekarang),
    nilaiTarget: Math.round(nilaiTarget),
    keuntunganTarget: Math.round(keuntunganTarget),
    returnTarget: Math.round(returnTarget * 10) / 10,
    avgHargaBeli: Math.round(i.hargaEmasSekarang),
  }
}

/* ════════════════════════════════════════
   6. GOLD VS INFLATION ANALYZER
════════════════════════════════════════ */
export interface GoldInflasiInput {
  jumlahInvestasi: number
  periodeTahun: number
  returnEmasTahunan: number   // % per tahun
  inflasiTahunan: number      // % per tahun
}

export interface GoldInflasiResult {
  nilaiEmasNominal: number    // nilai emas di masa depan
  nilaiRiilEmas: number       // adjusted for inflation
  dayaBeli: number            // nilai uang tunai setelah inflasi
  keuntunganRiil: number      // selisih riil
  returnNominal: number       // %
  returnRiil: number          // %
  emasBeats: boolean          // apakah emas mengalahkan inflasi
}

export function hitungGoldVsInflasi(i: GoldInflasiInput): GoldInflasiResult {
  const nilaiEmasNominal = i.jumlahInvestasi * Math.pow(1 + i.returnEmasTahunan / 100, i.periodeTahun)
  const faktorInflasi = Math.pow(1 + i.inflasiTahunan / 100, i.periodeTahun)
  const nilaiRiilEmas = nilaiEmasNominal / faktorInflasi
  const dayaBeli = i.jumlahInvestasi / faktorInflasi
  const keuntunganRiil = nilaiRiilEmas - i.jumlahInvestasi
  const returnNominal = ((nilaiEmasNominal - i.jumlahInvestasi) / i.jumlahInvestasi) * 100
  const returnRiil = ((nilaiRiilEmas - i.jumlahInvestasi) / i.jumlahInvestasi) * 100
  const emasBeats = i.returnEmasTahunan > i.inflasiTahunan

  return {
    nilaiEmasNominal: Math.round(nilaiEmasNominal),
    nilaiRiilEmas: Math.round(nilaiRiilEmas),
    dayaBeli: Math.round(dayaBeli),
    keuntunganRiil: Math.round(keuntunganRiil),
    returnNominal: Math.round(returnNominal * 10) / 10,
    returnRiil: Math.round(returnRiil * 10) / 10,
    emasBeats,
  }
}

/* ════════════════════════════════════════
   7. DIVIDEND INCOME PROJECTOR
════════════════════════════════════════ */
export interface DividendInput {
  jumlahSaham: number
  hargaSaham: number          // Rp per lembar
  dividenYield: number        // % per tahun
  pertumbuhanDividen: number  // % per tahun
  periodeTahun: number
}

export interface DividendResult {
  nilaiPortofolio: number
  dividenTahunIni: number
  proyeksi: { tahun: number; dividen: number; totalKumulatif: number }[]
  totalDividenKumulatif: number
  dividenBulanIni: number
  yieldOnCost: number         // yield terhadap harga beli awal
}

export function hitungDividend(i: DividendInput): DividendResult {
  const nilaiPortofolio = i.jumlahSaham * i.hargaSaham
  const dividenTahunIni = Math.round(nilaiPortofolio * i.dividenYield / 100)
  const dividenBulanIni = Math.round(dividenTahunIni / 12)

  let totalKumulatif = 0
  const proyeksi: DividendResult['proyeksi'] = []
  const maxTahun = Math.min(i.periodeTahun, 10)

  for (let t = 1; t <= maxTahun; t++) {
    const dividen = Math.round(dividenTahunIni * Math.pow(1 + i.pertumbuhanDividen / 100, t - 1))
    totalKumulatif += dividen
    proyeksi.push({ tahun: t, dividen, totalKumulatif })
  }

  const yieldOnCost = i.dividenYield * Math.pow(1 + i.pertumbuhanDividen / 100, i.periodeTahun - 1)

  return {
    nilaiPortofolio,
    dividenTahunIni,
    proyeksi,
    totalDividenKumulatif: totalKumulatif,
    dividenBulanIni,
    yieldOnCost: Math.round(yieldOnCost * 100) / 100,
  }
}

/* ════════════════════════════════════════
   8. DRIP SIMULATOR
════════════════════════════════════════ */
export interface DRIPInput {
  sahamAwal: number
  hargaSaham: number
  dividenYield: number        // % per tahun
  pertumbuhanHarga: number    // % per tahun
  periodeTahun: number
}

export interface DRIPResult {
  sahamAkhir: number
  nilaiAwal: number
  nilaiAkhir: number
  totalDividenDireinvestasi: number
  keuntunganTotal: number
  returnTotal: number         // %
  returnTanpaDRIP: number     // % jika dividen tidak direinvestasi
  rincianTahunan: { tahun: number; saham: number; nilaiPortofolio: number; dividenDiterima: number }[]
}

export function hitungDRIP(i: DRIPInput): DRIPResult {
  const nilaiAwal = i.sahamAwal * i.hargaSaham
  let saham = i.sahamAwal
  let harga = i.hargaSaham
  let totalDividenDireinvestasi = 0
  const rincianTahunan: DRIPResult['rincianTahunan'] = []

  for (let t = 1; t <= Math.min(i.periodeTahun, 10); t++) {
    harga = harga * (1 + i.pertumbuhanHarga / 100)
    const dividen = Math.round(saham * harga * i.dividenYield / 100)
    const sahamBaru = dividen / harga
    saham += sahamBaru
    totalDividenDireinvestasi += dividen
    rincianTahunan.push({
      tahun: t,
      saham: Math.round(saham * 100) / 100,
      nilaiPortofolio: Math.round(saham * harga),
      dividenDiterima: dividen,
    })
  }

  const nilaiAkhir = Math.round(saham * harga)
  const keuntunganTotal = nilaiAkhir - nilaiAwal
  const returnTotal = nilaiAwal > 0 ? (keuntunganTotal / nilaiAwal) * 100 : 0

  // Return tanpa DRIP (hanya capital gain)
  const nilaiTanpaDRIP = nilaiAwal * Math.pow(1 + i.pertumbuhanHarga / 100, i.periodeTahun)
  const returnTanpaDRIP = nilaiAwal > 0 ? ((nilaiTanpaDRIP - nilaiAwal) / nilaiAwal) * 100 : 0

  return {
    sahamAkhir: Math.round(saham * 100) / 100,
    nilaiAwal,
    nilaiAkhir,
    totalDividenDireinvestasi: Math.round(totalDividenDireinvestasi),
    keuntunganTotal,
    returnTotal: Math.round(returnTotal * 10) / 10,
    returnTanpaDRIP: Math.round(returnTanpaDRIP * 10) / 10,
    rincianTahunan,
  }
}
