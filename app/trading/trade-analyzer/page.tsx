import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TradingToolPage from '@/components/layout/TradingToolPage'
import TradeAnalyzer from '@/components/tools/trading/TradeAnalyzer'

export const metadata: Metadata = {
  title: 'Trade Analyzer — Analisis Risk/Reward Ratio | FincTools',
  description: 'Evaluasi kelayakan trade berdasarkan Risk/Reward ratio sebelum eksekusi. Hitung potensi profit, potensi loss, dan risk pips secara real-time.',
}

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6">
          <Link href="/" className="hover:text-finc-green transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/trading" className="hover:text-finc-green transition-colors">Trading</Link>
          <ChevronRight size={12} />
          <span className="text-[--text-primary] font-medium">Trade Analyzer</span>
        </nav>
        <TradingToolPage
          name="Trade Analyzer"
          description="Trade Analyzer mengevaluasi kelayakan sebuah trade berdasarkan Risk/Reward ratio sebelum eksekusi. Masukkan entry, stop loss, dan take profit — dapatkan analisis lengkap apakah trade ini layak secara matematis."
          steps={[
            { title: 'Isi Entry Price', desc: 'Masukkan harga entry yang kamu rencanakan untuk membuka posisi.' },
            { title: 'Isi Stop Loss', desc: 'Level harga di mana kamu akan menutup posisi jika market berlawanan arah.' },
            { title: 'Isi Take Profit', desc: 'Level harga target profit yang ingin kamu capai dari trade ini.' },
            { title: 'Isi Lot Size & Pip Value', desc: 'Masukkan ukuran posisi dan nilai pip sesuai instrumen dan broker kamu.' },
            { title: 'Baca Hasilnya', desc: 'R/R ≥ 2 (hijau) layak dieksekusi. R/R 1–2 (kuning) pertimbangkan ulang. R/R < 1 (merah) hindari.' },
          ]}
          formula={`R/R Ratio      = Reward Pips ÷ Risk Pips
Risk Pips      = |Entry - Stop Loss| × 10.000
Reward Pips    = |Take Profit - Entry| × 10.000
Potensi Profit = Reward Pips × Pip Value × Lot × 100
Potensi Loss   = Risk Pips × Pip Value × Lot × 100`}
          formulaExample={`Contoh: Entry 1.1000 | SL 1.0950 | TP 1.1100 | Lot 0.1
Risk   = 50 pips → Loss Rp 500.000
Reward = 100 pips → Profit Rp 1.000.000
R/R    = 1:2 ✅ Layak dieksekusi`}
          variables={[
            { name: 'Entry Price', desc: 'Harga pembukaan posisi trading' },
            { name: 'Stop Loss', desc: 'Level harga untuk membatasi kerugian jika prediksi salah' },
            { name: 'Take Profit', desc: 'Level harga target profit yang ingin dicapai' },
            { name: 'Risk Pips', desc: 'Jarak dalam pips antara entry dan stop loss' },
            { name: 'Reward Pips', desc: 'Jarak dalam pips antara entry dan take profit' },
            { name: 'R/R Ratio', desc: 'Rasio reward terhadap risk — semakin tinggi semakin baik' },
          ]}
          history={`Konsep Risk/Reward ratio adalah fondasi manajemen risiko modern dalam trading, dipopulerkan oleh trader legendaris Jesse Livermore di awal abad ke-20. Livermore selalu memastikan potensi keuntungannya minimal tiga kali lipat dari potensi kerugian sebelum membuka posisi — sebuah prinsip yang masih relevan hingga hari ini.

Pada tahun 1983, Richard Dennis dan William Eckhardt melatih sekelompok trader awam yang dikenal sebagai Turtle Traders. Salah satu aturan inti sistem Turtle adalah hanya mengambil trade dengan R/R yang menguntungkan secara statistik — membuktikan bahwa sistem berbasis R/R yang konsisten bisa menghasilkan trader profesional dari orang biasa sekalipun.

Van K. Tharp dalam Trade Your Way to Financial Freedom (1998) secara matematis menunjukkan bahwa R/R ratio adalah variabel terpenting kedua dalam profitabilitas sistem trading, setelah expectancy keseluruhan — bahkan lebih penting dari akurasi entry itu sendiri.`}
          interpretation={[
            { range: 'R/R ≥ 3', label: '🟢 Sangat Baik', desc: 'Reward jauh lebih besar dari risk — trade sangat menguntungkan secara statistik' },
            { range: 'R/R 2–3', label: '🟢 Baik', desc: 'Standar trader profesional — layak dieksekusi dengan win rate wajar' },
            { range: 'R/R 1–2', label: '🟡 Minimal', desc: 'Butuh win rate di atas 50% untuk profitable — pertimbangkan ulang' },
            { range: 'R/R < 1', label: '🔴 Buruk', desc: 'Reward lebih kecil dari risk — hindari trade seperti ini' },
          ]}
          interpretationTitle="Cara Membaca R/R Ratio"
          faqs={[
            { q: 'Berapa R/R ratio minimum yang ideal untuk trading?', a: 'Minimal 1:2. Dengan R/R 1:2 dan win rate 40% sekalipun, strategi masih bisa profitable secara jangka panjang. Semakin tinggi R/R, semakin kecil win rate yang dibutuhkan untuk breakeven.' },
            { q: 'Apakah R/R tinggi otomatis berarti trade bagus?', a: 'Tidak selalu. Take profit yang tidak realistis — misalnya melampaui resistance kuat atau level psikologis penting — akan jarang tercapai. R/R harus dikombinasikan dengan analisis teknikal yang solid.' },
            { q: 'Bagaimana cara meningkatkan R/R ratio tanpa mengubah target?', a: 'Perkecil jarak stop loss dengan mencari entry yang lebih presisi — misalnya menunggu pullback ke level support sebelum entry. Stop loss yang lebih ketat otomatis meningkatkan R/R ratio.' },
            { q: 'Apakah Trade Analyzer cocok untuk saham dan kripto?', a: 'Ya. Rumus R/R berlaku universal untuk semua instrumen. Untuk saham, ganti "pips" dengan "poin" atau "rupiah per lembar". Untuk kripto, gunakan persentase harga.' },
            { q: 'Mengapa saya perlu menghitung R/R sebelum entry, bukan setelah?', a: 'Menghitung R/R setelah posisi terbuka sudah tidak ada gunanya — kamu sudah terlanjur masuk. Analisis ini adalah alat perencanaan, bukan evaluasi. Lakukan sebelum entry untuk memastikan setiap trade berdasarkan logika, bukan emosi.' },
          ]}
          related={[
            { name: 'Risk Manager', href: '/trading/risk-manager', desc: 'Hitung ukuran posisi optimal sebelum menganalisis R/R trade' },
            { name: 'Stop Loss Optimizer', href: '/trading/stop-loss-optimizer', desc: 'Tentukan level stop loss berbasis ATR untuk input yang lebih akurat' },
            { name: 'Win Rate & Expectancy Tracker', href: '/trading/win-rate-expectancy-tracker', desc: 'Gabungkan R/R ratio dengan win rate untuk menghitung expectancy sistem' },
            { name: 'Kelly Criterion Optimizer', href: '/trading/kelly-criterion-optimizer', desc: 'Optimalkan ukuran posisi berdasarkan win rate dan R/R historis' },
          ]}
          references={[
            'Tharp, V.K. (1998). <em>Trade Your Way to Financial Freedom.</em> McGraw-Hill.',
            'Schwager, J.D. (1989). <em>Market Wizards.</em> New York Institute of Finance.',
            'Faith, C. (2007). <em>Way of the Turtle.</em> McGraw-Hill.',
            'OJK. <em>Panduan Investasi di Pasar Modal.</em> <a href="https://ojk.go.id" target="_blank" rel="noopener noreferrer" class="text-finc-green hover:underline">ojk.go.id</a>',
          ]}
        >
          <TradeAnalyzer />
        </TradingToolPage>
      </main>
      <Footer />
    </>
  )
}
