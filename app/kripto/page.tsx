import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ArrowRight, Coins } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
export const metadata: Metadata = { title: 'Tools Kripto | FincTools', description: '5 tools kripto: DCA, Staking Reward, Risk Manager, Liquidation Price, dan Funding Rate.' }
const tools = [
  { name:'Crypto DCA Simulator', slug:'crypto-dca-simulator', desc:'Simulasi DCA aset kripto — hitung koin terkumpul dan nilai di target harga' },
  { name:'Staking Reward Projector', slug:'staking-reward-projector', desc:'Proyeksi reward staking berdasarkan APY dan durasi holding' },
  { name:'Crypto Risk Manager', slug:'crypto-risk-manager', desc:'Position sizing untuk trading kripto berdasarkan modal dan risiko per trade' },
  { name:'Liquidation Price Analyzer', slug:'liquidation-price-analyzer', desc:'Kalkulasi harga likuidasi posisi futures berdasarkan leverage yang digunakan' },
  { name:'Funding Rate Cost Estimator', slug:'funding-rate-cost-estimator', desc:'Estimasi biaya funding rate untuk posisi futures yang dipegang beberapa hari' },
]
export default function KriptoPage() {
  return (<><Header /><main className="mx-auto max-w-4xl px-4 py-8">
    <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6"><Link href="/" className="hover:text-finc-green transition-colors">Home</Link><ChevronRight size={12}/><span className="text-[--text-primary] font-medium">Kripto</span></nav>
    <div className="flex items-start gap-4 mb-8">
      <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-xl"><Coins size={24} className="text-yellow-500"/></div>
      <div><h1 className="font-heading text-2xl font-bold text-[--text-primary] mb-1">Tools Kripto</h1><p className="text-sm text-[--text-secondary]">{tools.length} tools khusus aset kripto</p></div>
    </div>
    <div className="grid sm:grid-cols-2 gap-3">
      {tools.map(t=><Link key={t.slug} href={`/kripto/${t.slug}`} className="finc-card-hover group"><div className="flex items-start justify-between gap-2"><div><p className="text-sm font-semibold text-[--text-primary] group-hover:text-finc-green transition-colors mb-1">{t.name}</p><p className="text-xs text-[--text-secondary] leading-relaxed">{t.desc}</p></div><ArrowRight size={14} className="shrink-0 text-[--text-secondary] group-hover:text-finc-green group-hover:translate-x-0.5 transition-all mt-0.5"/></div></Link>)}
    </div>
  </main><Footer /></>)
}
