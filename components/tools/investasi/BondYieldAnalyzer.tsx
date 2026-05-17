'use client'
import { useState, useMemo } from 'react'
import { hitungBondYield } from '@/lib/calculations/investment'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
const lC = { good:'finc-result-good', moderate:'finc-result-warn', bad:'finc-result-danger' }
const lT = { good:'text-emerald-600 dark:text-emerald-400', moderate:'text-amber-600 dark:text-amber-400', bad:'text-red-600 dark:text-red-400' }
export default function BondYieldAnalyzer() {
  const [harga,  setHarga]  = useState(10_200_000)
  const [nominal,setNominal]= useState(10_000_000)
  const [kupon,  setKupon]  = useState(8)
  const [tenor,  setTenor]  = useState(3)
  const [pajak,  setPajak]  = useState(10)
  const r = useMemo(() => hitungBondYield({ hargaBeli:harga, nominal, kuponPersen:kupon, sisaTenor:tenor, pajakPersen:pajak }), [harga, nominal, kupon, tenor, pajak])
  const statusColor = r.label === 'diskon' ? 'good' : r.label === 'par' ? 'moderate' : 'bad'
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Harga Beli (Rp per lembar)</label><input type="number" value={harga} onChange={e=>setHarga(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Nominal/Face Value (Rp)</label><input type="number" value={nominal} onChange={e=>setNominal(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Kupon Rate: {kupon}%</label><input type="range" min={1} max={15} step={0.25} value={kupon} onChange={e=>setKupon(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Sisa Tenor: {tenor} tahun</label><input type="range" min={0.5} max={30} step={0.5} value={tenor} onChange={e=>setTenor(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Pajak Kupon: {pajak}%</label><input type="range" min={0} max={20} step={5} value={pajak} onChange={e=>setPajak(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
      </div>
      <div className="space-y-4">
        <div className={lC[statusColor]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">YTM Bersih</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${lT[statusColor]}`}>{r.ytmBersih}%</div>
          <p className={`text-sm font-medium capitalize ${lT[statusColor]}`}>Obligasi {r.label} — {r.premiumDiskonPersen > 0 ? '+' : ''}{r.premiumDiskonPersen}%</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Current Yield (kotor)',`${r.currentYield}%`],['Current Yield (bersih)',`${r.currentYieldBersih}%`],['YTM (kotor)',`${r.ytm}%`],['YTM (bersih)',`${r.ytmBersih}%`],['Premium/Diskon',`${fmt(r.premiumDiskon)} (${r.premiumDiskonPersen}%)`]].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
        <div className="finc-disclaimer"><span>⚠️</span><span>YTM adalah aproksimasi. Untuk perhitungan presisi gunakan financial calculator atau Bloomberg.</span></div>
      </div>
    </div>
  )
}
