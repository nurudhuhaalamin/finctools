import type { Metadata } from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

/* ─── Fonts ─── */
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

/* ─── Metadata ─── */
export const metadata: Metadata = {
  metadataBase: new URL('https://finctools.com'),
  title: {
    default: 'FincTools — Tools Keuangan & Investasi',
    template: '%s | FincTools',
  },
  description:
    'Tools keuangan dan investasi berbasis kalkulasi matematika. Hitung position sizing, pajak, KPR, DCA, dan 50+ tools lainnya secara akurat dan gratis.',
  keywords: [
    'tools keuangan',
    'kalkulator investasi',
    'risk manager trading',
    'kalkulator pajak',
    'kalkulator KPR',
    'DCA simulator',
    'position sizing',
  ],
  authors: [{ name: 'FincTools' }],
  creator: 'FincTools',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://finctools.com',
    siteName: 'FincTools',
    title: 'FincTools — Tools Keuangan & Investasi',
    description:
      'Tools keuangan dan investasi berbasis kalkulasi matematika. 50+ tools gratis untuk keputusan finansial yang lebih cerdas.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FincTools — Tools Keuangan & Investasi',
    description: '50+ tools keuangan dan investasi gratis berbasis kalkulasi matematika.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

/* ─── Dark mode script (prevent flash) ─── */
const DarkModeScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
        try {
          const theme = localStorage.getItem('finctools-theme');
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (theme === 'dark' || (!theme && prefersDark)) {
            document.documentElement.classList.add('dark');
          }
        } catch (_) {}
      `,
    }}
  />
)

/* ─── Root Layout ─── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <DarkModeScript />
        {/* Google Tag Manager — ganti GTM-XXXXXXX dengan ID GTM kamu */}
        {/* <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i)...` }} /> */}
      </head>
      <body className="font-body antialiased bg-[--bg] text-[--text-primary] min-h-screen">
        {children}
      </body>
    </html>
  )
}
