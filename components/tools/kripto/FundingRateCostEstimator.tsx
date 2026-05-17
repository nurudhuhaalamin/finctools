'use client'
import { useState, useMemo } from 'react'
import { hitungFundingRate } from '@/lib/calculations/saham-kripto'
const fmt = (n: number) => 'Rp ' + Math.round(Math.abs(n)).toLocaleString('id-ID')
export default function FundingRateCostEstimator() {
  const [pos,  setPos]  = useState(10_000_000)
  const [rate, setRate] = useState(0.01)
  const [hari, setHari] = useState(7)
  const [fpd,  setFpd]  = useState(3)
  const r = useMemo(() => hitungFundingRate(pos,rate,hari,fpd), [pos,rate,hari,fpd])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Nilai Posisi (Rp)</label><input type="number" value={pos} onChange={e=>setPos(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Funding Rate: {rate}% per periode</label><input type="range" min={-0.1} max={0.1} step={0.001} value={rate} onChange={e=>setRate(Number(e.target.value))} className="w-full accent-yellow-500"/></div>
        <div><label className="finc-label">Periode Holding: {hari} hari</label><input type="range" min={1} max={30} step={1} value={hari} onChange={e=>setHari(Number(e.target.value))} className="w-full accent-yellow-500"/></div>
        <div><label className="finc-label">Funding per Hari: {fpd}x</label><input type="range" min={1} max={3} step={1} value={fpd} onChange={e=>setFpd(Number(e.target.value))} className="w-full accent-yellow-500"/><p className="text-2xs text-[--text-secondary] mt-1">Binance: 3x/hari | Bybit: 3x/hari</p></div>
      </div>
      <div className="space-y-4">
        <div className={r.riskLevel==='safe'?'finc-result-good':r.riskLevel==='moderate'?'finc-result-warn':'finc-result-danger'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Total Biaya Funding {hari} Hari</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${r.riskLevel==='safe'?'text-emerald-600 dark:text-emerald-400':r.riskLevel==='moderate'?'text-amber-600 dark:text-amber-400':'text-red-600 dark:text-red-400'}`}>{r.isPositive?'-':'+'}{fmt(r.totalBiaya)}</div>
          <p className="text-sm text-[--text-secondary]">{r.isPositive?'Long membayar Short':'Short membayar Long'}</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Biaya per Funding',fmt(r.biayaPerFunding)],['Biaya per Hari',fmt(r.biayaPerHari)],['Total Biaya',fmt(r.totalBiaya)],['% dari Posisi',`${r.persenDariPosisi}%`]].map(([l,v])=>(
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
