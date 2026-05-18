import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight, TrendingUp, BarChart2, FileText, Wallet, Bitcoin, Globe, Activity } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ArticleCard from '@/components/blog/ArticleCard'
import { artikelDatabase, kategoriConfig, getAllKategori, getArtikelByKategori, getArtikelTerbaru } from '@/lib/blog/articles'
import type { KategoriArtikel } from '@/lib/blog/types'

export const metadata: Metadata = {
  title: 'Artikel Keuangan & Investasi | FincTools',
  description: 'Artikel panduan investasi, trading, pajak, keuangan pribadi, saham, kripto, dan ekonomi pasar untuk investor Indonesia.',
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

export default function ArtikelPage() {
  const semua = getAllKategori()
  const terbaru = getArtikelTerbaru(6)

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
              <BookOpen size={22} className="text-finc-green" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-[--text-primary]">Artikel</h1>
              <p className="text-sm text-[--text-secondary]">{artikelDatabase.length} artikel · 7 kategori</p>
            </div>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-4">Kategori</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {semua.map(k => {
              const config = kategoriConfig[k]
              const jumlah = getArtikelByKategori(k).length
              const Ikon = ikonKategori[k]
              return (
                <Link key={k} href={`/artikel/${k}`}
                  className="group p-4 rounded-xl border border-[--border]
                             hover:border-finc-green/40 bg-[--bg-card] transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo}`}>
                      <Ikon size={14} className="text-white" />
                    </div>
                    <p className="text-sm font-semibold text-[--text-primary] group-hover:text-finc-green transition-colors">
                      {config.nama}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-[--text-secondary]">{jumlah} artikel</p>
                    <ArrowRight size={12} className="text-[--text-secondary] group-hover:text-finc-green transition-colors" />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-4">Artikel Terbaru</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {terbaru.map(a => <ArticleCard key={a.slug} artikel={a} showKategori={true} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
