'use client'
import { useState, useMemo } from 'react'
import { hitungPPN } from '@/lib/calculations/tax'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function PPNTracker() {
  const [harga,   setHarga]   = useState(1_000_000)
  const [inkl,    setInkl]    = useState(false)
  const [tarif,   setTarif]   = useState(11)
  const r = useMemo(() => hitungPPN({ harga, isInklusive:inkl, tarifPPN:tarif }), [harga, inkl, tarif])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Harga (Rp)</label><input type="number" value={harga} onChange={e=>setHarga(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div>
          <label className="finc-label">Status Harga</label>
          <div className="flex gap-2">
            {['Belum termasuk PPN', 'Sudah termasuk PPN'].map((t,i)=>(
              <button key={t} onClick={()=>setInkl(i===1)} className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${(i===1?inkl:!inkl)?'bg-purple-600 text-white border-purple-600':'border-[--border] text-[--text-secondary]'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="finc-label">Tarif PPN: {tarif}%</label>
          <input type="range" min={1} max={12} step={1} value={tarif} onChange={e=>setTarif(Number(e.target.value))} className="w-full accent-emerald-500"/>
          <p className="text-2xs text-[--text-secondary] mt-1">Tarif standar PPN Indonesia: 11% (berlaku sejak April 2022)</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Nilai PPN</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.ppn)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Harga Total: {fmt(r.hargaTotal)}</p>
        </div>
        <div className="finc-card space-y-3">
          {[['DPP (Dasar Pengenaan Pajak)',fmt(r.dpp)],['PPN ({tarif}%)',fmt(r.ppn)],['Harga Total',fmt(r.hargaTotal)],['Tarif Efektif',`${r.tarifEfektif}%`]].map(([l,v])=>(
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
