'use client'
import { useState, useMemo } from 'react'
import { hitungPerformance } from '@/lib/calculations/trading'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
const lC = { good:'finc-result-good', moderate:'finc-result-warn', bad:'finc-result-danger' }
const lT = { good:'text-emerald-600 dark:text-emerald-400', moderate:'text-amber-600 dark:text-amber-400', bad:'text-red-600 dark:text-red-400' }
export default function TradingPerformanceAnalyzer() {
  const [total,  setTotal]  = useState(50)
  const [win,    setWin]    = useState(28)
  const [avgWin, setAvgWin] = useState(200_000)
  const [avgLoss,setAvgLoss]= useState(150_000)
  const r = useMemo(() => hitungPerformance({ totalTrade:total, totalWin:win, avgWin, avgLoss }), [total, win, avgWin, avgLoss])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Total Trade</label><input type="number" value={total} onChange={e=>setTotal(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Jumlah Win</label><input type="number" value={win} onChange={e=>setWin(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Rata-rata Profit per Win (Rp)</label><input type="number" value={avgWin} onChange={e=>setAvgWin(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Rata-rata Loss per Loss (Rp)</label><input type="number" value={avgLoss} onChange={e=>setAvgLoss(Number(e.target.value))} className="finc-input font-mono"/></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Profit Factor</p>
          <div className={`font-mono font-bold text-5xl tracking-tight mb-1 ${lT[r.riskLevel]}`}>{r.profitFactor}</div>
          <p className={`text-sm font-medium ${lT[r.riskLevel]}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Win Rate',`${r.winRate}%`],['Loss Rate',`${r.lossRate}%`],['Expectancy per Trade',fmt(r.expectancy)],['Total P/L',fmt(r.totalProfit)]].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className={`text-xs font-mono font-medium ${l==='Total P/L'?r.totalProfit>=0?'text-emerald-600':'text-red-500':'text-[--text-primary]'}`}>{v}</span>
            </div>
          ))}
        </div>
        <div className="finc-disclaimer"><span>⚠️</span><span>Hanya untuk tujuan edukasi. Bukan saran trading.</span></div>
      </div>
    </div>
  )
}
