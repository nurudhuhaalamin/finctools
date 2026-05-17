'use client'
import { useState, useMemo } from 'react'
import { hitungStopLoss } from '@/lib/calculations/trading'

const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
const levelClass = { safe: 'finc-result-good', moderate: 'finc-result-warn', danger: 'finc-result-danger' }
const levelText  = { safe: 'text-emerald-600 dark:text-emerald-400', moderate: 'text-amber-600 dark:text-amber-400', danger: 'text-red-600 dark:text-red-400' }

export default function StopLossOptimizer() {
  const [entry,  setEntry]  = useState(1.1000)
  const [atr,    setAtr]    = useState(20)
  const [mult,   setMult]   = useState(1.5)
  const [modal,  setModal]  = useState(10_000_000)
  const [risiko, setRisiko] = useState(1)
  const [pip,    setPip]    = useState(10)
  const [isLong, setIsLong] = useState(true)

  const r = useMemo(() => hitungStopLoss({ entryPrice: entry, atr, multiplier: mult, modal, risikoPercent: risiko, pipValue: pip, isLong }), [entry, atr, mult, modal, risiko, pip, isLong])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="finc-label">Arah Posisi</label>
          <div className="flex gap-2">
            {['Buy (Long)', 'Sell (Short)'].map((t, idx) => (
              <button key={t} onClick={() => setIsLong(idx === 0)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${(idx === 0 ? isLong : !isLong) ? 'bg-finc-green text-white border-finc-green' : 'border-[--border] text-[--text-secondary]'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div><label className="finc-label">Entry Price</label><input type="number" step="0.0001" value={entry} onChange={e => setEntry(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div><label className="finc-label">ATR (pips)</label><input type="number" value={atr} onChange={e => setAtr(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div>
          <label className="finc-label">ATR Multiplier: {mult}x</label>
          <input type="range" min={0.5} max={3} step={0.5} value={mult} onChange={e => setMult(Number(e.target.value))} className="w-full accent-emerald-500" />
          <div className="flex justify-between text-2xs text-[--text-secondary] mt-1"><span>0.5x</span><span>1x</span><span>1.5x</span><span>2x</span><span>2.5x</span><span>3x</span></div>
        </div>
        <div><label className="finc-label">Modal (Rp)</label><input type="number" value={modal} onChange={e => setModal(Number(e.target.value))} className="finc-input font-mono" /></div>
        <div>
          <label className="finc-label">Risiko per Trade: {risiko}%</label>
          <input type="range" min={0.5} max={5} step={0.5} value={risiko} onChange={e => setRisiko(Number(e.target.value))} className="w-full accent-emerald-500" />
        </div>
        <div><label className="finc-label">Pip Value (Rp)</label><input type="number" value={pip} onChange={e => setPip(Number(e.target.value))} className="finc-input font-mono" /></div>
      </div>
      <div className="space-y-4">
        <div className={levelClass[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Harga Stop Loss</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${levelText[r.riskLevel]}`}>{r.slPrice.toFixed(5)}</div>
          <p className={`text-sm ${levelText[r.riskLevel]}`}>{r.slPips} pips dari entry</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Ukuran Posisi', `${r.lotSize} Lot`], ['Modal Berisiko', fmt(r.modalBerisiko)], ['ATR × Multiplier', `${atr} × ${mult} = ${r.slPips} pips`]].map(([l,v]) => (
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
