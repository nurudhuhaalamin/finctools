'use client'
import { useState, useMemo } from 'react'
import { hitungGoldDCA } from '@/lib/calculations/investment'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function GoldDCASimulator() {
  const [inv,    setInv]    = useState(1_000_000)
  const [bulan,  setBulan]  = useState(24)
  const [harga,  setHarga]  = useState(1_100_000)
  const [target, setTarget] = useState(1_400_000)
  const r = useMemo(() => hitungGoldDCA({ investasiPerBulan:inv, jumlahBulan:bulan, hargaEmasSekarang:harga, targetHarga:target }), [inv, bulan, harga, target])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Investasi per Bulan (Rp)</label><input type="number" value={inv} onChange={e=>setInv(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Durasi: {bulan} bulan</label><input type="range" min={3} max={120} step={3} value={bulan} onChange={e=>setBulan(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Harga Emas Sekarang (Rp/gram)</label><input type="number" value={harga} onChange={e=>setHarga(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Target Harga Emas (Rp/gram)</label><input type="number" value={target} onChange={e=>setTarget(Number(e.target.value))} className="finc-input font-mono"/></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Emas Terkumpul</p>
          <div className="font-mono font-bold text-5xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{r.gramTerkumpul}<span className="text-xl ml-1 font-medium">gram</span></div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Nilai di target harga: {fmt(r.nilaiTarget)}</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Total Investasi',fmt(r.totalInvestasi)],['Nilai sekarang',fmt(r.nilaiSekarang)],['Nilai di target',fmt(r.nilaiTarget)],['Keuntungan (target)',fmt(r.keuntunganTarget)],['Return (target)',`${r.returnTarget}%`]].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
        <div className="finc-disclaimer"><span>⚠️</span><span>Harga emas bersifat fluktuatif. Target harga adalah estimasi — bukan jaminan.</span></div>
      </div>
    </div>
  )
}
