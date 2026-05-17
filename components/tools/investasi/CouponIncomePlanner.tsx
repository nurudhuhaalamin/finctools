'use client'
import { useState, useMemo } from 'react'
import { hitungCoupon } from '@/lib/calculations/investment'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function CouponIncomePlanner() {
  const [nominal, setNominal] = useState(10_000_000)
  const [kupon,   setKupon]   = useState(8)
  const [freq,    setFreq]    = useState(2)
  const [pajak,   setPajak]   = useState(10)
  const [tenor,   setTenor]   = useState(5)
  const r = useMemo(() => hitungCoupon({ nominal, kuponPersen:kupon, frekuensiPerTahun:freq, pajakPersen:pajak, tenorTahun:tenor }), [nominal, kupon, freq, pajak, tenor])
  const freqLabel = { 1:'Tahunan', 2:'Semi-tahunan', 4:'Kuartalan', 12:'Bulanan' }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Nominal Obligasi (Rp)</label><input type="number" value={nominal} onChange={e=>setNominal(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Kupon Rate: {kupon}%</label><input type="range" min={1} max={15} step={0.5} value={kupon} onChange={e=>setKupon(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div>
          <label className="finc-label">Frekuensi Pembayaran</label>
          <div className="grid grid-cols-4 gap-1">
            {[1,2,4,12].map(f=>(
              <button key={f} onClick={()=>setFreq(f)} className={`py-2 rounded-lg text-xs font-medium border transition-all ${freq===f?'bg-finc-green text-white border-finc-green':'border-[--border] text-[--text-secondary]'}`}>{freqLabel[f as keyof typeof freqLabel]}</button>
            ))}
          </div>
        </div>
        <div><label className="finc-label">Pajak Kupon: {pajak}%</label><input type="range" min={0} max={20} step={5} value={pajak} onChange={e=>setPajak(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Tenor: {tenor} tahun</label><input type="range" min={1} max={30} step={1} value={tenor} onChange={e=>setTenor(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Kupon Bersih per Pembayaran</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.kuponBersihPerPembayaran)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Efektif yield: {r.efektifYield}% per tahun</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Kupon/tahun (kotor)',fmt(r.kuponPerTahun)],['Kupon/tahun (bersih)',fmt(r.kuponBersihPerTahun)],['Total kupon bersih',fmt(r.totalKuponBersih)]].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
        <div className="finc-disclaimer"><span>⚠️</span><span>Hanya untuk tujuan edukasi. Bukan saran investasi.</span></div>
      </div>
    </div>
  )
}
