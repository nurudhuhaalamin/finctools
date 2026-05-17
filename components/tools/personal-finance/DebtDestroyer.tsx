'use client'
import { useState } from 'react'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function DebtDestroyer() {
  const [utang, setUtang] = useState([{nama:'KPR',saldo:500_000_000,bunga:8,cicilan:4_500_000},{nama:'Kredit Mobil',saldo:150_000_000,bunga:12,cicilan:3_200_000},{nama:'Kartu Kredit',saldo:15_000_000,bunga:24,cicilan:500_000}])
  const [tambahan, setTambahan] = useState(1_000_000)
  const totalSaldo = utang.reduce((s,d)=>s+d.saldo,0)
  const totalCicilan = utang.reduce((s,d)=>s+d.cicilan,0)
  const avalanche = [...utang].sort((a,b)=>b.bunga-a.bunga)
  const snowball = [...utang].sort((a,b)=>a.saldo-b.saldo)
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="finc-card">
          <p className="text-xs font-semibold text-[--text-secondary] mb-2">Total Utang</p>
          <div className="font-mono font-bold text-2xl text-red-500">{fmt(totalSaldo)}</div>
        </div>
        <div className="finc-card">
          <p className="text-xs font-semibold text-[--text-secondary] mb-2">Total Cicilan/Bulan</p>
          <div className="font-mono font-bold text-2xl text-[--text-primary]">{fmt(totalCicilan)}</div>
        </div>
      </div>
      <div><label className="finc-label">Tambahan Pembayaran/Bulan (Rp)</label><input type="number" value={tambahan} onChange={e=>setTambahan(Number(e.target.value))} className="finc-input font-mono"/></div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="finc-card border-red-100 dark:border-red-900">
          <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-3">🔥 Metode Avalanche (Hemat Bunga)</p>
          <p className="text-xs text-[--text-secondary] mb-3">Lunasi bunga tertinggi duluan</p>
          {avalanche.map((d,i)=><div key={d.nama} className="flex items-center gap-2 mb-2"><span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 text-xs font-bold flex items-center justify-center shrink-0">{i+1}</span><div className="flex-1"><p className="text-xs font-medium text-[--text-primary]">{d.nama}</p><p className="text-2xs text-[--text-secondary]">{d.bunga}% bunga · {fmt(d.saldo)}</p></div></div>)}
        </div>
        <div className="finc-card border-blue-100 dark:border-blue-900">
          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">⛄ Metode Snowball (Motivasi)</p>
          <p className="text-xs text-[--text-secondary] mb-3">Lunasi saldo terkecil duluan</p>
          {snowball.map((d,i)=><div key={d.nama} className="flex items-center gap-2 mb-2"><span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0">{i+1}</span><div className="flex-1"><p className="text-xs font-medium text-[--text-primary]">{d.nama}</p><p className="text-2xs text-[--text-secondary]">{fmt(d.saldo)} saldo · {d.bunga}% bunga</p></div></div>)}
        </div>
      </div>
    </div>
  )
}
