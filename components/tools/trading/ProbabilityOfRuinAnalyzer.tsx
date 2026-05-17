'use client'
import { useState, useMemo } from 'react'
import { hitungProbabilityOfRuin } from '@/lib/calculations/trading'
const lC = { safe:'finc-result-good', moderate:'finc-result-warn', danger:'finc-result-danger' }
const lT = { safe:'text-emerald-600 dark:text-emerald-400', moderate:'text-amber-600 dark:text-amber-400', danger:'text-red-600 dark:text-red-400' }
export default function ProbabilityOfRuinAnalyzer() {
  const [wr,     setWr]     = useState(55)
  const [rr,     setRr]     = useState(1.5)
  const [risiko, setRisiko] = useState(2)
  const [target, setTarget] = useState(50)
  const r = useMemo(() => hitungProbabilityOfRuin({ winRate:wr, rrRatio:rr, risikoPerTrade:risiko, targetRuin:target }), [wr, rr, risiko, target])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Win Rate: {wr}%</label><input type="range" min={1} max={99} step={1} value={wr} onChange={e=>setWr(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">R/R Ratio: 1:{rr}</label><input type="range" min={0.5} max={5} step={0.5} value={rr} onChange={e=>setRr(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Risiko per Trade: {risiko}%</label><input type="range" min={0.5} max={10} step={0.5} value={risiko} onChange={e=>setRisiko(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Target Drawdown "Ruin": {target}%</label><input type="range" min={10} max={100} step={10} value={target} onChange={e=>setTarget(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Probabilitas Ruin</p>
          <div className={`font-mono font-bold text-5xl tracking-tight mb-1 ${lT[r.riskLevel]}`}>{r.probabilitasRuin}%</div>
          <p className={`text-sm font-medium ${lT[r.riskLevel]}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Safety Score',`${r.safetyScore}/100`],['Expected Max Drawdown',`${r.expectedDrawdown}%`]].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
        <div className="finc-disclaimer"><span>⚠️</span><span>Hanya untuk tujuan edukasi. Bukan saran trading.</span></div>
      </div>
    </div>
  )
}
