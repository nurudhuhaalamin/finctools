import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Terms of Use | FincTools',
  description: 'Syarat dan ketentuan penggunaan FincTools.',
}

export default function TermsOfUse() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-heading text-3xl font-bold text-[--text-primary] mb-2">Terms of Use</h1>
        <p className="text-sm text-[--text-secondary] mb-10">Terakhir diperbarui: Mei 2025</p>

        <div className="space-y-8 text-sm text-[--text-secondary] leading-relaxed">

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">1. Penerimaan Syarat</h2>
            <p>Dengan mengakses dan menggunakan FincTools, kamu menyetujui syarat dan ketentuan ini. Jika tidak setuju, mohon untuk tidak menggunakan layanan kami.</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">2. Sifat Layanan</h2>
            <p>FincTools menyediakan tools kalkulasi keuangan dan investasi untuk tujuan edukasi dan perencanaan awal. Semua hasil kalkulasi bersifat estimasi matematis dan tidak merupakan saran keuangan, investasi, pajak, atau hukum yang profesional.</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">3. Batasan Penggunaan</h2>
            <p>Kamu setuju untuk tidak:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Menggunakan website untuk tujuan ilegal atau melanggar hukum</li>
              <li>Mencoba mengakses sistem atau data yang tidak diotorisasi</li>
              <li>Menyebarkan konten berbahaya atau menyesatkan melalui platform kami</li>
              <li>Melakukan scraping otomatis yang berlebihan</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">4. Hak Kekayaan Intelektual</h2>
            <p>Seluruh konten FincTools termasuk desain, kode, teks, dan grafik adalah milik FincTools dan dilindungi hak cipta. Penggunaan untuk keperluan pribadi diperbolehkan. Reproduksi komersial tanpa izin tertulis tidak diperbolehkan.</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">5. Penafian Tanggung Jawab</h2>
            <p>FincTools disediakan "sebagaimana adanya" tanpa jaminan apapun. Kami tidak bertanggung jawab atas keputusan finansial yang diambil berdasarkan hasil kalkulasi tools kami. Selalu konsultasikan keputusan finansial penting dengan profesional berlisensi.</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">6. Perubahan Layanan</h2>
            <p>Kami berhak mengubah, menambah, atau menghentikan fitur apapun sewaktu-waktu tanpa pemberitahuan sebelumnya.</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">7. Hubungi Kami</h2>
            <p>Pertanyaan terkait syarat penggunaan dapat disampaikan melalui halaman <Link href="/contact" className="text-finc-green hover:underline">Contact</Link>.</p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
