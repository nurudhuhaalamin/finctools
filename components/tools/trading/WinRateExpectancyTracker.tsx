'use client'
import { useState, useMemo } from 'react'
import { hitungExpectancy } from '@/lib/calculations/trading'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
const lC = { good:'finc-result-good', moderate:'finc-result-warn', bad:'finc-result-danger' }
const lT = { good:'text-emerald-600 dark:text-emerald-400', moderate:'text-amber-600 dark:text-amber-400', bad:'text-red-600 dark:text-red-400' }
export default function WinRateExpectancyTracker() {
  const [wr,  setWr]  = useState(55)
  const [aw,  setAw]  = useState(200_000)
  const [al,  setAl]  = useState(150_000)
  const [tpm, setTpm] = useState(20)
  const r = useMemo(() => hitungExpectancy({ winRate:wr, avgWin:aw, avgLoss:al, tradePerBulan:tpm }), [wr, aw, al, tpm])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Win Rate: {wr}%</label><input type="range" min={1} max={99} step={1} value={wr} onChange={e=>setWr(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Rata-rata Win (Rp)</label><input type="number" value={aw} onChange={e=>setAw(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Rata-rata Loss (Rp)</label><input type="number" value={al} onChange={e=>setAl(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Trade per Bulan: {tpm}</label><input type="range" min={1} max={100} step={1} value={tpm} onChange={e=>setTpm(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Expectancy per Trade</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${lT[r.riskLevel]}`}>{fmt(r.expectancy)}</div>
          <p className={`text-sm font-medium ${lT[r.riskLevel]}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          {[['R/R Ratio',`1 : ${r.rrRatio}`],['Break-even Win Rate',`${r.breakEvenWinRate}%`],['Proyeksi per Bulan',fmt(r.proyeksiPerBulan)]].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
        <div className="finc-disclaimer"><span>⚠️</span><span>Hanya untuk tujuan edukasi. Bukan saran trading.</span></div>
      </div>
    </div>
  )
}
