import type { Artikel, KategoriArtikel } from './types'
export type { KategoriArtikel } from './types'
export { kategoriConfig } from './types'

export const artikelDatabase: Artikel[] = [
  {
    slug: 'cara-dca-reksa-dana-untuk-pemula',
    kategori: 'investasi',
    judul: 'Cara DCA Reksa Dana untuk Pemula: Panduan Lengkap 2024',
    ringkasan: 'Dollar Cost Averaging adalah strategi investasi paling cocok untuk pemula. Pelajari cara kerjanya, berapa yang harus diinvestasikan, dan reksa dana mana yang tepat.',
    tanggal: '2024-11-01',
    waktuBaca: 8,
    tags: ['DCA', 'reksa dana', 'investasi pemula'],
    konten: [
      { type: 'paragraph', text: 'Dollar Cost Averaging (DCA) adalah strategi investasi dengan cara menyetorkan jumlah uang yang sama secara rutin tanpa mempertimbangkan kondisi pasar.' },
      { type: 'stat-highlight', items: [{ angka: '12–18%', label: 'Return historis reksa dana saham Indonesia', sublabel: 'per tahun, tidak dijamin' }, { angka: 'Rp 100rb', label: 'Minimum mulai DCA', sublabel: 'di platform modern' }, { angka: '3 tahun', label: 'Horizon minimum disarankan', sublabel: 'untuk hasil optimal' }] },
      { type: 'heading', level: 2, text: 'Mengapa DCA Cocok untuk Pemula?' },
      { type: 'callout', variant: 'tip', judul: 'Efek DCA saat Pasar Turun', text: 'Saat harga turun, jumlah unit reksa dana yang kamu beli lebih banyak. Saat harga naik, lebih sedikit. Hasilnya adalah harga rata-rata beli yang lebih rendah dari rata-rata harga pasar.' },
      { type: 'heading', level: 2, text: 'Pilihan Reksa Dana Berdasarkan Horizon Waktu' },
      { type: 'table', headers: ['Jenis Reksa Dana', 'Return', 'Risiko', 'Cocok untuk'], rows: [['Pasar Uang', '4–6%/thn', 'Sangat Rendah', '1–3 tahun, dana darurat'], ['Campuran', '8–12%/thn', 'Sedang', '3–5 tahun'], ['Saham/Indeks', '12–18%/thn', 'Tinggi', '5+ tahun, pensiun/FIRE']] },
      { type: 'grafik-garis', judul: 'Pertumbuhan DCA Rp 1jt/bulan selama 20 Tahun', labelY: 'Nilai (Rp Juta)', data: [{ label: 'Thn 1', nilai: 12, nilai2: 12 }, { label: 'Thn 5', nilai: 60, nilai2: 82 }, { label: 'Thn 10', nilai: 120, nilai2: 230 }, { label: 'Thn 15', nilai: 180, nilai2: 500 }, { label: 'Thn 20', nilai: 240, nilai2: 960 }], seri: [{ key: 'nilai', nama: 'Total Setoran', warna: '#94a3b8' }, { key: 'nilai2', nama: 'Nilai Portofolio (12%/thn)', warna: '#10b981' }] },
      { type: 'step-list', steps: [{ judul: 'Pilih platform', desc: 'Bibit, Bareksa, atau IPOT Fund. Semua terdaftar OJK.' }, { judul: 'Pilih reksa dana', desc: 'Sesuaikan dengan horizon waktu dan toleransi risiko.' }, { judul: 'Set auto-invest', desc: 'Aktifkan DCA otomatis agar konsisten tanpa perlu ingat.' }, { judul: 'Konsisten minimal 3 tahun', desc: 'Jangan berhenti saat pasar turun — itulah saat DCA paling efektif.' }] },
      { type: 'key-takeaway', points: ['DCA cocok untuk pemula karena menghilangkan kebutuhan market timing', 'Mulai dari jumlah kecil — konsistensi lebih penting dari besarnya nominal', 'Jangan berhenti saat pasar turun — ini justru saat paling efektif untuk DCA', 'Horizon minimal 3–5 tahun untuk hasil optimal dari reksa dana saham'] },
      { type: 'tool-cta', nama: 'DCA Simulator', href: '/investasi/dca-simulator', desc: 'Hitung proyeksi nilai investasi DCA kamu berdasarkan jumlah, durasi, dan estimasi return.' },
    ],
  },
  {
    slug: 'cara-baca-laporan-keuangan-saham',
    kategori: 'saham-bursa',
    judul: 'Cara Membaca Laporan Keuangan Saham: Panduan untuk Investor Pemula',
    ringkasan: 'Laporan keuangan adalah kunci analisa fundamental saham. Pelajari cara membaca neraca, laba rugi, dan arus kas untuk menilai kesehatan finansial perusahaan.',
    tanggal: '2024-11-05',
    waktuBaca: 10,
    tags: ['laporan keuangan', 'analisa fundamental', 'saham IDX'],
    konten: [
      { type: 'paragraph', text: 'Sebelum membeli saham sebuah perusahaan, kamu perlu memahami kondisi finansialnya. Laporan keuangan adalah "health check-up" perusahaan yang diterbitkan setiap kuartal dan tahunan.' },
      { type: 'callout', variant: 'info', judul: 'Di mana menemukan laporan keuangan?', text: 'Semua emiten IDX wajib publikasikan laporan keuangan di idx.co.id (Perusahaan Tercatat > Laporan Keuangan). Gratis dan terbuka untuk publik.' },
      { type: 'heading', level: 2, text: '3 Laporan Utama yang Harus Kamu Baca' },
      { type: 'step-list', steps: [{ judul: 'Neraca (Balance Sheet)', desc: 'Snapshot kondisi keuangan di satu titik waktu. Menunjukkan aset, liabilitas, dan ekuitas.' }, { judul: 'Laporan Laba Rugi (Income Statement)', desc: 'Performa perusahaan selama periode tertentu — pendapatan, biaya, dan laba bersih.' }, { judul: 'Laporan Arus Kas (Cash Flow)', desc: 'Aliran uang masuk dan keluar. Lebih susah dimanipulasi dari laba rugi.' }] },
      { type: 'heading', level: 2, text: 'Rasio Keuangan yang Paling Penting' },
      { type: 'table', headers: ['Rasio', 'Rumus', 'Artinya', 'Ideal'], rows: [['PER', 'Harga / EPS', 'Seberapa mahal vs laba', '< rata-rata industri'], ['PBV', 'Harga / Nilai Buku', 'Harga vs nilai aset bersih', '< 1 = murah'], ['ROE', 'Laba Bersih / Ekuitas', 'Efisiensi menghasilkan laba', '> 15%'], ['DER', 'Total Utang / Ekuitas', 'Tingkat leverage', '< 1 lebih aman']] },
      { type: 'callout', variant: 'warning', judul: 'Red Flag yang Harus Diwaspadai', text: 'Laba bersih positif tapi arus kas operasi negatif. Utang terus naik tapi pendapatan stagnan. Piutang tumbuh jauh lebih cepat dari pendapatan.' },
      { type: 'key-takeaway', points: ['Fokus pada 3 laporan: neraca, laba rugi, dan arus kas', 'Arus kas lebih susah dimanipulasi daripada laba bersih', 'Bandingkan selalu dengan kompetitor di industri yang sama', 'Tren 3–5 tahun lebih bermakna daripada angka satu periode'] },
      { type: 'tool-cta', nama: 'Entry Price Optimizer', href: '/saham/entry-price-optimizer', desc: 'Setelah analisa fundamental, tentukan harga entry optimal dengan risk/reward yang layak.' },
    ],
  },
  {
    slug: 'panduan-risk-management-trading-pemula',
    kategori: 'trading',
    judul: 'Panduan Risk Management Trading: Cara Tidak Kehilangan Semua Modal',
    ringkasan: 'Risk management adalah perbedaan antara trader yang bertahan dan yang habis modalnya. Pelajari aturan 1%, position sizing, dan cara membangun sistem trading yang berkelanjutan.',
    tanggal: '2024-11-10',
    waktuBaca: 9,
    tags: ['risk management', 'position sizing', 'stop loss', 'trading pemula'],
    konten: [
      { type: 'stat-highlight', items: [{ angka: '70–80%', label: 'Trader ritel yang merugi jangka panjang', sublabel: 'Bukan karena analisa salah' }, { angka: '1–2%', label: 'Maksimum risiko per trade yang aman', sublabel: 'Standar trader profesional' }, { angka: '1:2', label: 'Risk/Reward ratio minimum', sublabel: 'Untuk sistem yang profitable' }] },
      { type: 'callout', variant: 'tip', judul: 'Aturan Emas Risk Management', text: 'Jangan pernah mempertaruhkan lebih dari 1–2% modal per trade. Dengan modal Rp 10 juta dan aturan 1%, dibutuhkan 100 kali loss beruntun untuk kehilangan semua modal.' },
      { type: 'heading', level: 2, text: 'Cara Menghitung Position Sizing' },
      { type: 'formula-box', formula: 'Lot Optimal = Modal Berisiko / (Harga Entry × Stop Loss% × 100)', contoh: 'Modal Rp 10jt | Risiko 2% = Rp 200rb | Entry Rp 5.000 | SL 5%\nLot = Rp 200.000 / (Rp 5.000 × 5% × 100) = 8 lot' },
      { type: 'grafik-batang', judul: 'Simulasi 10 Trade — R/R 1:2, Win Rate 40%', labelY: 'Rp (ribu)', data: [{ label: '4 Trade Menang', nilai: 800 }, { label: '6 Trade Kalah', nilai: -600 }, { label: 'Net Profit', nilai: 200 }] },
      { type: 'key-takeaway', points: ['Risiko per trade maksimal 1–2% dari total modal', 'R/R ratio minimal 1:2 sebelum masuk posisi apapun', 'Stop loss berdasarkan level teknikal, bukan persentase acak', 'Tetapkan batas loss harian — jika tercapai, berhenti trading hari itu'] },
      { type: 'tool-cta', nama: 'Risk Manager', href: '/trading/risk-manager', desc: 'Hitung lot optimal dan risk/reward ratio secara otomatis berdasarkan modal kamu.' },
    ],
  },
  {
    slug: 'cara-menghitung-pph21-karyawan-2024',
    kategori: 'pajak',
    judul: 'Cara Menghitung PPh 21 Karyawan 2024: Panduan dengan Contoh Nyata',
    ringkasan: 'PPh 21 dipotong langsung dari gaji setiap bulan. Pelajari cara menghitungnya berdasarkan UU HPP 2021 dan cek apakah potongan di slip gajimu sudah benar.',
    tanggal: '2024-11-15',
    waktuBaca: 8,
    tags: ['PPh 21', 'pajak karyawan', 'PTKP', 'UU HPP 2021'],
    konten: [
      { type: 'table', headers: ['PKP per Tahun', 'Tarif'], rows: [['Rp 0 – Rp 60 juta', '5%'], ['Rp 60 – Rp 250 juta', '15%'], ['Rp 250 – Rp 500 juta', '25%'], ['Rp 500 juta – Rp 5 miliar', '30%'], ['Di atas Rp 5 miliar', '35%']] },
      { type: 'heading', level: 2, text: 'PTKP Berdasarkan Status' },
      { type: 'table', headers: ['Status', 'PTKP per Tahun'], rows: [['TK/0 — Tidak kawin, 0 tanggungan', 'Rp 54.000.000'], ['K/0 — Kawin, 0 tanggungan', 'Rp 58.500.000'], ['K/1 — Kawin, 1 tanggungan', 'Rp 63.000.000'], ['K/2 — Kawin, 2 tanggungan', 'Rp 67.500.000'], ['K/3 — Kawin, 3 tanggungan', 'Rp 72.000.000']] },
      { type: 'step-list', steps: [{ judul: 'Hitung Bruto', desc: 'Gaji pokok + tunjangan tetap + tunjangan tidak tetap' }, { judul: 'Kurangi Biaya Jabatan', desc: '5% dari bruto, maksimum Rp 500.000/bulan' }, { judul: 'Hitung Neto Tahunan', desc: '(Bruto - Biaya Jabatan) × 12' }, { judul: 'Kurangi PTKP', desc: 'PKP = Neto Tahunan - PTKP sesuai status' }, { judul: 'Hitung PPh Progresif', desc: 'Terapkan tarif berlapis ke PKP' }, { judul: 'Bagi 12', desc: 'PPh Bulanan = PPh Tahunan ÷ 12' }] },
      { type: 'formula-box', formula: 'PKP = (Bruto - Biaya Jabatan) × 12 - PTKP\nPPh Tahunan = Tarif Progresif × PKP\nPPh Bulanan = PPh Tahunan / 12', contoh: 'Gaji Rp 12jt | TK/0 | NPWP\nNeto Tahunan = Rp 138.000.000\nPKP = Rp 84.000.000\nPPh = (5%×60jt)+(15%×24jt) = Rp 6.600.000/thn\nPPh Bulanan = Rp 550.000' },
      { type: 'callout', variant: 'warning', judul: 'Tidak Punya NPWP? Kena 20% Lebih Tinggi', text: 'Karyawan tanpa NPWP dikenakan tarif PPh 21 yang 20% lebih tinggi. Membuat NPWP gratis di ereg.pajak.go.id.' },
      { type: 'key-takeaway', points: ['PPh 21 menggunakan tarif progresif berlapis', 'Biaya jabatan 5% (maks Rp 500rb/bln) mengurangi PKP', 'PTKP bergantung pada status pernikahan dan tanggungan', 'Tanpa NPWP kena tarif 20% lebih tinggi'] },
      { type: 'tool-cta', nama: 'Tax Optimizer PPh 21', href: '/pajak/tax-optimizer-pph21', desc: 'Hitung PPh 21 kamu dan cek apakah potongan di slip gaji sudah benar.' },
    ],
  },
  {
    slug: 'panduan-dana-darurat-berapa-yang-harus-disiapkan',
    kategori: 'keuangan-pribadi',
    judul: 'Panduan Dana Darurat: Berapa yang Harus Disiapkan dan Di Mana Menyimpannya',
    ringkasan: 'Dana darurat adalah fondasi keuangan yang sering diabaikan. Pelajari berapa bulan pengeluaran yang ideal, di mana menyimpannya, dan cara membangunnya dari nol.',
    tanggal: '2024-11-20',
    waktuBaca: 7,
    tags: ['dana darurat', 'keuangan pribadi', 'tabungan', 'reksa dana pasar uang'],
    konten: [
      { type: 'callout', variant: 'danger', judul: 'Dana Darurat Bukan Pilihan — Ini Keharusan', text: 'Jangan mulai investasi apapun sebelum memiliki dana darurat. Tanpa buffer ini, kamu akan terpaksa cairkan investasi saat darurat — sering di saat harga aset sedang turun.' },
      { type: 'table', headers: ['Profil', 'Target Dana Darurat', 'Alasan'], rows: [['Karyawan tetap, perusahaan besar', '3 bulan pengeluaran', 'Penghasilan stabil, mudah cari kerja baru'], ['Karyawan kontrak / freelancer', '6 bulan pengeluaran', 'Penghasilan tidak menentu'], ['Menanggung keluarga', '6 bulan pengeluaran', 'Tanggung jawab lebih besar'], ['Pengusaha / wiraswasta', '9–12 bulan pengeluaran', 'Bisnis bisa stuck berbulan-bulan']] },
      { type: 'comparison', judul: 'Instrumen Terbaik untuk Dana Darurat', items: [{ nama: 'Reksa Dana Pasar Uang — Terbaik', pros: ['Return 4–6%/tahun', 'Bisa dicairkan 1–2 hari kerja', 'Risiko sangat rendah'], cons: ['Tidak bisa tarik tunai langsung di ATM', 'Proses pencairan 1–2 hari'] }, { nama: 'Tabungan Bank — Cukup', pros: ['Akses instan kapanpun', 'Dijamin LPS'], cons: ['Bunga hanya 1–2%/tahun', 'Sering habis karena terlalu mudah diakses'] }] },
      { type: 'step-list', steps: [{ judul: 'Hitung target', desc: 'Pengeluaran wajib per bulan × jumlah bulan sesuai profil' }, { judul: 'Buka rekening terpisah', desc: 'Pisahkan dari rekening sehari-hari agar tidak tergoda menggunakannya' }, { judul: 'Sisihkan 10–20% penghasilan', desc: 'Prioritaskan sampai target terpenuhi, baru mulai investasi lain' }, { judul: 'Isi ulang jika terpakai', desc: 'Setelah terpakai, prioritaskan pengisian kembali sebelum investasi rutin' }] },
      { type: 'key-takeaway', points: ['Dana darurat harus dibangun sebelum mulai investasi apapun', 'Target 3 bulan untuk karyawan tetap, 6 bulan untuk freelancer dan pengusaha', 'Reksa dana pasar uang adalah instrumen terbaik untuk dana darurat', 'Pisahkan di rekening berbeda agar tidak tergoda menggunakannya'] },
      { type: 'tool-cta', nama: 'Emergency Shield Builder', href: '/personal-finance/emergency-shield-builder', desc: 'Hitung target dana darurat dan berapa lama waktu yang dibutuhkan untuk mencapainya.' },
    ],
  },
  {
    slug: 'panduan-dca-bitcoin-untuk-pemula',
    kategori: 'kripto',
    judul: 'Panduan DCA Bitcoin untuk Pemula: Cara Investasi Kripto yang Lebih Aman',
    ringkasan: 'DCA adalah strategi paling direkomendasikan untuk investor kripto pemula. Pelajari cara kerjanya, platform yang bisa digunakan di Indonesia, dan berapa alokasi yang wajar.',
    tanggal: '2024-11-25',
    waktuBaca: 8,
    tags: ['DCA', 'Bitcoin', 'kripto', 'investasi kripto'],
    konten: [
      { type: 'stat-highlight', items: [{ angka: '93%', label: 'Periode 4 tahun DCA Bitcoin yang profit', sublabel: 'Bahkan jika mulai di puncak harga' }, { angka: '5–10%', label: 'Alokasi kripto yang wajar', sublabel: 'Dari total portofolio investor moderat' }, { angka: 'Rp 11rb', label: 'Minimum DCA Bitcoin di Pintu', sublabel: 'Bisa dimulai siapapun' }] },
      { type: 'callout', variant: 'warning', judul: 'Kripto Bukan untuk Semua Orang', text: 'Bitcoin bisa turun 70–80% dalam bear market. Pastikan kamu tidak menginvestasikan uang yang dibutuhkan dalam waktu dekat.' },
      { type: 'table', headers: ['Platform', 'Min DCA', 'Auto-invest', 'Keunggulan'], rows: [['Pintu', 'Rp 11.000', 'Ya', 'Paling ramah pemula'], ['Indodax', 'Rp 10.000', 'Ya', 'Volume terbesar, pilihan aset terbanyak'], ['Tokocrypto', 'Rp 10.000', 'Ya', 'Ada fitur staking dan copy trading']] },
      { type: 'comparison', judul: 'Bitcoin & Ethereum vs Altcoin Kecil', items: [{ nama: 'Bitcoin & Ethereum — Direkomendasikan', pros: ['Proyek paling matang', 'Likuiditas tertinggi', 'Risiko proyek gagal sangat kecil'], cons: ['Potensi return lebih kecil dari altcoin baru'] }, { nama: 'Altcoin Kecil — Tidak untuk Pemula', pros: ['Potensi return sangat besar'], cons: ['Risiko proyek gagal sangat tinggi', 'Rentan rug pull dan manipulasi'] }] },
      { type: 'key-takeaway', points: ['DCA menghilangkan kebutuhan market timing', 'Alokasi kripto maksimal 5–10% dari total portofolio', 'Mulai dari Bitcoin dan Ethereum sebelum eksplorasi altcoin', 'Gunakan platform terdaftar Bappebti'] },
      { type: 'tool-cta', nama: 'Crypto DCA Simulator', href: '/kripto/crypto-dca-simulator', desc: 'Simulasikan berapa koin yang terkumpul dan nilai portofolio kripto kamu di berbagai target harga.' },
    ],
  },
  {
    slug: 'memahami-inflasi-dan-dampaknya-ke-investasi',
    kategori: 'ekonomi-pasar',
    judul: 'Memahami Inflasi dan Dampaknya terhadap Investasi di Indonesia',
    ringkasan: 'Inflasi menggerus nilai uang secara diam-diam setiap tahun. Pelajari cara kerja inflasi, sejarah inflasi Indonesia, dan instrumen yang melindungi daya belimu.',
    tanggal: '2024-11-30',
    waktuBaca: 9,
    tags: ['inflasi', 'Bank Indonesia', 'daya beli', 'makroekonomi'],
    konten: [
      { type: 'stat-highlight', items: [{ angka: '2–4%', label: 'Target inflasi Bank Indonesia', sublabel: 'Rentang sasaran resmi BI' }, { angka: '32%', label: 'Penurunan daya beli dalam 10 tahun', sublabel: 'Jika inflasi rata-rata 4%/tahun' }] },
      { type: 'grafik-garis', judul: 'Inflasi Indonesia 2015–2024 (%)', labelY: 'Inflasi (%)', data: [{ label: '2015', nilai: 3.35 }, { label: '2016', nilai: 3.02 }, { label: '2017', nilai: 3.61 }, { label: '2018', nilai: 3.13 }, { label: '2019', nilai: 2.72 }, { label: '2020', nilai: 1.68 }, { label: '2021', nilai: 1.87 }, { label: '2022', nilai: 5.51 }, { label: '2023', nilai: 2.61 }, { label: '2024', nilai: 2.84 }], seri: [{ key: 'nilai', nama: 'Inflasi', warna: '#10b981' }] },
      { type: 'table', headers: ['Instrumen', 'Return Historis', 'vs Inflasi 4%', 'Rekomendasi'], rows: [['Tabungan bank', '1–2%/tahun', 'Kalah', 'Hanya untuk dana darurat'], ['Deposito', '4–6%/tahun', 'Impas/tipis', 'Dana jangka menengah'], ['SBN (ORI/SBR)', '5–7%/tahun', 'Menang tipis', 'Konservatif jangka menengah'], ['Emas', '8–10%/tahun', 'Menang', 'Lindung nilai jangka panjang'], ['Reksa Dana Saham', '12–18%/tahun', 'Menang besar', 'Agresif jangka panjang']] },
      { type: 'callout', variant: 'info', judul: 'Real Return: Yang Benar-benar Kamu Dapatkan', text: 'Return riil = Return nominal - Inflasi. Deposito 5% saat inflasi 4% hanya memberikan return riil 1% — sangat kecil untuk membangun kekayaan jangka panjang.' },
      { type: 'key-takeaway', points: ['Inflasi menggerus daya beli uang yang tidak diinvestasikan setiap tahun', 'Target inflasi BI 2–4% — jadikan ini benchmark minimum return investasi', 'Tabungan biasa dan deposito sering tidak cukup mengalahkan inflasi', 'Reksa dana saham dan emas secara historis mengalahkan inflasi jangka panjang'] },
      { type: 'tool-cta', nama: 'Inflation Guard', href: '/personal-finance/inflation-guard', desc: 'Hitung berapa nilai riil uangmu di masa depan dan instrumen apa yang perlu kamu miliki.' },
    ],
  },
]

export function getArtikelByKategori(kategori: KategoriArtikel): Artikel[] {
  return artikelDatabase.filter(a => a.kategori === kategori)
}

export function getArtikelBySlug(slug: string): Artikel | undefined {
  return artikelDatabase.find(a => a.slug === slug)
}

export function getAllKategori(): KategoriArtikel[] {
  return ['investasi', 'saham-bursa', 'trading', 'pajak', 'keuangan-pribadi', 'kripto', 'ekonomi-pasar']
}

export function getArtikelTerbaru(limit = 3): Artikel[] {
  return [...artikelDatabase]
    .sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime())
    .slice(0, limit)
}
