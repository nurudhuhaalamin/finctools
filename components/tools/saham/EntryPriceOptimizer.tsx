'use client'
import { useState, useMemo } from 'react'
import { hitungEntryPrice } from '@/lib/calculations/saham-kripto'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
const lC = {good:'finc-result-good',moderate:'finc-result-warn',bad:'finc-result-danger'}
const lT = {good:'text-emerald-600 dark:text-emerald-400',moderate:'text-amber-600 dark:text-amber-400',bad:'text-red-600 dark:text-red-400'}
export default function EntryPriceOptimizer() {
  const [harga, setHarga]   = useState(5000)
  const [sl,    setSl]      = useState(5)
  const [tp,    setTp]      = useState(15)
  const [modal, setModal]   = useState(100_000_000)
  const [risiko,setRisiko]  = useState(2)
  const r = useMemo(() => hitungEntryPrice(harga,sl,tp,modal,risiko), [harga,sl,tp,modal,risiko])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Harga Entry (Rp/lembar)</label><input type="number" value={harga} onChange={e=>setHarga(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Stop Loss: {sl}% dari entry</label><input type="range" min={1} max={20} step={0.5} value={sl} onChange={e=>setSl(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Target Profit: {tp}% dari entry</label><input type="range" min={1} max={50} step={1} value={tp} onChange={e=>setTp(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Modal (Rp)</label><input type="number" value={modal} onChange={e=>setModal(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Risiko per Trade: {risiko}%</label><input type="range" min={0.5} max={5} step={0.5} value={risiko} onChange={e=>setRisiko(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel as keyof typeof lC]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">R/R Ratio</p>
          <div className={`font-mono font-bold text-5xl tracking-tight mb-1 ${lT[r.riskLevel as keyof typeof lT]}`}>1:{r.rrRatio}</div>
          <p className={`text-sm font-medium ${lT[r.riskLevel as keyof typeof lT]}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Harga Entry',fmt(r.entryHarga)],['Stop Loss',fmt(r.stopLossHarga)],['Take Profit',fmt(r.takeProfitHarga)],['Lot Optimal',`${r.lotOptimal} lot`],['Modal Berisiko',fmt(r.modalBerisiko)]].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
