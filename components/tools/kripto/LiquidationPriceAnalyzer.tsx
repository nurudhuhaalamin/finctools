'use client'
import { useState, useMemo } from 'react'
import { hitungLiquidasi } from '@/lib/calculations/saham-kripto'
const fmt = (n: number) => 'Rp ' + n.toLocaleString('id-ID')
const lC = {safe:'finc-result-good',moderate:'finc-result-warn',danger:'finc-result-danger'}
const lT = {safe:'text-emerald-600 dark:text-emerald-400',moderate:'text-amber-600 dark:text-amber-400',danger:'text-red-600 dark:text-red-400'}
export default function LiquidationPriceAnalyzer() {
  const [entry,   setEntry]   = useState(900_000_000)
  const [lev,     setLev]     = useState(10)
  const [mm,      setMm]      = useState(0.5)
  const [isLong,  setIsLong]  = useState(true)
  const r = useMemo(() => hitungLiquidasi(entry,lev,mm,isLong), [entry,lev,mm,isLong])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="finc-label">Arah Posisi</label>
          <div className="flex gap-2">
            {['Long (Beli)','Short (Jual)'].map((t,i)=>(
              <button key={t} onClick={()=>setIsLong(i===0)} className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${(i===0?isLong:!isLong)?'bg-finc-green text-white border-finc-green':'border-[--border] text-[--text-secondary]'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div><label className="finc-label">Harga Entry (Rp)</label><input type="number" value={entry} onChange={e=>setEntry(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Leverage: {lev}x</label><input type="range" min={1} max={125} step={1} value={lev} onChange={e=>setLev(Number(e.target.value))} className="w-full accent-yellow-500"/></div>
        <div><label className="finc-label">Maintenance Margin: {mm}%</label><input type="range" min={0.1} max={2} step={0.1} value={mm} onChange={e=>setMm(Number(e.target.value))} className="w-full accent-yellow-500"/></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel as keyof typeof lC]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Harga Likuidasi</p>
          <div className={`font-mono font-bold text-3xl tracking-tight mb-1 ${lT[r.riskLevel as keyof typeof lT]}`}>{fmt(Math.round(r.liquidasiHarga))}</div>
          <p className={`text-sm font-medium ${lT[r.riskLevel as keyof typeof lT]}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Harga Entry',fmt(entry)],['Harga Likuidasi',fmt(Math.round(r.liquidasiHarga))],['Jarak Likuidasi',`${r.jarakPersen}%`],['Leverage',`${lev}x`]].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
        <div className="finc-disclaimer"><span>⚠️</span><span>Leverage tinggi = risiko likuidasi sangat besar. Gunakan leverage dengan sangat hati-hati.</span></div>
      </div>
    </div>
  )
}
