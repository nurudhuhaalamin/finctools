'use client'
import { useState, useMemo } from 'react'
import { hitungSavingsGrowth } from '@/lib/calculations/personal-finance'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function SavingsGrowthSimulator() {
  const [awal, setAwal] = useState(10_000_000)
  const [bln,  setBln]  = useState(1_000_000)
  const [rate, setRate] = useState(5)
  const [thn,  setThn]  = useState(5)
  const r = useMemo(() => hitungSavingsGrowth(awal, bln, rate, thn), [awal, bln, rate, thn])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Tabungan Awal (Rp)</label><input type="number" value={awal} onChange={e=>setAwal(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Tabungan per Bulan (Rp)</label><input type="number" value={bln} onChange={e=>setBln(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Bunga/Return: {rate}% per tahun</label><input type="range" min={0} max={20} step={0.5} value={rate} onChange={e=>setRate(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Periode: {thn} tahun</label><input type="range" min={1} max={30} step={1} value={thn} onChange={e=>setThn(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Nilai Akhir</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.nilaiAkhir)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Bunga terkumpul: {fmt(r.totalBunga)} (+{r.returnPersen}%)</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Total Setor',fmt(r.totalSetor)],['Total Bunga',fmt(r.totalBunga)],['Nilai Akhir',fmt(r.nilaiAkhir)]].map(([l,v])=>(
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
