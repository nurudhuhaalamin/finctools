import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | FincTools',
  description: 'Kebijakan privasi FincTools — bagaimana kami mengumpulkan, menggunakan, dan melindungi data kamu.',
}

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-heading text-3xl font-bold text-[--text-primary] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[--text-secondary] mb-10">Terakhir diperbarui: Mei 2025</p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-sm text-[--text-secondary] leading-relaxed">

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">1. Informasi yang Kami Kumpulkan</h2>
            <p>FincTools tidak mengumpulkan data pribadi pengguna. Semua kalkulasi berjalan sepenuhnya di browser kamu — tidak ada data input yang dikirim ke server kami.</p>
            <p className="mt-3">Data yang dikumpulkan secara anonim melalui layanan analytics pihak ketiga (Google Analytics) meliputi:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Halaman yang dikunjungi</li>
              <li>Durasi kunjungan</li>
              <li>Jenis perangkat dan browser</li>
              <li>Negara asal kunjungan (tidak spesifik ke kota atau alamat)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">2. Penggunaan Data</h2>
            <p>Data anonim yang dikumpulkan digunakan semata-mata untuk:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Memahami tools mana yang paling banyak digunakan</li>
              <li>Meningkatkan pengalaman pengguna</li>
              <li>Mengidentifikasi dan memperbaiki masalah teknis</li>
            </ul>
            <p className="mt-3">Kami tidak menjual, menyewakan, atau membagikan data apapun kepada pihak ketiga untuk keperluan pemasaran.</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">3. Cookie</h2>
            <p>FincTools menggunakan cookie untuk:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Menyimpan preferensi tema (light/dark mode)</li>
              <li>Analitik penggunaan melalui Google Analytics</li>
              <li>Iklan yang relevan melalui Google AdSense (jika diaktifkan)</li>
            </ul>
            <p className="mt-3">Kamu dapat menonaktifkan cookie melalui pengaturan browser, namun beberapa fitur website mungkin tidak berfungsi optimal.</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">4. Layanan Pihak Ketiga</h2>
            <p>FincTools menggunakan layanan pihak ketiga berikut yang memiliki kebijakan privasi masing-masing:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Google Analytics — analitik penggunaan</li>
              <li>Google AdSense — iklan kontekstual</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">5. Keamanan Data</h2>
            <p>Karena FincTools tidak menyimpan data input pengguna, risiko kebocoran data kalkulasi tidak ada. Semua input yang kamu masukkan ke tools hanya diproses di browser lokalmu dan tidak pernah meninggalkan perangkatmu.</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">6. Perubahan Kebijakan</h2>
            <p>Kami dapat memperbarui Privacy Policy ini sewaktu-waktu. Perubahan signifikan akan diinformasikan melalui halaman ini dengan memperbarui tanggal di bagian atas.</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">7. Hubungi Kami</h2>
            <p>Pertanyaan terkait privasi dapat disampaikan melalui halaman <Link href="/contact" className="text-finc-green hover:underline">Contact</Link>.</p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
