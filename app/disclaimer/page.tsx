import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Disclaimer | FincTools',
  description: 'Disclaimer FincTools — batasan dan tanggung jawab penggunaan tools keuangan.',
}

export default function Disclaimer() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-heading text-3xl font-bold text-[--text-primary] mb-2">Disclaimer</h1>
        <p className="text-sm text-[--text-secondary] mb-10">Terakhir diperbarui: Mei 2025</p>

        <div className="space-y-8 text-sm text-[--text-secondary] leading-relaxed">

          <div className="finc-card bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <p className="text-amber-800 dark:text-amber-300 font-medium text-sm">
              FincTools adalah platform tools kalkulasi keuangan untuk tujuan edukasi. Hasil dari tools kami bukan merupakan saran investasi, keuangan, pajak, atau hukum profesional.
            </p>
          </div>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">Bukan Saran Investasi</h2>
            <p>Seluruh konten, kalkulasi, dan hasil yang ditampilkan di FincTools bersifat informatif dan edukatif semata. Tidak ada yang di website ini yang merupakan rekomendasi untuk membeli, menjual, atau menahan instrumen investasi apapun.</p>
            <p className="mt-3">Keputusan investasi harus dibuat berdasarkan riset mandiri dan konsultasi dengan penasihat keuangan berlisensi yang memahami situasi finansial pribadimu.</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">Akurasi Kalkulasi</h2>
            <p>Kami berusaha memastikan akurasi formula matematika yang digunakan. Namun hasil kalkulasi bergantung sepenuhnya pada data yang kamu masukkan. Perubahan regulasi, kondisi pasar, atau kebijakan lembaga keuangan dapat membuat hasil berbeda dari kenyataan.</p>
            <p className="mt-3">Untuk keputusan keuangan penting seperti KPR, investasi besar, atau perencanaan pajak, selalu verifikasi dengan sumber resmi atau profesional berlisensi.</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">Investasi Mengandung Risiko</h2>
            <p>Semua bentuk investasi mengandung risiko termasuk kemungkinan kehilangan sebagian atau seluruh modal. Kinerja masa lalu tidak menjamin kinerja masa depan. Estimasi return yang digunakan dalam tools kami adalah proyeksi berdasarkan data historis, bukan jaminan.</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">Informasi Pajak</h2>
            <p>Tools pajak di FincTools didasarkan pada peraturan perpajakan Indonesia yang berlaku saat ini. Regulasi pajak dapat berubah. Untuk keperluan pelaporan pajak resmi, konsultasikan dengan konsultan pajak berlisensi atau Kantor Pelayanan Pajak terdekat.</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">Aset Kripto</h2>
            <p>Aset kripto bersifat sangat volatil dan tidak diregulasi sepenuhnya di Indonesia. Tools kripto di FincTools hanya untuk tujuan kalkulasi dan edukasi. Investasi kripto dapat mengakibatkan kehilangan seluruh modal.</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">Batasan Tanggung Jawab</h2>
            <p>FincTools dan pengelolanya tidak bertanggung jawab atas kerugian finansial, kehilangan data, atau kerugian lainnya yang timbul dari penggunaan atau ketidakmampuan menggunakan layanan ini, termasuk keputusan yang diambil berdasarkan hasil kalkulasi tools kami.</p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
