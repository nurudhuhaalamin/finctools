'use client'
import { useState, useMemo } from 'react'
import { hitungCryptoDCA } from '@/lib/calculations/saham-kripto'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function CryptoDCASimulator() {
  const [inv,    setInv]    = useState(500_000)
  const [period, setPeriod] = useState(24)
  const [harga,  setHarga]  = useState(900_000_000)
  const [target, setTarget] = useState(1_500_000_000)
  const r = useMemo(() => hitungCryptoDCA(inv,period,harga,target), [inv,period,harga,target])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Investasi per Bulan (Rp)</label><input type="number" value={inv} onChange={e=>setInv(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Durasi: {period} bulan</label><input type="range" min={3} max={60} step={3} value={period} onChange={e=>setPeriod(Number(e.target.value))} className="w-full accent-yellow-500"/></div>
        <div><label className="finc-label">Harga Saat Ini (Rp)</label><input type="number" value={harga} onChange={e=>setHarga(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Target Harga (Rp)</label><input type="number" value={target} onChange={e=>setTarget(Number(e.target.value))} className="finc-input font-mono"/></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Koin Terkumpul</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{r.totalKoin}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Nilai di target: {fmt(r.nilaiTarget)}</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Total Investasi',fmt(r.totalInvestasi)],['Nilai Sekarang',fmt(r.nilaiSekarang)],['Nilai di Target',fmt(r.nilaiTarget)],['Return (Target)',`${r.returnTarget}%`]].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
        <div className="finc-disclaimer"><span>⚠️</span><span>Kripto sangat volatil. Target harga adalah skenario, bukan prediksi atau jaminan.</span></div>
      </div>
    </div>
  )
}
