'use client'
import { useState, useMemo } from 'react'
import { hitungFreelancerTax, PTKP } from '@/lib/calculations/tax'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function FreelancerTaxEstimator() {
  const [penghasilan, setPenghasilan] = useState(15_000_000)
  const [norma,  setNorma]  = useState(50)
  const [status, setStatus] = useState('TK/0')
  const [bulan,  setBulan]  = useState(12)
  const r = useMemo(() => hitungFreelancerTax({ penghasilanBrutoPerBulan:penghasilan, normaPersenase:norma, statusPTKP:status, bulanKerja:bulan }), [penghasilan, norma, status, bulan])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Rata-rata Penghasilan Bruto/Bulan (Rp)</label><input type="number" value={penghasilan} onChange={e=>setPenghasilan(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div>
          <label className="finc-label">Norma Penghitungan: {norma}%</label>
          <input type="range" min={20} max={80} step={5} value={norma} onChange={e=>setNorma(Number(e.target.value))} className="w-full accent-emerald-500"/>
          <p className="text-2xs text-[--text-secondary] mt-1">Contoh: Dokter/Pengacara ~50%, Pedagang ~20–30%. Cek KMK No. 543/KMK.04/2001.</p>
        </div>
        <div>
          <label className="finc-label">Status PTKP</label>
          <select value={status} onChange={e=>setStatus(e.target.value)} className="finc-input">
            {Object.keys(PTKP).map(s=><option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="finc-label">Bulan Bekerja: {bulan} bulan</label>
          <input type="range" min={1} max={12} step={1} value={bulan} onChange={e=>setBulan(Number(e.target.value))} className="w-full accent-emerald-500"/>
        </div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Estimasi PPh per Bulan</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.pphBulanan)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Tarif efektif: {r.efektifTarif}%</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Penghasilan Bruto/tahun',fmt(r.penghasilanBrutoTahunan)],['Penghasilan Neto (Norma)',fmt(r.penghasilanNeto)],['PTKP',fmt(r.ptkp)],['PKP',fmt(r.pkp)],['PPh Tahunan',fmt(r.pphTahunan)]].map(([l,v])=>(
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
