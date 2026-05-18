import Link from 'next/link'
import {
  Wallet, Home, FileText, TrendingUp,
  BarChart2, Activity, Coins,
  ArrowRight, Shield, Zap, RefreshCw, BookOpen,
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ArticleCard from '@/components/blog/ArticleCard'
import { getArtikelTerbaru } from '@/lib/blog/articles'

/* ─── Data ─── */
const categories = [
  {
    name: 'Personal Finance',
    slug: 'personal-finance',
    description: 'Rencanakan kebebasan finansial dan kelola keuangan pribadi',
    icon: Wallet,
    count: 8,
    color: 'bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900',
    iconColor: 'text-blue-600 dark:text-blue-400',
    featured: ['Wealth Freedom Planner', 'Budget Architect', 'Debt Destroyer'],
  },
  {
    name: 'Kredit & Properti',
    slug: 'kredit-properti',
    description: 'Analisis pinjaman, KPR, dan investasi properti secara akurat',
    icon: Home,
    count: 6,
    color: 'bg-orange-50 dark:bg-orange-950/30 border-orange-100 dark:border-orange-900',
    iconColor: 'text-orange-600 dark:text-orange-400',
    featured: ['KPR Affordability Checker', 'Buy vs Rent Analyzer', 'Rental Yield Analyzer'],
  },
  {
    name: 'Pajak',
    slug: 'pajak',
    description: 'Estimasi dan optimasi PPh, PPN, zakat, dan pajak investasi',
    icon: FileText,
    count: 7,
    color: 'bg-purple-50 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900',
    iconColor: 'text-purple-600 dark:text-purple-400',
    featured: ['Tax Optimizer PPh 21', 'THR Tax Planner', 'UMKM Tax Estimator'],
  },
  {
    name: 'Investasi',
    slug: 'investasi',
    description: 'Simulasi DCA, obligasi, emas, dan proyeksi dividen',
    icon: TrendingUp,
    count: 8,
    color: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    featured: ['DCA Simulator', 'Dividend Income Projector', 'DRIP Simulator'],
  },
  {
    name: 'Saham',
    slug: 'saham',
    description: 'Strategi beli, averaging, dan analisis break-even saham',
    icon: BarChart2,
    count: 3,
    color: 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    featured: ['Averaging Strategy Builder', 'Break-even Analyzer', 'Entry Price Optimizer'],
  },
  {
    name: 'Trading',
    slug: 'trading',
    description: 'Manajemen risiko, position sizing, dan analisis performa trading',
    icon: Activity,
    count: 13,
    color: 'bg-red-50 dark:bg-red-950/30 border-red-100 dark:border-red-900',
    iconColor: 'text-red-600 dark:text-red-400',
    featured: ['Risk Manager', 'Trade Analyzer', 'Kelly Criterion Optimizer'],
  },
  {
    name: 'Kripto',
    slug: 'kripto',
    description: 'DCA, staking, liquidation, dan tools khusus aset kripto',
    icon: Coins,
    count: 5,
    color: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-100 dark:border-yellow-900',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    featured: ['Crypto DCA Simulator', 'Liquidation Price Analyzer', 'Staking Reward Projector'],
  },
]

const featuredTools = [
  { name: 'Risk Manager',           category: 'Trading',         slug: 'trading/risk-manager',            desc: 'Hitung ukuran posisi optimal berdasarkan modal dan risiko per trade' },
  { name: 'DCA Simulator',          category: 'Investasi',        slug: 'investasi/dca-simulator',          desc: 'Simulasi strategi Dollar Cost Averaging untuk berbagai aset' },
  { name: 'Tax Optimizer PPh 21',   category: 'Pajak',            slug: 'pajak/tax-optimizer-pph21',        desc: 'Kalkulasi PPh 21 karyawan secara akurat dan mudah' },
  { name: 'KPR Affordability Checker', category: 'Kredit & Properti', slug: 'kredit-properti/kpr-affordability-checker', desc: 'Cek kemampuan cicilan KPR berdasarkan penghasilan bersih' },
  { name: 'Wealth Freedom Planner', category: 'Personal Finance', slug: 'personal-finance/wealth-freedom-planner', desc: 'Hitung angka FIRE dan kapan kamu bisa pensiun dini' },
  { name: 'Kelly Criterion Optimizer', category: 'Trading',       slug: 'trading/kelly-criterion-optimizer', desc: 'Position sizing optimal berbasis probabilitas dan win rate historis' },
]

/* ─── Page ─── */
export default function HomePage() {
  const totalTools = categories.reduce((sum, c) => sum + c.count, 0)
  const artikelTerbaru = getArtikelTerbaru(3)

  return (
    <>
      <Header />

      <main>

        {/* ════ HERO ════ */}
        <section className="relative overflow-hidden bg-navy-900 dark:bg-navy-950 text-white">
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Emerald glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-finc-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

          <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
            <div className="max-w-2xl">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 text-xs font-medium text-finc-green border border-finc-green/30 rounded-full px-3 py-1 mb-6 bg-finc-green/10">
                <Zap size={11} />
                {totalTools} Tools Gratis · Tanpa Daftar
              </div>

              {/* Headline */}
              <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4">
                Tools Keuangan &{' '}
                <span className="text-finc-green">Investasi</span>{' '}
                untuk Keputusan yang Lebih Cerdas
              </h1>

              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                Semua kalkulasi berbasis logika dan matematika. Input data kamu, dapatkan hasil instan — tanpa akun, tanpa langganan.
              </p>

              {/* CTA */}
              <div className="flex flex-wrap gap-3">
                <Link href="/trading/risk-manager" className="finc-btn text-sm">
                  Coba Risk Manager <ArrowRight size={14} />
                </Link>
                <Link href="#kategori" className="finc-btn-ghost text-sm border border-white/20 text-white hover:bg-white/10 hover:text-white">
                  Lihat Semua Tools
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/10">
                {[
                  { value: `${totalTools}+`, label: 'Tools Tersedia' },
                  { value: '7',              label: 'Kategori'        },
                  { value: '100%',           label: 'Gratis'          },
                  { value: '0',              label: 'Data Disimpan'   },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-mono font-bold text-2xl text-finc-green">{s.value}</div>
                    <div className="text-xs text-slate-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════ KATEGORI ════ */}
        <section id="kategori" className="mx-auto max-w-6xl px-4 py-14">
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-[--text-primary] mb-1">
              Kategori Tools
            </h2>
            <p className="text-sm text-[--text-secondary]">
              Pilih kategori sesuai kebutuhan finansial kamu
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className={`group finc-card-hover border ${cat.color}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg bg-white/80 dark:bg-black/20 ${cat.iconColor}`}>
                      <Icon size={20} />
                    </div>
                    <span className={`text-xs font-mono font-semibold ${cat.iconColor} bg-white/60 dark:bg-black/20 px-2 py-0.5 rounded-full`}>
                      {cat.count} tools
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-[--text-primary] mb-1 group-hover:text-finc-green transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[--text-secondary] leading-relaxed mb-3">
                    {cat.description}
                  </p>

                  <div className="space-y-1">
                    {cat.featured.map((t) => (
                      <div key={t} className="flex items-center gap-1.5 text-xs text-[--text-secondary]">
                        <div className={`w-1 h-1 rounded-full shrink-0 ${cat.iconColor} opacity-60`} style={{ background: 'currentColor' }} />
                        {t}
                      </div>
                    ))}
                  </div>

                  <div className={`flex items-center gap-1 mt-4 text-xs font-semibold ${cat.iconColor} group-hover:gap-2 transition-all`}>
                    Lihat Semua <ArrowRight size={11} />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ════ FEATURED TOOLS ════ */}
        <section className="bg-[--surface-2] py-14">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-bold text-[--text-primary] mb-1">
                Tools Paling Populer
              </h2>
              <p className="text-sm text-[--text-secondary]">
                Mulai dari tools yang paling sering digunakan
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {featuredTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="finc-card-hover group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xs font-medium text-finc-green bg-finc-green/10 px-2 py-0.5 rounded-full">
                      {tool.category}
                    </span>
                    <ArrowRight size={13} className="text-[--text-secondary] group-hover:text-finc-green group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h3 className="font-heading font-semibold text-sm text-[--text-primary] mb-1 group-hover:text-finc-green transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-[--text-secondary] leading-relaxed">
                    {tool.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ════ WHY FINCTOOLS ════ */}
        <section className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="font-heading text-2xl font-bold text-[--text-primary] mb-8 text-center">
            Mengapa FincTools?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Kalkulasi Instan',
                desc: 'Tidak ada tombol submit. Input data, hasil langsung muncul secara real-time di browser kamu.',
              },
              {
                icon: Shield,
                title: 'Aman & Privat',
                desc: 'Semua kalkulasi berjalan di browser kamu. Tidak ada data yang dikirim atau disimpan ke server.',
              },
              {
                icon: RefreshCw,
                title: 'Selalu Update',
                desc: 'Formula dan tarif pajak diperbarui secara berkala mengikuti regulasi terbaru dari OJK dan DJP.',
              },
            ].map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="finc-card text-center">
                  <div className="inline-flex p-3 bg-finc-green/10 rounded-xl mb-3">
                    <Icon size={22} className="text-finc-green" />
                  </div>
                  <h3 className="font-heading font-bold text-[--text-primary] mb-2">{f.title}</h3>
                  <p className="text-sm text-[--text-secondary] leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ════ ARTIKEL TERBARU ════ */}
        <section className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-[--text-primary] mb-1">
                Artikel Terbaru
              </h2>
              <p className="text-sm text-[--text-secondary]">
                Panduan dan insight keuangan untuk investor Indonesia
              </p>
            </div>
            <Link href="/artikel"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium
                         text-finc-green hover:underline">
              <BookOpen size={14} />
              Semua Artikel
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {artikelTerbaru.map(a => (
              <ArticleCard key={a.slug} artikel={a} showKategori={true} />
            ))}
          </div>

          <div className="sm:hidden text-center">
            <Link href="/artikel" className="text-sm font-medium text-finc-green hover:underline">
              Lihat Semua Artikel →
            </Link>
          </div>
        </section>

        {/* ════ DISCLAIMER ════ */}
        <section className="mx-auto max-w-6xl px-4 pb-4">
          <div className="finc-disclaimer">
            <span className="shrink-0">⚠️</span>
            <span>
              Seluruh tools di FincTools hanya untuk tujuan edukasi dan kalkulasi.
              Bukan merupakan saran investasi atau nasihat keuangan profesional.
              Hasil kalkulasi dapat berbeda dengan kondisi pasar aktual.{' '}
              <Link href="/disclaimer" className="underline hover:text-finc-green">
                Baca disclaimer lengkap.
              </Link>
            </span>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
