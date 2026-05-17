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

/* ════════════════════════════════════════
   KPR ANALYSIS — Logika Hasil Analisa
════════════════════════════════════════ */
export type AnalisisLevel = 'baik' | 'perhatian' | 'buruk'

export interface HasilAnalisisKPR {
  level: AnalisisLevel
  diagnosa: string
  penjelasan: string
  rekomendasi: string[]
}

export function analisaKPR(
  penghasilan: number,
  cicilanLain: number,
  bunga: number,
  tenor: number,
  dp: number,
  dti: number,
  maxHarga: number
): HasilAnalisisKPR {
  const cicilanRatio = cicilanLain / penghasilan * 100
  const dpRendah = dp < 15
  const bungaTinggi = bunga > 11
  const tenorPanjang = tenor >= 25
  const cicilanBerat = cicilanRatio > 20

  // BURUK
  if (dti > 40 && cicilanBerat) {
    return {
      level: 'buruk',
      diagnosa: 'Kapasitas KPR sangat terbatas — beban utang yang ada sudah terlalu besar.',
      penjelasan: `Total cicilan yang sudah ada memakan ${cicilanRatio.toFixed(0)}% dari penghasilan, sehingga ruang untuk KPR hampir tidak ada. Bank akan sangat ketat dalam kondisi ini karena DTI sudah melebihi 40%.`,
      rekomendasi: [
        'Lunasi sebagian atau seluruh utang yang ada sebelum mengajukan KPR',
        'Target DTI total di bawah 35% sebelum mengajukan',
        'Pertimbangkan menambah penghasilan untuk meningkatkan kapasitas cicilan',
        'Gunakan Debt Destroyer untuk menentukan urutan pelunasan utang',
      ],
    }
  }

  if (dti > 40) {
    return {
      level: 'buruk',
      diagnosa: 'Penghasilan saat ini belum cukup untuk properti di kisaran harga ini.',
      penjelasan: `Kemampuan cicilan KPR maksimalmu sudah terlampaui untuk properti ini. DTI di atas 40% akan membuat bank menolak pengajuan atau memberikan plafon yang jauh lebih kecil.`,
      rekomendasi: [
        `Pertimbangkan properti dengan harga lebih rendah — maksimum yang terjangkau sekitar Rp ${(maxHarga / 1_000_000).toFixed(0)} juta`,
        'Tambah down payment untuk mengurangi pokok pinjaman dan cicilan',
        'Perpanjang tenor untuk menurunkan cicilan bulanan',
        'Cari KPR subsidi FLPP jika memenuhi syarat — bunga hanya 5% per tahun',
      ],
    }
  }

  if (dti > 35 && dpRendah && bungaTinggi) {
    return {
      level: 'buruk',
      diagnosa: 'Tiga tekanan sekaligus: DTI tinggi, DP minim, dan bunga di atas rata-rata.',
      penjelasan: `Kombinasi DP di bawah 15%, bunga ${bunga}%, dan DTI ${dti.toFixed(0)}% menciptakan risiko yang bertumpuk. Total bunga yang dibayar bisa melebihi harga properti itu sendiri.`,
      rekomendasi: [
        'Tunda pembelian 1-2 tahun untuk mengumpulkan DP minimal 20%',
        'Cari bank dengan bunga di bawah 10% — bandingkan minimal 3 bank',
        'Pertimbangkan KPR take over dari bank lain jika sudah punya KPR berjalan',
      ],
    }
  }

  // PERHATIAN
  if (dti > 35) {
    const rek = [
      'Pastikan ada dana darurat minimal 6 bulan sebelum ambil KPR',
      'Hindari utang baru apapun selama masa cicilan KPR aktif',
    ]
    if (dpRendah) rek.push('Tambah DP untuk mengurangi cicilan — setiap 5% tambahan sangat signifikan')
    if (bungaTinggi) rek.push(`Negosiasi bunga atau bandingkan penawaran lain — bunga ${bunga}% tergolong tinggi`)
    if (tenorPanjang) rek.push('Pertimbangkan tenor lebih pendek jika cicilan masih terjangkau')
    rek.push('Pertimbangkan ajukan bersama pasangan untuk meningkatkan plafon')
    return {
      level: 'perhatian',
      diagnosa: 'Masih bisa mengajukan KPR, tapi ruangnya tipis — perlu perencanaan ketat.',
      penjelasan: `DTI ${dti.toFixed(0)}% berarti cicilan mengambil porsi besar dari penghasilan. Tidak ada ruang untuk pengeluaran tak terduga. Satu gangguan penghasilan bisa langsung berdampak pada kemampuan cicilan.`,
      rekomendasi: rek,
    }
  }

  if (dti > 30 && dpRendah) {
    return {
      level: 'perhatian',
      diagnosa: 'DTI masih aman tapi DP yang rendah meningkatkan total beban bunga.',
      penjelasan: `DTI ${dti.toFixed(0)}% tergolong sehat, namun DP di bawah 15% berarti kamu meminjam lebih banyak dan total bunga yang dibayar jauh lebih besar.`,
      rekomendasi: [
        'Jika memungkinkan, tunda 6-12 bulan untuk menambah DP ke minimal 20%',
        'Setiap 5% tambahan DP memangkas cicilan bulanan secara signifikan',
        'Pastikan ada tabungan terpisah untuk biaya di luar DP: provisi, notaris, asuransi',
      ],
    }
  }

  if (dti > 30 && tenorPanjang && bungaTinggi) {
    return {
      level: 'perhatian',
      diagnosa: 'Cicilan aman, tapi kombinasi tenor panjang dan bunga tinggi membuat total bayar sangat besar.',
      penjelasan: `Dengan tenor ${tenor} tahun dan bunga ${bunga}%, total bunga yang dibayar bisa melebihi pokok pinjaman. Kamu membayar lebih dari dua kali harga properti.`,
      rekomendasi: [
        'Cari bank dengan bunga lebih rendah — perbedaan 1% pada tenor panjang bernilai puluhan juta',
        `Pertimbangkan tenor ${tenor - 5} tahun jika cicilan masih terjangkau`,
        'Lakukan pelunasan lebih awal saat ada rezeki — langsung mengurangi pokok',
      ],
    }
  }

  // BAIK
  if (dti < 25) {
    return {
      level: 'baik',
      diagnosa: 'Posisi finansial sangat kuat untuk mengajukan KPR.',
      penjelasan: `DTI hanya ${dti.toFixed(0)}% menunjukkan kemampuan bayar yang jauh di atas rata-rata. Bank akan sangat welcome dengan profil ini dan kemungkinan menawarkan bunga yang lebih kompetitif.`,
      rekomendasi: [
        'Gunakan posisi kuat ini untuk negosiasi bunga dengan bank',
        'Pertimbangkan tenor lebih pendek untuk menghemat total bunga',
        'Bandingkan penawaran 3-5 bank untuk mendapat kondisi terbaik',
        dp >= 30 ? 'DP besar memberi daya tawar lebih — minta rate bunga khusus dari bank' : 'Siapkan dokumen lengkap untuk mempercepat proses persetujuan',
      ],
    }
  }

  return {
    level: 'baik',
    diagnosa: 'Kondisi finansial sehat — pengajuan KPR bisa dilanjutkan dengan percaya diri.',
    penjelasan: `DTI ${dti.toFixed(0)}% masih dalam batas aman. Bank kemungkinan besar akan menyetujui pengajuan KPR dengan proses yang relatif lancar.`,
    rekomendasi: [
      'Siapkan dokumen KPR: KTP, KK, slip gaji 3 bulan, rekening koran 3-6 bulan, NPWP',
      'Bandingkan penawaran minimal 3 bank — perbedaan 0.5% bunga sangat berarti jangka panjang',
      'Perhatikan bunga fixed vs floating dan siapkan skenario jika bunga naik',
      tenorPanjang ? `Pertimbangkan tenor ${tenor - 5} tahun — hemat bunga signifikan` : 'Pastikan ada dana darurat terpisah dari DP',
    ],
  }
}
