'use client'
import { useState, useMemo } from 'react'
import { hitungFIRE, hitungWealthFreedom } from '@/lib/calculations/personal-finance'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function WealthFreedomPlanner() {
  const [pengeluaran, setPengeluaran] = useState(10_000_000)
  const [tabungan,    setTabungan]    = useState(100_000_000)
  const [investasi,   setInvestasi]   = useState(5_000_000)
  const [returnRate,  setReturnRate]  = useState(12)
  const [inflasi,     setInflasi]     = useState(4)
  const fire = useMemo(() => hitungFIRE(pengeluaran, returnRate, inflasi), [pengeluaran, returnRate, inflasi])
  const wealth = useMemo(() => hitungWealthFreedom(tabungan, investasi, fire.fireNumber, returnRate), [tabungan, investasi, fire.fireNumber, returnRate])
  const sudahFIRE = tabungan >= fire.fireNumber
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Pengeluaran Bulanan (Rp)</label><input type="number" value={pengeluaran} onChange={e=>setPengeluaran(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Tabungan & Investasi Saat Ini (Rp)</label><input type="number" value={tabungan} onChange={e=>setTabungan(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Investasi Bulanan (Rp)</label><input type="number" value={investasi} onChange={e=>setInvestasi(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Estimasi Return: {returnRate}%/tahun</label><input type="range" min={4} max={25} step={0.5} value={returnRate} onChange={e=>setReturnRate(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Inflasi: {inflasi}%/tahun</label><input type="range" min={1} max={10} step={0.5} value={inflasi} onChange={e=>setInflasi(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
      </div>
      <div className="space-y-4">
        <div className={sudahFIRE ? 'finc-result-good' : 'finc-result-warn'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">FIRE Number (4% Rule)</p>
          <div className={`font-mono font-bold text-3xl tracking-tight mb-1 ${sudahFIRE?'text-emerald-600 dark:text-emerald-400':'text-amber-600 dark:text-amber-400'}`}>{fmt(fire.fireNumber)}</div>
          <p className={`text-sm font-medium ${sudahFIRE?'text-emerald-600 dark:text-emerald-400':'text-amber-600 dark:text-amber-400'}`}>{sudahFIRE ? '🎉 Kamu sudah mencapai FIRE!' : `Kurang ${fmt(fire.fireNumber - tabungan)}`}</p>
        </div>
        {!sudahFIRE && (
          <div className="finc-result-good">
            <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Estimasi Mencapai FIRE</p>
            <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400">{wealth.tahunMencapai}<span className="text-xl ml-1">tahun</span> {wealth.bulanMencapai}<span className="text-xl ml-1">bulan</span></div>
          </div>
        )}
        <div className="finc-card space-y-3">
          {[['Pengeluaran Tahunan',fmt(fire.pengeluaranTahunan)],['FIRE Number',fmt(fire.fireNumber)],['Return Riil',`${fire.realReturn}%/tahun`],['Safe Withdrawal Rate','4%']].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
        <div className="finc-disclaimer"><span>⚠️</span><span>Proyeksi berdasarkan return dan inflasi yang diasumsikan konstan. Kondisi aktual dapat berbeda.</span></div>
      </div>
    </div>
  )
}
