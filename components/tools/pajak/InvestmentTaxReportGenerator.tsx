'use client'
import { useState, useMemo } from 'react'
import { Copy, Check } from 'lucide-react'
import { hitungInvestmentTax } from '@/lib/calculations/tax'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export default function InvestmentTaxReportGenerator() {
  const [saham,  setSaham]  = useState(50_000_000)
  const [depo,   setDepo]   = useState(5_000_000)
  const [oblig,  setOblig]  = useState(2_000_000)
  const [divLok, setDivLok] = useState(3_000_000)
  const [divLuar,setDivLuar]= useState(0)
  const [copied, setCopied] = useState(false)
  const r = useMemo(() => hitungInvestmentTax({ nilaiJualSaham:saham, bungaDeposito:depo, bungaObligasi:oblig, dividenLokal:divLok, dividenLuar:divLuar }), [saham, depo, oblig, divLok, divLuar])
  const copy = () => {
    const txt = r.rincian.map(x=>`${x.instrumen}: ${fmt(x.pajak)}`).join('\n') + `\nTotal PPh: ${fmt(r.totalPph)}`
    navigator.clipboard.writeText(txt); setCopied(true); setTimeout(()=>setCopied(false),2000)
  }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <p className="text-xs text-[--text-secondary]">Isi hanya instrumen yang kamu miliki. Kosongkan yang tidak ada.</p>
        <div><label className="finc-label">Nilai Jual Saham (Rp) — tarif 0.1%</label><input type="number" value={saham} onChange={e=>setSaham(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Bunga Deposito Diterima (Rp) — tarif 20%</label><input type="number" value={depo} onChange={e=>setDepo(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Bunga Obligasi (Rp) — tarif 10%</label><input type="number" value={oblig} onChange={e=>setOblig(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Dividen Saham Lokal (Rp) — tarif 10%</label><input type="number" value={divLok} onChange={e=>setDivLok(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Dividen Luar Negeri (Rp) — tarif 20%</label><input type="number" value={divLuar} onChange={e=>setDivLuar(Number(e.target.value))} className="finc-input font-mono"/></div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">Total PPh Investasi</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400">{fmt(r.totalPph)}</div>
        </div>
        <div className="finc-card space-y-3">
          {r.rincian.map(x=>(
            <div key={x.instrumen} className="border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <div className="flex justify-between mb-0.5">
                <span className="text-xs font-medium text-[--text-primary]">{x.instrumen}</span>
                <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">{fmt(x.pajak)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-2xs text-[--text-secondary]">Penghasilan: {fmt(x.penghasilan)}</span>
                <span className="text-2xs text-[--text-secondary]">{x.tarif}</span>
              </div>
            </div>
          ))}
        </div>
        <button onClick={copy} className="finc-btn w-full justify-center">{copied?<><Check size={14}/>Tersalin!</>:<><Copy size={14}/>Salin Laporan</>}</button>
      </div>
    </div>
  )
}
