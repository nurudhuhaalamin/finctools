import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ArrowRight, TrendingUp } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
export const metadata: Metadata = { title: 'Tools Investasi — DCA, Obligasi, Emas & Dividen | FincTools', description: '8 tools investasi gratis: DCA Simulator, SBN Planner, Bond Yield, Gold DCA, Gold vs Inflasi, Dividend Projector, dan DRIP Simulator.' }
const tools = [
  { name:'DCA Simulator', slug:'dca-simulator', desc:'Simulasi Dollar Cost Averaging untuk reksa dana, saham, dan aset apapun', badge:'Populer' },
  { name:'SBN Maturity Planner', slug:'sbn-maturity-planner', desc:'Kalkulasi imbal hasil SBN (ORI, SBR, Sukuk) hingga jatuh tempo' },
  { name:'Coupon Income Planner', slug:'coupon-income-planner', desc:'Proyeksi penghasilan dari kupon obligasi per pembayaran dan per tahun' },
  { name:'Bond Yield Analyzer', slug:'bond-yield-analyzer', desc:'Hitung Current Yield dan YTM obligasi berdasarkan harga pasar' },
  { name:'Gold DCA Simulator', slug:'gold-dca-simulator', desc:'Simulasi DCA investasi emas — hitung gram yang terkumpul dan proyeksi nilai' },
  { name:'Gold vs Inflation Analyzer', slug:'gold-vs-inflation-analyzer', desc:'Bandingkan return emas terhadap inflasi untuk mengukur return riil' },
  { name:'Dividend Income Projector', slug:'dividend-income-projector', desc:'Proyeksi penghasilan dividen tahunan dan kumulatif dengan asumsi pertumbuhan' },
  { name:'DRIP Simulator', slug:'drip-simulator', desc:'Simulasi reinvestasi dividen otomatis dan dampaknya terhadap pertumbuhan portofolio' },
]
export default function InvestasiPage() {
  return (<><Header /><main className="mx-auto max-w-4xl px-4 py-8">
    <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6"><Link href="/" className="hover:text-finc-green transition-colors">Home</Link><ChevronRight size={12}/><span className="text-[--text-primary] font-medium">Investasi</span></nav>
    <div className="flex items-start gap-4 mb-8">
      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl"><TrendingUp size={24} className="text-emerald-500"/></div>
      <div>
        <h1 className="font-heading text-2xl font-bold text-[--text-primary] mb-1">Tools Investasi</h1>
        <p className="text-sm text-[--text-secondary]">{tools.length} tools simulasi investasi — DCA, obligasi, emas, dan dividen</p>
      </div>
    </div>
    <div className="grid sm:grid-cols-2 gap-3">
      {tools.map(t=>(
        <Link key={t.slug} href={`/investasi/${t.slug}`} className="finc-card-hover group">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-semibold text-[--text-primary] group-hover:text-finc-green transition-colors">{t.name}</p>
                {t.badge && <span className="text-2xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full">{t.badge}</span>}
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
