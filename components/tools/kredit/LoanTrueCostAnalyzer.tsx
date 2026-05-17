'use client'
import { useState, useMemo } from 'react'
import { hitungLoanTrueCost } from '@/lib/calculations/property'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function LoanTrueCostAnalyzer() {
  const [pokok, setPokok] = useState(200_000_000)
  const [bunga, setBunga] = useState(10)
  const [tenor, setTenor] = useState(60)
  const [jenis, setJenis] = useState<'flat'|'efektif'|'anuitas'>('anuitas')
  const r = useMemo(() => hitungLoanTrueCost(pokok, bunga, tenor, jenis), [pokok, bunga, tenor, jenis])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Pokok Pinjaman (Rp)</label><input type="number" value={pokok} onChange={e=>setPokok(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Bunga: {bunga}% per tahun</label><input type="range" min={1} max={30} step={0.5} value={bunga} onChange={e=>setBunga(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Tenor: {tenor} bulan ({(tenor/12).toFixed(1)} tahun)</label><input type="range" min={12} max={360} step={12} value={tenor} onChange={e=>setTenor(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Jenis Bunga</label><div className="flex gap-2">{(['flat','efektif','anuitas'] as const).map(j=><button key={j} onClick={()=>setJenis(j)} className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all capitalize ${jenis===j?'bg-finc-green text-white border-finc-green':'border-[--border] text-[--text-secondary]'}`}>{j}</button>)}</div></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-warn">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Cicilan per Bulan</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-amber-600 dark:text-amber-400 mb-1">{fmt(r.cicilan)}</div>
          <p className="text-sm text-amber-600 dark:text-amber-400">Bunga efektif: {r.efektifRate}%/tahun</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Pokok Pinjaman',fmt(pokok)],['Total Bunga',fmt(r.totalBunga)],['Total Bayar',fmt(r.totalBayar)],['% dari Pokok',`+${r.persenBunga}%`]].map(([l,v])=>(
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
