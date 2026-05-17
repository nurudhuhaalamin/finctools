/**
 * FincTools — KPR Affordability Analysis
 * Logika interpretasi berbasis kondisi user
 */

export type AnalisisLevel = 'baik' | 'perhatian' | 'buruk'

export interface HasilAnalisisItem {
  level: AnalisisLevel
  diagnosa: string
  penjelasan: string
  rekomendasi: string[]
}

export interface KPRAnalysisInput {
  penghasilanBersih: number
  totalCicilanLain: number
  bungaKPR: number
  tenorTahun: number
  dpPersen: number
  dtiRatio: number
  maxHargaProperti: number
  maxCicilanKPR: number
}

export function analisaKPR(i: KPRAnalysisInput): HasilAnalisisItem {
  const cicilanExistingRatio = i.totalCicilanLain / i.penghasilanBersih * 100
  const isLeverageDP = i.dpPersen < 15
  const isBungaTinggi = i.bungaKPR > 11
  const isTenorPanjang = i.tenorTahun >= 25
  const isCicilanExistingBerat = cicilanExistingRatio > 20

  // === KONDISI BURUK ===

  // DTI > 40% + cicilan existing berat
  if (i.dtiRatio > 40 && isCicilanExistingBerat) {
    return {
      level: 'buruk',
      diagnosa: 'Kapasitas KPR sangat terbatas — beban utang yang ada sudah terlalu besar.',
      penjelasan: `Total cicilan yang sudah ada memakan ${cicilanExistingRatio.toFixed(0)}% dari penghasilanmu, sehingga ruang untuk KPR hampir tidak ada. Bank akan sangat ketat dalam menyetujui pengajuan dengan kondisi ini karena DTI sudah melebihi 40%.`,
      rekomendasi: [
        'Lunasi sebagian atau seluruh utang yang ada sebelum mengajukan KPR',
        'Target DTI total di bawah 35% sebelum mengajukan — berarti cicilan semua utang maksimal 35% dari penghasilan',
        'Pertimbangkan menambah penghasilan (pekerjaan sampingan, pasangan bekerja) untuk meningkatkan kapasitas cicilan',
        'Gunakan Debt Destroyer untuk menentukan urutan pelunasan utang yang paling efisien',
      ],
    }
  }

  // DTI > 40% + cicilan existing rendah (penghasilan yang kurang)
  if (i.dtiRatio > 40 && !isCicilanExistingBerat) {
    return {
      level: 'buruk',
      diagnosa: 'Penghasilan saat ini belum cukup untuk properti di kisaran harga ini.',
      penjelasan: `Dengan penghasilan Rp ${(i.penghasilanBersih / 1_000_000).toFixed(1)} juta per bulan, kemampuan cicilan KPR maksimalmu sudah terlampaui untuk properti ini. DTI di atas 40% akan membuat bank menolak pengajuan atau memberikan plafon yang jauh lebih kecil.`,
      rekomendasi: [
        `Pertimbangkan properti dengan harga lebih rendah — maksimum yang terjangkau adalah Rp ${(i.maxHargaProperti / 1_000_000).toFixed(0)} juta`,
        `Tambah down payment untuk mengurangi pokok pinjaman dan cicilan`,
        'Perpanjang tenor untuk menurunkan cicilan bulanan (meski total bunga lebih besar)',
        'Cari KPR subsidi FLPP jika memenuhi syarat penghasilan — bunga hanya 5% per tahun',
      ],
    }
  }

  // DTI 35-40% + DP rendah + bunga tinggi (triple pressure)
  if (i.dtiRatio > 35 && isLeverageDP && isBungaTinggi) {
    return {
      level: 'buruk',
      diagnosa: 'Tiga tekanan sekaligus: DTI tinggi, DP minim, dan bunga di atas rata-rata.',
      penjelasan: `Kombinasi DP di bawah 15%, bunga ${i.bungaKPR}%, dan DTI ${i.dtiRatio.toFixed(0)}% menciptakan risiko yang bertumpuk. Total bunga yang akan dibayar bisa melebihi harga properti itu sendiri, dan cicilan akan sangat membebani.`,
      rekomendasi: [
        'Tunda pembelian 1–2 tahun untuk mengumpulkan DP minimal 20%',
        `Cari bank dengan bunga di bawah 10% — perbedaan 1% bunga pada tenor panjang bisa menghemat puluhan juta rupiah`,
        'Bandingkan penawaran minimal dari 3–5 bank sebelum memutuskan',
        'Pertimbangkan KPR take over dari bank lain jika sudah punya KPR berjalan',
      ],
    }
  }

  // === KONDISI PERHATIAN ===

  // DTI 35-40%
  if (i.dtiRatio > 35) {
    const rekomen: string[] = [
      'Pastikan ada dana darurat minimal 6 bulan pengeluaran sebelum ambil KPR',
      'Hindari utang baru apapun selama masa cicilan KPR aktif',
    ]

    if (isLeverageDP) {
      rekomen.push('Tambah DP untuk mengurangi cicilan dan total bunga — setiap 5% tambahan DP sangat signifikan')
    }
    if (isBungaTinggi) {
      rekomen.push(`Negosiasi bunga dengan bank atau bandingkan penawaran lain — bunga ${i.bungaKPR}% tergolong tinggi`)
    }
    if (isTenorPanjang) {
      rekomen.push('Pertimbangkan tenor lebih pendek jika cicilan masih terjangkau — hemat bunga puluhan juta')
    }
    rekomen.push('Pertimbangkan ajukan bersama pasangan (joint income) untuk meningkatkan plafon')

    return {
      level: 'perhatian',
      diagnosa: 'Masih bisa mengajukan KPR, tapi ruangnya tipis — perlu perencanaan ketat.',
      penjelasan: `DTI ${i.dtiRatio.toFixed(0)}% berarti cicilan mengambil porsi besar dari penghasilan. Bank masih mungkin menyetujui, namun tidak ada ruang untuk pengeluaran tak terduga. Satu gangguan penghasilan bisa langsung berdampak pada kemampuan cicilan.`,
      rekomendasi: rekomen,
    }
  }

  // DTI 30-35% + DP rendah
  if (i.dtiRatio > 30 && isLeverageDP) {
    return {
      level: 'perhatian',
      diagnosa: 'DTI masih aman tapi DP yang rendah meningkatkan total beban bunga.',
      penjelasan: `DTI ${i.dtiRatio.toFixed(0)}% tergolong sehat, namun DP di bawah 15% berarti kamu meminjam lebih banyak dan total bunga yang dibayar jauh lebih besar. Cicilan bulanan juga lebih tinggi dari yang seharusnya.`,
      rekomendasi: [
        'Jika memungkinkan, tunda 6–12 bulan untuk menambah DP ke minimal 20%',
        'Setiap 5% tambahan DP bisa memangkas cicilan bulanan secara signifikan',
        'Pertimbangkan apakah properti di harga lebih rendah dengan DP lebih besar lebih masuk akal',
        'Pastikan ada tabungan terpisah untuk biaya KPR di luar DP: provisi, notaris, asuransi',
      ],
    }
  }

  // DTI 30-35% + tenor panjang + bunga tinggi
  if (i.dtiRatio > 30 && isTenorPanjang && isBungaTinggi) {
    return {
      level: 'perhatian',
      diagnosa: 'Cicilan aman, tapi kombinasi tenor panjang dan bunga tinggi membuat total bayar sangat besar.',
      penjelasan: `Dengan tenor ${i.tenorTahun} tahun dan bunga ${i.bungaKPR}%, total bunga yang dibayar bisa melebihi pokok pinjaman. Artinya kamu membayar lebih dari dua kali harga properti sepanjang masa cicilan.`,
      rekomendasi: [
        'Cari bank dengan bunga lebih rendah — perbedaan 1% pada tenor panjang bernilai puluhan juta',
        `Pertimbangkan tenor ${Math.max(15, i.tenorTahun - 5)} tahun jika cicilan masih terjangkau`,
        'Lakukan pelunasan lebih awal (prepayment) saat ada rezeki — langsung mengurangi pokok',
        'Cek kebijakan bank terkait biaya pelunasan dipercepat',
      ],
    }
  }

  // === KONDISI BAIK ===

  // DTI < 25% — sangat sehat
  if (i.dtiRatio < 25) {
    const rekomen: string[] = [
      'Posisi kamu kuat — gunakan ini untuk negosiasi bunga dengan bank',
      'Pertimbangkan tenor lebih pendek untuk menghemat total bunga',
      'Siapkan dokumen lengkap untuk mempercepat proses persetujuan',
      'Bandingkan penawaran 3–5 bank untuk mendapat kondisi terbaik',
    ]
    if (!isLeverageDP && i.dpPersen >= 30) {
      rekomen.push('DP besar memberi daya tawar lebih — minta rate bunga khusus dari bank')
    }
    return {
      level: 'baik',
      diagnosa: 'Posisi finansial sangat kuat untuk mengajukan KPR.',
      penjelasan: `DTI hanya ${i.dtiRatio.toFixed(0)}% menunjukkan kemampuan bayar yang jauh di atas rata-rata. Bank akan sangat welcome dengan profil ini dan kemungkinan besar akan menawarkan bunga yang lebih kompetitif. Kamu punya daya tawar yang baik.`,
      rekomendasi: rekomen,
    }
  }

  // DTI 25-30% — sehat normal
  const rekoNormal: string[] = [
    'Siapkan dokumen KPR: KTP, KK, slip gaji 3 bulan, rekening koran 3–6 bulan, NPWP',
    'Bandingkan penawaran minimal 3 bank — perbedaan 0.5% bunga sangat berarti jangka panjang',
    'Perhatikan bunga fixed vs floating — pastikan kamu siap jika bunga floating naik setelah periode fixed berakhir',
  ]

  if (isTenorPanjang) {
    rekoNormal.push(`Pertimbangkan tenor ${i.tenorTahun - 5} tahun — cicilan sedikit lebih besar tapi hemat bunga signifikan`)
  }
  if (!isLeverageDP) {
    rekoNormal.push('DP yang cukup adalah modal baik — pastikan masih ada sisa untuk biaya KPR non-DP')
  }

  return {
    level: 'baik',
    diagnosa: 'Kondisi finansial sehat — pengajuan KPR bisa dilanjutkan dengan percaya diri.',
    penjelasan: `DTI ${i.dtiRatio.toFixed(0)}% masih dalam batas aman yang direkomendasikan perencana keuangan. Dengan kondisi ini, bank kemungkinan besar akan menyetujui pengajuan KPR kamu dengan proses yang relatif lancar.`,
    rekomendasi: rekoNormal,
  }
}
