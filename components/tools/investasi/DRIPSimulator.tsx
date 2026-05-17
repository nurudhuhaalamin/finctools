'use client'
import { useState, useMemo } from 'react'
import { hitungDRIP } from '@/lib/calculations/investment'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function DRIPSimulator() {
  const [saham,  setSaham]  = useState(10000)
  const [harga,  setHarga]  = useState(5000)
  const [yield_, setYield_] = useState(4)
  const [growth, setGrowth] = useState(8)
  const [tahun,  setTahun]  = useState(10)
  const r = useMemo(() => hitungDRIP({ sahamAwal:saham, hargaSaham:harga, dividenYield:yield_, pertumbuhanHarga:growth, periodeTahun:tahun }), [saham, harga, yield_, growth, tahun])
  const diff = r.returnTotal - r.returnTanpaDRIP
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Jumlah Saham Awal (lembar)</label><input type="number" value={saham} onChange={e=>setSaham(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Harga per Lembar (Rp)</label><input type="number" value={harga} onChange={e=>setHarga(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Dividend Yield: {yield_}%</label><input type="range" min={0.5} max={15} step={0.5} value={yield_} onChange={e=>setYield_(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Pertumbuhan Harga: {growth}% per tahun</label><input type="range" min={1} max={25} step={1} value={growth} onChange={e=>setGrowth(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Periode: {tahun} tahun</label><input type="range" min={1} max={10} step={1} value={tahun} onChange={e=>setTahun(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Nilai Akhir dengan DRIP</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.nilaiAkhir)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">+{diff.toFixed(1)}% lebih baik dari tanpa DRIP</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Saham awal',`${saham} lembar`],['Saham akhir (DRIP)',`${r.sahamAkhir} lembar`],['Nilai awal',fmt(r.nilaiAwal)],['Dividen direinvestasi',fmt(r.totalDividenDireinvestasi)],['Return dengan DRIP',`${r.returnTotal}%`],['Return tanpa DRIP',`${r.returnTanpaDRIP}%`]].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
        <div className="finc-disclaimer"><span>⚠️</span><span>Simulasi tidak memperhitungkan pajak dividen dan biaya transaksi reinvestasi.</span></div>
      </div>
    </div>
  )
}
