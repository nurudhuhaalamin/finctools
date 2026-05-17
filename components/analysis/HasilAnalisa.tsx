'use client'
import { CheckCircle, AlertTriangle, XCircle, ChevronRight } from 'lucide-react'
import type { HasilAnalisisItem } from '@/lib/analysis/kpr-analysis'

interface HasilAnalisaProps {
  hasil: HasilAnalisisItem
  judul?: string
}

const config = {
  baik: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: CheckCircle,
    iconColor: 'text-emerald-500',
    diagnosaColor: 'text-emerald-800 dark:text-emerald-300',
    label: 'Kondisi Baik',
    labelBg: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300',
    rekomenBullet: 'bg-emerald-400',
  },
  perhatian: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-800',
    icon: AlertTriangle,
    iconColor: 'text-amber-500',
    diagnosaColor: 'text-amber-800 dark:text-amber-300',
    label: 'Perlu Perhatian',
    labelBg: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300',
    rekomenBullet: 'bg-amber-400',
  },
  buruk: {
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
    icon: XCircle,
    iconColor: 'text-red-500',
    diagnosaColor: 'text-red-800 dark:text-red-300',
    label: 'Perlu Tindakan',
    labelBg: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300',
    rekomenBullet: 'bg-red-400',
  },
}

export default function HasilAnalisa({ hasil, judul = 'Hasil Analisa' }: HasilAnalisaProps) {
  const c = config[hasil.level]
  const Icon = c.icon

  return (
    <div className={`rounded-xl border-2 ${c.bg} ${c.border} overflow-hidden`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${c.border}`}>
        <div className="flex items-center gap-2">
          <Icon size={18} className={c.iconColor} />
          <span className="text-sm font-bold text-[--text-primary]">{judul}</span>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.labelBg}`}>
          {c.label}
        </span>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Diagnosa */}
        <p className={`text-sm font-semibold leading-snug ${c.diagnosaColor}`}>
          {hasil.diagnosa}
        </p>

        {/* Penjelasan */}
        <p className="text-sm text-[--text-secondary] leading-relaxed">
          {hasil.penjelasan}
        </p>

        {/* Rekomendasi */}
        <div>
          <p className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wider mb-2">
            Yang Bisa Kamu Lakukan
          </p>
          <ul className="space-y-2">
            {hasil.rekomendasi.map((r, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <ChevronRight
                  size={14}
                  className={`${c.iconColor} shrink-0 mt-0.5`}
                />
                <span className="text-sm text-[--text-secondary] leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
