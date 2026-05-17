'use client'
import { useState, useMemo } from 'react'
import { hitungCryptoRisk } from '@/lib/calculations/saham-kripto'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
const lC = {safe:'finc-result-good',moderate:'finc-result-warn',danger:'finc-result-danger'}
const lT = {safe:'text-emerald-600 dark:text-emerald-400',moderate:'text-amber-600 dark:text-amber-400',danger:'text-red-600 dark:text-red-400'}
export default function CryptoRiskManager() {
  const [modal, setModal]   = useState(10_000_000)
  const [risiko,setRisiko]  = useState(2)
  const [entry, setEntry]   = useState(900_000_000)
  const [sl,    setSl]      = useState(810_000_000)
  const r = useMemo(() => hitungCryptoRisk(modal,risiko,entry,sl), [modal,risiko,entry,sl])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Modal (Rp)</label><input type="number" value={modal} onChange={e=>setModal(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Risiko per Trade: {risiko}%</label><input type="range" min={0.5} max={10} step={0.5} value={risiko} onChange={e=>setRisiko(Number(e.target.value))} className="w-full accent-yellow-500"/></div>
        <div><label className="finc-label">Harga Entry (Rp)</label><input type="number" value={entry} onChange={e=>setEntry(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Harga Stop Loss (Rp)</label><input type="number" value={sl} onChange={e=>setSl(Number(e.target.value))} className="finc-input font-mono"/></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel as keyof typeof lC]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Jumlah Koin yang Dibeli</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${lT[r.riskLevel as keyof typeof lT]}`}>{r.jumlahKoin}</div>
          <p className={`text-sm ${lT[r.riskLevel as keyof typeof lT]}`}>Modal berisiko: {fmt(r.modalBerisiko)}</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Modal Berisiko',fmt(r.modalBerisiko)],['Jumlah Koin',`${r.jumlahKoin}`],['Nilai Posisi',fmt(r.nilaiPosisi)],['SL Distance',`${r.stopLossPersen}%`]].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
        <div className="finc-disclaimer"><span>⚠️</span><span>Kripto sangat volatil. Pastikan kamu siap kehilangan seluruh modal yang diinvestasikan.</span></div>
      </div>
    </div>
  )
}
