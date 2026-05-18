/**
 * FincTools — Blog Types
 * Sistem konten artikel berbasis komponen terstruktur
 */

export type KategoriArtikel =
  | 'investasi'
  | 'saham-bursa'
  | 'trading'
  | 'pajak'
  | 'keuangan-pribadi'
  | 'kripto'
  | 'ekonomi-pasar'

// ─── Tipe Komponen Konten ────────────────────────

export type KontenParagraf = {
  type: 'paragraph'
  text: string
}

export type KontenHeading = {
  type: 'heading'
  level: 2 | 3
  text: string
}

export type KontenCallout = {
  type: 'callout'
  variant: 'info' | 'tip' | 'warning' | 'danger'
  judul?: string
  text: string
}

export type KontenTable = {
  type: 'table'
  headers: string[]
  rows: string[][]
}

export type KontenStepList = {
  type: 'step-list'
  steps: { judul: string; desc: string }[]
}

export type KontenFormulaBox = {
  type: 'formula-box'
  formula: string
  contoh?: string
}

export type KontenStatHighlight = {
  type: 'stat-highlight'
  items: { angka: string; label: string; sublabel?: string }[]
}

export type KontenComparison = {
  type: 'comparison'
  judul?: string
  items: { nama: string; pros: string[]; cons: string[] }[]
}

export type KontenKeyTakeaway = {
  type: 'key-takeaway'
  points: string[]
}

export type KontenToolCTA = {
  type: 'tool-cta'
  nama: string
  href: string
  desc: string
}

export type KontenGrafikGaris = {
  type: 'grafik-garis'
  judul: string
  data: { label: string; nilai: number; nilai2?: number }[]
  labelY?: string
  seri?: { key: 'nilai' | 'nilai2'; nama: string; warna: string }[]
}

export type KontenGrafikBatang = {
  type: 'grafik-batang'
  judul: string
  data: { label: string; nilai: number }[]
  labelY?: string
  warna?: string
}

export type KontenBlock =
  | KontenParagraf
  | KontenHeading
  | KontenCallout
  | KontenTable
  | KontenStepList
  | KontenFormulaBox
  | KontenStatHighlight
  | KontenComparison
  | KontenKeyTakeaway
  | KontenToolCTA
  | KontenGrafikGaris
  | KontenGrafikBatang

// ─── Tipe Artikel ────────────────────────────────

export interface Artikel {
  slug: string
  kategori: KategoriArtikel
  judul: string
  ringkasan: string
  tanggal: string
  waktuBaca: number
  tags: string[]
  konten: KontenBlock[]
}

// ─── Konfigurasi Kategori ─────────────────────────

export const kategoriConfig: Record<KategoriArtikel, {
  nama: string
  deskripsi: string
  gradientFrom: string
  gradientTo: string
  iconBg: string
  badge: string
  toolHref?: string
}> = {
  investasi: {
    nama: 'Investasi',
    deskripsi: 'Reksa dana, SBN, obligasi, emas, dan instrumen investasi lainnya',
    gradientFrom: 'from-emerald-600',
    gradientTo: 'to-teal-500',
    iconBg: 'bg-emerald-500',
    badge: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40',
    toolHref: '/investasi',
  },
  'saham-bursa': {
    nama: 'Saham & Bursa',
    deskripsi: 'Analisa saham IDX, laporan keuangan, fundamental, dan teknikal',
    gradientFrom: 'from-indigo-600',
    gradientTo: 'to-violet-500',
    iconBg: 'bg-indigo-500',
    badge: 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40',
    toolHref: '/saham',
  },
  trading: {
    nama: 'Trading',
    deskripsi: 'Strategi trading, risk management, analisa teknikal, dan psikologi trading',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-cyan-500',
    iconBg: 'bg-blue-500',
    badge: 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40',
    toolHref: '/trading',
  },
  pajak: {
    nama: 'Pajak',
    deskripsi: 'PPh 21, pajak investasi, UMKM, zakat, dan perencanaan pajak',
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-pink-500',
    iconBg: 'bg-purple-500',
    badge: 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40',
    toolHref: '/pajak',
  },
  'keuangan-pribadi': {
    nama: 'Keuangan Pribadi',
    deskripsi: 'Budgeting, dana darurat, utang, FIRE, KPR, dan asuransi',
    gradientFrom: 'from-sky-600',
    gradientTo: 'to-blue-400',
    iconBg: 'bg-sky-500',
    badge: 'text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40',
    toolHref: '/personal-finance',
  },
  kripto: {
    nama: 'Kripto',
    deskripsi: 'Investasi kripto, DCA, staking, manajemen risiko, dan regulasi',
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-orange-400',
    iconBg: 'bg-amber-500',
    badge: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40',
    toolHref: '/kripto',
  },
  'ekonomi-pasar': {
    nama: 'Ekonomi & Pasar',
    deskripsi: 'Makroekonomi, suku bunga BI, inflasi, dan analisa kondisi pasar',
    gradientFrom: 'from-slate-600',
    gradientTo: 'to-slate-400',
    iconBg: 'bg-slate-500',
    badge: 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/40',
  },
}
