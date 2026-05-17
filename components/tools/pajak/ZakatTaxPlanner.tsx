'use client'
import { useState, useMemo } from 'react'
import { hitungZakat } from '@/lib/calculations/tax'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function ZakatTaxPlanner() {
  const [penghasilan, setPenghasilan] = useState(10_000_000)
  const [tabungan,    setTabungan]    = useState(50_000_000)
  const [investasi,   setInvestasi]   = useState(20_000_000)
  const [emas,        setEmas]        = useState(10)
  const [hargaEmas,   setHargaEmas]   = useState(1_100_000)
  const [hutang,      setHutang]      = useState(0)
  const r = useMemo(() => hitungZakat({ penghasilanBulanan:penghasilan, tabungan, investasi, emas, hargaEmasPerGram:hargaEmas, hutang }), [penghasilan, tabungan, investasi, emas, hargaEmas, hutang])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Penghasilan Bersih/Bulan (Rp)</label><input type="number" value={penghasilan} onChange={e=>setPenghasilan(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Tabungan & Kas (Rp)</label><input type="number" value={tabungan} onChange={e=>setTabungan(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Nilai Investasi (Rp)</label><input type="number" value={investasi} onChange={e=>setInvestasi(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Kepemilikan Emas (gram)</label><input type="number" value={emas} onChange={e=>setEmas(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Harga Emas/gram (Rp)</label><input type="number" value={hargaEmas} onChange={e=>setHargaEmas(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Total Hutang (Rp)</label><input type="number" value={hutang} onChange={e=>setHutang(Number(e.target.value))} className="finc-input font-mono"/></div>
      </div>
      <div className="space-y-4">
        <div className={r.wajibZakatMal ? 'finc-result-good' : 'finc-result-warn'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Zakat Mal</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${r.wajibZakatMal?'text-emerald-600 dark:text-emerald-400':'text-amber-600 dark:text-amber-400'}`}>{r.wajibZakatMal ? fmt(r.zakatMal) : 'Belum Wajib'}</div>
          <p className="text-sm text-[--text-secondary]">Nisab: {fmt(r.nisabRupiah)} (85 gram emas)</p>
        </div>
        <div className={r.wajibZakatPenghasilan ? 'finc-result-good' : 'finc-result-warn'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Zakat Penghasilan/Bulan</p>
          <div className={`font-mono font-bold text-3xl tracking-tight ${r.wajibZakatPenghasilan?'text-emerald-600 dark:text-emerald-400':'text-amber-600 dark:text-amber-400'}`}>{r.wajibZakatPenghasilan ? fmt(r.zakatPenghasilan) : 'Belum Wajib'}</div>
        </div>
        <div className="finc-card space-y-3">
          {[['Total Harta',fmt(r.totalHarta)],['Total Hutang',fmt(hutang)],['Harta Bersih',fmt(r.hartaBersih)],['Nisab (85g emas)',fmt(r.nisabRupiah)]].map(([l,v])=>(
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
