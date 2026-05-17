'use client'
import { useState, useMemo } from 'react'
import { hitungRefinancing } from '@/lib/calculations/property'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function RefinancingDecisionTool() {
  const [sisa, setSisa] = useState(300_000_000)
  const [bLama,setBLama]= useState(12)
  const [bBaru,setBBaru]= useState(9)
  const [tenor,setTenor]= useState(180)
  const [biaya,setBiaya]= useState(10_000_000)
  const r = useMemo(() => hitungRefinancing(sisa, bLama, bBaru, tenor, biaya), [sisa, bLama, bBaru, tenor, biaya])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Sisa Pokok Pinjaman (Rp)</label><input type="number" value={sisa} onChange={e=>setSisa(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Bunga Lama: {bLama}%</label><input type="range" min={5} max={25} step={0.5} value={bLama} onChange={e=>setBLama(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Bunga Baru: {bBaru}%</label><input type="range" min={5} max={25} step={0.5} value={bBaru} onChange={e=>setBBaru(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Sisa Tenor: {tenor} bulan</label><input type="range" min={12} max={360} step={12} value={tenor} onChange={e=>setTenor(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Biaya Refinancing (Rp)</label><input type="number" value={biaya} onChange={e=>setBiaya(Number(e.target.value))} className="finc-input font-mono"/></div>
      </div>
      <div className="space-y-4">
        <div className={r.worthIt?'finc-result-good':'finc-result-danger'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Keputusan Refinancing</p>
          <div className={`font-mono font-bold text-3xl tracking-tight mb-1 ${r.worthIt?'text-emerald-600 dark:text-emerald-400':'text-red-600 dark:text-red-400'}`}>{r.label}</div>
          <p className={`text-sm ${r.worthIt?'text-emerald-600 dark:text-emerald-400':'text-red-600 dark:text-red-400'}`}>Break-even: {r.breakEvenBulan} bulan</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Cicilan Lama',fmt(r.cicilanLama)],['Cicilan Baru',fmt(r.cicilanBaru)],['Hemat/Bulan',fmt(r.hematPerBulan)],['Hemat Total',fmt(r.hematTotal)]].map(([l,v])=>(
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
