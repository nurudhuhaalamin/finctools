'use client'
import { useState, useMemo } from 'react'
import { hitungBreakEven } from '@/lib/calculations/saham-kripto'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function BreakEvenAnalyzer() {
  const [harga,setHarga] = useState(5000)
  const [lot,  setLot]   = useState(10)
  const [feeBeli, setFeeBeli] = useState(0.19)
  const [feeJual, setFeeJual] = useState(0.29)
  const r = useMemo(() => hitungBreakEven(harga,lot,feeBeli,feeJual), [harga,lot,feeBeli,feeJual])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Harga Beli (Rp/lembar)</label><input type="number" value={harga} onChange={e=>setHarga(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Jumlah Lot</label><input type="number" value={lot} onChange={e=>setLot(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Fee Beli: {feeBeli}%</label><input type="range" min={0.05} max={0.5} step={0.01} value={feeBeli} onChange={e=>setFeeBeli(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Fee Jual (+ pajak): {feeJual}%</label><input type="range" min={0.05} max={0.5} step={0.01} value={feeJual} onChange={e=>setFeeJual(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-warn">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Harga Jual Break-even</p>
          <div className="font-mono font-bold text-5xl tracking-tight text-amber-600 dark:text-amber-400 mb-1">{fmt(r.hargaJualMin)}</div>
          <p className="text-sm text-amber-600 dark:text-amber-400">+{r.selisihHarga} ({r.persenSelisih}%) dari harga beli</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Harga Beli',fmt(r.hargaBeli)],['Harga Jual Min',fmt(r.hargaJualMin)],['Fee Beli',fmt(r.totalFeeBeli)],['Fee Jual',fmt(r.totalFeeJual)],['Total Fee',fmt(r.totalFee)],['Nilai Pembelian',fmt(r.nilaiPembelian)]].map(([l,v])=>(
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
