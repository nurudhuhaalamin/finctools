import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ArrowRight, Home } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
export const metadata: Metadata = { title: 'Tools Kredit & Properti | FincTools', description: '6 tools kredit dan properti: Loan Cost, Refinancing, Buy vs Rent, KPR, Rental Yield, Property Investment.' }
const tools = [
  { name:'Loan True Cost Analyzer', slug:'loan-true-cost-analyzer', desc:'Hitung total biaya pinjaman flat vs efektif — temukan biaya sebenarnya' },
  { name:'Refinancing Decision Tool', slug:'refinancing-decision-tool', desc:'Analisis apakah refinancing KPR menguntungkan berdasarkan break-even' },
  { name:'Buy vs Rent Analyzer', slug:'buy-vs-rent-analyzer', desc:'Perbandingan finansial beli properti vs sewa dalam jangka panjang' },
  { name:'KPR Affordability Checker', slug:'kpr-affordability-checker', desc:'Cek kemampuan cicilan KPR berdasarkan penghasilan dan DTI ratio' },
  { name:'Rental Yield Analyzer', slug:'rental-yield-analyzer', desc:'Hitung gross yield, net yield, dan total return investasi properti sewa' },
  { name:'Property Investment Analyzer', slug:'property-investment-analyzer', desc:'Analisis cash flow, cap rate, dan CoC return investasi properti' },
]
export default function KreditPage() {
  return (<><Header /><main className="mx-auto max-w-4xl px-4 py-8">
    <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6"><Link href="/" className="hover:text-finc-green transition-colors">Home</Link><ChevronRight size={12}/><span className="text-[--text-primary] font-medium">Kredit & Properti</span></nav>
    <div className="flex items-start gap-4 mb-8">
      <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-xl"><Home size={24} className="text-orange-500"/></div>
      <div><h1 className="font-heading text-2xl font-bold text-[--text-primary] mb-1">Kredit & Properti</h1><p className="text-sm text-[--text-secondary]">{tools.length} tools analisis kredit dan investasi properti</p></div>
    </div>
    <div className="grid sm:grid-cols-2 gap-3">
      {tools.map(t=><Link key={t.slug} href={`/kredit-properti/${t.slug}`} className="finc-card-hover group"><div className="flex items-start justify-between gap-2"><div><p className="text-sm font-semibold text-[--text-primary] group-hover:text-finc-green transition-colors mb-1">{t.name}</p><p className="text-xs text-[--text-secondary] leading-relaxed">{t.desc}</p></div><ArrowRight size={14} className="shrink-0 text-[--text-secondary] group-hover:text-finc-green group-hover:translate-x-0.5 transition-all mt-0.5"/></div></Link>)}
    </div>
  </main><Footer /></>)
}
