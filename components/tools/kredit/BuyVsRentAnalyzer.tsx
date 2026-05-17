'use client'
import { useState, useMemo } from 'react'
import { hitungBuyVsRent } from '@/lib/calculations/property'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function BuyVsRentAnalyzer() {
  const [hp,  setHp]  = useState(800_000_000)
  const [dp,  setDp]  = useState(20)
  const [rate,setRate]= useState(10)
  const [tnr, setTnr] = useState(20)
  const [sw,  setSw]  = useState(5_000_000)
  const [ks,  setKs]  = useState(5)
  const [ap,  setAp]  = useState(6)
  const [thn, setThn] = useState(10)
  const r = useMemo(() => hitungBuyVsRent(hp,dp,rate,tnr,sw,ks,ap,thn), [hp,dp,rate,tnr,sw,ks,ap,thn])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wider">BELI</p>
        <div><label className="finc-label">Harga Properti (Rp)</label><input type="number" value={hp} onChange={e=>setHp(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">DP: {dp}%</label><input type="range" min={10} max={50} step={5} value={dp} onChange={e=>setDp(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Bunga KPR: {rate}%</label><input type="range" min={5} max={20} step={0.5} value={rate} onChange={e=>setRate(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Apresiasi: {ap}%/tahun</label><input type="range" min={0} max={15} step={1} value={ap} onChange={e=>setAp(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <p className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wider pt-2">SEWA</p>
        <div><label className="finc-label">Sewa Bulanan (Rp)</label><input type="number" value={sw} onChange={e=>setSw(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Kenaikan Sewa: {ks}%/tahun</label><input type="range" min={0} max={15} step={1} value={ks} onChange={e=>setKs(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Periode Analisis: {thn} tahun</label><input type="range" min={3} max={20} step={1} value={thn} onChange={e=>setThn(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
      </div>
      <div className="space-y-4">
        <div className={r.rekomendasiBeli?'finc-result-good':'finc-result-warn'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Setelah {thn} Tahun</p>
          <div className={`font-mono font-bold text-3xl tracking-tight mb-1 ${r.rekomendasiBeli?'text-emerald-600 dark:text-emerald-400':'text-amber-600 dark:text-amber-400'}`}>{r.rekomendasiBeli?'Beli Lebih Menguntungkan':'Sewa Lebih Menguntungkan'}</div>
        </div>
        <div className="finc-card space-y-3">
          {[['Cicilan KPR/bln',fmt(r.cicilanBulanan)],['Nilai Properti (proyeksi)',fmt(r.nilaiPropertiFuture)],['Keuntungan Apresiasi',fmt(r.keuntunganApresiasi)],['Total Sewa Dibayar',fmt(r.totalSewaBayar)]].map(([l,v])=>(
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
