'use client'
import { useState, useMemo } from 'react'
import { hitungPipProfit } from '@/lib/calculations/trading'
const fmt = (n: number) => 'Rp ' + Math.round(Math.abs(n)).toLocaleString('id-ID')
export default function PipProfitAnalyzer() {
  const [lot,   setLot]   = useState(0.1)
  const [pips,  setPips]  = useState(50)
  const [pip,   setPip]   = useState(10)
  const [isP,   setIsP]   = useState(true)
  const r = useMemo(() => hitungPipProfit({ lotSize:lot, pips, pipValue:pip, isProfit:isP }), [lot, pips, pip, isP])
  const color = isP ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'
  const bgCls = isP ? 'finc-result-good' : 'finc-result-danger'
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="finc-label">Jenis Posisi</label>
          <div className="flex gap-2">
            {['Profit', 'Loss'].map((t,i) => (
              <button key={t} onClick={() => setIsP(i===0)} className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${(i===0?isP:!isP)?i===0?'bg-emerald-500 text-white border-emerald-500':'bg-red-500 text-white border-red-500':'border-[--border] text-[--text-secondary]'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div><label className="finc-label">Lot Size</label><input type="number" step="0.01" value={lot} onChange={e=>setLot(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Pips: {pips}</label><input type="range" min={1} max={500} step={1} value={pips} onChange={e=>setPips(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Pip Value (Rp per 0.01 lot)</label><input type="number" value={pip} onChange={e=>setPip(Number(e.target.value))} className="finc-input font-mono"/></div>
      </div>
      <div className="space-y-4">
        <div className={bgCls}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Total {isP ? 'Profit' : 'Loss'}</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${color}`}>{isP?'+':'-'}{fmt(r.totalPL)}</div>
        </div>
        <div className="finc-card space-y-3">
          {[['Nilai per Pip',fmt(r.nilaiPip)],['P/L per Lot',fmt(r.plPerLot)],['Total Pips',`${pips} pips`]].map(([l,v])=>(
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
