'use client'
import { useState, useMemo } from 'react'
import { hitungRentalYield } from '@/lib/calculations/property'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function RentalYieldAnalyzer() {
  const [hp,  setHp]  = useState(500_000_000)
  const [sw,  setSw]  = useState(4_000_000)
  const [by,  setBy]  = useState(6_000_000)
  const [ap,  setAp]  = useState(5)
  const [thn, setThn] = useState(5)
  const r = useMemo(() => hitungRentalYield(hp,sw,by,ap,thn), [hp,sw,by,ap,thn])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Harga Properti (Rp)</label><input type="number" value={hp} onChange={e=>setHp(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Sewa per Bulan (Rp)</label><input type="number" value={sw} onChange={e=>setSw(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Biaya Operasional/Tahun (Rp)</label><input type="number" value={by} onChange={e=>setBy(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Apresiasi: {ap}%/tahun</label><input type="range" min={0} max={15} step={1} value={ap} onChange={e=>setAp(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Periode: {thn} tahun</label><input type="range" min={1} max={20} step={1} value={thn} onChange={e=>setThn(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
      </div>
      <div className="space-y-4">
        <div className={r.grossYield>=5?'finc-result-good':r.grossYield>=3?'finc-result-warn':'finc-result-danger'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Gross Rental Yield</p>
          <div className={`font-mono font-bold text-5xl tracking-tight mb-1 ${r.grossYield>=5?'text-emerald-600 dark:text-emerald-400':r.grossYield>=3?'text-amber-600 dark:text-amber-400':'text-red-600 dark:text-red-400'}`}>{r.grossYield}%</div>
          <p className={`text-sm ${r.grossYield>=5?'text-emerald-600 dark:text-emerald-400':r.grossYield>=3?'text-amber-600 dark:text-amber-400':'text-red-600 dark:text-red-400'}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Net Yield',`${r.netYield}%`],['Total Return/tahun',`${r.totalReturnTahunan}%`],['Sewa Bersih/tahun',fmt(r.netSewa)],['Nilai Properti Proyeksi',fmt(r.nilaiPropertiFuture)]].map(([l,v])=>(
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
