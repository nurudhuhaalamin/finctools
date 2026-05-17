'use client'
import { useState, useMemo } from 'react'
import { Copy, Check } from 'lucide-react'
import { hitungTradeAnalyzer } from '@/lib/calculations/trading'

const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
const levelClass = { good: 'finc-result-good', moderate: 'finc-result-warn', bad: 'finc-result-danger' }
const levelText  = { good: 'text-emerald-600 dark:text-emerald-400', moderate: 'text-amber-600 dark:text-amber-400', bad: 'text-red-600 dark:text-red-400' }

function NumInput({ label, value, onChange, step = 0.0001, placeholder = '0' }: { label: string; value: number; onChange: (v: number) => void; step?: number; placeholder?: string }) {
  return (
    <div>
      <label className="finc-label">{label}</label>
      <input type="number" step={step} value={value || ''} onChange={e => onChange(Number(e.target.value))} placeholder={placeholder} className="finc-input font-mono" />
    </div>
  )
}

export default function TradeAnalyzer() {
  const [entry, setEntry]   = useState(1.1000)
  const [sl,    setSl]      = useState(1.0950)
  const [tp,    setTp]      = useState(1.1100)
  const [lot,   setLot]     = useState(0.1)
  const [pip,   setPip]     = useState(10)
  const [copied, setCopied] = useState(false)
  const r = useMemo(() => hitungTradeAnalyzer({ entryPrice: entry, stopLoss: sl, takeProfit: tp, lotSize: lot, pipValue: pip }), [entry, sl, tp, lot, pip])
  const copy = () => { navigator.clipboard.writeText(`FincTools Trade Analyzer\nR/R: 1:${r.rrRatio}\nPotensi Profit: ${fmt(r.potensiProfit)}\nPotensi Loss: ${fmt(r.potensiLoss)}`); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <NumInput label="Entry Price" value={entry} onChange={setEntry} />
        <NumInput label="Stop Loss" value={sl} onChange={setSl} />
        <NumInput label="Take Profit" value={tp} onChange={setTp} />
        <NumInput label="Lot Size" value={lot} onChange={setLot} step={0.01} placeholder="0.1" />
        <NumInput label="Pip Value (Rp/pip per 0.01 lot)" value={pip} onChange={setPip} step={1} placeholder="10" />
      </div>
      <div className="space-y-4">
        <div className={levelClass[r.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Risk/Reward Ratio</p>
          <div className={`font-mono font-bold text-5xl tracking-tight mb-1 ${levelText[r.riskLevel]}`}>1 : {r.rrRatio}</div>
          <p className={`text-sm font-medium ${levelText[r.riskLevel]}`}>{r.label}</p>
        </div>
        <div className="finc-card space-y-3">
          {[
            ['Risk Pips', `${r.riskPips} pips`],
            ['Reward Pips', `${r.rewardPips} pips`],
            ['Potensi Profit', fmt(r.potensiProfit)],
            ['Potensi Loss', fmt(r.potensiLoss)],
          ].map(([l, v]) => (
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
        <button onClick={copy} className="finc-btn w-full justify-center">{copied ? <><Check size={14}/>Tersalin!</> : <><Copy size={14}/>Salin Hasil</>}</button>
        <div className="finc-disclaimer"><span>⚠️</span><span>Hanya untuk tujuan edukasi. Bukan saran trading.</span></div>
      </div>
    </div>
  )
}
