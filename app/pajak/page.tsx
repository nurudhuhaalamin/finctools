import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ArrowRight, FileText } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
export const metadata: Metadata = { title: 'Tools Pajak — Kalkulator PPh, PPN, Zakat & UMKM | FincTools', description: '7 tools pajak gratis: Tax Optimizer PPh 21, THR Tax Planner, Freelancer Tax, Investment Tax, Zakat, UMKM Tax, dan PPN Tracker.' }
const tools = [
  { name:'Tax Optimizer PPh 21', slug:'tax-optimizer-pph21', desc:'Hitung PPh 21 bulanan karyawan berdasarkan gaji, tunjangan, dan status PTKP', badge:'Populer' },
  { name:'THR Tax Planner', slug:'thr-tax-planner', desc:'Hitung pajak yang dipotong dari THR dan berapa yang kamu terima bersih' },
  { name:'Freelancer Tax Estimator', slug:'freelancer-tax-estimator', desc:'Estimasi PPh untuk pekerja lepas menggunakan norma penghitungan penghasilan neto' },
  { name:'Investment Tax Report Generator', slug:'investment-tax-report-generator', desc:'Hitung total pajak dari saham, deposito, obligasi, dan dividen dalam satu laporan' },
  { name:'Zakat & Tax Planner', slug:'zakat-tax-planner', desc:'Kalkulasi zakat mal dan zakat penghasilan berdasarkan nisab emas terkini' },
  { name:'UMKM Tax Estimator', slug:'umkm-tax-estimator', desc:'Hitung PPh Final 0.5% untuk UMKM perorangan dengan batas bebas Rp 500 juta' },
  { name:'PPN Tracker', slug:'ppn-tracker', desc:'Kalkulasi PPN 11% — pisahkan DPP dari harga inklusif atau tambahkan ke harga eksklusif' },
]
export default function PajakPage() {
  return (<><Header /><main className="mx-auto max-w-4xl px-4 py-8">
    <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6">
      <Link href="/" className="hover:text-finc-green transition-colors">Home</Link>
      <ChevronRight size={12}/><span className="text-[--text-primary] font-medium">Pajak</span>
    </nav>
    <div className="flex items-start gap-4 mb-8">
      <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-xl"><FileText size={24} className="text-purple-500"/></div>
      <div>
        <h1 className="font-heading text-2xl font-bold text-[--text-primary] mb-1">Tools Pajak</h1>
        <p className="text-sm text-[--text-secondary]">{tools.length} tools kalkulasi pajak — PPh 21, THR, freelancer, investasi, zakat, UMKM, dan PPN</p>
      </div>
    </div>
    <div className="grid sm:grid-cols-2 gap-3">
      {tools.map(t=>(
        <Link key={t.slug} href={`/pajak/${t.slug}`} className="finc-card-hover group">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-semibold text-[--text-primary] group-hover:text-finc-green transition-colors">{t.name}</p>
                {t.badge && <span className="text-2xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 px-2 py-0.5 rounded-full">{t.badge}</span>}
              </div>
              <p className="text-xs text-[--text-secondary] leading-relaxed">{t.desc}</p>
            </div>
            <ArrowRight size={14} className="shrink-0 text-[--text-secondary] group-hover:text-finc-green group-hover:translate-x-0.5 transition-all mt-0.5"/>
          </div>
        </Link>
      ))}
    </div>
  </main><Footer /></>)
}
