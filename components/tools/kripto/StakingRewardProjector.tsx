'use client'
import { useState, useMemo } from 'react'
import { hitungStaking } from '@/lib/calculations/saham-kripto'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function StakingRewardProjector() {
  const [koin,    setKoin]    = useState(1)
  const [harga,   setHarga]   = useState(900_000_000)
  const [apy,     setApy]     = useState(5)
  const [hari,    setHari]    = useState(365)
  const [compound,setCompound]= useState(true)
  const r = useMemo(() => hitungStaking(koin,harga,apy,hari,compound), [koin,harga,apy,hari,compound])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Jumlah Koin yang Distake</label><input type="number" step="0.0001" value={koin} onChange={e=>setKoin(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Harga per Koin (Rp)</label><input type="number" value={harga} onChange={e=>setHarga(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">APY: {apy}%</label><input type="range" min={0.5} max={50} step={0.5} value={apy} onChange={e=>setApy(Number(e.target.value))} className="w-full accent-yellow-500"/></div>
        <div><label className="finc-label">Periode: {hari} hari</label><input type="range" min={30} max={1825} step={30} value={hari} onChange={e=>setHari(Number(e.target.value))} className="w-full accent-yellow-500"/></div>
        <div className="flex items-center justify-between finc-card py-3">
          <p className="text-sm font-medium text-[--text-primary]">Compound Harian</p>
          <button onClick={()=>setCompound(!compound)} className={`w-11 h-6 rounded-full transition-colors ${compound?'bg-finc-green':'bg-slate-300 dark:bg-slate-600'}`}><span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${compound?'translate-x-5':''}`}/></button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Total Reward</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.nilaiReward)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">+{r.rewardKoin} koin ({r.returnPersen}%)</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Nilai Awal',fmt(r.nilaiAwal)],['Reward Koin',`${r.rewardKoin} koin`],['Nilai Reward',fmt(r.nilaiReward)],['Total Nilai Akhir',fmt(r.nilaiAkhir)]].map(([l,v])=>(
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
