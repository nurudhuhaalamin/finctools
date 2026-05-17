import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TradingToolPage from '@/components/layout/TradingToolPage'
import StopLossOptimizer from '@/components/tools/trading/StopLossOptimizer'
export const metadata: Metadata = { title: 'Stop Loss Optimizer — Tentukan SL Berbasis ATR | FincTools', description: 'Hitung level stop loss optimal berdasarkan Average True Range (ATR) dan volatilitas pasar untuk perlindungan modal yang lebih cerdas.' }
export default function Page() {
  return (<><Header /><main className="mx-auto max-w-4xl px-4 py-8"><nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6"><Link href="/" className="hover:text-finc-green transition-colors">Home</Link><ChevronRight size={12} /><Link href="/trading" className="hover:text-finc-green transition-colors">Trading</Link><ChevronRight size={12} /><span className="text-[--text-primary] font-medium">Stop Loss Optimizer</span></nav>
  <TradingToolPage name="Stop Loss Optimizer" description="Stop Loss Optimizer menghitung level stop loss yang optimal berdasarkan Average True Range (ATR) — ukuran volatilitas pasar yang objektif. Hasilnya lebih akurat dibanding stop loss yang ditentukan secara sembarangan."
    steps={[{title:'Pilih Arah Posisi',desc:'Pilih Buy (Long) jika kamu membeli, atau Sell (Short) jika kamu menjual.'},{title:'Isi Entry Price',desc:'Masukkan harga di mana kamu berencana membuka posisi.'},{title:'Isi ATR',desc:'Masukkan nilai Average True Range dari chart kamu, dalam satuan pips. ATR tersedia di hampir semua platform trading.'},{title:'Pilih ATR Multiplier',desc:'Multiplier 1.5x adalah standar umum. Volatilitas tinggi gunakan 2x, volatilitas rendah bisa 1x.'},{title:'Isi Modal dan Risiko',desc:'Masukkan modal dan persentase risiko — tool akan menghitung ukuran posisi yang sesuai dengan stop loss ini.'}]}
    formula={`SL Price (Long) = Entry Price - (ATR × Multiplier ÷ 10.000)
SL Price (Short) = Entry Price + (ATR × Multiplier ÷ 10.000)
SL Pips = ATR × Multiplier
Lot Size = (Modal × % Risiko) ÷ (SL Pips × Pip Value) × 0.01`}
    formulaExample={`Contoh: Entry 1.1000 | ATR 20 pips | Multiplier 1.5x | Long
SL Pips  = 20 × 1.5 = 30 pips
SL Price = 1.1000 - 0.0030 = 1.0970`}
    variables={[{name:'ATR',desc:'Average True Range — rata-rata pergerakan harga dalam periode tertentu, diukur dalam pips'},{name:'Multiplier',desc:'Pengali ATR untuk menentukan buffer keamanan dari noise pasar'},{name:'SL Price',desc:'Harga spesifik di mana stop loss akan dipasang'},{name:'SL Pips',desc:'Jarak stop loss dari entry dalam satuan pips'}]}
    history={`Average True Range (ATR) dikembangkan oleh J. Welles Wilder Jr. dan dipublikasikan dalam bukunya New Concepts in Technical Trading Systems pada tahun 1978. ATR adalah salah satu indikator volatilitas paling reliable yang pernah diciptakan dan hingga kini menjadi standar industri.

Wilder mengembangkan ATR untuk mengukur volatilitas pasar komoditas yang sering mengalami gap besar. Konsepnya kemudian diadaptasi ke forex, saham, dan instrumen derivatif lainnya.

Penggunaan ATR sebagai dasar stop loss dipopulerkan oleh trader sistematis seperti Chuck LeBeau dan David Lucas dalam Technical Traders Guide to Computer Analysis of the Futures Market (1992). Pendekatan ini memastikan stop loss tidak terlalu ketat (kena noise) dan tidak terlalu longgar (rugi terlalu besar).`}
    interpretation={[{range:'1x ATR',label:'Sangat Ketat',desc:'Cocok untuk scalping — sering terkena noise pasar'},{range:'1.5x ATR',label:'Standar',desc:'Keseimbangan terbaik antara perlindungan dan kelonggaran'},{range:'2x ATR',label:'Longgar',desc:'Cocok untuk swing trading di kondisi volatile'},{range:'3x ATR',label:'Sangat Longgar',desc:'Untuk posisi jangka panjang atau trend following'}]}
    interpretationTitle="Panduan Memilih ATR Multiplier"
    faqs={[{q:'Dari mana saya mendapat nilai ATR?',a:'ATR tersedia sebagai indikator bawaan di hampir semua platform trading seperti MetaTrader, TradingView, dan Stockbit. Tambahkan indikator ATR ke chart dengan periode 14 — nilai yang muncul itulah yang dimasukkan ke tool ini.'},{q:'ATR periode berapa yang sebaiknya digunakan?',a:'ATR periode 14 adalah standar yang paling umum dan reliable untuk trading harian. Untuk swing trading gunakan ATR periode 20 atau 50 di timeframe harian.'},{q:'Kenapa stop loss berbasis ATR lebih baik dari stop loss tetap?',a:'Stop loss tetap (misalnya selalu 20 pips) tidak mempertimbangkan kondisi pasar. Saat pasar volatile, 20 pips terlalu ketat dan sering terkena. Saat pasar sepi, 20 pips terlalu longgar. ATR menyesuaikan stop loss dengan kondisi pasar aktual.'},{q:'Apakah ATR berubah setiap hari?',a:'Ya, ATR berubah setiap sesi trading karena menghitung pergerakan rata-rata dalam periode tertentu. Selalu gunakan nilai ATR terkini dari chart kamu saat merencanakan trade.'}]}
    related={[{name:'Risk Manager',href:'/trading/risk-manager',desc:'Hitung ukuran posisi setelah mendapat SL dari Stop Loss Optimizer'},{name:'Trade Analyzer',href:'/trading/trade-analyzer',desc:'Analisis R/R ratio menggunakan SL yang sudah dioptimalkan'},{name:'Max Loss Guardian',href:'/trading/max-loss-guardian',desc:'Pastikan total risiko hari ini masih dalam batas aman'},{name:'Drawdown Recovery Planner',href:'/trading/drawdown-recovery-planner',desc:'Rencanakan recovery jika serangkaian trade mengalami loss'}]}
    references={['Wilder, J.W. (1978). <em>New Concepts in Technical Trading Systems.</em> Trend Research.','LeBeau, C. & Lucas, D. (1992). <em>Technical Traders Guide to Computer Analysis of the Futures Market.</em> Business One Irwin.','Pring, M.J. (2002). <em>Technical Analysis Explained.</em> McGraw-Hill.']}
  ><StopLossOptimizer /></TradingToolPage></main><Footer /></>)
}
