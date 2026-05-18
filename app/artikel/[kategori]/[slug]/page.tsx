import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ArticleLayout from '@/components/blog/ArticleLayout'
import { getArtikelBySlug, getArtikelByKategori, artikelDatabase } from '@/lib/blog/articles'
import type { KategoriArtikel } from '@/lib/blog/types'

interface Props { params: { kategori: string; slug: string } }

export async function generateStaticParams() {
  return artikelDatabase.map(a => ({ kategori: a.kategori, slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artikel = getArtikelBySlug(params.slug)
  if (!artikel) return { title: 'Not Found' }
  return { title: `${artikel.judul} | FincTools`, description: artikel.ringkasan }
}

export default function ArtikelDetailPage({ params }: Props) {
  const artikel = getArtikelBySlug(params.slug)
  if (!artikel || artikel.kategori !== params.kategori) notFound()
  const terkait = getArtikelByKategori(artikel.kategori as KategoriArtikel)
    .filter(a => a.slug !== artikel.slug).slice(0, 2)
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <ArticleLayout artikel={artikel} artikelTerkait={terkait} />
      </main>
      <Footer />
    </>
  )
}
