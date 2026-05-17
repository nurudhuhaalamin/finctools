'use client'
import { useState, useMemo } from 'react'
import { hitungKelly } from '@/lib/calculations/trading'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
const lC = { safe:'finc-result-good', moderate:'finc-result-warn', danger:'finc-result-danger' }
const lT = { safe:'text-emerald-600 dark:text-emerald-400', moderate:'text-amber-600 dark:text-amber-400', danger:'text-red-600 dark:text-red-400' }
export default function KellyCriterionOptimizer() {
  const [wr,    setWr]    = useState(55)
  const [rr,    setRr]    = useState(1.5)
  const [modal, setModal] = useState(10_000_000)
  const r = useMemo(() => hitungKelly({ winRate:wr, rrRatio:rr, modal }), [wr, rr, modal])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Win Rate: {wr}%</label><input type="range" min={1} max={99} step={1} value={wr} onChange={e=>setWr(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">R/R Ratio: 1:{rr}</label><input type="range" min={0.5} max={5} step={0.5} value={rr} onChange={e=>setRr(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Modal Akun (Rp)</label><input type="number" value={modal} onChange={e=>setModal(Number(e.target.value))} className="finc-input font-mono"/></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Half Kelly (Direkomendasikan)</p>
          <div className={`font-mono font-bold text-5xl tracking-tight mb-1 ${lT[r.riskLevel]}`}>{r.halfKellyPersen}%</div>
          <p className={`text-sm font-medium ${lT[r.riskLevel]}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Full Kelly',`${r.kellyPersen}% = ${fmt(r.kellyAmount)}`],['Half Kelly',`${r.halfKellyPersen}% = ${fmt(r.halfKellyAmount)}`]].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
        <div className="finc-card bg-navy-900/5 dark:bg-white/5 text-xs text-[--text-secondary] leading-relaxed">
          Half Kelly menghasilkan 75% pertumbuhan Full Kelly dengan drawdown yang jauh lebih kecil. Selalu gunakan Half Kelly untuk trading nyata.
        </div>
        <div className="finc-disclaimer"><span>⚠️</span><span>Hanya untuk tujuan edukasi. Bukan saran trading.</span></div>
      </div>
    </div>
  )
}
