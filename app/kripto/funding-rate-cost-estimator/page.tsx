import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import KriptoToolPage from '@/components/layout/KriptoToolPage'
import FundingRateCostEstimator from '@/components/tools/kripto/FundingRateCostEstimator'

export const metadata: Metadata = {
  title: 'Funding Rate Cost Estimator | FincTools',
  description: 'Estimasi total biaya funding rate untuk posisi futures kripto yang dipertahankan beberapa hari.',
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
          <span className="text-[--text-primary] font-medium">Funding Rate Cost Estimator</span>
        </nav>
        <KriptoToolPage
          name="Funding Rate Cost Estimator"
          description="Estimasi total biaya funding rate untuk posisi futures kripto yang dipertahankan beberapa hari. Funding rate yang tinggi bisa menggerus profit secara signifikan jika posisi ditahan terlalu lama."
          steps={[
            { title: 'Isi Nilai Posisi', desc: 'Masukkan total nilai posisi futures dalam Rupiah.' },
            { title: 'Set Funding Rate', desc: 'Masukkan funding rate per periode dalam persen. Nilai positif berarti Long membayar Short, negatif sebaliknya.' },
            { title: 'Set Periode Holding', desc: 'Berapa hari posisi akan dipertahankan.' },
            { title: 'Set Frekuensi Funding', desc: 'Kebanyakan exchange besar seperti Binance dan Bybit mengenakan funding 3 kali per hari.' },
            { title: 'Baca Hasilnya', desc: 'Biaya per funding, biaya per hari, dan total biaya selama periode ditampilkan.' },
          ]}
          formula={"Biaya per Funding = Nilai Posisi × Funding Rate%\nBiaya per Hari = Biaya per Funding × Frekuensi per Hari\nTotal Biaya = Biaya per Hari × Jumlah Hari\n% dari Posisi = Total Biaya / Nilai Posisi × 100"}
          formulaExample={"Posisi Rp 10.000.000 | Rate 0.01%/periode | 7 hari | 3x/hari\nBiaya per Funding = Rp 1.000\nBiaya per Hari = Rp 3.000\nTotal 7 hari = Rp 21.000 (0.21% dari posisi)"}
          variables={[
            { name: 'Funding Rate', desc: 'Persentase biaya yang dibayarkan atau diterima per periode funding' },
            { name: 'Nilai Posisi', desc: 'Total nilai posisi futures dalam Rupiah' },
            { name: 'Frekuensi Funding', desc: 'Berapa kali funding rate dikenakan per hari' },
            { name: 'Total Biaya', desc: 'Akumulasi biaya funding selama periode holding' },
          ]}
          history={"Funding rate adalah mekanisme unik pada perpetual futures kripto yang tidak ada di pasar futures konvensional. Diperkenalkan oleh BitMEX sekitar 2016, mekanisme ini memastikan harga perpetual futures tetap mendekati harga spot.\n\nKetika pasar bullish ekstrem, Long membayar Short funding rate yang sangat tinggi. Sebaliknya saat bearish, Short yang membayar Long. Funding rate menjadi indikator sentiment pasar yang digunakan banyak trader profesional.\n\nDi Indonesia, akses perpetual futures kripto tersedia melalui exchange internasional. OJK sedang dalam proses regulasi derivatif kripto sehingga status hukumnya masih berkembang."}
          faqs={[
            {
              q: "Funding rate positif atau negatif, mana yang lebih baik?",
              a: "Tergantung posisimu. Funding positif berarti Long membayar Short — menguntungkan jika kamu Short. Funding negatif berarti Short membayar Long — menguntungkan jika kamu Long.",
            },
            {
              q: "Berapa funding rate yang normal?",
              a: "Funding rate normal umumnya sekitar 0.01% per 8 jam. Funding di atas 0.05% per 8 jam dianggap sangat bullish. Funding di bawah -0.05% per 8 jam dianggap sangat bearish.",
            },
            {
              q: "Apakah ada strategi yang memanfaatkan funding rate?",
              a: "Ada strategi yang disebut funding rate farming — mengambil posisi berlawanan untuk mengumpulkan pembayaran funding. Namun strategi ini memiliki risiko tersendiri terutama dari pergerakan harga.",
            },
            {
              q: "Apakah trading kripto dengan leverage direkomendasikan untuk pemula?",
              a: "Sangat tidak direkomendasikan. Leverage memperbesar keuntungan dan kerugian secara proporsional. Mulai dengan spot trading tanpa leverage terlebih dahulu.",
            },
          ]}
          related={[
            { name: 'Liquidation Price Analyzer', href: '/kripto/liquidation-price-analyzer', desc: 'Kalkulasi harga likuidasi posisi futures kripto' },
            { name: 'Crypto Risk Manager', href: '/kripto/crypto-risk-manager', desc: 'Hitung position sizing yang aman untuk trading kripto' },
            { name: 'Risk Manager', href: '/trading/risk-manager', desc: 'Versi risk manager untuk forex dan instrumen lain' },
            { name: 'Crypto DCA Simulator', href: '/kripto/crypto-dca-simulator', desc: 'Strategi lebih aman untuk investasi kripto jangka panjang' },
          ]}
          references={[
            'Nakamoto, S. (2008). <em>Bitcoin: A Peer-to-Peer Electronic Cash System.</em>',
            'OJK. <em>Peraturan Aset Kripto.</em> <a href="https://ojk.go.id" target="_blank" rel="noopener noreferrer" class="text-finc-green hover:underline">ojk.go.id</a>',
            'Bappebti. <em>Regulasi Perdagangan Aset Kripto.</em> <a href="https://bappebti.go.id" target="_blank" rel="noopener noreferrer" class="text-finc-green hover:underline">bappebti.go.id</a>',
          ]}
        >
          <FundingRateCostEstimator />
        </KriptoToolPage>
      </main>
      <Footer />
    </>
  )
}
