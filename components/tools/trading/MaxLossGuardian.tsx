'use client'
import { useState, useMemo } from 'react'
import { hitungMaxLoss } from '@/lib/calculations/trading'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
const lC = { safe:'finc-result-good', moderate:'finc-result-warn', danger:'finc-result-danger' }
const lT = { safe:'text-emerald-600 dark:text-emerald-400', moderate:'text-amber-600 dark:text-amber-400', danger:'text-red-600 dark:text-red-400' }
export default function MaxLossGuardian() {
  const [modal,   setModal]   = useState(10_000_000)
  const [harian,  setHarian]  = useState(3)
  const [mingguan,setMingguan]= useState(6)
  const [risiko,  setRisiko]  = useState(1)
  const r = useMemo(() => hitungMaxLoss({ modal, maxLossHarianPersen: harian, maxLossMingguanPersen: mingguan, risikoPerTrade: risiko }), [modal, harian, mingguan, risiko])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Modal Akun (Rp)</label><input type="number" value={modal} onChange={e=>setModal(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Maks Loss Harian: {harian}%</label><input type="range" min={1} max={10} step={0.5} value={harian} onChange={e=>setHarian(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Maks Loss Mingguan: {mingguan}%</label><input type="range" min={2} max={20} step={1} value={mingguan} onChange={e=>setMingguan(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Risiko per Trade: {risiko}%</label><input type="range" min={0.5} max={5} step={0.5} value={risiko} onChange={e=>setRisiko(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Status Batas Loss</p>
          <div className={`font-mono font-bold text-3xl tracking-tight mb-1 ${lT[r.riskLevel]}`}>{r.label}</div>
        </div>
        <div className="finc-card space-y-3">
          {[['Maks Loss Harian',fmt(r.maxLossHarian)],['Maks Loss Mingguan',fmt(r.maxLossMingguan)],['Maks Trade/Hari',`${r.maxTradeHarian} trade`],['Maks Trade/Minggu',`${r.maxTradeMingguan} trade`]].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
        <div className="finc-disclaimer"><span>⚠️</span><span>Hanya untuk tujuan edukasi. Bukan saran trading.</span></div>
      </div>
    </div>
  )
}
