'use client'
import { useState, useMemo } from 'react'
import { hitungStreak } from '@/lib/calculations/trading'
const lC = { safe:'finc-result-good', moderate:'finc-result-warn', danger:'finc-result-danger' }
const lT = { safe:'text-emerald-600 dark:text-emerald-400', moderate:'text-amber-600 dark:text-amber-400', danger:'text-red-600 dark:text-red-400' }
export default function StreakAnalyzer() {
  const [wr,     setWr]     = useState(55)
  const [streak, setStreak] = useState(5)
  const [total,  setTotal]  = useState(100)
  const r = useMemo(() => hitungStreak({ winRate:wr, streakLength:streak, totalTrade:total }), [wr, streak, total])
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Win Rate: {wr}%</label><input type="range" min={1} max={99} step={1} value={wr} onChange={e=>setWr(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Panjang Streak: {streak} beruntun</label><input type="range" min={2} max={15} step={1} value={streak} onChange={e=>setStreak(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
        <div><label className="finc-label">Total Trade: {total}</label><input type="range" min={10} max={500} step={10} value={total} onChange={e=>setTotal(Number(e.target.value))} className="w-full accent-emerald-500"/></div>
      </div>
      <div className="space-y-4">
        <div className={lC[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Probabilitas Loss {streak}x Beruntun</p>
          <div className={`font-mono font-bold text-5xl tracking-tight mb-1 ${lT[r.riskLevel]}`}>{r.probLossStreak}%</div>
          <p className={`text-sm font-medium ${lT[r.riskLevel]}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Prob Win Streak',`${r.probWinStreak}%`],['Prob Loss Streak',`${r.probLossStreak}%`],['Expected Loss Streak terjadi tiap',`~${r.expectedLossStreak} trade`],['Expected Win Streak terjadi tiap',`~${r.expectedWinStreak} trade`]].map(([l,v])=>(
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
