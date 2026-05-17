'use client'
import { useState } from 'react'
import { CheckCircle, AlertTriangle, XCircle, ChevronRight } from 'lucide-react'
import { hitungKPR, analisaKPR } from '@/lib/calculations/property'

const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')

// ─── Komponen HasilAnalisa (inline) ───────────────────────────
function HasilAnalisa({ hasil }: { hasil: ReturnType<typeof analisaKPR> }) {
  const config = {
    baik: {
      wrap: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800',
      icon: CheckCircle,
      iconCls: 'text-emerald-500',
      diagCls: 'text-emerald-800 dark:text-emerald-300',
      badge: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300',
      label: 'Kondisi Baik',
    },
    perhatian: {
      wrap: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
      icon: AlertTriangle,
      iconCls: 'text-amber-500',
      diagCls: 'text-amber-800 dark:text-amber-300',
      badge: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300',
      label: 'Perlu Perhatian',
    },
    buruk: {
      wrap: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800',
      icon: XCircle,
      iconCls: 'text-red-500',
      diagCls: 'text-red-800 dark:text-red-300',
      badge: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300',
      label: 'Perlu Tindakan',
    },
  }
  const c = config[hasil.level]
  const Icon = c.icon
  return (
    <div className={`rounded-xl border-2 ${c.wrap} overflow-hidden`}>
      <div className={`flex items-center justify-between px-4 py-3 border-b ${c.wrap.split(' ').filter(x => x.includes('border')).join(' ')}`}>
        <div className="flex items-center gap-2">
          <Icon size={18} className={c.iconCls} />
          <span className="text-sm font-bold text-[--text-primary]">Hasil Analisa</span>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.badge}`}>{c.label}</span>
      </div>
      <div className="px-4 py-4 space-y-4">
        <p className={`text-sm font-semibold leading-snug ${c.diagCls}`}>{hasil.diagnosa}</p>
        <p className="text-sm text-[--text-secondary] leading-relaxed">{hasil.penjelasan}</p>
        <div>
          <p className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wider mb-2">
            Yang Bisa Kamu Lakukan
          </p>
          <ul className="space-y-2">
            {hasil.rekomendasi.map((r, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <ChevronRight size={14} className={`${c.iconCls} shrink-0 mt-0.5`} />
                <span className="text-sm text-[--text-secondary] leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

// ─── Komponen Utama ───────────────────────────────────────────
export default function KPRAffordabilityChecker() {
  const [ph,    setPh]    = useState(15_000_000)
  const [lain,  setLain]  = useState(2_000_000)
  const [rate,  setRate]  = useState(10)
  const [tenor, setTenor] = useState(20)
  const [dp,    setDp]    = useState(20)

  const [hasil,   setHasil]   = useState<ReturnType<typeof hitungKPR> | null>(null)
  const [analisa, setAnalisa] = useState<ReturnType<typeof analisaKPR> | null>(null)

  const handleHitung = () => {
    const r = hitungKPR(ph, lain, rate, tenor, dp)
    const a = analisaKPR(ph, lain, rate, tenor, dp, r.dtiRatio, r.maxHargaProperti)
    setHasil(r)
    setAnalisa(a)
    setTimeout(() => {
      document.getElementById('kpr-hasil')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleReset = () => {
    setHasil(null)
    setAnalisa(null)
  }

  return (
    <div className="space-y-5">
      {/* Input */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="finc-label">Penghasilan Bersih/Bulan (Rp)</label>
          <input type="number" value={ph}
            onChange={e => { setPh(Number(e.target.value)); handleReset() }}
            className="finc-input font-mono" />
        </div>
        <div>
          <label className="finc-label">Total Cicilan Lain/Bulan (Rp)</label>
          <input type="number" value={lain}
            onChange={e => { setLain(Number(e.target.value)); handleReset() }}
            className="finc-input font-mono" />
          <p className="text-xs text-[--text-secondary] mt-1">Cicilan motor, kartu kredit, KTA, dll</p>
        </div>
        <div>
          <label className="finc-label">Bunga KPR: {rate}% per tahun</label>
          <input type="range" min={5} max={20} step={0.5} value={rate}
            onChange={e => { setRate(Number(e.target.value)); handleReset() }}
            className="w-full accent-emerald-500" />
        </div>
        <div>
          <label className="finc-label">Tenor: {tenor} tahun</label>
          <input type="range" min={5} max={30} step={5} value={tenor}
            onChange={e => { setTenor(Number(e.target.value)); handleReset() }}
            className="w-full accent-emerald-500" />
        </div>
        <div className="md:col-span-2">
          <label className="finc-label">Down Payment: {dp}%</label>
          <input type="range" min={10} max={50} step={5} value={dp}
            onChange={e => { setDp(Number(e.target.value)); handleReset() }}
            className="w-full accent-emerald-500" />
        </div>
      </div>

      {/* Tombol */}
      <button onClick={handleHitung}
        className="w-full py-3.5 rounded-xl bg-finc-green hover:bg-emerald-600
                   text-white font-semibold text-sm transition-all shadow-sm active:scale-[0.99]">
        Hitung &amp; Analisa
      </button>

      {/* Hasil */}
      {hasil && analisa && (
        <div id="kpr-hasil" className="space-y-4 pt-1">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[--border]" />
            <span className="text-xs text-[--text-secondary] font-medium">Hasil Kalkulasi</span>
            <div className="flex-1 h-px bg-[--border]" />
          </div>

          <div className={hasil.status === 'sehat' ? 'finc-result-good' : hasil.status === 'perhatian' ? 'finc-result-warn' : 'finc-result-danger'}>
            <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">
              Harga Properti Maksimum
            </p>
            <div className={`font-mono font-bold text-4xl tracking-tight mb-1
              ${hasil.status === 'sehat' ? 'text-emerald-600 dark:text-emerald-400'
                : hasil.status === 'perhatian' ? 'text-amber-600 dark:text-amber-400'
                : 'text-red-600 dark:text-red-400'}`}>
              {fmt(hasil.maxHargaProperti)}
            </div>
            <p className={`text-sm ${hasil.status === 'sehat' ? 'text-emerald-600 dark:text-emerald-400'
              : hasil.status === 'perhatian' ? 'text-amber-600 dark:text-amber-400'
              : 'text-red-600 dark:text-red-400'}`}>
              DTI: {hasil.dtiRatio}% dari penghasilan
            </p>
          </div>

          <div className="finc-card space-y-3">
            {[
              ['Max Cicilan KPR/bulan', fmt(hasil.maxCicilanKPR)],
              ['Max Pinjaman', fmt(hasil.maxPinjaman)],
              ['DP yang Dibutuhkan', fmt(hasil.dpDibutuhkan)],
              ['Debt-to-Income Ratio', `${hasil.dtiRatio}%`],
            ].map(([l, v]) => (
              <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
                <span className="text-xs text-[--text-secondary]">{l}</span>
                <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[--border]" />
            <span className="text-xs text-[--text-secondary] font-medium">Hasil Analisa</span>
            <div className="flex-1 h-px bg-[--border]" />
          </div>

          <HasilAnalisa hasil={analisa} />

          <button onClick={handleReset}
            className="w-full py-2.5 rounded-xl border border-[--border]
                       text-[--text-secondary] text-sm font-medium
                       hover:border-finc-green hover:text-finc-green transition-all">
            Ubah Input &amp; Hitung Ulang
          </button>
        </div>
      )}
    </div>
  )
}
