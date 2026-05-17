'use client'
import { useState, useMemo } from 'react'
import { hitungNetWorth } from '@/lib/calculations/personal-finance'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function NetWorthTracker() {
  const [kas,    setKas]    = useState(50_000_000)
  const [inv,    setInv]    = useState(100_000_000)
  const [prop,   setProp]   = useState(500_000_000)
  const [kend,   setKend]   = useState(150_000_000)
  const [lainA,  setLainA]  = useState(0)
  const [kpr,    setKpr]    = useState(400_000_000)
  const [krendL, setKrendL] = useState(50_000_000)
  const [cc,     setCc]     = useState(5_000_000)
  const [pinj,   setPinj]   = useState(0)
  const [lainL,  setLainL]  = useState(0)
  const r = useMemo(() => hitungNetWorth({kas,investasi:inv,properti:prop,kendaraan:kend,lainnya:lainA},{kpr,kendaraan:krendL,kartuKredit:cc,pinjaman:pinj,lainnya:lainL}), [kas,inv,prop,kend,lainA,kpr,krendL,cc,pinj,lainL])
  const statusColor = r.status==='sehat'?'finc-result-good':r.status==='perhatian'?'finc-result-warn':'finc-result-danger'
  const statusTxt = r.status==='sehat'?'text-emerald-600 dark:text-emerald-400':r.status==='perhatian'?'text-amber-600 dark:text-amber-400':'text-red-600 dark:text-red-400'
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wider">ASET</p>
        {[['Kas & Tabungan',kas,setKas],['Investasi',inv,setInv],['Properti',prop,setProp],['Kendaraan',kend,setKend],['Lainnya',lainA,setLainA]].map(([l,v,fn])=>(
          <div key={l as string}><label className="finc-label">{l as string} (Rp)</label><input type="number" value={v as number} onChange={e=>(fn as Function)(Number(e.target.value))} className="finc-input font-mono"/></div>
        ))}
        <p className="text-xs font-semibold text-[--text-secondary] uppercase tracking-wider pt-2">LIABILITAS</p>
        {[['KPR',kpr,setKpr],['Kredit Kendaraan',krendL,setKrendL],['Kartu Kredit',cc,setCc],['Pinjaman Lain',pinj,setPinj],['Liabilitas Lain',lainL,setLainL]].map(([l,v,fn])=>(
          <div key={l as string}><label className="finc-label">{l as string} (Rp)</label><input type="number" value={v as number} onChange={e=>(fn as Function)(Number(e.target.value))} className="finc-input font-mono"/></div>
        ))}
      </div>
      <div className="space-y-4">
        <div className={statusColor}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Net Worth</p>
          <div className={`font-mono font-bold text-4xl tracking-tight mb-1 ${statusTxt}`}>{fmt(r.netWorth)}</div>
          <p className={`text-sm ${statusTxt}`}>Debt Ratio: {r.debtRatio}% — {r.status==='sehat'?'Kondisi Sehat':r.status==='perhatian'?'Perlu Perhatian':'Kondisi Kritis'}</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Total Aset',fmt(r.totalAset)],['Total Liabilitas',fmt(r.totalLiabilitas)],['Net Worth',fmt(r.netWorth)],['Debt-to-Asset Ratio',`${r.debtRatio}%`]].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
