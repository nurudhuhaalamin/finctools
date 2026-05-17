'use client'
import { useState, useMemo } from 'react'
import { hitungMargin } from '@/lib/calculations/trading'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
const lC = { safe:'finc-result-good', moderate:'finc-result-warn', danger:'finc-result-danger' }
const lT = { safe:'text-emerald-600 dark:text-emerald-400', moderate:'text-amber-600 dark:text-amber-400', danger:'text-red-600 dark:text-red-400' }
export default function MarginLeverageGuard() {
  const [modal,  setModal]  = useState(10_000_000)
  const [lev,    setLev]    = useState(100)
  const [lot,    setLot]    = useState(0.1)
  const [harga,  setHarga]  = useState(15000)
  const [cs,     setCs]     = useState(100000)
  const r = useMemo(() => hitungMargin({ modal, leverage:lev, lotSize:lot, hargaInstrumen:harga, contractSize:cs }), [modal, lev, lot, harga, cs])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Modal Akun (Rp)</label><input type="number" value={modal} onChange={e=>setModal(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Leverage: 1:{lev}</label><input type="range" min={1} max={500} step={1} value={lev} onChange={e=>setLev(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Lot Size: {lot}</label><input type="range" min={0.01} max={10} step={0.01} value={lot} onChange={e=>setLot(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Harga Instrumen (Rp)</label><input type="number" value={harga} onChange={e=>setHarga(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Contract Size</label><input type="number" value={cs} onChange={e=>setCs(Number(e.target.value))} className="finc-input font-mono"/></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Margin Level</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${lT[r.riskLevel]}`}>{r.marginLevel}%</div>
          <p className={`text-sm font-medium ${lT[r.riskLevel]}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Required Margin',fmt(r.requiredMargin)],['Free Margin',fmt(r.freeMargin)],['Maks Lot',`${r.maxLot} Lot`]].map(([l,v])=>(
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
