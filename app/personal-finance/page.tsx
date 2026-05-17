import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ArrowRight, Wallet } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
export const metadata: Metadata = { title: 'Tools Personal Finance | FincTools', description: '8 tools perencanaan keuangan pribadi: FIRE Planner, Dana Darurat, Inflasi, Budget, Hutang, Net Worth, Tabungan, dan Goal Planner.' }
const tools = [
  { name:'Wealth Freedom Planner', slug:'wealth-freedom-planner', desc:'Hitung angka FIRE dan kapan kamu bisa mencapai kebebasan finansial' },
  { name:'Emergency Shield Builder', slug:'emergency-shield-builder', desc:'Kalkulasi dana darurat ideal dan berapa lama untuk mencapainya' },
  { name:'Inflation Guard', slug:'inflation-guard', desc:'Proyeksi penurunan daya beli uang akibat inflasi' },
  { name:'Budget Architect', slug:'budget-architect', desc:'Rencanakan anggaran dengan aturan 50-30-20 yang fleksibel' },
  { name:'Debt Destroyer', slug:'debt-destroyer', desc:'Strategi pelunasan utang Avalanche vs Snowball' },
  { name:'Net Worth Tracker', slug:'net-worth-tracker', desc:'Kalkulasi kekayaan bersih dari total aset dikurangi liabilitas' },
  { name:'Savings Growth Simulator', slug:'savings-growth-simulator', desc:'Proyeksi pertumbuhan tabungan dengan bunga majemuk' },
  { name:'Goal Achiever Planner', slug:'goal-achiever-planner', desc:'Hitung tabungan per bulan yang dibutuhkan untuk tujuan tertentu' },
]
export default function PFPage() {
  return (<><Header /><main className="mx-auto max-w-4xl px-4 py-8">
    <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6"><Link href="/" className="hover:text-finc-green transition-colors">Home</Link><ChevronRight size={12}/><span className="text-[--text-primary] font-medium">Personal Finance</span></nav>
    <div className="flex items-start gap-4 mb-8">
      <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl"><Wallet size={24} className="text-blue-500"/></div>
      <div><h1 className="font-heading text-2xl font-bold text-[--text-primary] mb-1">Personal Finance</h1><p className="text-sm text-[--text-secondary]">{tools.length} tools perencanaan keuangan pribadi</p></div>
    </div>
    <div className="grid sm:grid-cols-2 gap-3">
      {tools.map(t=><Link key={t.slug} href={`/personal-finance/${t.slug}`} className="finc-card-hover group"><div className="flex items-start justify-between gap-2"><div><p className="text-sm font-semibold text-[--text-primary] group-hover:text-finc-green transition-colors mb-1">{t.name}</p><p className="text-xs text-[--text-secondary] leading-relaxed">{t.desc}</p></div><ArrowRight size={14} className="shrink-0 text-[--text-secondary] group-hover:text-finc-green group-hover:translate-x-0.5 transition-all mt-0.5"/></div></Link>)}
    </div>
  </main><Footer /></>)
}
