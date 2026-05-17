'use client'
import { useState, useMemo } from 'react'
import { hitungInflasi } from '@/lib/calculations/personal-finance'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function InflationGuard() {
  const [jml, setJml] = useState(100_000_000)
  const [inf, setInf] = useState(4)
  const [thn, setThn] = useState(10)
  const r = useMemo(() => hitungInflasi(jml, inf, thn), [jml, inf, thn])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Jumlah Uang Saat Ini (Rp)</label><input type="number" value={jml} onChange={e=>setJml(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Inflasi: {inf}% per tahun</label><input type="range" min={1} max={15} step={0.5} value={inf} onChange={e=>setInf(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Periode: {thn} tahun</label><input type="range" min={1} max={30} step={1} value={thn} onChange={e=>setThn(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-danger">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Daya Beli Setelah {thn} Tahun</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-red-600 dark:text-red-400 mb-1">{fmt(r.dayaBeli)}</div>
          <p className="text-sm text-red-600 dark:text-red-400">Turun {r.penurunanPersen}% dari nilai awal</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Nilai Awal',fmt(jml)],['Nilai Nominal di Masa Depan',fmt(r.nilaiMasaDepan)],['Daya Beli Riil',fmt(r.dayaBeli)],['Kehilangan Daya Beli',fmt(r.kehilanganDayaBeli)],['Faktor Inflasi',`${r.faktorInflasi}x`]].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
        <div className="finc-disclaimer"><span>💡</span><span>Untuk mempertahankan daya beli, investasi kamu harus menghasilkan return minimal {inf}% per tahun.</span></div>
      </div>
    </div>
  )
}
