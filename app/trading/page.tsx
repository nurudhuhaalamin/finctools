import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ArrowRight, Activity } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Tools Trading — Manajemen Risiko & Analisis Performa',
  description: '13 tools trading gratis: Risk Manager, Trade Analyzer, Position Sizing, Win Rate, Drawdown Recovery, Pip Calculator, dan lainnya.',
}

const tools = [
  {
    name: 'Risk Manager',
    slug: 'risk-manager',
    desc: 'Hitung ukuran posisi trading optimal berdasarkan modal dan risiko per trade',
    badge: 'Populer',
  },
  { name: 'Trade Analyzer',              slug: 'trade-analyzer',              desc: 'Analisis kelayakan trade berdasarkan Risk/Reward ratio sebelum eksekusi' },
  { name: 'Stop Loss Optimizer',         slug: 'stop-loss-optimizer',         desc: 'Penentuan level stop loss optimal berdasarkan volatilitas' },
  { name: 'Max Loss Guardian',           slug: 'max-loss-guardian',           desc: 'Hitung batas kerugian harian dan mingguan yang aman' },
  { name: 'Trading Performance Analyzer',slug: 'trading-performance-analyzer',desc: 'Analisis statistik performa trading keseluruhan' },
  { name: 'Win Rate & Expectancy Tracker',slug: 'win-rate-expectancy-tracker',desc: 'Kalkulasi expectancy dan profitabilitas strategi trading' },
  { name: 'Drawdown Recovery Planner',   slug: 'drawdown-recovery-planner',   desc: 'Simulasikan berapa trade untuk recovery setelah drawdown' },
  { name: 'Pip & Profit Analyzer',       slug: 'pip-profit-analyzer',         desc: 'Kalkulasi nilai pip dan potensi profit/loss per trade' },
  { name: 'Margin & Leverage Guard',     slug: 'margin-leverage-guard',       desc: 'Kalkulasi kebutuhan margin dan dampak leverage' },
  { name: 'Swap Cost Estimator',         slug: 'swap-cost-estimator',         desc: 'Estimasi biaya swap dan rollover untuk posisi overnight' },
  { name: 'Kelly Criterion Optimizer',   slug: 'kelly-criterion-optimizer',   desc: 'Position sizing optimal berbasis probabilitas Kelly' },
  { name: 'Probability of Ruin Analyzer',slug: 'probability-of-ruin-analyzer',desc: 'Probabilitas bangkrut berdasarkan win rate dan R/R' },
  { name: 'Streak Analyzer',             slug: 'streak-analyzer',             desc: 'Probabilitas terjadinya serial win atau loss beruntun' },
]

export default function TradingPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6">
          <Link href="/" className="hover:text-finc-green transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-[--text-primary] font-medium">Trading</span>
        </nav>

        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-xl">
            <Activity size={24} className="text-red-500" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-[--text-primary] mb-1">
              Tools Trading
            </h1>
            <p className="text-sm text-[--text-secondary]">
              {tools.length} tools manajemen risiko, position sizing, dan analisis performa trading
            </p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 gap-3">
          {tools.map(t => (
            <Link key={t.slug} href={`/trading/${t.slug}`}
              className="finc-card-hover group">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-[--text-primary]
                                  group-hover:text-finc-green transition-colors">
                      {t.name}
                    </p>
                    {t.badge && (
                      <span className="text-2xs font-medium text-finc-green
                                       bg-finc-green/10 px-2 py-0.5 rounded-full">
                        {t.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[--text-secondary] leading-relaxed">{t.desc}</p>
                </div>
                <ArrowRight size={14} className="shrink-0 text-[--text-secondary]
                                                  group-hover:text-finc-green
                                                  group-hover:translate-x-0.5 transition-all mt-0.5" />
              </div>
            </Link>
          ))}
        </div>

      </main>
      <Footer />
    </>
  )
}
