'use client'
import { useState, useMemo } from 'react'
import { hitungGoldVsInflasi } from '@/lib/calculations/investment'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function GoldVsInflationAnalyzer() {
  const [inv,   setInv]   = useState(10_000_000)
  const [tahun, setTahun] = useState(10)
  const [emas,  setEmas]  = useState(8)
  const [infl,  setInfl]  = useState(4)
  const r = useMemo(() => hitungGoldVsInflasi({ jumlahInvestasi:inv, periodeTahun:tahun, returnEmasTahunan:emas, inflasiTahunan:infl }), [inv, tahun, emas, infl])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Jumlah Investasi (Rp)</label><input type="number" value={inv} onChange={e=>setInv(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Periode: {tahun} tahun</label><input type="range" min={1} max={30} step={1} value={tahun} onChange={e=>setTahun(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Estimasi Return Emas: {emas}% per tahun</label><input type="range" min={1} max={20} step={0.5} value={emas} onChange={e=>setEmas(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Inflasi: {infl}% per tahun</label><input type="range" min={1} max={15} step={0.5} value={infl} onChange={e=>setInfl(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
      </div>
      <div className="space-y-4">
        <div className={r.emasBeats ? 'finc-result-good' : 'finc-result-warn'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Emas {r.emasBeats ? 'Mengalahkan' : 'Kalah dari'} Inflasi</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${r.emasBeats?'text-emerald-600 dark:text-emerald-400':'text-amber-600 dark:text-amber-400'}`}>{fmt(r.nilaiEmasNominal)}</div>
          <p className={`text-sm ${r.emasBeats?'text-emerald-600 dark:text-emerald-400':'text-amber-600 dark:text-amber-400'}`}>Return riil: {r.returnRiil}%</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Nilai emas nominal',fmt(r.nilaiEmasNominal)],['Nilai emas riil (inflasi adj.)',fmt(r.nilaiRiilEmas)],['Daya beli uang tunai',fmt(r.dayaBeli)],['Return nominal',`${r.returnNominal}%`],['Return riil',`${r.returnRiil}%`]].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
        <div className="finc-disclaimer"><span>⚠️</span><span>Asumsi return emas dan inflasi bersifat konstan. Kondisi aktual bisa berbeda.</span></div>
      </div>
    </div>
  )
}
