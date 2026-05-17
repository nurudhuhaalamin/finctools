import Link from 'next/link'
import { Home, Search, ArrowRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const quickLinks = [
  { name: 'Risk Manager',        href: '/trading/risk-manager'           },
  { name: 'DCA Simulator',       href: '/investasi/dca-simulator'        },
  { name: 'Tax Optimizer PPh 21',href: '/pajak/tax-optimizer-pph21'      },
  { name: 'KPR Affordability',   href: '/kredit-properti/kpr-affordability-checker' },
]

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-20 text-center">
        <div className="font-mono text-7xl font-bold text-finc-green mb-4">404</div>
        <h1 className="font-heading text-2xl font-bold text-[--text-primary] mb-2">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-[--text-secondary] mb-8 max-w-md mx-auto">
          Halaman yang kamu cari tidak ada. Mungkin URL salah atau halaman sudah dipindahkan.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Link href="/" className="finc-btn">
            <Home size={14} /> Kembali ke Beranda
          </Link>
        </div>

        <div className="max-w-sm mx-auto">
          <p className="text-sm font-semibold text-[--text-secondary] mb-3">Tools yang mungkin kamu cari:</p>
          <div className="space-y-2">
            {quickLinks.map((l) => (
              <Link key={l.href} href={l.href}
                className="flex items-center justify-between finc-card py-3 hover:border-finc-green group">
                <span className="text-sm text-[--text-primary]">{l.name}</span>
                <ArrowRight size={13} className="text-[--text-secondary] group-hover:text-finc-green transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
