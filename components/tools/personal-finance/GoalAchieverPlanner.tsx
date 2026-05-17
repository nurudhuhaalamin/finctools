'use client'
import { useState, useMemo } from 'react'
import { hitungGoal } from '@/lib/calculations/personal-finance'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function GoalAchieverPlanner() {
  const [target, setTarget] = useState(100_000_000)
  const [ada,    setAda]    = useState(10_000_000)
  const [bln,    setBln]    = useState(24)
  const [rate,   setRate]   = useState(6)
  const r = useMemo(() => hitungGoal(target, ada, bln, rate), [target, ada, bln, rate])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Target Jumlah (Rp)</label><input type="number" value={target} onChange={e=>setTarget(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Dana yang Sudah Ada (Rp)</label><input type="number" value={ada} onChange={e=>setAda(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Waktu Mencapai: {bln} bulan ({(bln/12).toFixed(1)} tahun)</label><input type="range" min={1} max={120} step={1} value={bln} onChange={e=>setBln(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Return/Bunga: {rate}% per tahun</label><input type="range" min={0} max={20} step={0.5} value={rate} onChange={e=>setRate(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Tabungan yang Dibutuhkan</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.tabunganPerBulan)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">per bulan selama {bln} bulan</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Target',fmt(target)],['Dana Awal (sudah berkembang)',fmt(r.nilaiSaatIniDiTarget)],['Kontribusi Dibutuhkan',fmt(r.kekurangan)],['Tabungan/bulan',fmt(r.tabunganPerBulan)]].map(([l,v])=>(
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
