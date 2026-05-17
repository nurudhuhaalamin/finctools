'use client'
import { useState, useMemo } from 'react'
import { hitungDanaDarurat } from '@/lib/calculations/personal-finance'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
const statusCls = { tercapai:'finc-result-good', setengah:'finc-result-warn', kurang:'finc-result-danger' }
const statusTxt = { tercapai:'text-emerald-600 dark:text-emerald-400', setengah:'text-amber-600 dark:text-amber-400', kurang:'text-red-600 dark:text-red-400' }
export default function EmergencyShieldBuilder() {
  const [peng, setPeng] = useState(10_000_000)
  const [bln,  setBln]  = useState(6)
  const [tab,  setTab]  = useState(20_000_000)
  const [per,  setPer]  = useState(2_000_000)
  const r = useMemo(() => hitungDanaDarurat(peng, bln, tab, per), [peng, bln, tab, per])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Pengeluaran Bulanan (Rp)</label><input type="number" value={peng} onChange={e=>setPeng(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Target Dana Darurat: {bln} bulan</label><input type="range" min={3} max={12} step={1} value={bln} onChange={e=>setBln(Number(e.target.value))} className="w-full accent-emerald-500"/><div className="flex justify-between text-2xs text-[--text-secondary] mt-1"><span>3 bln (min)</span><span>6 bln (ideal)</span><span>12 bln (max)</span></div></div>
        <div><label className="finc-label">Dana yang Sudah Tersimpan (Rp)</label><input type="number" value={tab} onChange={e=>setTab(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Tabungan per Bulan (Rp)</label><input type="number" value={per} onChange={e=>setPer(Number(e.target.value))} className="finc-input font-mono"/></div>
      </div>
      <div className="space-y-4">
        <div className={statusCls[r.status as keyof typeof statusCls]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Status Dana Darurat</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${statusTxt[r.status as keyof typeof statusTxt]}`}>{r.persenTercapai}%</div>
          <p className={`text-sm ${statusTxt[r.status as keyof typeof statusTxt]}`}>{r.status==='tercapai'?'Dana darurat sudah cukup!':r.status==='setengah'?'Setengah jalan, lanjutkan!':'Perlu ditingkatkan segera'}</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Target Dana Darurat',fmt(r.targetDana)],['Sudah Tersimpan',fmt(tab)],['Kekurangan',fmt(r.kekurangan)],['Estimasi Tercapai',r.bulanMencapai<999?`${r.bulanMencapai} bulan lagi`:'Tambah tabungan bulanan']].map(([l,v])=>(
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
