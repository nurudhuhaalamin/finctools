import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import KriptoToolPage from '@/components/layout/KriptoToolPage'
import LiquidationPriceAnalyzer from '@/components/tools/kripto/LiquidationPriceAnalyzer'

export const metadata: Metadata = {
  title: 'Liquidation Price Analyzer | FincTools',
  description: 'Kalkulasi harga likuidasi posisi futures kripto berdasarkan leverage dan maintenance margin.',
}

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6">
          <Link href="/" className="hover:text-finc-green">Home</Link>
          <ChevronRight size={12} />
          <Link href="/kripto" className="hover:text-finc-green">Kripto</Link>
          <ChevronRight size={12} />
          <span className="text-[--text-primary] font-medium">Liquidation Price Analyzer</span>
        </nav>
        <KriptoToolPage
          name="Liquidation Price Analyzer"
          description="Kalkulasi harga likuidasi posisi futures kripto berdasarkan leverage dan maintenance margin. Ketahui seberapa jauh harga harus bergerak sebelum posisimu dilikuidasi."
          steps={[
            { title: 'Pilih Arah Posisi', desc: 'Pilih Long jika berharap harga naik, atau Short jika berharap harga turun.' },
            { title: 'Isi Harga Entry', desc: 'Masukkan harga aset kripto saat membuka posisi futures.' },
            { title: 'Set Leverage', desc: 'Semakin tinggi leverage, semakin dekat harga likuidasi dari entry.' },
            { title: 'Set Maintenance Margin', desc: 'Cek di exchange yang kamu gunakan. Umumnya 0.5% untuk major pairs.' },
            { title: 'Baca Hasilnya', desc: 'Harga likuidasi dan jarak persen dari entry. Merah = sangat dekat dan berbahaya.' },
          ]}
          formula={"Harga Likuidasi (Long)  = Entry × (1 - 1/Leverage + MM%)\nHarga Likuidasi (Short) = Entry × (1 + 1/Leverage - MM%)\nJarak % = |Entry - Harga Likuidasi| / Entry × 100"}
          formulaExample={"Long BTC @ Rp 900.000.000 | Leverage 10x | MM 0.5%\nHarga Likuidasi = 900jt × (1 - 0.10 + 0.005) = Rp 814.500.000\nJarak = 9.5% dari harga entry"}
          variables={[
            { name: 'Leverage', desc: 'Pengali posisi terhadap modal yang disetor sebagai margin' },
            { name: 'Maintenance Margin', desc: 'Persentase minimum margin agar posisi tidak dilikuidasi' },
            { name: 'Harga Likuidasi', desc: 'Harga di mana exchange paksa menutup posisi karena margin tidak cukup' },
            { name: 'Jarak %', desc: 'Persentase pergerakan harga dari entry hingga titik likuidasi' },
          ]}
          history={"Likuidasi dalam trading futures kripto terjadi ketika margin tidak mencukupi menanggung kerugian mark-to-market. Konsep ini diadaptasi dari pasar futures tradisional.\n\nPada crash kripto Mei 2021 dan November 2022, miliaran dolar posisi futures dilikuidasi dalam hitungan jam. Data Coinglass menunjukkan likuidasi terbesar mencapai lebih dari 8 miliar dolar dalam 24 jam.\n\nBinance, OKX, dan Bybit menggunakan rumus maintenance margin yang sedikit berbeda. Selalu verifikasi dengan kalkulator bawaan exchange yang kamu gunakan."}
          faqs={[
            {
              q: "Apa yang terjadi saat posisi dilikuidasi?",
              a: "Exchange secara paksa menutup posisimu saat margin tidak mencukupi. Semua modal di posisi tersebut bisa hilang. Setiap exchange memiliki harga likuidasi dan harga kebangkrutan berbeda.",
            },
            {
              q: "Bagaimana cara menghindari likuidasi?",
              a: "Gunakan leverage rendah maksimal 3-5x untuk pemula, pasang stop loss jauh sebelum harga likuidasi, dan jangan gunakan seluruh modal sebagai margin.",
            },
            {
              q: "Apakah tool ini berlaku untuk semua exchange kripto?",
              a: "Formula dasar berlaku universal, namun setiap exchange memiliki parameter yang sedikit berbeda. Gunakan sebagai estimasi dan verifikasi dengan kalkulator bawaan exchange.",
            },
            {
              q: "Apakah trading kripto dengan leverage direkomendasikan untuk pemula?",
              a: "Sangat tidak direkomendasikan. Leverage memperbesar keuntungan dan kerugian secara proporsional. Mulai dengan spot trading tanpa leverage terlebih dahulu.",
            },
          ]}
          related={[
            { name: 'Crypto Risk Manager', href: '/kripto/crypto-risk-manager', desc: 'Hitung position sizing yang aman untuk trading kripto' },
            { name: 'Funding Rate Cost Estimator', href: '/kripto/funding-rate-cost-estimator', desc: 'Estimasi biaya funding rate untuk posisi futures' },
            { name: 'Risk Manager', href: '/trading/risk-manager', desc: 'Versi risk manager untuk forex dan instrumen trading lain' },
            { name: 'Crypto DCA Simulator', href: '/kripto/crypto-dca-simulator', desc: 'Strategi lebih aman untuk investasi kripto jangka panjang' },
          ]}
          references={[
            'Nakamoto, S. (2008). <em>Bitcoin: A Peer-to-Peer Electronic Cash System.</em>',
            'OJK. <em>Peraturan Aset Kripto.</em> <a href="https://ojk.go.id" target="_blank" rel="noopener noreferrer" class="text-finc-green hover:underline">ojk.go.id</a>',
            'Bappebti. <em>Regulasi Perdagangan Aset Kripto.</em> <a href="https://bappebti.go.id" target="_blank" rel="noopener noreferrer" class="text-finc-green hover:underline">bappebti.go.id</a>',
          ]}
        >
          <LiquidationPriceAnalyzer />
        </KriptoToolPage>
      </main>
      <Footer />
    </>
  )
}
