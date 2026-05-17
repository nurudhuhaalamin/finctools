'use client'
import { useState, useMemo } from 'react'
import { hitungSwap } from '@/lib/calculations/trading'
const fmt = (n: number) => 'Rp ' + Math.round(Math.abs(n)).toLocaleString('id-ID')
const lC = { safe:'finc-result-good', moderate:'finc-result-warn', danger:'finc-result-danger' }
const lT = { safe:'text-emerald-600 dark:text-emerald-400', moderate:'text-amber-600 dark:text-amber-400', danger:'text-red-600 dark:text-red-400' }
export default function SwapCostEstimator() {
  const [lot,   setLot]   = useState(0.1)
  const [rate,  setRate]  = useState(0.5)
  const [malam, setMalam] = useState(5)
  const [pip,   setPip]   = useState(10)
  const r = useMemo(() => hitungSwap({ lotSize:lot, swapRate:rate, jumlahMalam:malam, pipValue:pip }), [lot, rate, malam, pip])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Lot Size: {lot}</label><input type="range" min={0.01} max={10} step={0.01} value={lot} onChange={e=>setLot(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Swap Rate (pips/malam): {rate}</label><input type="range" min={0.1} max={5} step={0.1} value={rate} onChange={e=>setRate(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Jumlah Malam: {malam}</label><input type="range" min={1} max={30} step={1} value={malam} onChange={e=>setMalam(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Pip Value (Rp per 0.01 lot)</label><input type="number" value={pip} onChange={e=>setPip(Number(e.target.value))} className="finc-input font-mono"/></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Total Biaya Swap</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${lT[r.riskLevel]}`}>{fmt(r.totalSwap)}</div>
          <p className="text-sm text-[--text-secondary]">selama {malam} malam</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Swap per Malam',fmt(r.swapPerMalam)],['Total {malam} Malam',fmt(r.totalSwap)]].map(([l,v])=>(
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
