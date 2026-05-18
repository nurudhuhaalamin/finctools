'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Menu, X, Moon, Sun, ChevronDown,
  Wallet, Home, FileText, TrendingUp,
  BarChart2, Activity, Coins, BookOpen,
  Globe,
} from 'lucide-react'

const toolCategories = [
  { name: 'Personal Finance', slug: 'personal-finance', icon: Wallet,     count: 8  },
  { name: 'Kredit & Properti', slug: 'kredit-properti', icon: Home,       count: 6  },
  { name: 'Pajak',             slug: 'pajak',            icon: FileText,   count: 7  },
  { name: 'Investasi',         slug: 'investasi',        icon: TrendingUp, count: 8  },
  { name: 'Saham',             slug: 'saham',            icon: BarChart2,  count: 3  },
  { name: 'Trading',           slug: 'trading',          icon: Activity,   count: 13 },
  { name: 'Kripto',            slug: 'kripto',           icon: Coins,      count: 5  },
]

const artikelCategories = [
  { name: 'Investasi',         slug: 'investasi',        icon: TrendingUp  },
  { name: 'Saham & Bursa',     slug: 'saham-bursa',      icon: BarChart2   },
  { name: 'Trading',           slug: 'trading',          icon: Activity    },
  { name: 'Pajak',             slug: 'pajak',            icon: FileText    },
  { name: 'Keuangan Pribadi',  slug: 'keuangan-pribadi', icon: Wallet      },
  { name: 'Kripto',            slug: 'kripto',           icon: Coins       },
  { name: 'Ekonomi & Pasar',   slug: 'ekonomi-pasar',    icon: Globe       },
]

export default function Header() {
  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [toolsOpen,      setToolsOpen]      = useState(false)
  const [artikelOpen,    setArtikelOpen]    = useState(false)
  const [dark,           setDark]           = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('finctools-theme', next ? 'dark' : 'light')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[--border] bg-[--surface]/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 shrink-0">
          <span className="font-heading font-800 text-lg text-navy-900 dark:text-white">Finc</span>
          <span className="font-heading font-800 text-lg text-finc-green">Tools</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">

          {/* Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setToolsOpen(!toolsOpen); setArtikelOpen(false) }}
              onBlur={() => setTimeout(() => setToolsOpen(false), 150)}
              className="finc-btn-ghost"
            >
              Tools <ChevronDown size={14} className={`transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
            </button>
            {toolsOpen && (
              <div className="absolute left-0 top-full mt-1 w-72 bg-[--surface] border border-[--border]
                               rounded-xl shadow-xl p-2 grid grid-cols-1 gap-0.5">
                {toolCategories.map(c => {
                  const Icon = c.icon
                  return (
                    <Link key={c.slug} href={`/${c.slug}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg
                                 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <Icon size={15} className="text-finc-green shrink-0" />
                      <span className="text-sm font-medium text-[--text-primary] flex-1">{c.name}</span>
                      <span className="text-2xs text-[--text-secondary] font-mono">{c.count}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Artikel Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setArtikelOpen(!artikelOpen); setToolsOpen(false) }}
              onBlur={() => setTimeout(() => setArtikelOpen(false), 150)}
              className="finc-btn-ghost"
            >
              Artikel <ChevronDown size={14} className={`transition-transform ${artikelOpen ? 'rotate-180' : ''}`} />
            </button>
            {artikelOpen && (
              <div className="absolute left-0 top-full mt-1 w-64 bg-[--surface] border border-[--border]
                               rounded-xl shadow-xl p-2 grid grid-cols-1 gap-0.5">
                <Link href="/artikel"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg
                             hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors
                             border-b border-[--border] mb-1">
                  <BookOpen size={15} className="text-finc-green shrink-0" />
                  <span className="text-sm font-medium text-[--text-primary]">Semua Artikel</span>
                </Link>
                {artikelCategories.map(c => {
                  const Icon = c.icon
                  return (
                    <Link key={c.slug} href={`/artikel/${c.slug}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg
                                 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <Icon size={15} className="text-finc-green shrink-0" />
                      <span className="text-sm font-medium text-[--text-primary]">{c.name}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          <Link href="/about" className="finc-btn-ghost">About</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button onClick={toggleDark} className="finc-btn-ghost !px-2 !py-2" aria-label="Toggle dark mode">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden finc-btn-ghost !px-2 !py-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[--border] bg-[--surface] px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto">
          <p className="text-2xs font-semibold uppercase tracking-wider text-[--text-secondary] px-2 mb-2">
            Kategori Tools
          </p>
          {toolCategories.map(c => {
            const Icon = c.icon
            return (
              <Link key={c.slug} href={`/${c.slug}`} onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
                <Icon size={15} className="text-finc-green" />
                <span className="text-sm font-medium text-[--text-primary] flex-1">{c.name}</span>
                <span className="text-2xs text-[--text-secondary] font-mono bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">
                  {c.count}
                </span>
              </Link>
            )
          })}

          <div className="border-t border-[--border] pt-3 mt-2">
            <p className="text-2xs font-semibold uppercase tracking-wider text-[--text-secondary] px-2 mb-2">
              Artikel
            </p>
            <Link href="/artikel" onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
              <BookOpen size={15} className="text-finc-green" />
              <span className="text-sm font-medium text-[--text-primary]">Semua Artikel</span>
            </Link>
            {artikelCategories.map(c => {
              const Icon = c.icon
              return (
                <Link key={c.slug} href={`/artikel/${c.slug}`} onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
                  <Icon size={15} className="text-finc-green" />
                  <span className="text-sm font-medium text-[--text-primary]">{c.name}</span>
                </Link>
              )
            })}
          </div>

          <div className="border-t border-[--border] pt-2 mt-2">
            <Link href="/about" onClick={() => setMobileOpen(false)}
              className="finc-btn-ghost text-sm w-full justify-center">About</Link>
          </div>
        </div>
      )}
    </header>
  )
}
