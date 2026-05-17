import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TradingToolPage from '@/components/layout/TradingToolPage'
import WinRateExpectancyTracker from '@/components/tools/trading/WinRateExpectancyTracker'
export const metadata: Metadata = { title: 'Win Rate & Expectancy Tracker — Viabilitas Strategi Trading | FincTools', description: 'Hitung expectancy per trade dan proyeksi profit bulanan berdasarkan win rate dan rata-rata P/L. Ketahui apakah strategi kamu layak dijalankan jangka panjang.' }
export default function Page() {
  return (<><Header /><main className="mx-auto max-w-4xl px-4 py-8"><nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6"><Link href="/" className="hover:text-finc-green transition-colors">Home</Link><ChevronRight size={12} /><Link href="/trading" className="hover:text-finc-green transition-colors">Trading</Link><ChevronRight size={12} /><span className="text-[--text-primary] font-medium">Win Rate & Expectancy Tracker</span></nav>
  <TradingToolPage name="Win Rate & Expectancy Tracker" description="Win Rate & Expectancy Tracker menghitung expectancy per trade — rata-rata keuntungan atau kerugian yang bisa diharapkan dari setiap trade berdasarkan statistik historis strategi kamu."
    steps={[{title:'Set Win Rate',desc:'Geser slider ke win rate historis kamu. Gunakan data minimal 30 trade terakhir untuk akurasi.'},{title:'Isi Rata-rata Win',desc:'Rata-rata keuntungan per trade yang profit dalam Rupiah.'},{title:'Isi Rata-rata Loss',desc:'Rata-rata kerugian per trade yang loss dalam Rupiah.'},{title:'Set Trade per Bulan',desc:'Berapa rata-rata trade yang kamu lakukan dalam satu bulan.'},{title:'Baca Proyeksinya',desc:'Expectancy positif berarti strategi profitable. Kalikan dengan trade per bulan untuk melihat proyeksi pendapatan bulanan.'}]}
    formula={`Expectancy = (Win Rate × Avg Win) - (Loss Rate × Avg Loss)
Break-even WR = Avg Loss ÷ (Avg Win + Avg Loss) × 100%
R/R Ratio = Avg Win ÷ Avg Loss
Proyeksi/Bulan = Expectancy × Trade per Bulan`}
    formulaExample={`Contoh: Win Rate 55% | Avg Win Rp 200.000 | Avg Loss Rp 150.000
Expectancy = (0.55 × 200.000) - (0.45 × 150.000)
           = 110.000 - 67.500 = Rp 42.500 per trade ✅
Proyeksi 20 trade/bulan = Rp 850.000`}
    variables={[{name:'Win Rate',desc:'Persentase trade yang berakhir profit dari total trade historis'},{name:'Expectancy',desc:'Rata-rata keuntungan atau kerugian per trade yang diharapkan secara statistik'},{name:'Break-even Win Rate',desc:'Win rate minimum agar strategi tidak merugi dengan R/R ratio saat ini'},{name:'R/R Ratio',desc:'Rasio rata-rata win terhadap rata-rata loss'},{name:'Proyeksi/Bulan',desc:'Estimasi total profit atau loss dalam satu bulan berdasarkan frekuensi trading'}]}
    history={`Konsep mathematical expectancy dalam konteks trading pertama kali diformalkan oleh Ed Thorp — matematikawan yang dikenal sebagai orang pertama yang secara sistematis mengalahkan kasino menggunakan probabilitas dalam Beat the Dealer (1962) dan kemudian diterapkan ke pasar saham dalam Beat the Market (1967).

Thorp menunjukkan bahwa profitabilitas jangka panjang sepenuhnya ditentukan oleh expectancy — bukan oleh keberuntungan jangka pendek. Sistem dengan expectancy positif, meski kecil, akan selalu menghasilkan profit jika dijalankan cukup banyak kali.

Van K. Tharp mempopulerkan konsep ini lebih luas ke komunitas trader ritel melalui buku dan workshop-nya, memperkenalkan istilah "expectancy" sebagai ukuran utama kualitas sebuah sistem trading — menggantikan metrik sederhana seperti win rate atau total profit yang sering menyesatkan.`}
    interpretation={[{range:'Positif > Rp 50.000',label:'🟢 Sangat Baik',desc:'Strategi sangat profitable — pertahankan konsistensi'},{range:'Positif Rp 1–50.000',label:'🟢 Baik',desc:'Strategi profitable — tingkatkan frekuensi atau optimasi R/R'},{range:'Nol (Break-even)',label:'🟡 Netral',desc:'Tidak untung tidak rugi — perlu perbaikan'},{range:'Negatif',label:'🔴 Merugi',desc:'Strategi tidak viable — evaluasi ulang setup trading'}]}
    interpretationTitle="Interpretasi Expectancy per Trade"
    faqs={[{q:'Apakah mungkin profitable dengan win rate di bawah 50%?',a:'Sangat mungkin. Dengan win rate 40% dan R/R ratio 1:2, expectancy-nya tetap positif. Banyak trend-following trader profesional memiliki win rate 30–40% tapi sangat profitable karena rata-rata profit per trade jauh lebih besar dari rata-rata loss-nya.'},{q:'Berapa win rate minimum yang dibutuhkan untuk breakeven?',a:'Tergantung R/R ratio kamu. Dengan R/R 1:1 butuh win rate 50%. Dengan R/R 1:2 cukup win rate 33.3%. Formula break-even win rate sudah tersedia di hasil kalkulasi tool ini.'},{q:'Mengapa expectancy saya positif tapi modal terus turun?',a:'Kemungkinan besar karena inkonsistensi ukuran posisi — saat kalah kamu menggandakan posisi (martingale) atau saat menang kamu terlalu konservatif. Gunakan Risk Manager untuk memastikan setiap trade menggunakan posisi yang konsisten.'},{q:'Berapa minimal trade untuk menghitung expectancy yang akurat?',a:'Minimal 30 trade, idealnya 100 trade. Semakin sedikit sampel, semakin besar pengaruh keberuntungan terhadap hasil. Jangan mengubah strategi berdasarkan kurang dari 30 trade.'}]}
    related={[{name:'Trading Performance Analyzer',href:'/trading/trading-performance-analyzer',desc:'Analisis performa lebih komprehensif dengan Profit Factor dan total P/L'},{name:'Kelly Criterion Optimizer',href:'/trading/kelly-criterion-optimizer',desc:'Optimalkan ukuran posisi berdasarkan win rate dan R/R ratio ini'},{name:'Risk Manager',href:'/trading/risk-manager',desc:'Pastikan setiap trade menggunakan ukuran posisi yang konsisten'},{name:'Probability of Ruin Analyzer',href:'/trading/probability-of-ruin-analyzer',desc:'Hitung probabilitas bangkrut berdasarkan statistik trading kamu'}]}
    references={['Thorp, E.O. (1962). <em>Beat the Dealer.</em> Vintage Books.','Thorp, E.O. & Kassouf, S. (1967). <em>Beat the Market.</em> Random House.','Tharp, V.K. (1998). <em>Trade Your Way to Financial Freedom.</em> McGraw-Hill.']}
  ><WinRateExpectancyTracker /></TradingToolPage></main><Footer /></>)
}
