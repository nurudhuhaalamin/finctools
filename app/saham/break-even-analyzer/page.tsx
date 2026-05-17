import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SahamToolPage from '@/components/layout/SahamToolPage'
import BreakEvenAnalyzer from '@/components/tools/saham/BreakEvenAnalyzer'
export const metadata: Metadata = { title: 'Break-even Analyzer | FincTools', description: 'Harga jual minimum agar balik modal setelah memperhitungkan fee beli dan fee jual broker.' }
export default function Page() {
  return (<><Header /><main className="mx-auto max-w-4xl px-4 py-8">
    <nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6"><Link href="/" className="hover:text-finc-green">Home</Link><ChevronRight size={12}/><Link href="/saham" className="hover:text-finc-green">Saham</Link><ChevronRight size={12}/><span className="text-[--text-primary] font-medium">Break-even Analyzer</span></nav>
    <SahamToolPage name="Break-even Analyzer" description="Harga jual minimum agar balik modal setelah memperhitungkan fee beli dan fee jual broker."
      steps={[{title:'Isi semua input',desc:'Masukkan data keuangan kamu pada setiap field.'},{title:'Sesuaikan parameter',desc:'Ubah nilai sesuai kondisi aktual dengan slider atau angka.'},{title:'Baca hasilnya',desc:'Hasil kalkulasi muncul real-time.'},{title:'Gunakan sebagai referensi',desc:'Konsultasikan keputusan besar dengan profesional berlisensi.'}]}
      formula="Kalkulasi menggunakan formula keuangan standar yang terverifikasi."
      variables={[{name:'Input',desc:'Variabel input disesuaikan kebutuhan tool'},{name:'Output',desc:'Hasil kalkulasi real-time berbasis formula matematika'}]}
      history={"Tool ini menggunakan prinsip keuangan yang digunakan profesional secara global.\n\nPendekatan berbasis matematika menghasilkan keputusan yang lebih objektif.\n\nFincTools menyediakan tools ini gratis untuk literasi keuangan Indonesia."}
      faqs={[{q:'Seberapa akurat hasilnya?',a:'Akurat secara matematis. Untuk keputusan besar, konsultasikan dengan profesional.'},{q:'Apakah data tersimpan?',a:'Tidak. Semua kalkulasi berjalan di browser, tidak ada data yang dikirim ke server.'},{q:'Apakah cocok untuk semua kondisi?',a:'Dirancang untuk kondisi umum. Situasi khusus mungkin perlu konsultasi profesional.'}]}
      related={[{name:'DCA Simulator',href:'/investasi/dca-simulator',desc:'Simulasi investasi rutin'},{name:'KPR Affordability Checker',href:'/kredit-properti/kpr-affordability-checker',desc:'Cek kemampuan KPR'},{name:'Tax Optimizer PPh 21',href:'/pajak/tax-optimizer-pph21',desc:'Hitung pajak karyawan'},{name:'Risk Manager',href:'/trading/risk-manager',desc:'Manajemen risiko trading'}]}
      references={['OJK. <em>Panduan Keuangan.</em> <a href="https://ojk.go.id" target="_blank" rel="noopener noreferrer" class="text-finc-green hover:underline">ojk.go.id</a>','BI. <em>Edukasi Keuangan.</em> <a href="https://bi.go.id" target="_blank" rel="noopener noreferrer" class="text-finc-green hover:underline">bi.go.id</a>']}
    ><BreakEvenAnalyzer /></SahamToolPage>
  </main><Footer /></>)
}
