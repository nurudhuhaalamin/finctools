'use client'
import { useState, useMemo } from 'react'
import { hitungTHR, PTKP } from '@/lib/calculations/tax'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function THRTaxPlanner() {
  const [gaji,   setGaji]   = useState(10_000_000)
  const [tunj,   setTunj]   = useState(2_000_000)
  const [thr,    setThr]    = useState(12_000_000)
  const [status, setStatus] = useState('TK/0')
  const r = useMemo(() => hitungTHR({ gajiPokok:gaji, tunjanganTetap:tunj, thrAmount:thr, statusPTKP:status }), [gaji, tunj, thr, status])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Gaji Pokok (Rp/bulan)</label><input type="number" value={gaji} onChange={e=>setGaji(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Tunjangan Tetap (Rp/bulan)</label><input type="number" value={tunj} onChange={e=>setTunj(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Jumlah THR (Rp)</label><input type="number" value={thr} onChange={e=>setThr(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div>
          <label className="finc-label">Status PTKP</label>
          <select value={status} onChange={e=>setStatus(e.target.value)} className="finc-input">
            {Object.keys(PTKP).map(s=><option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">THR Bersih Diterima</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.thrBersih)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Pajak THR: {fmt(r.pphTHR)} ({r.efektifTarifTHR}%)</p>
        </div>
        <div className="finc-card space-y-3">
          {[['THR Bruto',fmt(thr)],['Pajak atas THR',fmt(r.pphTHR)],['THR Bersih',fmt(r.thrBersih)],['Tarif Efektif THR',`${r.efektifTarifTHR}%`],['PKP tanpa THR',fmt(r.pkpTanpaTHR)],['PKP dengan THR',fmt(r.pkpDenganTHR)]].map(([l,v])=>(
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
