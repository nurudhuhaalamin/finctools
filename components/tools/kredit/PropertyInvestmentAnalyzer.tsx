'use client'
import { useState, useMemo } from 'react'
import { hitungPropertyInvestment } from '@/lib/calculations/property'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function PropertyInvestmentAnalyzer() {
  const [hp,  setHp]  = useState(600_000_000)
  const [dp,  setDp]  = useState(20)
  const [rate,setRate]= useState(10)
  const [tnr, setTnr] = useState(20)
  const [sw,  setSw]  = useState(4_500_000)
  const [op,  setOp]  = useState(500_000)
  const [ap,  setAp]  = useState(6)
  const [thn, setThn] = useState(10)
  const r = useMemo(() => hitungPropertyInvestment(hp,dp,rate,tnr,sw,op,ap,thn), [hp,dp,rate,tnr,sw,op,ap,thn])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <div><label className="finc-label">Harga Beli (Rp)</label><input type="number" value={hp} onChange={e=>setHp(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">DP: {dp}%</label><input type="range" min={10} max={50} step={5} value={dp} onChange={e=>setDp(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Bunga KPR: {rate}%</label><input type="range" min={5} max={20} step={0.5} value={rate} onChange={e=>setRate(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Sewa/Bulan (Rp)</label><input type="number" value={sw} onChange={e=>setSw(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Biaya Operasional/Bulan (Rp)</label><input type="number" value={op} onChange={e=>setOp(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Apresiasi: {ap}%/tahun</label><input type="range" min={0} max={15} step={1} value={ap} onChange={e=>setAp(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
      </div>
      <div className="space-y-4">
        <div className={r.positifCashFlow?'finc-result-good':'finc-result-danger'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Cash Flow Bulanan</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${r.positifCashFlow?'text-emerald-600 dark:text-emerald-400':'text-red-600 dark:text-red-400'}`}>{r.cashFlowBulanan>=0?'+':''}{fmt(r.cashFlowBulanan)}</div>
          <p className={`text-sm font-medium ${r.positifCashFlow?'text-emerald-600 dark:text-emerald-400':'text-red-600 dark:text-red-400'}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          {[['DP',fmt(r.dp)],['Cicilan KPR',fmt(r.cicilan)],['Cap Rate',`${r.capRate}%`],['Cash on Cash Return',`${r.cocReturn}%`],['Nilai Properti Proyeksi',fmt(r.nilaiPropertiFuture)]].map(([l,v])=>(
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
