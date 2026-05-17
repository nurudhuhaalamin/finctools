'use client'

import { useState, useMemo } from 'react'
import { Copy, Check, Info } from 'lucide-react'
import { hitungRiskManager } from '@/lib/calculations/trading'

/* ─── Format helpers ─── */
const formatRp = (n: number) =>
  'Rp ' + Math.round(n).toLocaleString('id-ID')

/* ─── Tooltip ─── */
function Tip({ text }: { text: string }) {
  const [show, setShow] = useState(false)
  return (
    <span className="relative inline-flex ml-1">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onTouchStart={() => setShow(!show)}
        className="text-slate-400 hover:text-finc-green transition-colors"
      >
        <Info size={13} />
      </button>
      {show && (
        <span className="absolute left-5 -top-1 z-10 w-52 text-xs bg-navy-900 text-slate-200 rounded-lg px-3 py-2 shadow-xl">
          {text}
        </span>
      )}
    </span>
  )
}

/* ─── Slider + Number Input ─── */
function SliderInput({
  label, tip, value, min, max, step, unit, onChange,
}: {
  label: string; tip?: string; value: number
  min: number; max: number; step: number; unit: string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <label className="finc-label flex items-center">
        {label}
        {tip && <Tip text={tip} />}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min} max={max} step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="flex-1 accent-emerald-500 h-1.5 cursor-pointer"
        />
        <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900
                        border border-[--border] rounded-lg px-2 py-1.5 w-24">
          <input
            type="number"
            min={min} max={max} step={step}
            value={value}
            onChange={e => onChange(Number(e.target.value))}
            className="w-full bg-transparent text-sm font-mono text-right
                       text-[--text-primary] outline-none"
          />
          <span className="text-xs text-[--text-secondary] shrink-0">{unit}</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Currency Input ─── */
function CurrencyInput({
  label, tip, value, onChange,
}: {
  label: string; tip?: string; value: number; onChange: (v: number) => void
}) {
  const display = value ? value.toLocaleString('id-ID') : ''

  return (
    <div>
      <label className="finc-label flex items-center">
        {label}
        {tip && <Tip text={tip} />}
      </label>
      <div className="finc-input flex items-center gap-2 !py-0 !px-0 overflow-hidden">
        <span className="px-3 py-3 text-sm font-medium text-[--text-secondary]
                         bg-slate-100 dark:bg-slate-800 border-r border-[--border]
                         shrink-0">
          Rp
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={display}
          onChange={e => {
            const raw = e.target.value.replace(/\D/g, '')
            onChange(raw ? Number(raw) : 0)
          }}
          placeholder="10.000.000"
          className="flex-1 bg-transparent outline-none text-sm font-mono
                     text-[--text-primary] px-3 py-3"
        />
      </div>
    </div>
  )
}

/* ─── Result Color ─── */
const levelClass = {
  safe:     'finc-result-good',
  moderate: 'finc-result-warn',
  danger:   'finc-result-danger',
}

const levelText = {
  safe:     'text-emerald-600 dark:text-emerald-400',
  moderate: 'text-amber-600 dark:text-amber-400',
  danger:   'text-red-600 dark:text-red-400',
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function RiskManager() {
  const [modal,         setModal]         = useState(10_000_000)
  const [risiko,        setRisiko]        = useState(1)
  const [stopLoss,      setStopLoss]      = useState(50)
  const [pipValue,      setPipValue]      = useState(10)
  const [copied,        setCopied]        = useState(false)

  /* Real-time calculation */
  const result = useMemo(() =>
    hitungRiskManager({
      modal,
      risikoPercent: risiko,
      stopLossPips: stopLoss,
      pipValue,
    }),
  [modal, risiko, stopLoss, pipValue])

  /* Copy result */
  const handleCopy = () => {
    const text =
      `FincTools — Risk Manager\n` +
      `Modal: ${formatRp(modal)}\n` +
      `Risiko: ${risiko}% (${formatRp(result.modalBerisiko)})\n` +
      `Stop Loss: ${stopLoss} pips\n` +
      `Ukuran Posisi: ${result.lotSize} Lot\n` +
      `finctools.com/trading/risk-manager`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* ── INPUT PANEL ── */}
      <div className="space-y-5">
        <CurrencyInput
          label="Modal Akun"
          tip="Total modal trading kamu saat ini"
          value={modal}
          onChange={setModal}
        />

        <SliderInput
          label="Risiko per Trade"
          tip="Persentase modal yang siap kamu risikokan dalam satu trade. Standar profesional: 1–2%"
          value={risiko}
          min={0.1} max={10} step={0.1} unit="%"
          onChange={setRisiko}
        />

        <SliderInput
          label="Stop Loss"
          tip="Jarak stop loss dari entry price, diukur dalam satuan pips"
          value={stopLoss}
          min={1} max={500} step={1} unit="pips"
          onChange={setStopLoss}
        />

        <SliderInput
          label="Pip Value"
          tip="Nilai per pip per 0.01 lot dalam Rupiah. Contoh: EUR/USD dengan leverage 1:100 ≈ Rp 10/pip"
          value={pipValue}
          min={1} max={100} step={1} unit="Rp/pip"
          onChange={setPipValue}
        />
      </div>

      {/* ── OUTPUT PANEL ── */}
      <div className="space-y-4">

        {/* Main Result */}
        <div className={levelClass[result.riskLevel]}>
          <p className="text-xs font-semibold uppercase tracking-wider
                        text-[--text-secondary] mb-1">
            Ukuran Posisi
          </p>
          <div className={`font-mono font-bold text-5xl tracking-tight mb-1 ${levelText[result.riskLevel]}`}>
            {result.lotSize.toFixed(2)}
            <span className="text-xl ml-1 font-medium">Lot</span>
          </div>
          <p className={`text-sm font-medium ${levelText[result.riskLevel]}`}>
            {result.riskLabel}
          </p>
        </div>

        {/* Breakdown */}
        <div className="finc-card space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary]">
            Breakdown
          </p>

          {[
            { label: 'Modal Akun',      value: formatRp(modal)                },
            { label: 'Modal Berisiko',  value: `${formatRp(result.modalBerisiko)} (${risiko}%)` },
            { label: 'Stop Loss',       value: `${stopLoss} pips`              },
            { label: 'Pip Value',       value: `${formatRp(pipValue)}/pip`     },
          ].map(row => (
            <div key={row.label} className="flex justify-between items-center
                                             border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{row.label}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Rumus */}
        <div className="finc-card bg-slate-50 dark:bg-slate-900/50">
          <p className="text-2xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-2">
            Rumus
          </p>
          <p className="text-xs font-mono text-[--text-secondary] leading-relaxed">
            Lot = (Modal × % Risiko) ÷ (SL × Pip Value) × 0.01
          </p>
          <p className="text-xs font-mono text-finc-green mt-1">
            = ({formatRp(modal)} × {risiko}%) ÷ ({stopLoss} × {formatRp(pipValue)}) × 0.01
          </p>
          <p className="text-xs font-mono font-bold text-[--text-primary] mt-1">
            = {result.lotSize.toFixed(2)} Lot
          </p>
        </div>

        {/* Copy Button */}
        <button onClick={handleCopy} className="finc-btn w-full justify-center">
          {copied
            ? <><Check size={14} /> Tersalin!</>
            : <><Copy size={14} /> Salin Hasil</>
          }
        </button>

        {/* Disclaimer mini */}
        <div className="finc-disclaimer">
          <span>⚠️</span>
          <span>Hasil kalkulasi hanya untuk tujuan edukasi. Bukan saran investasi atau trading.</span>
        </div>
      </div>
    </div>
  )
}
