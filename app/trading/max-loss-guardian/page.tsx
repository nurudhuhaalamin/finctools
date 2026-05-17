import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import TradingToolPage from '@/components/layout/TradingToolPage'
import MaxLossGuardian from '@/components/tools/trading/MaxLossGuardian'
export const metadata: Metadata = { title: 'Max Loss Guardian — Batas Loss Harian & Mingguan | FincTools', description: 'Hitung batas maksimum kerugian harian dan mingguan yang aman. Lindungi modal dari overtrading dan keputusan impulsif akibat kerugian beruntun.' }
export default function Page() {
  return (<><Header /><main className="mx-auto max-w-4xl px-4 py-8"><nav className="flex items-center gap-1 text-xs text-[--text-secondary] mb-6"><Link href="/" className="hover:text-finc-green transition-colors">Home</Link><ChevronRight size={12} /><Link href="/trading" className="hover:text-finc-green transition-colors">Trading</Link><ChevronRight size={12} /><span className="text-[--text-primary] font-medium">Max Loss Guardian</span></nav>
  <TradingToolPage name="Max Loss Guardian" description="Max Loss Guardian menghitung batas kerugian harian dan mingguan yang tidak boleh dilampaui. Tool ini membantu trader menjaga disiplin dan mencegah overtrading yang sering terjadi setelah serangkaian kekalahan."
    steps={[{title:'Isi Modal Akun',desc:'Masukkan total modal trading kamu saat ini.'},{title:'Set Batas Loss Harian',desc:'Tentukan persentase maksimum modal yang boleh hilang dalam satu hari trading. Standar: 2–3%.'},{title:'Set Batas Loss Mingguan',desc:'Tentukan batas loss dalam satu minggu. Biasanya 2x dari batas harian.'},{title:'Isi Risiko per Trade',desc:'Masukkan persentase risiko per trade kamu untuk mengetahui berapa maksimum trade yang boleh dilakukan.'},{title:'Patuhi Hasilnya',desc:'Ketika batas harian tercapai — berhenti trading hari itu. Tidak ada pengecualian.'}]}
    formula={`Max Loss Harian   = Modal × % Batas Harian
Max Loss Mingguan = Modal × % Batas Mingguan
Max Trade/Hari    = Max Loss Harian ÷ (Modal × % Risiko per Trade)
Max Trade/Minggu  = Max Loss Mingguan ÷ (Modal × % Risiko per Trade)`}
    formulaExample={`Contoh: Modal Rp 10.000.000 | Batas Harian 3% | Risiko/Trade 1%
Max Loss Harian = Rp 300.000
Max Trade/Hari  = 300.000 ÷ 100.000 = 3 trade`}
    variables={[{name:'Batas Harian',desc:'Persentase maksimum modal yang boleh hilang dalam satu hari'},{name:'Batas Mingguan',desc:'Persentase maksimum modal yang boleh hilang dalam satu minggu'},{name:'Max Trade/Hari',desc:'Jumlah maksimum trade yang boleh diambil dalam satu hari jika semua loss'},{name:'Max Trade/Minggu',desc:'Jumlah maksimum trade dalam satu minggu jika semua loss'}]}
    history={`Konsep daily loss limit pertama kali diterapkan secara formal di institusi keuangan besar seperti Goldman Sachs dan Morgan Stanley pada tahun 1990-an sebagai respons terhadap serangkaian bencana trading yang terjadi akibat trader yang terus menambah posisi setelah loss besar.

Kasus paling terkenal adalah Nick Leeson yang menghancurkan Barings Bank pada 1995 dengan kerugian lebih dari $1 miliar — sebagian besar karena tidak ada mekanisme daily loss limit yang memaksanya berhenti saat kerugian sudah melampaui batas wajar.

Setelah kejadian tersebut, hampir semua institusi keuangan menerapkan aturan ketat tentang daily P&L limit. Van K. Tharp kemudian mempopulerkan konsep ini untuk trader ritel melalui buku dan seminarnya, menekankan bahwa trading tanpa daily loss limit sama dengan menyetir tanpa sabuk pengaman.`}
    interpretation={[{range:'< 2%/hari',label:'🟢 Konservatif',desc:'Perlindungan kuat — cocok untuk trader pemula'},{range:'2–3%/hari',label:'🟢 Standar',desc:'Keseimbangan antara fleksibilitas dan perlindungan'},{range:'3–6%/hari',label:'🟡 Agresif',desc:'Perlu disiplin ekstra — risiko overtrading tinggi'},{range:'> 6%/hari',label:'🔴 Berbahaya',desc:'Batas terlalu longgar — tidak memberikan perlindungan nyata'}]}
    interpretationTitle="Panduan Menetapkan Batas Loss Harian"
    faqs={[{q:'Apa yang harus dilakukan ketika batas loss harian tercapai?',a:'Hentikan trading — tutup platform jika perlu. Jangan coba "revenge trading" untuk mendapatkan kembali kerugian. Keputusan trading yang dibuat setelah mengalami loss beruntun hampir selalu lebih buruk dari biasanya karena pengaruh emosi.'},{q:'Berapa batas loss harian yang direkomendasikan?',a:'2–3% dari total modal adalah standar yang paling umum di kalangan trader profesional. Dengan batas 2% dan risiko 1% per trade, kamu hanya boleh mengalami maksimal 2 loss beruntun dalam sehari sebelum harus berhenti.'},{q:'Apakah batas mingguan perlu ditetapkan juga?',a:'Ya, sangat perlu. Batas mingguan melindungi dari situasi di mana kamu mengalami loss di batas harian selama beberapa hari berturut-turut. Standar umum adalah 2x dari batas harian (misalnya 4–6% per minggu).'},{q:'Bagaimana jika saya sudah profit besar dan ingin trading lebih agresif?',a:'Tetap patuhi batas loss. Profit yang sudah didapatkan sama berharganya dengan modal awal — tidak ada alasan untuk mengambil risiko lebih besar hanya karena sedang dalam kondisi untung (ini disebut "playing with house money" fallacy).'}]}
    related={[{name:'Risk Manager',href:'/trading/risk-manager',desc:'Hitung ukuran posisi agar sesuai dengan batas loss yang sudah ditetapkan'},{name:'Drawdown Recovery Planner',href:'/trading/drawdown-recovery-planner',desc:'Rencanakan recovery jika batas mingguan sudah tercapai'},{name:'Trading Performance Analyzer',href:'/trading/trading-performance-analyzer',desc:'Evaluasi apakah batas loss yang kamu tetapkan sudah optimal'},{name:'Win Rate & Expectancy Tracker',href:'/trading/win-rate-expectancy-tracker',desc:'Pahami expectancy strategi untuk menetapkan batas yang realistis'}]}
    references={['Tharp, V.K. (1998). <em>Trade Your Way to Financial Freedom.</em> McGraw-Hill.','Leeson, N. (1996). <em>Rogue Trader.</em> Little, Brown.','Douglas, M. (2000). <em>Trading in the Zone.</em> Prentice Hall Press.']}
  ><MaxLossGuardian /></TradingToolPage></main><Footer /></>)
}
