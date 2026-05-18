'use client'
import Link from 'next/link'
import { Clock, TrendingUp, BarChart2, FileText, Wallet, Bitcoin, Globe, Activity } from 'lucide-react'
import type { Artikel, KategoriArtikel } from '@/lib/blog/types'
import { kategoriConfig } from '@/lib/blog/types'

interface ArticleCardProps {
  artikel: Artikel
  showKategori?: boolean
}

const ikonKategori: Record<KategoriArtikel, React.ElementType> = {
  investasi: TrendingUp,
  'saham-bursa': BarChart2,
  trading: Activity,
  pajak: FileText,
  'keuangan-pribadi': Wallet,
  kripto: Bitcoin,
  'ekonomi-pasar': Globe,
}

function formatTanggal(tanggal: string): string {
  return new Date(tanggal).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

export default function ArticleCard({ artikel, showKategori = true }: ArticleCardProps) {
  const href = `/artikel/${artikel.kategori}/${artikel.slug}`
  const config = kategoriConfig[artikel.kategori]
  const Ikon = ikonKategori[artikel.kategori] || TrendingUp

  return (
    <Link href={href} className="group block rounded-xl overflow-hidden border border-[--border]
                                  hover:border-finc-green/40 hover:shadow-lg transition-all duration-200">
      <div className={`relative h-32 bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo}
                       flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 right-2 w-16 h-16 rounded-full border-2 border-white" />
          <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full border border-white" />
        </div>
        <div className="relative z-10 p-3 bg-white/20 rounded-xl backdrop-blur-sm">
          <Ikon size={24} className="text-white" />
        </div>
        {showKategori && (
          <div className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1
                           bg-white/20 backdrop-blur-sm text-white rounded-full">
            {config.nama}
          </div>
        )}
        <div className="absolute top-3 right-3 flex items-center gap-1
                         text-xs text-white/80 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
          <Clock size={10} />
          <span>{artikel.waktuBaca} mnt</span>
        </div>
      </div>
      <div className="p-4 bg-[--bg-card]">
        <h3 className="text-sm font-bold text-[--text-primary] leading-snug mb-2
                       group-hover:text-finc-green transition-colors line-clamp-2">
          {artikel.judul}
        </h3>
        <p className="text-xs text-[--text-secondary] leading-relaxed line-clamp-2 mb-3">
          {artikel.ringkasan}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-[--text-secondary]">{formatTanggal(artikel.tanggal)}</span>
          <span className="text-xs font-medium text-finc-green opacity-0 group-hover:opacity-100 transition-opacity">
            Baca →
          </span>
        </div>
      </div>
    </Link>
  )
}
