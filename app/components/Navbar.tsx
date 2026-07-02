'use client'

import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight, Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from './ThemeProvider'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Explore Schools', href: '#explorer' },
  { label: 'Services', href: '#services' },
  { label: 'Events', href: '#events' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

const LANGUAGES = [
  { code: 'EN', flag: '🇬🇧', label: 'English' },
  { code: 'FR', flag: '🇫🇷', label: 'Français' },
  { code: 'AR', flag: '🇦🇪', label: 'العربية' },
  { code: 'DE', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'ES', flag: '🇪🇸', label: 'Español' },
]

interface NavbarProps {
  onApplyNowClick?: () => void
}

export default function Navbar({ onApplyNowClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [activeLang, setActiveLang] = useState(LANGUAGES[0])
  const { theme, toggle } = useTheme()

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <>
      <style>{`
        .qs-pill {
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.13);
          border-radius: 9999px;
          padding: 10px 12px 10px 20px;
          gap: 16px;
        }
        .qs-logo-accent {
          background: linear-gradient(135deg,#818CF8,#06B6D4);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .qs-link {
          color: rgba(255,255,255,0.72); font-size: 0.88rem; font-weight: 500;
          text-decoration: none; white-space: nowrap; transition: color 0.2s ease;
        }
        .qs-link:hover { color: #fff; }
        .qs-icon-btn {
          display: flex; align-items: center; justify-content: center;
          width: 40px; height: 40px; border-radius: 9999px;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.75); cursor: pointer; transition: background 0.2s, color 0.2s; flex-shrink: 0;
        }
        .qs-icon-btn:hover { background: rgba(255,255,255,0.16); color: #fff; }
        .qs-cta {
          position: relative; overflow: hidden; display: inline-flex; align-items: center;
          gap: 8px; padding: 7px 8px 7px 18px; border-radius: 9999px;
          background: linear-gradient(135deg,#4F46E5,#3730A3);
          border: none; color: #fff; font-size: 0.85rem; font-weight: 700;
          cursor: pointer; white-space: nowrap; flex-shrink: 0;
        }
        .qs-cta-ripple {
          position: absolute; width: 130px; height: 130px; border-radius: 9999px;
          background: #818CF8;
          transform: translate(-50%,-50%) scale(0);
          left: var(--mx,50%); top: var(--my,50%);
          transition: transform 0.65s cubic-bezier(0.19,1,0.22,1), opacity 0.4s ease;
          opacity: 0; pointer-events: none; z-index: 0;
        }
        .qs-cta:hover .qs-cta-ripple { transform: translate(-50%,-50%) scale(5); opacity: 1; }
        .qs-cta-label { position: relative; z-index: 1; }
        .qs-cta-icon-wrap {
          position: relative; z-index: 1; width: 30px; height: 30px; border-radius: 9999px;
          background: rgba(255,255,255,0.18); display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: background 0.3s ease;
        }
        .qs-cta:hover .qs-cta-icon-wrap { background: rgba(255,255,255,0.3); }
        .qs-cta-icon-wrap .arrow-default { display: block; }
        .qs-cta-icon-wrap .arrow-hover   { display: none; }
        .qs-cta:hover .qs-cta-icon-wrap .arrow-default { display: none; }
        .qs-cta:hover .qs-cta-icon-wrap .arrow-hover   { display: block; }

        /* Language switcher */
        .qs-lang-wrap { position: relative; flex-shrink: 0; }
        .qs-lang-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 12px; border-radius: 9999px;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.8); font-size: 0.8rem; font-weight: 600;
          cursor: pointer; transition: background 0.2s ease; white-space: nowrap;
        }
        .qs-lang-btn:hover { background: rgba(255,255,255,0.15); }
        .qs-lang-dropdown {
          position: absolute; top: calc(100% + 8px); right: 0;
          background: rgba(12,12,22,0.97); backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 14px;
          padding: 6px; min-width: 150px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.5);
          z-index: 200;
        }
        .qs-lang-option {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px; border-radius: 10px; cursor: pointer;
          font-size: 0.82rem; font-weight: 500; color: rgba(255,255,255,0.75);
          transition: background 0.15s ease, color 0.15s ease;
          border: none; background: none; width: 100%; text-align: left;
        }
        .qs-lang-option:hover { background: rgba(79,70,229,0.15); color: #fff; }
        .qs-lang-option.active { background: rgba(79,70,229,0.2); color: #818CF8; }

        /* Responsive */
        .qs-desktop-nav { display: none; }
        .qs-search-btn  { display: none; }
        .qs-cta-desktop { display: none; }
        .qs-lang-desktop { display: none; }
        .qs-hamburger   { display: flex; }
        @media (min-width: 1024px) {
          .qs-desktop-nav  { display: flex; gap: 26px; align-items: center; }
          .qs-search-btn   { display: flex; }
          .qs-cta-desktop  { display: inline-flex; }
          .qs-lang-desktop { display: flex; }
          .qs-hamburger    { display: none; }
        }

        /* Mobile menu */
        .qs-mobile-menu {
          margin-top: 10px;
          background: rgba(12,12,22,0.96); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08); border-radius: 20px;
          padding: 8px 20px 20px; box-shadow: 0 16px 48px rgba(0,0,0,0.5);
        }
        .qs-mobile-link {
          display: flex; justify-content: space-between; align-items: center;
          color: rgba(255,255,255,0.8); font-size: 0.95rem; font-weight: 500;
          text-decoration: none; padding: 13px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06); transition: color 0.2s ease;
        }
        .qs-mobile-link:hover { color: #818CF8; }
        .qs-cta-mobile { width: 100%; justify-content: center; padding: 12px 16px; font-size: 0.92rem; }

        /* Mobile lang row */
        .qs-mobile-lang-row {
          display: flex; gap: 8px; flex-wrap: wrap; padding: 14px 0 6px;
          border-top: 1px solid rgba(255,255,255,0.07); margin-top: 6px;
        }
        .qs-mobile-lang-chip {
          display: flex; align-items: center; gap: 5px;
          padding: 6px 12px; border-radius: 9999px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.7); font-size: 0.78rem; font-weight: 600;
          cursor: pointer; transition: all 0.2s ease;
        }
        .qs-mobile-lang-chip.active { background: rgba(79,70,229,0.25); border-color: rgba(79,70,229,0.4); color: #818CF8; }
        .qs-mobile-lang-chip:hover { background: rgba(79,70,229,0.15); color: #fff; }
      `}</style>

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '14px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>

          {/* ── PILL BAR ── */}
          <div className="qs-pill">

            {/* Logo */}
            <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '9px', flexShrink: 0 }}>
              {/* <div style={{
                width: 36, height: 36, borderRadius: '10px',
                background: 'linear-gradient(135deg,#4F46E5,#06B6D4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', fontWeight: '800', color: '#fff',
              }}>Q</div> */}
              <span style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff', letterSpacing: '-0.01em' }}>
                QStudy <span className="qs-logo-accent">World</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="qs-desktop-nav" aria-label="Main navigation">
              {navLinks.map(link => (
                <a key={link.label} href={link.href} className="qs-link">{link.label}</a>
              ))}
            </nav>

            {/* Right cluster */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

              {/* Search - desktop */}
              {/* <button className="qs-icon-btn qs-search-btn" aria-label="Search">
                <SearchIcon />
              </button> */}

              {/* Theme toggle - desktop */}
              <button
                className="qs-icon-btn qs-search-btn"
                onClick={toggle}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Language switcher - desktop */}
              {/* <div className="qs-lang-wrap qs-lang-desktop">
                <button
                  className="qs-lang-btn"
                  onClick={() => setLangOpen(o => !o)}
                  aria-label="Change language"
                  aria-expanded={langOpen}
                >
                  <span>{activeLang.flag}</span>
                  <span>{activeLang.code}</span>
                  <ChevronDown size={12} />
                </button>
                {langOpen && (
                  <div className="qs-lang-dropdown" role="listbox">
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        className={`qs-lang-option ${activeLang.code === lang.code ? 'active' : ''}`}
                        onClick={() => { setActiveLang(lang); setLangOpen(false) }}
                        role="option"
                        aria-selected={activeLang.code === lang.code}
                      >
                        <span style={{ fontSize: '16px' }}>{lang.flag}</span>
                        <span>{lang.label}</span>
                        {activeLang.code === lang.code && <Check size={12} style={{ marginLeft: 'auto' }} />}
                      </button>
                    ))}
                  </div>
                )}
              </div> */}

              {/* Apply Now - desktop */}
              <button className="qs-cta qs-cta-desktop" onMouseMove={handleMouseMove} onClick={onApplyNowClick} aria-label="Apply Now">
                <span className="qs-cta-ripple" />
                <span className="qs-cta-label">Apply Now</span>
                <span className="qs-cta-icon-wrap">
                  <span className="arrow-default"><ArrowUpRight size={14} strokeWidth={3} /></span>
                  <span className="arrow-hover"><ArrowRight size={14} strokeWidth={3} /></span>
                </span>
              </button>

              {/* Hamburger - mobile */}
              <button className="qs-icon-btn qs-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu" aria-expanded={menuOpen}>
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* ── MOBILE DROPDOWN ── */}
          {menuOpen && (
            <div className="qs-mobile-menu" role="navigation" aria-label="Mobile navigation">
              {navLinks.map(link => (
                <a key={link.label} href={link.href} className="qs-mobile-link" onClick={() => setMenuOpen(false)}>
                  {link.label} <ChevronRight size={15} style={{ opacity: 0.4 }} />
                </a>
              ))}

              {/* Theme toggle - mobile */}
              <button
                onClick={toggle}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  width: '100%', background: 'none', border: 'none',
                  color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', fontWeight: 500,
                  padding: '13px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>

              {/* Language chips - mobile */}
              <div className="qs-mobile-lang-row">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    className={`qs-mobile-lang-chip ${activeLang.code === lang.code ? 'active' : ''}`}
                    onClick={() => setActiveLang(lang)}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.code}</span>
                  </button>
                ))}
              </div>

              {/* Apply Now - mobile */}
              <div style={{ paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: '6px' }}>
                <button className="qs-cta qs-cta-mobile" onMouseMove={handleMouseMove} onClick={onApplyNowClick} aria-label="Apply Now">
                  <span className="qs-cta-ripple" />
                  <span className="qs-cta-label">Apply Now</span>
                  <span className="qs-cta-icon-wrap">
                    <span className="arrow-default"><ArrowUpRight size={14} strokeWidth={3} /></span>
                    <span className="arrow-hover"><ArrowRight size={14} strokeWidth={3} /></span>
                  </span>
                </button>
              </div>
            </div>
          )}

        </div>
      </header>
    </>
  )
}
