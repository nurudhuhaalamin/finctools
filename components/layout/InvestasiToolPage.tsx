import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export interface ToolStep { title: string; desc: string }
export interface ToolVariable { name: string; desc: string }
export interface ToolInterpretation { range: string; label: string; desc: string }
export interface ToolFAQ { q: string; a: string }
export interface RelatedTool { name: string; href: string; desc: string }

export interface InvestasiToolPageProps {
  name: string
  subcategory?: string
  description: string
  children: React.ReactNode
  steps: ToolStep[]
  formula: string
  formulaExample?: string
  variables: ToolVariable[]
  history: string
  interpretation?: ToolInterpretation[]
  interpretationTitle?: string
  faqs: ToolFAQ[]
  related: RelatedTool[]
  references: string[]
}

export default function InvestasiToolPage({
  name, subcategory = 'Simulasi Investasi', description,
  children, steps, formula, formulaExample, variables,
  history, interpretation, interpretationTitle,
  faqs, related, references,
}: InvestasiToolPageProps) {
  return (
    <>
      <div className="mb-8">
        <div className="inline-flex items-center text-xs font-medium text-emerald-600
                        dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30
                        border border-emerald-100 dark:border-emerald-900
                        rounded-full px-3 py-1 mb-3">
          Investasi · {subcategory}
        </div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-[--text-primary] mb-2">{name}</h1>
        <p className="text-[--text-secondary] leading-relaxed max-w-xl">{description}</p>
      </div>

      <div className="finc-card mb-10">{children}</div>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-bold text-[--text-primary] mb-4">Cara Menggunakan {name}</h2>
        <div className="space-y-3">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-4 finc-card py-3">
              <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/30
                             text-emerald-600 dark:text-emerald-400
                             text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</div>
              <div>
                <p className="text-sm font-semibold text-[--text-primary]">{s.title}</p>
                <p className="text-xs text-[--text-secondary] mt-0.5 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-bold text-[--text-primary] mb-4">Rumus & Logika Perhitungan</h2>
        <div className="finc-card bg-navy-900 dark:bg-navy-950 text-white mb-4">
          <p className="text-xs text-slate-400 mb-2 font-mono">Formula</p>
          <p className="font-mono text-finc-green text-sm leading-relaxed whitespace-pre-line">{formula}</p>
          {formulaExample && <p className="font-mono text-slate-300 text-xs mt-3 leading-relaxed whitespace-pre-line">{formulaExample}</p>}
        </div>
        <div className="space-y-2">
          {variables.map(v => (
            <div key={v.name} className="flex gap-3 items-start">
              <code className="text-emerald-600 dark:text-emerald-400 font-mono text-xs
                               bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5
                               rounded shrink-0 h-fit mt-0.5">{v.name}</code>
              <span className="text-xs text-[--text-secondary] leading-relaxed">{v.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-bold text-[--text-primary] mb-3">Sejarah & Konsep</h2>
        <div className="text-sm text-[--text-secondary] leading-relaxed space-y-3">
          {history.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>

      {interpretation && interpretation.length > 0 && (
        <section className="mb-10">
          <h2 className="font-heading text-xl font-bold text-[--text-primary] mb-4">{interpretationTitle || 'Cara Membaca Hasil'}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[--border]">
                  <th className="text-left py-2 pr-4 text-xs font-semibold text-[--text-secondary]">Nilai</th>
                  <th className="text-left py-2 pr-4 text-xs font-semibold text-[--text-secondary]">Kategori</th>
                  <th className="text-left py-2 text-xs font-semibold text-[--text-secondary]">Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[--border]">
                {interpretation.map(row => (
                  <tr key={row.range}>
                    <td className="py-2.5 pr-4 font-mono text-xs text-emerald-600 dark:text-emerald-400">{row.range}</td>
                    <td className="py-2.5 pr-4 text-xs text-[--text-primary]">{row.label}</td>
                    <td className="py-2.5 text-xs text-[--text-secondary]">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="mb-10">
        <h2 className="font-heading text-xl font-bold text-[--text-primary] mb-4">Pertanyaan Umum</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="finc-card group">
              <summary className="cursor-pointer text-sm font-semibold text-[--text-primary]
                                  list-none flex items-start justify-between gap-3">
                {f.q}
                <span className="text-emerald-500 shrink-0 text-lg leading-none group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-[--text-secondary] leading-relaxed border-t border-[--border] pt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-bold text-[--text-primary] mb-4">Tools Terkait</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {related.map(t => (
            <Link key={t.href} href={t.href} className="finc-card-hover group">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-[--text-primary] group-hover:text-finc-green transition-colors mb-1">{t.name}</p>
                  <p className="text-xs text-[--text-secondary] leading-relaxed">{t.desc}</p>
                </div>
                <ArrowRight size={14} className="shrink-0 text-[--text-secondary] group-hover:text-finc-green group-hover:translate-x-0.5 transition-all mt-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-heading text-xl font-bold text-[--text-primary] mb-3">Referensi</h2>
        <ul className="space-y-1.5 text-xs text-[--text-secondary]">
          {references.map((r, i) => <li key={i} dangerouslySetInnerHTML={{ __html: r }} />)}
        </ul>
      </section>
    </>
  )
}
