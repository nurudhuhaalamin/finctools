import type { Metadata } from 'next'
import { Mail, MessageSquare, Bug, Lightbulb } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Contact | FincTools',
  description: 'Hubungi tim FincTools untuk pertanyaan, saran, laporan bug, atau kerjasama.',
}

export default function Contact() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-heading text-3xl font-bold text-[--text-primary] mb-2">Hubungi Kami</h1>
        <p className="text-[--text-secondary] mb-10 leading-relaxed">
          Ada pertanyaan, saran, atau menemukan bug? Kami senang mendengarnya.
        </p>

        {/* Topik Kontak */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {[
            {
              icon: Bug,
              title: 'Laporan Bug',
              desc: 'Temukan hasil kalkulasi yang tidak sesuai, tampilan rusak, atau fitur tidak berfungsi? Beritahu kami.',
              color: 'text-red-500',
              bg: 'bg-red-50 dark:bg-red-950/20',
            },
            {
              icon: Lightbulb,
              title: 'Saran & Ide',
              desc: 'Punya ide tools baru, fitur tambahan, atau cara membuat FincTools lebih berguna? Kami ingin tahu.',
              color: 'text-amber-500',
              bg: 'bg-amber-50 dark:bg-amber-950/20',
            },
            {
              icon: MessageSquare,
              title: 'Pertanyaan Umum',
              desc: 'Pertanyaan tentang cara menggunakan tools, interpretasi hasil, atau informasi lainnya.',
              color: 'text-blue-500',
              bg: 'bg-blue-50 dark:bg-blue-950/20',
            },
            {
              icon: Mail,
              title: 'Kerjasama',
              desc: 'Tertarik untuk kerjasama konten, sponsorship, atau partnership? Kirimkan proposal kamu.',
              color: 'text-finc-green',
              bg: 'bg-emerald-50 dark:bg-emerald-950/20',
            },
          ].map(item => (
            <div key={item.title} className="finc-card">
              <div className={`p-2 ${item.bg} rounded-lg w-fit mb-3`}>
                <item.icon size={18} className={item.color} />
              </div>
              <p className="text-sm font-semibold text-[--text-primary] mb-1">{item.title}</p>
              <p className="text-xs text-[--text-secondary] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Email */}
        <div className="finc-card text-center py-8 mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Mail size={20} className="text-finc-green" />
            <span className="text-sm font-semibold text-[--text-primary]">Email Kami</span>
          </div>
          <a
            href="mailto:hello@finctools.com"
            className="text-finc-green hover:underline font-mono text-lg font-medium"
          >
            hello@finctools.com
          </a>
          <p className="text-xs text-[--text-secondary] mt-3">
            Kami biasanya merespons dalam 1–3 hari kerja.
          </p>
        </div>

        {/* Catatan */}
        <div className="text-sm text-[--text-secondary] leading-relaxed space-y-2">
          <p className="font-medium text-[--text-primary]">Sebelum menghubungi:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Untuk pertanyaan tentang cara pakai tools, cek bagian <strong>Cara Menggunakan</strong> dan <strong>FAQ</strong> di halaman masing-masing tool</li>
            <li>Untuk pertanyaan tentang regulasi pajak dan investasi, konsultasikan dengan profesional berlisensi — kami tidak dapat memberikan saran keuangan personal</li>
            <li>Untuk bug, sertakan detail: tools mana, input apa, dan hasil yang tidak sesuai</li>
          </ul>
        </div>

      </main>
      <Footer />
    </>
  )
}
