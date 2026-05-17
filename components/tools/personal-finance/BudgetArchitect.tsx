'use client'
import { useState, useMemo } from 'react'
import { hitungBudget } from '@/lib/calculations/personal-finance'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function BudgetArchitect() {
  const [ph, setPh] = useState(15_000_000)
  const [k,  setK]  = useState(50)
  const [ki, setKi] = useState(30)
  const [t,  setT]  = useState(20)
  const r = useMemo(() => hitungBudget(ph, k, ki, t), [ph, k, ki, t])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Penghasilan Bersih/Bulan (Rp)</label><input type="number" value={ph} onChange={e=>setPh(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Kebutuhan: {k}%</label><input type="range" min={0} max={80} step={5} value={k} onChange={e=>{setK(Number(e.target.value));setKi(Math.min(ki,100-Number(e.target.value)));setT(100-Number(e.target.value)-Math.min(ki,100-Number(e.target.value)))}} className="w-full accent-blue-500"/></div>
        <div><label className="finc-label">Keinginan: {ki}%</label><input type="range" min={0} max={80} step={5} value={ki} onChange={e=>{setKi(Number(e.target.value));setT(100-k-Number(e.target.value))}} className="w-full accent-purple-500"/></div>
        <div><label className="finc-label">Tabungan & Investasi: {t}%</label><div className={`finc-input font-mono ${t<0?'border-red-400 text-red-500':'text-[--text-primary]'}`}>{t}% {t<0?'⚠️ Melebihi 100%':''}</div></div>
      </div>
      <div className="space-y-4">
        {[{l:'Kebutuhan',v:r.kebutuhan,c:'bg-blue-500',p:k},{l:'Keinginan',v:r.keinginan,c:'bg-purple-500',p:ki},{l:'Tabungan & Investasi',v:r.tabungan,c:'bg-emerald-500',p:t}].map(item=>(
          <div key={item.l} className="finc-card">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-[--text-primary]">{item.l}</span>
              <span className="font-mono font-bold text-[--text-primary]">{fmt(item.v)}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className={`h-full ${item.c} rounded-full transition-all`} style={{width:`${Math.max(0,item.p)}%`}}/>
            </div>
            <div className="text-xs text-[--text-secondary] mt-1">{item.p}% dari penghasilan</div>
          </div>
        ))}
        <div className="finc-disclaimer"><span>💡</span><span>Aturan 50-30-20 adalah panduan umum. Sesuaikan dengan kondisi dan prioritas finansialmu.</span></div>
      </div>
    </div>
  )
}
