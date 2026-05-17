'use client'
import { useState, useMemo } from 'react'
import { hitungDividend } from '@/lib/calculations/investment'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function DividendIncomeProjector() {
  const [saham,  setSaham]  = useState(10000)
  const [harga,  setHarga]  = useState(5000)
  const [yield_, setYield_] = useState(4)
  const [growth, setGrowth] = useState(5)
  const [tahun,  setTahun]  = useState(5)
  const r = useMemo(() => hitungDividend({ jumlahSaham:saham, hargaSaham:harga, dividenYield:yield_, pertumbuhanDividen:growth, periodeTahun:tahun }), [saham, harga, yield_, growth, tahun])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Jumlah Saham (lembar)</label><input type="number" value={saham} onChange={e=>setSaham(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Harga per Lembar (Rp)</label><input type="number" value={harga} onChange={e=>setHarga(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Dividend Yield: {yield_}%</label><input type="range" min={0.5} max={15} step={0.5} value={yield_} onChange={e=>setYield_(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Pertumbuhan Dividen: {growth}% per tahun</label><input type="range" min={0} max={20} step={1} value={growth} onChange={e=>setGrowth(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Proyeksi: {tahun} tahun</label><input type="range" min={1} max={10} step={1} value={tahun} onChange={e=>setTahun(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Dividen Tahun Ini</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.dividenTahunIni)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">{fmt(r.dividenBulanIni)}/bulan · Portofolio {fmt(r.nilaiPortofolio)}</p>
        </div>
        <div className="finc-card overflow-x-auto">
          <p className="text-xs font-semibold text-[--text-secondary] mb-2">Proyeksi Dividen per Tahun</p>
          <table className="w-full text-xs">
            <thead><tr className="border-b border-[--border]"><th className="text-left py-1 pr-3 text-[--text-secondary]">Tahun</th><th className="text-right py-1 pr-3 text-[--text-secondary]">Dividen</th><th className="text-right py-1 text-[--text-secondary]">Kumulatif</th></tr></thead>
            <tbody>{r.proyeksi.map(p=><tr key={p.tahun} className="border-b border-[--border] last:border-0"><td className="py-1.5 pr-3 font-mono text-[--text-secondary]">{p.tahun}</td><td className="py-1.5 pr-3 text-right font-mono text-[--text-primary]">{fmt(p.dividen)}</td><td className="py-1.5 text-right font-mono font-medium text-emerald-600 dark:text-emerald-400">{fmt(p.totalKumulatif)}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="finc-disclaimer"><span>⚠️</span><span>Dividen tidak dijamin. Pertumbuhan dividen adalah estimasi berdasarkan historis.</span></div>
      </div>
    </div>
  )
}
