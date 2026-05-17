import type { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, Shield, Zap, Users } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Tentang FincTools | Tools Keuangan & Investasi Indonesia',
  description: 'FincTools adalah platform 46 tools keuangan dan investasi gratis berbasis kalkulasi matematika untuk investor dan trader Indonesia.',
}

export default function About() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12">

        {/* Hero */}
        <div className="mb-12">
          <h1 className="font-heading text-3xl font-bold text-[--text-primary] mb-4">
            Tentang FincTools
          </h1>
          <p className="text-[--text-secondary] leading-relaxed text-base">
            FincTools adalah platform tools keuangan dan investasi gratis untuk komunitas investor dan trader Indonesia. Semua kalkulasi berbasis logika dan matematika — tidak ada koneksi data eksternal, tidak perlu akun, tidak ada biaya.
          </p>
        </div>

        {/* Nilai Utama */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {[
            {
              icon: Calculator,
              title: 'Berbasis Matematika',
              desc: 'Setiap tools menggunakan formula keuangan yang terverifikasi. Hasilnya objektif, konsisten, dan bisa diaudit.',
            },
            {
              icon: Shield,
              title: 'Privasi Terjaga',
              desc: 'Semua kalkulasi berjalan di browser kamu. Tidak ada data yang dikirim ke server. Tidak ada yang disimpan.',
            },
            {
              icon: Zap,
              title: 'Gratis Selamanya',
              desc: '46 tools tersedia gratis tanpa batas. Tidak perlu daftar akun atau berlangganan untuk menggunakan apapun.',
            },
            {
              icon: Users,
              title: 'Untuk Investor Indonesia',
              desc: 'Dirancang khusus untuk konteks keuangan Indonesia — regulasi pajak, instrumen SBN, pasar IDX, dan mata uang Rupiah.',
            },
          ].map(item => (
            <div key={item.title} className="finc-card">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg shrink-0">
                  <item.icon size={18} className="text-finc-green" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[--text-primary] mb-1">{item.title}</p>
                  <p className="text-xs text-[--text-secondary] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 46 Tools */}
        <div className="mb-12">
          <h2 className="font-heading text-xl font-bold text-[--text-primary] mb-4">46 Tools, 7 Kategori</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { nama: 'Trading', jumlah: 13, href: '/trading', desc: 'Risk manager, position sizing, analisa performa' },
              { nama: 'Pajak', jumlah: 7, href: '/pajak', desc: 'PPh 21, THR, freelancer, investasi, UMKM, PPN' },
              { nama: 'Investasi', jumlah: 8, href: '/investasi', desc: 'DCA, SBN, obligasi, emas, dividen, DRIP' },
              { nama: 'Personal Finance', jumlah: 8, href: '/personal-finance', desc: 'FIRE, dana darurat, inflasi, budget, net worth' },
              { nama: 'Kredit & Properti', jumlah: 6, href: '/kredit-properti', desc: 'KPR, refinancing, buy vs rent, rental yield' },
              { nama: 'Saham', jumlah: 3, href: '/saham', desc: 'Averaging, entry price, break-even' },
              { nama: 'Kripto', jumlah: 5, href: '/kripto', desc: 'DCA, staking, risk manager, likuidasi, funding' },
            ].map(k => (
              <Link key={k.nama} href={k.href} className="finc-card-hover group">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-[--text-primary] group-hover:text-finc-green transition-colors">{k.nama}</p>
                      <span className="text-xs text-finc-green font-medium">{k.jumlah} tools</span>
                    </div>
                    <p className="text-xs text-[--text-secondary]">{k.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Filosofi */}
        <div className="mb-12">
          <h2 className="font-heading text-xl font-bold text-[--text-primary] mb-4">Filosofi Kami</h2>
          <div className="space-y-3 text-sm text-[--text-secondary] leading-relaxed">
            <p>Di era AI search, banyak konten bisa digantikan mesin. Tapi tools berbasis kalkulasi tidak — karena pengguna butuh output yang dipersonalisasi dari data mereka sendiri, bukan sekadar jawaban teks generik.</p>
            <p>FincTools dibangun di atas prinsip bahwa keputusan keuangan yang lebih baik dimulai dari kalkulasi yang akurat dan mudah diakses oleh siapapun, tanpa biaya, tanpa akun, tanpa hambatan.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="finc-card bg-[--bg-primary] text-center py-8">
          <h2 className="font-heading text-xl font-bold text-[--text-primary] mb-2">Mulai Gunakan Tools</h2>
          <p className="text-sm text-[--text-secondary] mb-5">Semua 46 tools tersedia gratis. Tidak perlu daftar.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-finc-green hover:bg-emerald-600 text-white rounded-xl font-semibold text-sm transition-all">
            Lihat Semua Tools
          </Link>
        </div>

      </main>
      <Footer />
    </>
  )
}
