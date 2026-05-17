import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Cookie Policy | FincTools',
  description: 'Kebijakan cookie FincTools — jenis cookie yang digunakan dan cara mengelolanya.',
}

export default function CookiePolicy() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-heading text-3xl font-bold text-[--text-primary] mb-2">Cookie Policy</h1>
        <p className="text-sm text-[--text-secondary] mb-10">Terakhir diperbarui: Mei 2025</p>

        <div className="space-y-8 text-sm text-[--text-secondary] leading-relaxed">

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">Apa itu Cookie?</h2>
            <p>Cookie adalah file teks kecil yang disimpan di perangkatmu saat mengunjungi website. Cookie membantu website mengingat preferensimu dan memberikan pengalaman yang lebih baik.</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">Cookie yang Kami Gunakan</h2>

            <div className="space-y-4 mt-3">
              <div className="finc-card">
                <p className="text-sm font-semibold text-[--text-primary] mb-1">Cookie Fungsional (Wajib)</p>
                <p>Diperlukan untuk fungsi dasar website. Tidak dapat dinonaktifkan.</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Preferensi tema (light/dark mode)</li>
                  <li>Sesi browsing</li>
                </ul>
              </div>

              <div className="finc-card">
                <p className="text-sm font-semibold text-[--text-primary] mb-1">Cookie Analitik</p>
                <p>Membantu kami memahami bagaimana pengunjung menggunakan website. Data dikumpulkan secara anonim.</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Google Analytics — halaman yang dikunjungi, durasi sesi, sumber traffic</li>
                </ul>
              </div>

              <div className="finc-card">
                <p className="text-sm font-semibold text-[--text-primary] mb-1">Cookie Iklan</p>
                <p>Digunakan oleh Google AdSense untuk menampilkan iklan yang relevan dengan minatmu.</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Google AdSense — personalisasi iklan</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">Cara Mengelola Cookie</h2>
            <p>Kamu dapat mengontrol dan menghapus cookie melalui pengaturan browser:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
            </ul>
            <p className="mt-3">Menonaktifkan cookie tertentu mungkin mempengaruhi fungsi website, namun tidak akan menghentikan kamu dari menggunakan tools kalkulasi.</p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[--text-primary] mb-3">Cookie Pihak Ketiga</h2>
            <p>Beberapa cookie ditempatkan oleh layanan pihak ketiga. Kami tidak memiliki kendali atas cookie tersebut. Silakan baca kebijakan privasi Google untuk informasi lebih lanjut tentang cookie Google Analytics dan AdSense.</p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
