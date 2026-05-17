import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ArrowRight, BarChart2 } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
export const metadata: Metadata = { title: 'Tools Saham | FincTools', description: '3 tools strategi saham: Averaging Strategy, Entry Price Optimizer, dan Break-even Analyzer.' }
const tools = [
  { name:'Averaging Strategy Builder', slug:'averaging-strategy-builder', desc:'Kalkulasi harga rata-rata setelah average down atau average up' },
  { name:'Entry Price Optimizer', slug:'entry-price-optimizer', desc:'Temukan lot optimal berdasarkan modal, risiko, stop loss, dan target profit' },
  { name:'Break-even Analyzer', slug:'break-even-analyzer', desc:'Harga jual minimum untuk balik modal setelah biaya fee broker' },
]
export default function SahamPage() {
  return (<><Header /><main className="mx-auto max-w-4xl px-4 py-8">
    <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6"><Link href="/" className="hover:text-finc-green transition-colors">Home</Link><ChevronRight size={12}/><span className="text-[--text-primary] font-medium">Saham</span></nav>
    <div className="flex items-start gap-4 mb-8">
      <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl"><BarChart2 size={24} className="text-indigo-500"/></div>
      <div><h1 className="font-heading text-2xl font-bold text-[--text-primary] mb-1">Tools Saham</h1><p className="text-sm text-[--text-secondary]">{tools.length} tools strategi beli saham</p></div>
    </div>
    <div className="grid sm:grid-cols-2 gap-3">
      {tools.map(t=><Link key={t.slug} href={`/saham/${t.slug}`} className="finc-card-hover group"><div className="flex items-start justify-between gap-2"><div><p className="text-sm font-semibold text-[--text-primary] group-hover:text-finc-green transition-colors mb-1">{t.name}</p><p className="text-xs text-[--text-secondary] leading-relaxed">{t.desc}</p></div><ArrowRight size={14} className="shrink-0 text-[--text-secondary] group-hover:text-finc-green group-hover:translate-x-0.5 transition-all mt-0.5"/></div></Link>)}
    </div>
  </main><Footer /></>)
}
