'use client'
import { useState, useMemo } from 'react'
import { hitungUMKMTax } from '@/lib/calculations/tax'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function UMKMTaxEstimator() {
  const [omzet, setOmzet] = useState(20_000_000)
  const [bulan, setBulan] = useState(12)
  const r = useMemo(() => hitungUMKMTax({ omzetPerBulan:omzet, bulanBerjalan:bulan }), [omzet, bulan])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Rata-rata Omzet per Bulan (Rp)</label><input type="number" value={omzet} onChange={e=>setOmzet(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div>
          <label className="finc-label">Bulan Berjalan: {bulan} bulan</label>
          <input type="range" min={1} max={12} step={1} value={bulan} onChange={e=>setBulan(Number(e.target.value))} className="w-full accent-emerald-500"/>
        </div>
        <div className="finc-card bg-purple-50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-1">Ketentuan WP OP UMKM</p>
          <p className="text-xs text-purple-600 dark:text-purple-400 leading-relaxed">Omzet s.d. Rp 500 juta/tahun BEBAS PPh. Di atas Rp 500 juta kena PPh Final 0.5% hanya dari selisihnya.</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className={r.melebihiBatas ? 'finc-result-warn' : 'finc-result-good'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">PPh Final per Bulan</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${r.melebihiBatas?'text-amber-600 dark:text-amber-400':'text-emerald-600 dark:text-emerald-400'}`}>{fmt(r.pphFinalPerBulan)}</div>
          <p className={`text-sm font-medium ${r.melebihiBatas?'text-amber-600 dark:text-amber-400':'text-emerald-600 dark:text-emerald-400'}`}>{r.catatanPajak}</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Omzet Tahunan (proyeksi)',fmt(r.omzetTahunan)],['PPh Final/bulan',fmt(r.pphFinalPerBulan)],['PPh Final/tahun',fmt(r.pphFinalTahunan)],['Sisa batas bebas',r.melebihiBatas?'Sudah melewati':fmt(r.omzetSisaBebas)]].map(([l,v])=>(
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
