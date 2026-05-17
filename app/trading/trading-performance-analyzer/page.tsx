import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TradingToolPage from '@/components/layout/TradingToolPage'
import TradingPerformanceAnalyzer from '@/components/tools/trading/TradingPerformanceAnalyzer'
export const metadata: Metadata = { title: 'Trading Performance Analyzer — Analisis Statistik Trading | FincTools', description: 'Analisis performa trading kamu secara komprehensif: win rate, profit factor, expectancy, dan total P/L. Ketahui apakah strategi kamu benar-benar profitable.' }
export default function Page() {
  return (<><Header /><main className="mx-auto max-w-4xl px-4 py-8"><nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6"><Link href="/" className="hover:text-finc-green transition-colors">Home</Link><ChevronRight size={12} /><Link href="/trading" className="hover:text-finc-green transition-colors">Trading</Link><ChevronRight size={12} /><span className="text-[--text-primary] font-medium">Trading Performance Analyzer</span></nav>
  <TradingToolPage name="Trading Performance Analyzer" description="Trading Performance Analyzer mengevaluasi performa trading kamu secara statistik menggunakan metrik yang dipakai trader profesional: win rate, profit factor, expectancy, dan total P/L keseluruhan."
    steps={[{title:'Isi Total Trade',desc:'Masukkan jumlah total trade yang sudah kamu lakukan dalam periode yang ingin dievaluasi.'},{title:'Isi Jumlah Win',desc:'Berapa trade yang berakhir profit dari total trade tersebut.'},{title:'Isi Rata-rata Profit per Win',desc:'Rata-rata keuntungan dalam Rupiah dari setiap trade yang profit.'},{title:'Isi Rata-rata Loss per Loss',desc:'Rata-rata kerugian dalam Rupiah dari setiap trade yang loss.'},{title:'Evaluasi Hasilnya',desc:'Profit Factor ≥ 1.5 berarti strategi sangat profitable. Di bawah 1.0 berarti strategi merugi dan perlu diperbaiki.'}]}
    formula={`Win Rate       = (Jumlah Win ÷ Total Trade) × 100%
Profit Factor  = Total Gross Win ÷ Total Gross Loss
Expectancy     = (Win Rate × Avg Win) - (Loss Rate × Avg Loss)
Total P/L      = (Win × Avg Win) - (Loss × Avg Loss)`}
    formulaExample={`Contoh: 50 trade | 28 win | Avg Win Rp 200.000 | Avg Loss Rp 150.000
Win Rate      = 28/50 = 56%
Gross Win     = 28 × 200.000 = Rp 5.600.000
Gross Loss    = 22 × 150.000 = Rp 3.300.000
Profit Factor = 5.600.000 ÷ 3.300.000 = 1.70 ✅`}
    variables={[{name:'Win Rate',desc:'Persentase trade yang berakhir profit dari total trade'},{name:'Loss Rate',desc:'Persentase trade yang berakhir loss (100% - Win Rate)'},{name:'Profit Factor',desc:'Rasio total gross profit terhadap total gross loss — di atas 1.0 berarti profitable'},{name:'Expectancy',desc:'Rata-rata keuntungan atau kerugian per trade dalam Rupiah'},{name:'Total P/L',desc:'Total profit atau loss bersih dari seluruh trade dalam periode evaluasi'}]}
    history={`Konsep Profit Factor sebagai metrik evaluasi sistem trading dipopulerkan oleh Charles LeBeau dan Thomas Stridsman dalam buku-buku teknis mereka pada awal 1990-an. Sebelumnya, kebanyakan trader hanya melihat total profit sebagai ukuran keberhasilan — tanpa mempertimbangkan konsistensi dan efisiensi sistem.

William Eckhardt, salah satu pendiri Turtle Trading, menekankan bahwa sistem trading yang baik harus dievaluasi dengan statistik yang robust — bukan dari beberapa trade saja. Ia merekomendasikan minimal 30 trade untuk mendapatkan statistik yang bermakna.

Profit Factor pertama kali diadopsi secara luas oleh komunitas trading sistem otomatis (algorithmic trading) pada era 1990-an, di mana backtesting membutuhkan metrik objektif untuk membandingkan berbagai strategi secara apples-to-apples.`}
    interpretation={[{range:'PF ≥ 2.0',label:'🟢 Sangat Profitable',desc:'Sistem trading yang sangat kuat dan konsisten'},{range:'PF 1.5–2.0',label:'🟢 Profitable',desc:'Sistem bagus — pertahankan dan kembangkan'},{range:'PF 1.0–1.5',label:'🟡 Marginal',desc:'Profitable tapi tipis — perlu optimasi lebih lanjut'},{range:'PF < 1.0',label:'🔴 Merugi',desc:'Sistem tidak profitable — evaluasi ulang strategi secara menyeluruh'}]}
    interpretationTitle="Interpretasi Profit Factor"
    faqs={[{q:'Berapa minimal trade yang dibutuhkan untuk hasil yang valid?',a:'Minimal 30 trade untuk mendapatkan statistik yang bermakna secara matematis. Kurang dari itu, hasilnya terlalu dipengaruhi oleh keberuntungan semata. Idealnya evaluasi dilakukan setelah 100 trade.'},{q:'Win rate tinggi apakah menjamin profitable?',a:'Tidak. Win rate 80% dengan rata-rata profit Rp 50.000 dan rata-rata loss Rp 500.000 menghasilkan Profit Factor hanya 0.44 — sangat merugi. Win rate harus dilihat bersama dengan R/R ratio.'},{q:'Profit Factor berapa yang bisa dianggap "sistem yang baik"?',a:'Profit Factor 1.5 ke atas sudah bisa dianggap sistem yang baik untuk trading manual. Untuk trading otomatis (EA/bot), standar lebih ketat: minimal 1.8–2.0 karena ada risiko overfitting pada backtesting.'},{q:'Bagaimana jika Profit Factor saya bagus tapi modal terus turun?',a:'Kemungkinan ada inkonsistensi dalam ukuran posisi — misalnya mengambil posisi lebih besar saat loss (revenge trading). Pastikan setiap trade menggunakan ukuran posisi yang konsisten sesuai Risk Manager.'}]}
    related={[{name:'Win Rate & Expectancy Tracker',href:'/trading/win-rate-expectancy-tracker',desc:'Analisis mendalam tentang expectancy dan proyeksi profit bulanan'},{name:'Risk Manager',href:'/trading/risk-manager',desc:'Pastikan ukuran posisi konsisten agar statistik performa akurat'},{name:'Kelly Criterion Optimizer',href:'/trading/kelly-criterion-optimizer',desc:'Optimalkan ukuran posisi berdasarkan win rate historis kamu'},{name:'Drawdown Recovery Planner',href:'/trading/drawdown-recovery-planner',desc:'Rencanakan recovery jika performa sedang dalam periode drawdown'}]}
    references={['LeBeau, C. & Lucas, D. (1992). <em>Technical Traders Guide to Computer Analysis of the Futures Market.</em> Business One Irwin.','Stridsman, T. (2000). <em>Trading Systems That Work.</em> McGraw-Hill.','Tharp, V.K. (1998). <em>Trade Your Way to Financial Freedom.</em> McGraw-Hill.']}
  ><TradingPerformanceAnalyzer /></TradingToolPage></main><Footer /></>)
}
