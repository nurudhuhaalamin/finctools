'use client'
import { useState, useMemo } from 'react'
import { hitungDCA } from '@/lib/calculations/investment'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function DCASimulator() {
  const [inv,   setInv]   = useState(1_000_000)
  const [bln,   setBln]   = useState(36)
  const [ret,   setRet]   = useState(15)
  const [freq,  setFreq]  = useState<'bulanan'|'mingguan'|'tahunan'>('bulanan')
  const r = useMemo(() => hitungDCA({ investasiPerPeriode:inv, jumlahPeriode:bln, returnTahunan:ret, frekuensi:freq }), [inv, bln, ret, freq])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="finc-label">Frekuensi Investasi</label>
          <div className="flex gap-2">
            {(['bulanan','mingguan','tahunan'] as const).map(f=>(
              <button key={f} onClick={()=>setFreq(f)} className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all capitalize ${freq===f?'bg-finc-green text-white border-finc-green':'border-[--border] text-[--text-secondary]'}`}>{f}</button>
            ))}
          </div>
        </div>
        <div><label className="finc-label">Investasi per {freq === 'mingguan' ? 'Minggu' : freq === 'tahunan' ? 'Tahun' : 'Bulan'} (Rp)</label><input type="number" value={inv} onChange={e=>setInv(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div>
          <label className="finc-label">Durasi: {bln} bulan ({(bln/12).toFixed(1)} tahun)</label>
          <input type="range" min={6} max={360} step={6} value={bln} onChange={e=>setBln(Number(e.target.value))} className="w-full accent-emerald-500"/>
        </div>
        <div>
          <label className="finc-label">Estimasi Return Tahunan: {ret}%</label>
          <input type="range" min={1} max={30} step={1} value={ret} onChange={e=>setRet(Number(e.target.value))} className="w-full accent-emerald-500"/>
        </div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Nilai Akhir Portofolio</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.nilaiAkhir)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Keuntungan: {fmt(r.totalKeuntungan)} (+{r.returnTotal}%)</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Total Investasi',fmt(r.totalInvestasi)],['Total Keuntungan',fmt(r.totalKeuntungan)],['CAGR',`${r.cagr}% per tahun`],['Return Total',`${r.returnTotal}%`]].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
        {r.rincianTahunan.length > 0 && (
          <div className="finc-card overflow-x-auto">
            <p className="text-xs font-semibold text-[--text-secondary] mb-2">Proyeksi per Tahun</p>
            <table className="w-full text-xs">
              <thead><tr className="border-b border-[--border]"><th className="text-left py-1 pr-3 text-[--text-secondary]">Tahun</th><th className="text-right py-1 pr-3 text-[--text-secondary]">Investasi</th><th className="text-right py-1 text-[--text-secondary]">Nilai</th></tr></thead>
              <tbody>{r.rincianTahunan.map(t=><tr key={t.tahun} className="border-b border-[--border] last:border-0"><td className="py-1.5 pr-3 font-mono text-[--text-secondary]">{t.tahun}</td><td className="py-1.5 pr-3 text-right font-mono text-[--text-secondary]">{fmt(t.totalInvestasi)}</td><td className="py-1.5 text-right font-mono font-medium text-emerald-600 dark:text-emerald-400">{fmt(t.nilaiPortofolio)}</td></tr>)}</tbody>
            </table>
          </div>
        )}
        <div className="finc-disclaimer"><span>⚠️</span><span>Return adalah estimasi. Investasi selalu memiliki risiko. Kinerja masa lalu tidak menjamin kinerja masa depan.</span></div>
      </div>
    </div>
  )
}
