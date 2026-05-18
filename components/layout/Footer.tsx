import Link from 'next/link'

const toolLinks = [
  { name: 'Personal Finance', href: '/personal-finance' },
  { name: 'Kredit & Properti', href: '/kredit-properti' },
  { name: 'Pajak',             href: '/pajak'            },
  { name: 'Investasi',         href: '/investasi'        },
  { name: 'Saham',             href: '/saham'            },
  { name: 'Trading',           href: '/trading'          },
  { name: 'Kripto',            href: '/kripto'           },
]

const artikelLinks = [
  { name: 'Investasi',        href: '/artikel/investasi'        },
  { name: 'Saham & Bursa',    href: '/artikel/saham-bursa'      },
  { name: 'Trading',          href: '/artikel/trading'          },
  { name: 'Pajak',            href: '/artikel/pajak'            },
  { name: 'Keuangan Pribadi', href: '/artikel/keuangan-pribadi' },
  { name: 'Kripto',           href: '/artikel/kripto'           },
  { name: 'Ekonomi & Pasar',  href: '/artikel/ekonomi-pasar'   },
]

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Use',   href: '/terms-of-use'   },
  { name: 'Disclaimer',     href: '/disclaimer'     },
  { name: 'Cookie Policy',  href: '/cookie-policy'  },
  { name: 'About',          href: '/about'          },
  { name: 'Contact',        href: '/contact'        },
]

export default function Footer() {
  return (
    <footer className="border-t border-[--border] bg-[--surface] mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-1 mb-3">
              <span className="font-heading font-800 text-base text-navy-900 dark:text-white">Finc</span>
              <span className="font-heading font-800 text-base text-finc-green">Tools</span>
            </div>
            <p className="text-sm text-[--text-secondary] leading-relaxed max-w-[200px]">
              46 tools keuangan & investasi gratis. Berbasis kalkulasi matematika, tanpa perlu akun.
            </p>
          </div>

          {/* Tools */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-3">Tools</p>
            <ul className="space-y-2">
              {toolLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[--text-secondary] hover:text-finc-green transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Artikel */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-3">Artikel</p>
            <ul className="space-y-2">
              <li>
                <Link href="/artikel" className="text-sm text-[--text-secondary] hover:text-finc-green transition-colors font-medium">
                  Semua Artikel
                </Link>
              </li>
              {artikelLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[--text-secondary] hover:text-finc-green transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[--text-secondary] mb-3">Legal</p>
            <ul className="space-y-2">
              {legalLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[--text-secondary] hover:text-finc-green transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-[--border] pt-6">
          <p className="text-xs text-[--text-secondary] leading-relaxed mb-4">
            ⚠️ <strong>Disclaimer:</strong> Seluruh tools dan konten di FincTools hanya untuk tujuan edukasi dan kalkulasi.
            Bukan merupakan saran investasi, rekomendasi trading, atau nasihat keuangan profesional.
            Hasil kalkulasi dapat berbeda dengan kondisi pasar aktual. Konsultasikan keputusan finansial kamu kepada profesional berlisensi.
          </p>
          <p className="text-xs text-[--text-secondary]">
            © {new Date().getFullYear()} FincTools · finctools.com · Dibuat dengan ❤️ untuk komunitas investor Indonesia
          </p>
        </div>

      </div>
    </footer>
  )
}
