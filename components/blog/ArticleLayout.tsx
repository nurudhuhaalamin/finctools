'use client'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock, Info, Lightbulb, AlertTriangle, XCircle, CheckSquare, TrendingUp, BarChart2, FileText, Wallet, Home, Bitcoin, Globe } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { Artikel, KontenBlock, KategoriArtikel } from '@/lib/blog/types'
import { kategoriConfig } from '@/lib/blog/types'

// ─── Icon map ────────────────────────────────────
const ikonKategori: Record<KategoriArtikel, React.ElementType> = {
  investasi: TrendingUp,
  'saham-bursa': BarChart2,
  trading: TrendingUp,
  pajak: FileText,
  'keuangan-pribadi': Wallet,
  properti: Home,
  kripto: Bitcoin,
  'ekonomi-pasar': Globe,
}

// ─── Component Renderers ─────────────────────────

function RenderParagraf({ text }: { text: string }) {
  return <p className="text-sm text-[--text-secondary] leading-relaxed my-4">{text}</p>
}

function RenderHeading({ level, text }: { level: 2 | 3; text: string }) {
  if (level === 2) return <h2 className="font-heading text-xl font-bold text-[--text-primary] mt-8 mb-3">{text}</h2>
  return <h3 className="font-heading text-base font-bold text-[--text-primary] mt-6 mb-2">{text}</h3>
}

function RenderCallout({ variant, judul, text }: { variant: string; judul?: string; text: string }) {
  const config = {
    info: { bg: 'bg-blue-50 dark:bg-blue-950/20', border: 'border-blue-200 dark:border-blue-800', icon: Info, iconCls: 'text-blue-500', textCls: 'text-blue-800 dark:text-blue-300' },
    tip: { bg: 'bg-emerald-50 dark:bg-emerald-950/20', border: 'border-emerald-200 dark:border-emerald-800', icon: Lightbulb, iconCls: 'text-emerald-500', textCls: 'text-emerald-800 dark:text-emerald-300' },
    warning: { bg: 'bg-amber-50 dark:bg-amber-950/20', border: 'border-amber-200 dark:border-amber-800', icon: AlertTriangle, iconCls: 'text-amber-500', textCls: 'text-amber-800 dark:text-amber-300' },
    danger: { bg: 'bg-red-50 dark:bg-red-950/20', border: 'border-red-200 dark:border-red-800', icon: XCircle, iconCls: 'text-red-500', textCls: 'text-red-800 dark:text-red-300' },
  }
  const c = config[variant as keyof typeof config] || config.info
  const Icon = c.icon
  return (
    <div className={`${c.bg} border ${c.border} rounded-xl p-4 my-4`}>
      <div className="flex items-start gap-3">
        <Icon size={16} className={`${c.iconCls} shrink-0 mt-0.5`} />
        <div>
          {judul && <p className={`text-xs font-bold ${c.textCls} mb-1`}>{judul}</p>}
          <p className={`text-sm ${c.textCls} leading-relaxed`}>{text}</p>
        </div>
      </div>
    </div>
  )
}

function RenderTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-4 rounded-xl border border-[--border]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[--border] bg-[--bg-secondary]">
            {headers.map(h => <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[--text-secondary]">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-[--border]">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-[--bg-secondary] transition-colors">
              {row.map((cell, j) => <td key={j} className="px-4 py-2.5 text-xs text-[--text-secondary]">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function RenderStepList({ steps }: { steps: { judul: string; desc: string }[] }) {
  return (
    <div className="my-4 space-y-3">
      {steps.map((s, i) => (
        <div key={i} className="flex gap-4 p-4 rounded-xl border border-[--border] bg-[--bg-card]">
          <div className="w-7 h-7 rounded-full bg-finc-green text-white text-xs font-bold
                           flex items-center justify-center shrink-0">{i + 1}</div>
          <div>
            <p className="text-sm font-semibold text-[--text-primary] mb-0.5">{s.judul}</p>
            <p className="text-xs text-[--text-secondary] leading-relaxed">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function RenderFormulaBox({ formula, contoh }: { formula: string; contoh?: string }) {
  return (
    <div className="my-4 rounded-xl overflow-hidden border border-[--border]">
      <div className="bg-[#0A1628] p-4">
        <p className="text-xs text-slate-400 mb-2 font-mono">Formula</p>
        <p className="font-mono text-finc-green text-sm leading-relaxed whitespace-pre-line">{formula}</p>
      </div>
      {contoh && (
        <div className="bg-slate-900 p-4 border-t border-slate-700">
          <p className="text-xs text-slate-400 mb-2 font-mono">Contoh</p>
          <p className="font-mono text-slate-300 text-xs leading-relaxed whitespace-pre-line">{contoh}</p>
        </div>
      )}
    </div>
  )
}

function RenderStatHighlight({ items }: { items: { angka: string; label: string; sublabel?: string }[] }) {
  return (
    <div className={`my-4 grid gap-3 ${items.length === 2 ? 'grid-cols-2' : items.length >= 3 ? 'grid-cols-3' : 'grid-cols-1'}`}>
      {items.map((item, i) => (
        <div key={i} className="text-center p-4 rounded-xl border border-[--border] bg-[--bg-card]">
          <div className="font-mono font-bold text-2xl text-finc-green mb-1">{item.angka}</div>
          <p className="text-xs font-semibold text-[--text-primary] mb-0.5">{item.label}</p>
          {item.sublabel && <p className="text-2xs text-[--text-secondary]">{item.sublabel}</p>}
        </div>
      ))}
    </div>
  )
}

function RenderComparison({ judul, items }: { judul?: string; items: { nama: string; pros: string[]; cons: string[] }[] }) {
  return (
    <div className="my-4">
      {judul && <p className="text-sm font-semibold text-[--text-primary] mb-3">{judul}</p>}
      <div className={`grid gap-3 ${items.length >= 2 ? 'sm:grid-cols-2' : ''}`}>
        {items.map((item, i) => (
          <div key={i} className="p-4 rounded-xl border border-[--border] bg-[--bg-card]">
            <p className="text-xs font-bold text-[--text-primary] mb-3">{item.nama}</p>
            {item.pros.map(p => (
              <div key={p} className="flex items-start gap-2 mb-1.5">
                <span className="text-emerald-500 shrink-0 text-xs mt-0.5">✓</span>
                <span className="text-xs text-[--text-secondary]">{p}</span>
              </div>
            ))}
            {item.cons.map(c => (
              <div key={c} className="flex items-start gap-2 mb-1.5">
                <span className="text-red-400 shrink-0 text-xs mt-0.5">✗</span>
                <span className="text-xs text-[--text-secondary]">{c}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function RenderKeyTakeaway({ points }: { points: string[] }) {
  return (
    <div className="my-4 p-4 rounded-xl bg-[#0A1628] border border-finc-green/20">
      <div className="flex items-center gap-2 mb-3">
        <CheckSquare size={16} className="text-finc-green" />
        <p className="text-xs font-bold text-white uppercase tracking-wider">Kesimpulan</p>
      </div>
      <ul className="space-y-2">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-finc-green shrink-0 text-xs mt-0.5">→</span>
            <span className="text-sm text-slate-300 leading-relaxed">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function RenderToolCTA({ nama, href, desc }: { nama: string; href: string; desc: string }) {
  return (
    <div className="my-6 p-4 rounded-xl border-2 border-finc-green/30 bg-emerald-50/50 dark:bg-emerald-950/20">
      <p className="text-xs font-bold text-finc-green uppercase tracking-wider mb-1">Coba Langsung dengan Tools</p>
      <p className="text-sm text-[--text-secondary] mb-3">{desc}</p>
      <Link href={href} className="inline-flex items-center gap-2 px-4 py-2.5 bg-finc-green
                                    hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold transition-all">
        {nama} <ArrowRight size={14} />
      </Link>
    </div>
  )
}

function RenderGrafikGaris({ judul, data, labelY, seri }: {
  judul: string
  data: { label: string; nilai: number; nilai2?: number }[]
  labelY?: string
  seri?: { key: 'nilai' | 'nilai2'; nama: string; warna: string }[]
}) {
  const defaultSeri = [{ key: 'nilai' as const, nama: 'Nilai', warna: '#10b981' }]
  const activeSeri = seri || defaultSeri
  return (
    <div className="my-4 p-4 rounded-xl border border-[--border] bg-[--bg-card]">
      <p className="text-xs font-semibold text-[--text-secondary] mb-4">{judul}</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
          <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#94a3b8' }} />
          <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} label={labelY ? { value: labelY, angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#94a3b8' } } : undefined} />
          <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }} />
          {activeSeri.length > 1 && <Legend wrapperStyle={{ fontSize: 11 }} />}
          {activeSeri.map(s => (
            <Line key={s.key} type="monotone" dataKey={s.key} name={s.nama} stroke={s.warna} strokeWidth={2} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function RenderGrafikBatang({ judul, data, labelY, warna }: {
  judul: string
  data: { label: string; nilai: number }[]
  labelY?: string
  warna?: string
}) {
  return (
    <div className="my-4 p-4 rounded-xl border border-[--border] bg-[--bg-card]">
      <p className="text-xs font-semibold text-[--text-secondary] mb-4">{judul}</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
          <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#94a3b8' }} />
          <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
          <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }} />
          <Bar dataKey="nilai" fill={warna || '#10b981'} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── Block Router ─────────────────────────────────

function RenderBlock({ block }: { block: KontenBlock }) {
  switch (block.type) {
    case 'paragraph': return <RenderParagraf text={block.text} />
    case 'heading': return <RenderHeading level={block.level} text={block.text} />
    case 'callout': return <RenderCallout variant={block.variant} judul={block.judul} text={block.text} />
    case 'table': return <RenderTable headers={block.headers} rows={block.rows} />
    case 'step-list': return <RenderStepList steps={block.steps} />
    case 'formula-box': return <RenderFormulaBox formula={block.formula} contoh={block.contoh} />
    case 'stat-highlight': return <RenderStatHighlight items={block.items} />
    case 'comparison': return <RenderComparison judul={block.judul} items={block.items} />
    case 'key-takeaway': return <RenderKeyTakeaway points={block.points} />
    case 'tool-cta': return <RenderToolCTA nama={block.nama} href={block.href} desc={block.desc} />
    case 'grafik-garis': return <RenderGrafikGaris judul={block.judul} data={block.data} labelY={block.labelY} seri={block.seri} />
    case 'grafik-batang': return <RenderGrafikBatang judul={block.judul} data={block.data} labelY={block.labelY} warna={block.warna} />
    default: return null
  }
}

// ─── Main Layout ──────────────────────────────────

interface ArticleLayoutProps {
  artikel: Artikel
  artikelTerkait?: Artikel[]
}

function formatTanggal(tanggal: string): string {
  return new Date(tanggal).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function ArticleLayout({ artikel, artikelTerkait = [] }: ArticleLayoutProps) {
  const config = kategoriConfig[artikel.kategori]
  const Ikon = ikonKategori[artikel.kategori] || TrendingUp

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6 flex-wrap">
        <Link href="/" className="hover:text-finc-green">Home</Link>
        <span>›</span>
        <Link href="/artikel" className="hover:text-finc-green">Artikel</Link>
        <span>›</span>
        <Link href={`/artikel/${artikel.kategori}`} className="hover:text-finc-green">{config.nama}</Link>
        <span>›</span>
        <span className="text-[--text-primary] font-medium truncate max-w-[150px]">{artikel.judul}</span>
      </nav>

      {/* Hero dengan gradient */}
      <div className={`relative h-48 rounded-2xl bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo}
                        flex items-center justify-center mb-8 overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-24 h-24 rounded-full border-2 border-white" />
          <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full border border-white" />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full border border-white opacity-50" />
        </div>
        <div className="relative z-10 text-center px-6">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm w-fit mx-auto mb-3">
            <Ikon size={24} className="text-white" />
          </div>
          <span className="text-xs font-semibold text-white/80 bg-white/20 px-3 py-1 rounded-full">
            {config.nama}
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-[--text-primary] leading-tight mb-3">
          {artikel.judul}
        </h1>
        <div className="flex items-center gap-4 text-xs text-[--text-secondary]">
          <span>{formatTanggal(artikel.tanggal)}</span>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{artikel.waktuBaca} menit baca</span>
          </div>
        </div>
      </div>

      {/* Ringkasan */}
      <div className="p-4 rounded-xl bg-[--bg-secondary] border border-[--border] mb-8">
        <p className="text-sm text-[--text-secondary] leading-relaxed">{artikel.ringkasan}</p>
      </div>

      {/* Konten */}
      <div className="article-content mb-10">
        {artikel.konten.map((block, i) => (
          <RenderBlock key={i} block={block} />
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {artikel.tags.map(tag => (
          <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[--bg-secondary]
                                      text-[--text-secondary] border border-[--border]">
            #{tag}
          </span>
        ))}
      </div>

      {/* Artikel Terkait */}
      {artikelTerkait.length > 0 && (
        <div className="mb-10">
          <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-4">Artikel Terkait</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {artikelTerkait.map(a => (
              <Link key={a.slug} href={`/artikel/${a.kategori}/${a.slug}`}
                className="p-4 rounded-xl border border-[--border] hover:border-finc-green/40
                           bg-[--bg-card] group transition-all">
                <p className="text-sm font-semibold text-[--text-primary] group-hover:text-finc-green
                               transition-colors mb-1 line-clamp-2">{a.judul}</p>
                <div className="flex items-center gap-1 text-xs text-[--text-secondary]">
                  <Clock size={11} /><span>{a.waktuBaca} menit baca</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back */}
      <div className="pt-6 border-t border-[--border]">
        <Link href={`/artikel/${artikel.kategori}`}
          className="inline-flex items-center gap-2 text-sm text-[--text-secondary] hover:text-finc-green transition-colors">
          <ArrowLeft size={14} />
          Kembali ke Artikel {config.nama}
        </Link>
      </div>
    </div>
  )
}
