'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Menu, X, Moon, Sun, ChevronDown,
  Wallet, Home, FileText, TrendingUp,
  BarChart2, Activity, Coins,
} from 'lucide-react'

const categories = [
  { name: 'Personal Finance', slug: 'personal-finance', icon: Wallet,     count: 8  },
  { name: 'Kredit & Properti', slug: 'kredit-properti', icon: Home,       count: 6  },
  { name: 'Pajak',             slug: 'pajak',            icon: FileText,   count: 7  },
  { name: 'Investasi',         slug: 'investasi',        icon: TrendingUp, count: 8  },
  { name: 'Saham',             slug: 'saham',            icon: BarChart2,  count: 3  },
  { name: 'Trading',           slug: 'trading',          icon: Activity,   count: 13 },
  { name: 'Kripto',            slug: 'kripto',           icon: Coins,      count: 5  },
]

export default function Header() {
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dark, setDark]               = useState(false)

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

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-1 shrink-0">
          <span className="font-heading font-800 text-lg text-navy-900 dark:text-white">
            Finc
          </span>
          <span className="font-heading font-800 text-lg text-finc-green">
            Tools
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-1">
          {/* Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
              className="finc-btn-ghost"
            >
              Tools <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-1 w-72 bg-[--surface] border border-[--border] rounded-xl shadow-xl p-2 grid grid-cols-1 gap-0.5">
                {categories.map((c) => {
                  const Icon = c.icon
                  return (
                    <Link
                      key={c.slug}
                      href={`/${c.slug}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Icon size={15} className="text-finc-green shrink-0" />
                      <span className="text-sm font-medium text-[--text-primary] flex-1">{c.name}</span>
                      <span className="text-2xs text-[--text-secondary] font-mono">{c.count}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          <Link href="/panduan" className="finc-btn-ghost">Panduan</Link>
          <Link href="/about"   className="finc-btn-ghost">About</Link>
        </nav>

        {/* ── Right Actions ── */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDark}
            className="finc-btn-ghost !px-2 !py-2"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden finc-btn-ghost !px-2 !py-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[--border] bg-[--surface] px-4 py-3 space-y-1">
          <p className="text-2xs font-semibold uppercase tracking-wider text-[--text-secondary] px-2 mb-2">
            Kategori Tools
          </p>
          {categories.map((c) => {
            const Icon = c.icon
            return (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <Icon size={15} className="text-finc-green" />
                <span className="text-sm font-medium text-[--text-primary] flex-1">{c.name}</span>
                <span className="text-2xs text-[--text-secondary] font-mono bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">
                  {c.count}
                </span>
              </Link>
            )
          })}
          <div className="border-t border-[--border] pt-2 mt-2 flex gap-1">
            <Link href="/panduan" onClick={() => setMobileOpen(false)} className="finc-btn-ghost text-sm flex-1 justify-center">Panduan</Link>
            <Link href="/about"   onClick={() => setMobileOpen(false)} className="finc-btn-ghost text-sm flex-1 justify-center">About</Link>
          </div>
        </div>
      )}
    </header>
  )
}
