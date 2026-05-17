'use client'
import { useState, useMemo } from 'react'
import { Copy, Check } from 'lucide-react'
import { hitungPPh21, PTKP } from '@/lib/calculations/tax'
const fmt = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
const statusList = Object.keys(PTKP)
export default function TaxOptimizerPPh21() {
  const [gaji,   setGaji]   = useState(10_000_000)
  const [tunjTt, setTunjTt] = useState(2_000_000)
  const [tunjTdk,setTunjTdk]= useState(0)
  const [status, setStatus] = useState('TK/0')
  const [npwp,   setNpwp]   = useState(true)
  const [copied, setCopied] = useState(false)
  const r = useMemo(() => hitungPPh21({ gajiPokok:gaji, tunjanganTetap:tunjTt, tunjanganTidakTetap:tunjTdk, statusPTKP:status, iburNPWP:!npwp }), [gaji, tunjTt, tunjTdk, status, npwp])
  const copy = () => { navigator.clipboard.writeText(`FincTools PPh 21\nPenghasilan Bruto: ${fmt(r.penghasilanBruto)}/bln\nPPh 21/bulan: ${fmt(r.pphBulananFinal)}\nTake Home Pay: ${fmt(r.takehomePay)}`); setCopied(true); setTimeout(()=>setCopied(false),2000) }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div><label className="finc-label">Gaji Pokok (Rp/bulan)</label><input type="number" value={gaji} onChange={e=>setGaji(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Tunjangan Tetap (Rp/bulan)</label><input type="number" value={tunjTt} onChange={e=>setTunjTt(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div><label className="finc-label">Tunjangan Tidak Tetap (Rp/bulan)</label><input type="number" value={tunjTdk} onChange={e=>setTunjTdk(Number(e.target.value))} className="finc-input font-mono"/></div>
        <div>
          <label className="finc-label">Status PTKP</label>
          <select value={status} onChange={e=>setStatus(e.target.value)} className="finc-input">
            {statusList.map(s=><option key={s} value={s}>{s} — {fmt(PTKP[s])}/tahun</option>)}
          </select>
        </div>
        <div className="flex items-center justify-between finc-card py-3">
          <div>
            <p className="text-sm font-medium text-[--text-primary]">Punya NPWP</p>
            <p className="text-xs text-[--text-secondary]">Tanpa NPWP kena tarif 20% lebih tinggi</p>
          </div>
          <button onClick={()=>setNpwp(!npwp)} className={`w-11 h-6 rounded-full transition-colors ${npwp?'bg-finc-green':'bg-slate-300 dark:bg-slate-600'}`}>
            <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${npwp?'translate-x-5':''}`}/>
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="finc-result-good">
          <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-1">PPh 21 per Bulan</p>
          <div className="font-mono font-bold text-4xl tracking-tight text-emerald-600 dark:text-emerald-400 mb-1">{fmt(r.pphBulananFinal)}</div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">Take Home Pay: {fmt(r.takehomePay)}</p>
        </div>
        <div className="finc-card space-y-3">
          {[['Penghasilan Bruto/bln',fmt(r.penghasilanBruto)],['Biaya Jabatan/bln',`(${fmt(r.biayaJabatan)})`],['PTKP Setahun',fmt(r.ptkp)],['PKP Setahun',fmt(r.pkp)],['PPh 21 Setahun',fmt(r.pphTahunan)]].map(([l,v])=>(
            <div key={l} className="flex justify-between border-b border-[--border] last:border-0 pb-2 last:pb-0">
              <span className="text-xs text-[--text-secondary]">{l}</span>
              <span className="text-xs font-mono font-medium text-[--text-primary]">{v}</span>
            </div>
          ))}
        </div>
        {r.rincianTarif.length > 0 && (
          <div className="finc-card">
            <p className="text-xs font-semibold text-[--text-secondary] mb-2">Rincian Tarif Progresif</p>
            {r.rincianTarif.map(t=>(
              <div key={t.layer} className="flex justify-between text-xs py-1">
                <span className="text-[--text-secondary]">Layer {t.layer} × {t.tarif}</span>
                <span className="font-mono text-[--text-primary]">{fmt(t.pajak)}</span>
              </div>
            ))}
          </div>
        )}
        <button onClick={copy} className="finc-btn w-full justify-center">{copied?<><Check size={14}/>Tersalin!</>:<><Copy size={14}/>Salin Hasil</>}</button>
      </div>
    </div>
  )
}
