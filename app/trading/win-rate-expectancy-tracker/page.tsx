import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WinRateExpectancyTracker from '@/components/tools/trading/WinRateExpectancyTracker'

export const metadata: Metadata = {
  title: 'Win Rate & Expectancy Tracker | FincTools',
  description: 'Hitung expectancy per trade dan proyeksi profit bulanan berdasarkan win rate dan rata-rata P/L.',
}

const related = [
  { name: 'Risk Manager', href: '/trading/risk-manager' },
  { name: 'Trade Analyzer', href: '/trading/trade-analyzer' },
  { name: 'Win Rate & Expectancy', href: '/trading/win-rate-expectancy-tracker' },
  { name: 'Kelly Criterion', href: '/trading/kelly-criterion-optimizer' },
  { name: 'Drawdown Recovery', href: '/trading/drawdown-recovery-planner' },
]

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
          <span className="text-[--text-primary] font-medium">Win Rate & Expectancy Tracker</span>
        </nav>
        <div className="mb-8">
          <div className="inline-flex items-center text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 rounded-full px-3 py-1 mb-3">
            Trading · Manajemen Risiko
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-[--text-primary] mb-2">Win Rate & Expectancy Tracker</h1>
          <p className="text-[--text-secondary] leading-relaxed max-w-xl">Hitung expectancy per trade dan proyeksi profit bulanan berdasarkan win rate dan rata-rata P/L.</p>
        </div>
        <div className="finc-card mb-8">
          <WinRateExpectancyTracker />
        </div>
        <div className="finc-card bg-slate-50 dark:bg-slate-900/50">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-3">Tools Terkait</p>
          <div className="flex flex-wrap gap-2">
            {related.filter(t => !t.href.includes('win-rate-expectancy-tracker')).slice(0,4).map(t => (
              <Link key={t.href} href={t.href} className="text-xs font-medium text-finc-green border border-finc-green/30 bg-finc-green/5 hover:bg-finc-green/10 rounded-full px-3 py-1 transition-colors">
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
