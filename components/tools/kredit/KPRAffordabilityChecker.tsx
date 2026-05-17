'use client'
import { useState } from 'react'
import { hitungKPR } from '@/lib/calculations/property'
import { analisaKPR } from '@/lib/analysis/kpr-analysis'
import HasilAnalisa from '@/components/analysis/HasilAnalisa'

const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')

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
    const a = analisaKPR({
      penghasilanBersih: ph,
      totalCicilanLain: lain,
      bungaKPR: rate,
      tenorTahun: tenor,
      dpPersen: dp,
      dtiRatio: r.dtiRatio,
      maxHargaProperti: r.maxHargaProperti,
      maxCicilanKPR: r.maxCicilanKPR,
    })
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
    <div className="space-y-6">
      {/* Input Form */}
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

      {/* Tombol Submit */}
      <button onClick={handleHitung}
        className="w-full py-3.5 rounded-xl bg-finc-green hover:bg-emerald-600
                   text-white font-semibold text-sm transition-all
                   flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]">
        Hitung &amp; Analisa
      </button>

      {/* Hasil — muncul setelah tombol ditekan */}
      {hasil && analisa && (
        <div id="kpr-hasil" className="space-y-4 pt-2">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[--border]" />
            <span className="text-xs text-[--text-secondary] font-medium">Hasil Kalkulasi</span>
            <div className="flex-1 h-px bg-[--border]" />
          </div>

          {/* Hasil Utama */}
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

          {/* Rincian */}
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

          {/* Divider Hasil Analisa */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[--border]" />
            <span className="text-xs text-[--text-secondary] font-medium">Hasil Analisa</span>
            <div className="flex-1 h-px bg-[--border]" />
          </div>

          {/* Hasil Analisa */}
          <HasilAnalisa hasil={analisa} />

          {/* Hitung Ulang */}
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
