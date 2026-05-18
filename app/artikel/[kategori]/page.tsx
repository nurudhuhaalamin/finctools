import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ArticleCard from '@/components/blog/ArticleCard'
import { kategoriConfig, getArtikelByKategori, getAllKategori } from '@/lib/blog/articles'
import type { KategoriArtikel } from '@/lib/blog/types'

interface Props { params: { kategori: string } }

export async function generateStaticParams() {
  return getAllKategori().map(k => ({ kategori: k }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const config = kategoriConfig[params.kategori as KategoriArtikel]
  if (!config) return { title: 'Not Found' }
  return { title: `Artikel ${config.nama} | FincTools`, description: config.deskripsi }
}

export default function KategoriArtikelPage({ params }: Props) {
  const k = params.kategori as KategoriArtikel
  const config = kategoriConfig[k]
  if (!config) notFound()
  const artikels = getArtikelByKategori(k)
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6">
          <Link href="/" className="hover:text-finc-green">Home</Link>
          <ChevronRight size={12} />
          <Link href="/artikel" className="hover:text-finc-green">Artikel</Link>
          <ChevronRight size={12} />
          <span className="text-[--text-primary] font-medium">{config.nama}</span>
        </nav>

        <div className={`h-24 rounded-2xl bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo}
                          flex items-center px-6 mb-8`}>
          <div>
            <h1 className="font-heading text-2xl font-bold text-white mb-1">Artikel {config.nama}</h1>
            <p className="text-sm text-white/80">{artikels.length} artikel tersedia</p>
          </div>
        </div>

        {artikels.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {artikels.map(a => <ArticleCard key={a.slug} artikel={a} showKategori={false} />)}
          </div>
        ) : (
          <div className="text-center py-16 text-sm text-[--text-secondary]">Artikel segera hadir.</div>
        )}

        {config.toolHref && (
          <div className="mt-8 pt-6 border-t border-[--border]">
            <Link href={config.toolHref} className="text-sm text-finc-green hover:underline">
              Lihat tools {config.nama} →
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
