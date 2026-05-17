import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ArrowRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import RiskManager from '@/components/tools/trading/RiskManager'

/* ─── SEO Metadata ─── */
export const metadata: Metadata = {
  title: 'Risk Manager — Hitung Ukuran Posisi Trading Optimal',
  description:
    'Risk Manager adalah tool kalkulasi ukuran posisi trading berdasarkan modal, persentase risiko, dan stop loss. Hitung lot size secara akurat dan real-time.',
  keywords: ['risk manager trading', 'position sizing', 'lot size calculator', 'kalkulasi risiko trading', 'manajemen risiko forex'],
  openGraph: {
    title: 'Risk Manager | FincTools',
    description: 'Hitung ukuran posisi trading optimal berdasarkan modal dan risiko per trade.',
  },
}

/* ─── Related Tools ─── */
const relatedTools = [
  {
    name: 'Trade Analyzer',
    href: '/trading/trade-analyzer',
    desc: 'Evaluasi kelayakan trade berdasarkan Risk/Reward ratio sebelum eksekusi',
  },
  {
    name: 'Stop Loss Optimizer',
    href: '/trading/stop-loss-optimizer',
    desc: 'Tentukan level stop loss optimal berdasarkan volatilitas dan struktur harga',
  },
  {
    name: 'Drawdown Recovery Planner',
    href: '/trading/drawdown-recovery-planner',
    desc: 'Simulasikan berapa trade yang dibutuhkan untuk recovery setelah drawdown',
  },
  {
    name: 'Win Rate & Expectancy Tracker',
    href: '/trading/win-rate-expectancy-tracker',
    desc: 'Hitung expectancy keseluruhan strategi trading berdasarkan data historis',
  },
]

/* ─── FAQ Data ─── */
const faqs = [
  {
    q: 'Berapa persentase risiko per trade yang ideal?',
    a: 'Standar industri adalah 1–2% per trade. Dengan risiko 1%, dibutuhkan 100 kekalahan beruntun untuk menghabiskan modal — skenario yang hampir mustahil terjadi. Trader profesional umumnya tidak melebihi 2% per trade.',
  },
  {
    q: 'Apakah Risk Manager cocok untuk semua instrumen trading?',
    a: 'Ya. Formula position sizing berlaku untuk saham, forex, kripto, dan futures, selama stop loss dapat didefinisikan dengan jelas dalam satuan pips atau poin.',
  },
  {
    q: 'Bagaimana jika hasil perhitungan menghasilkan lot di bawah 0.01?',
    a: 'Artinya risiko per trade kamu terlalu kecil untuk ukuran lot minimum broker. Solusinya: tambah modal, perbesar persentase risiko, atau perkecil jarak stop loss. Jangan memaksakan trade jika tidak memenuhi minimum lot.',
  },
  {
    q: 'Apa itu pip value dan bagaimana cara mengetahuinya?',
    a: 'Pip value adalah nilai perubahan harga sebesar 1 pip dalam mata uang akun kamu per 0.01 lot. Untuk pasangan EUR/USD dengan akun USD dan leverage 1:100, pip value standar ≈ $0.10 per 0.01 lot. Cek di platform trading atau tanya broker kamu.',
  },
  {
    q: 'Kenapa trader profesional menggunakan Half Kelly bukan Full Kelly?',
    a: 'Full Kelly mengoptimalkan pertumbuhan modal secara matematis, namun menghasilkan drawdown yang sangat besar. Half Kelly (setengah dari hasil Kelly Criterion) memberikan 75% pertumbuhan dengan drawdown yang jauh lebih kecil — trade-off yang lebih realistis.',
  },
]

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function RiskManagerPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Risk Manager',
        url: 'https://finctools.com/trading/risk-manager',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'IDR' },
        description: 'Tool kalkulasi ukuran posisi trading berdasarkan modal, risiko, dan stop loss.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://finctools.com' },
          { '@type': 'ListItem', position: 2, name: 'Trading', item: 'https://finctools.com/trading' },
          { '@type': 'ListItem', position: 3, name: 'Risk Manager', item: 'https://finctools.com/trading/risk-manager' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-8">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6">
          <Link href="/"        className="hover:text-finc-green transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/trading" className="hover:text-finc-green transition-colors">Trading</Link>
          <ChevronRight size={12} />
          <span className="text-[--text-primary] font-medium">Risk Manager</span>
        </nav>

        {/* ── Header ── */}
        <div className="mb-8">
          <div className="inline-flex items-center text-xs font-medium text-red-600
                          dark:text-red-400 bg-red-50 dark:bg-red-950/30
                          border border-red-100 dark:border-red-900
                          rounded-full px-3 py-1 mb-3">
            Trading · Manajemen Risiko
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-[--text-primary] mb-2">
            Risk Manager
          </h1>
          <p className="text-[--text-secondary] leading-relaxed max-w-xl">
            Risk Manager adalah tool yang menghitung ukuran posisi trading optimal berdasarkan
            tiga variabel utama: modal akun, persentase risiko per trade, dan jarak stop loss.
            Hasilnya real-time — ubah angka, lot size langsung berubah.
          </p>
        </div>

        {/* ── TOOL ── */}
        <div className="finc-card mb-10">
          <RiskManager />
        </div>

        {/* ── Cara Menggunakan ── */}
        <section className="mb-10">
          <h2 className="font-heading text-xl font-bold text-[--text-primary] mb-4">
            Cara Menggunakan Risk Manager
          </h2>
          <div className="space-y-3">
            {[
              { n: '1', t: 'Isi Modal Akun', d: 'Masukkan total modal trading kamu saat ini dalam Rupiah.' },
              { n: '2', t: 'Tentukan Risiko per Trade', d: 'Geser slider ke persentase risiko yang kamu toleransi. Rekomendasi: 1–2% untuk trading konsisten.' },
              { n: '3', t: 'Isi Jarak Stop Loss', d: 'Masukkan jarak stop loss dari entry price dalam satuan pips sesuai setup trading kamu.' },
              { n: '4', t: 'Isi Pip Value', d: 'Nilai per pip per 0.01 lot dalam Rupiah. Cek di platform trading atau tanya broker kamu.' },
              { n: '5', t: 'Baca Hasilnya', d: 'Ukuran posisi optimal muncul secara real-time. Warna hijau berarti risiko aman, kuning moderat, merah terlalu agresif.' },
            ].map(s => (
              <div key={s.n} className="flex gap-4 finc-card py-3">
                <div className="w-7 h-7 rounded-full bg-finc-green/10 text-finc-green
                               text-sm font-bold flex items-center justify-center shrink-0">
                  {s.n}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[--text-primary]">{s.t}</p>
                  <p className="text-xs text-[--text-secondary] mt-0.5">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Rumus & Logika ── */}
        <section className="mb-10">
          <h2 className="font-heading text-xl font-bold text-[--text-primary] mb-4">
            Rumus & Logika Perhitungan
          </h2>
          <div className="finc-card bg-navy-900 dark:bg-navy-950 text-white mb-4">
            <p className="text-xs text-slate-400 mb-2 font-mono">Formula</p>
            <p className="font-mono text-finc-green text-sm leading-relaxed">
              Lot Size = (Modal × % Risiko) ÷ (Stop Loss × Pip Value) × 0.01
            </p>
          </div>
          <div className="space-y-2 text-sm text-[--text-secondary]">
            {[
              { v: 'Modal', d: 'Total modal akun trading (Rupiah)' },
              { v: '% Risiko', d: 'Persentase modal yang siap dirisiko per trade' },
              { v: 'Stop Loss', d: 'Jarak stop loss dari entry price (pips)' },
              { v: 'Pip Value', d: 'Nilai 1 pip per 0.01 lot dalam Rupiah' },
              { v: 'Lot Size', d: 'Ukuran posisi optimal yang dihasilkan' },
            ].map(r => (
              <div key={r.v} className="flex gap-3">
                <code className="text-finc-green font-mono text-xs bg-finc-green/10 px-2 py-0.5 rounded shrink-0 h-fit">{r.v}</code>
                <span className="text-xs leading-relaxed">{r.d}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Sejarah Konsep ── */}
        <section className="mb-10">
          <h2 className="font-heading text-xl font-bold text-[--text-primary] mb-3">
            Sejarah & Asal-usul Position Sizing
          </h2>
          <div className="prose prose-sm max-w-none text-[--text-secondary] space-y-3">
            <p>
              Konsep position sizing dalam trading modern berakar dari teori manajemen modal
              yang dikembangkan oleh matematikawan <strong className="text-[--text-primary]">John L. Kelly Jr.</strong> di
              Bell Labs pada 1956. Formula Kelly, yang awalnya dirancang untuk optimasi
              transmisi sinyal telepon, kemudian diadaptasi oleh <strong className="text-[--text-primary]">Edward Thorp</strong> ke
              dunia perjudian dan investasi melalui bukunya <em>Beat the Dealer</em> (1962).
            </p>
            <p>
              Dalam dunia trading modern, position sizing dipopulerkan oleh
              <strong className="text-[--text-primary]"> Van K. Tharp</strong> melalui buku <em>Trade Your Way to Financial Freedom</em> (1998).
              Tharp berargumen bahwa position sizing — bukan sistem entry atau exit — adalah
              faktor paling menentukan dalam profitabilitas jangka panjang seorang trader.
            </p>
            <p>
              Formula yang digunakan Risk Manager FincTools mengikuti pendekatan Fixed
              Fractional Position Sizing: setiap trade mengambil risiko dengan persentase tetap
              dari modal, sehingga ukuran lot otomatis menyesuaikan saat modal bertumbuh atau menyusut.
            </p>
          </div>
        </section>

        {/* ── Interpretasi ── */}
        <section className="mb-10">
          <h2 className="font-heading text-xl font-bold text-[--text-primary] mb-4">
            Cara Membaca Hasil
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[--border]">
                  <th className="text-left py-2 pr-4 text-xs font-semibold text-[--text-secondary]">Risiko per Trade</th>
                  <th className="text-left py-2 pr-4 text-xs font-semibold text-[--text-secondary]">Kategori</th>
                  <th className="text-left py-2 text-xs font-semibold text-[--text-secondary]">Cocok untuk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[--border]">
                {[
                  { r: '< 1%',  k: '🟢 Sangat Konservatif', c: 'Pemula atau modal besar' },
                  { r: '1–2%',  k: '🟢 Konservatif',        c: 'Standar trader profesional' },
                  { r: '2–3%',  k: '🟡 Moderat',            c: 'Win rate di atas 55%' },
                  { r: '3–5%',  k: '🔴 Agresif',            c: 'Strategi jangka pendek' },
                  { r: '> 5%',  k: '🔴 Sangat Agresif',     c: 'Tidak disarankan' },
                ].map(row => (
                  <tr key={row.r}>
                    <td className="py-2.5 pr-4 font-mono text-xs text-finc-green">{row.r}</td>
                    <td className="py-2.5 pr-4 text-xs text-[--text-primary]">{row.k}</td>
                    <td className="py-2.5 text-xs text-[--text-secondary]">{row.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-10">
          <h2 className="font-heading text-xl font-bold text-[--text-primary] mb-4">
            Pertanyaan Umum
          </h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="finc-card group">
                <summary className="cursor-pointer text-sm font-semibold
                                    text-[--text-primary] list-none flex
                                    items-start justify-between gap-3">
                  {f.q}
                  <span className="text-finc-green shrink-0 text-lg leading-none
                                   group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-[--text-secondary] leading-relaxed border-t border-[--border] pt-3">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Related Tools ── */}
        <section className="mb-10">
          <h2 className="font-heading text-xl font-bold text-[--text-primary] mb-4">
            Tools Terkait
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {relatedTools.map(t => (
              <Link key={t.href} href={t.href}
                className="finc-card-hover group">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-[--text-primary]
                                  group-hover:text-finc-green transition-colors mb-1">
                      {t.name}
                    </p>
                    <p className="text-xs text-[--text-secondary] leading-relaxed">{t.desc}</p>
                  </div>
                  <ArrowRight size={14} className="shrink-0 text-[--text-secondary]
                                                    group-hover:text-finc-green
                                                    group-hover:translate-x-0.5 transition-all mt-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Referensi ── */}
        <section className="mb-6">
          <h2 className="font-heading text-xl font-bold text-[--text-primary] mb-3">
            Referensi
          </h2>
          <ul className="space-y-1.5 text-xs text-[--text-secondary]">
            <li>Kelly, J.L. (1956). <em>A New Interpretation of Information Rate.</em> Bell System Technical Journal, 35(4).</li>
            <li>Thorp, E.O. (1962). <em>Beat the Dealer.</em> Vintage Books.</li>
            <li>Tharp, V.K. (1998). <em>Trade Your Way to Financial Freedom.</em> McGraw-Hill.</li>
            <li>OJK. <em>Panduan Literasi Keuangan.</em>{' '}
              <a href="https://ojk.go.id" target="_blank" rel="noopener noreferrer"
                className="text-finc-green hover:underline">ojk.go.id</a>
            </li>
          </ul>
        </section>

      </main>

      <Footer />
    </>
  )
}
