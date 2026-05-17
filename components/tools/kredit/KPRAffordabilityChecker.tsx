'use client'
import { useState, useMemo } from 'react'
import { hitungKPR } from '@/lib/calculations/property'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function KPRAffordabilityChecker() {
  const [ph,   setPh]   = useState(15_000_000)
  const [lain, setLain] = useState(2_000_000)
  const [rate, setRate] = useState(10)
  const [tenor,setTenor]= useState(20)
  const [dp,   setDp]   = useState(20)
  const r = useMemo(() => hitungKPR(ph, lain, rate, tenor, dp), [ph, lain, rate, tenor, dp])
  const statusColor = r.status==='sehat'?'finc-result-good':r.status==='perhatian'?'finc-result-warn':'finc-result-danger'
  const statusTxt = r.status==='sehat'?'text-emerald-600 dark:text-emerald-400':r.status==='perhatian'?'text-amber-600 dark:text-amber-400':'text-red-600 dark:text-red-400'
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Penghasilan Bersih/Bulan (Rp)</label><input type="number" value={ph} onChange={e=>setPh(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Total Cicilan Lain/Bulan (Rp)</label><input type="number" value={lain} onChange={e=>setLain(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Bunga KPR: {rate}%</label><input type="range" min={5} max={20} step={0.5} value={rate} onChange={e=>setRate(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Tenor: {tenor} tahun</label><input type="range" min={5} max={30} step={5} value={tenor} onChange={e=>setTenor(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Down Payment: {dp}%</label><input type="range" min={10} max={50} step={5} value={dp} onChange={e=>setDp(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
      </div>
      <div className="space-y-4">
        <div className={statusColor}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Harga Properti Maksimum</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${statusTxt}`}>{fmt(r.maxHargaProperti)}</div>
          <p className={`text-sm ${statusTxt}`}>DTI: {r.dtiRatio}% dari penghasilan</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Max Cicilan KPR',fmt(r.maxCicilanKPR)],['Max Pinjaman',fmt(r.maxPinjaman)],['DP yang Dibutuhkan',fmt(r.dpDibutuhkan)],['Debt-to-Income',`${r.dtiRatio}%`]].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
        <div className="finc-disclaimer"><span>⚠️</span><span>Kalkulasi menggunakan DTI maksimal 35%. Tiap bank memiliki kebijakan berbeda.</span></div>
      </div>
    </div>
  )
}
