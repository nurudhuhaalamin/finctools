'use client'
import { useState, useMemo } from 'react'
import { hitungSBN } from '@/lib/calculations/investment'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function SBNMaturityPlanner() {
  const [nominal, setNominal] = useState(10_000_000)
  const [kupon,   setKupon]   = useState(6.5)
  const [tenor,   setTenor]   = useState(2)
  const [pajak,   setPajak]   = useState(10)
  const r = useMemo(() => hitungSBN({ nominal, kuponPersen:kupon, tenorTahun:tenor, pajakKupon:pajak }), [nominal, kupon, tenor, pajak])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Nominal Investasi (Rp)</label><input type="number" value={nominal} onChange={e=>setNominal(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Kupon: {kupon}% per tahun</label><input type="range" min={1} max={15} step={0.25} value={kupon} onChange={e=>setKupon(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Tenor: {tenor} tahun</label><input type="range" min={1} max={30} step={1} value={tenor} onChange={e=>setTenor(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Pajak Kupon: {pajak}%</label><input type="range" min={0} max={20} step={5} value={pajak} onChange={e=>setPajak(Number(e.target.value))} className="w-full accent-emerald-500"/><p className="text-2xs text-[--text-secondary] mt-1">SBR/ORI: 10% | Institusi: bervariasi</p></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Total Diterima saat Jatuh Tempo</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.totalTerima)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Yield bersih: {r.yieldBersih}% per tahun</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Kupon/tahun (kotor)',fmt(r.kuponPerTahun)],['Kupon/tahun (bersih)',fmt(r.kuponBersihPerTahun)],['Kupon/bulan (bersih)',fmt(r.kuponBersihPerBulan)],['Total kupon bersih',fmt(r.totalKuponBersih)],['Nominal kembali',fmt(nominal)]].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
        <div className="finc-disclaimer"><span>⚠️</span><span>Kalkulasi berdasarkan kupon tetap. Untuk SBN berbunga mengambang, yield aktual bisa berbeda.</span></div>
      </div>
    </div>
  )
}
