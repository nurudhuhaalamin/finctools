'use client'
import { useState, useMemo } from 'react'
import { hitungAveragingSimple } from '@/lib/calculations/saham-kripto'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function AveragingStrategyBuilder() {
  const [h1, setH1] = useState(5000)
  const [l1, setL1] = useState(10)
  const [h2, setH2] = useState(4000)
  const [l2, setL2] = useState(10)
  const r = useMemo(() => hitungAveragingSimple(h1,l1,h2,l2), [h1,l1,h2,l2])
  const isDown = h2 < h1
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="finc-card bg-slate-50 dark:bg-slate-900/50">
          <p className="text-xs font-semibold text-[--text-secondary] mb-3">Posisi Pertama</p>
          <div className="space-y-3">
            <div><label className="finc-label">Harga Beli Pertama (Rp)</label><input type="number" value={h1} onChange={e=>setH1(Number(e.target.value))} className="finc-input font-mono"/></div>
            <div><label className="finc-label">Jumlah Lot Pertama</label><input type="number" value={l1} onChange={e=>setL1(Number(e.target.value))} className="finc-input font-mono"/></div>
          </div>
        </div>
        <div className="finc-card bg-slate-50 dark:bg-slate-900/50">
          <p className="text-xs font-semibold text-[--text-secondary] mb-3">{isDown?'Average Down':'Average Up'}</p>
          <div className="space-y-3">
            <div><label className="finc-label">Harga Beli Berikutnya (Rp)</label><input type="number" value={h2} onChange={e=>setH2(Number(e.target.value))} className="finc-input font-mono"/></div>
            <div><label className="finc-label">Jumlah Lot Berikutnya</label><input type="number" value={l2} onChange={e=>setL2(Number(e.target.value))} className="finc-input font-mono"/></div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Harga Rata-rata</p>
          <div className="font-mono font-bold text-5xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.avgHarga)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">{isDown?`Turun ${r.persenPerubahan.toFixed(2)}% dari harga awal`:`Naik ${r.persenPerubahan.toFixed(2)}% dari harga awal`}</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Harga Rata-rata',fmt(r.avgHarga)],['Total Lot',`${r.totalLot} lot`],['Total Nilai',fmt(r.totalNilai)],['Jenis',isDown?'Average Down':'Average Up']].map(([l,v])=>(
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
