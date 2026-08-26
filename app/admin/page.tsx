'use client'

import { useState, useEffect, useCallback } from 'react'

/* ─────────────── Types ─────────────── */
type SchoolCategory = 'International School' | 'Boarding School' | 'Grammar School'
type LangCategory   = 'English (ESL)' | 'French' | 'German' | 'Spanish' | 'Mandarin' | 'Japanese' | 'Other'
type CampCategory   = 'Academic' | 'Language + Fun' | 'Sports Camp' | 'STEM Camp' | 'Cultural Exchange' | 'Adventure' | 'Summer Camp'

interface School {
  id: string
  name: string
  type: SchoolCategory
  country: string
  city: string
  fees: string
  curriculum: string
  ageRange: string
  highlights: string
  description: string
  emoji: string
}

interface LangSchool {
  id: string
  name: string
  language: LangCategory
  country: string
  city: string
  fees: string
  level: string
  highlights: string
  description: string
  emoji: string
}

interface SummerCamp {
  id: string
  name: string
  type: CampCategory
  country: string
  city: string
  fees: string
  ageRange: string
  duration: string
  highlights: string
  description: string
  emoji: string
}

type Tab = 'schools' | 'language' | 'summer'

/* ─────────────── Helpers ─────────────── */
const uid = () => Math.random().toString(36).slice(2, 10)

const emptySchool   = (): School     => ({ id: uid(), name: '', type: 'International School', country: '', city: '', fees: '', curriculum: '', ageRange: '', highlights: '', description: '', emoji: '🏫' })
const emptyLang     = (): LangSchool => ({ id: uid(), name: '', language: 'English (ESL)',    country: '', city: '', fees: '', level: '', highlights: '', description: '', emoji: '📚' })
const emptyCamp     = (): SummerCamp => ({ id: uid(), name: '', type: 'Academic',              country: '', city: '', fees: '', ageRange: '', duration: '', highlights: '', description: '', emoji: '⛺' })

/* ─────────────── Seed data ─────────────── */
const SEED_SCHOOLS: School[] = [
  { id: uid(), name: 'Eton School', type: 'Boarding School', country: 'UK', city: 'Windsor', fees: '£48,501/yr', curriculum: 'A-Levels', ageRange: '13–18', highlights: 'World-Famous Alumni, Boarding', description: 'One of the most prestigious schools in the world.', emoji: '🎩' },
  { id: uid(), name: 'TASIS England', type: 'International School', country: 'UK', city: 'Surrey', fees: '£42,000/yr', curriculum: 'IB Diploma', ageRange: '4–18', highlights: 'IB World School, US Curriculum', description: 'Leading international school in the UK.', emoji: '🌍' },
  { id: uid(), name: 'St Paul\'s School', type: 'Grammar School', country: 'UK', city: 'London', fees: '£29,400/yr', curriculum: 'A-Levels', ageRange: '13–18', highlights: 'Oxbridge, STEM', description: 'Top UK grammar school with exceptional results.', emoji: '📐' },
]
const SEED_LANG: LangSchool[] = [
  { id: uid(), name: 'EC Language Schools', language: 'English (ESL)', country: 'UK', city: 'London', fees: '£280/week', level: 'All Levels', highlights: 'ALTA Accredited, 30+ locations', description: 'Global English language school network.', emoji: '🌐' },
  { id: uid(), name: 'Institut Cervantes', language: 'Spanish', country: 'Spain', city: 'Madrid', fees: '€320/week', level: 'All Levels', highlights: 'DELE Exams, Spanish Govt', description: 'Official Spanish language school.', emoji: '🇪🇸' },
]
const SEED_CAMPS: SummerCamp[] = [
  { id: uid(), name: 'Oxford Summer Courses', type: 'Academic', country: 'UK', city: 'Oxford', fees: '£1,950/week', ageRange: '9–18', duration: '2–6 weeks', highlights: 'Oxford Schools, 60+ Subjects', description: 'Academic enrichment at Oxford schools.', emoji: '📖' },
  { id: uid(), name: 'EF Summer School', type: 'Language + Fun', country: 'UK', city: 'London', fees: '£999/week', ageRange: '8–18', duration: '1–8 weeks', highlights: 'English + Activities', description: 'Fun English programme with sports and arts.', emoji: '⚽' },
]

/* ─────────────── Sub-components ─────────────── */
const inputStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
  color: '#F1F5F9', padding: '10px 14px', fontSize: '0.88rem', outline: 'none',
}
const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.78rem', fontWeight: '600', color: '#94A3B8', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.8px' }

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

function Select({ value, onChange, options, style }: { value: string; onChange: (v: string) => void; options: string[]; style?: React.CSSProperties }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{ ...inputStyle, ...style }}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

/* ─────────────── Main CMS ─────────────── */
export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pwd, setPwd] = useState('')
  const [pwdErr, setPwdErr] = useState(false)

  const [tab, setTab] = useState<Tab>('schools')
  const [schools, setSchools]   = useState<School[]>([])
  const [langSchools, setLang]  = useState<LangSchool[]>([])
  const [camps, setCamps]       = useState<SummerCamp[]>([])

  const [modal, setModal]       = useState<'add' | 'edit' | null>(null)
  const [editSchool,  setEditSchool]  = useState<School | null>(null)
  const [editLang,    setEditLang]    = useState<LangSchool | null>(null)
  const [editCamp,    setEditCamp]    = useState<SummerCamp | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const s  = localStorage.getItem('qs_schools')
    const l  = localStorage.getItem('qs_lang')
    const c  = localStorage.getItem('qs_camps')
    setSchools(s   ? JSON.parse(s)  : SEED_SCHOOLS)
    setLang(l      ? JSON.parse(l)  : SEED_LANG)
    setCamps(c     ? JSON.parse(c)  : SEED_CAMPS)
  }, [])

  const save = useCallback((s: School[], l: LangSchool[], c: SummerCamp[]) => {
    localStorage.setItem('qs_schools', JSON.stringify(s))
    localStorage.setItem('qs_lang',    JSON.stringify(l))
    localStorage.setItem('qs_camps',   JSON.stringify(c))
  }, [])

  /* ── Auth ── */
  const login = () => {
    if (pwd === 'qstudy2025') { setAuthed(true); setPwdErr(false) }
    else { setPwdErr(true) }
  }

  /* ── CRUD helpers ── */
  const deleteSchool = (id: string) => { const n = schools.filter(s => s.id !== id); setSchools(n); save(n, langSchools, camps) }
  const deleteLang   = (id: string) => { const n = langSchools.filter(s => s.id !== id); setLang(n); save(schools, n, camps) }
  const deleteCamp   = (id: string) => { const n = camps.filter(s => s.id !== id); setCamps(n); save(schools, langSchools, n) }

  const saveSchool = (s: School) => {
    const n = schools.find(x => x.id === s.id) ? schools.map(x => x.id === s.id ? s : x) : [...schools, s]
    setSchools(n); save(n, langSchools, camps); setModal(null); setEditSchool(null)
  }
  const saveLang = (l: LangSchool) => {
    const n = langSchools.find(x => x.id === l.id) ? langSchools.map(x => x.id === l.id ? l : x) : [...langSchools, l]
    setLang(n); save(schools, n, camps); setModal(null); setEditLang(null)
  }
  const saveCamp = (c: SummerCamp) => {
    const n = camps.find(x => x.id === c.id) ? camps.map(x => x.id === c.id ? c : x) : [...camps, c]
    setCamps(n); save(schools, langSchools, n); setModal(null); setEditCamp(null)
  }

  /* ═══════════════════ AUTH GATE ═══════════════════ */
  if (!authed) return (
    <div style={{ minHeight: '100vh', background: '#0F0F1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '420px', padding: '24px' }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '40px 36px', textAlign: 'center' }}>
          <div style={{ width: 60, height: 60, background: 'linear-gradient(135deg,#4F46E5,#06B6D4)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '800', color: '#fff', margin: '0 auto 20px' }}>Q</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#F1F5F9', marginBottom: '6px' }}>School Directory Admin</h1>
          <p style={{ color: '#64748B', fontSize: '0.88rem', marginBottom: '28px' }}>Content Management System</p>
          <input
            type="password"
            placeholder="Enter admin password"
            value={pwd}
            onChange={e => { setPwd(e.target.value); setPwdErr(false) }}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={{ ...inputStyle, marginBottom: '12px', textAlign: 'center', letterSpacing: '2px' }}
          />
          {pwdErr && <p style={{ color: '#F87171', fontSize: '0.82rem', marginBottom: '12px' }}>❌ Incorrect password</p>}
          <button onClick={login} style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg,#4F46E5,#06B6D4)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer' }}>
            Sign In →
          </button>
          <p style={{ marginTop: '16px', fontSize: '0.75rem', color: '#475569' }}>Password: <code style={{ color: '#818CF8' }}>qstudy2025</code></p>
        </div>
      </div>
    </div>
  )

  /* ═══════════════════ CMS DASHBOARD ═══════════════════ */
  const tabCfg = [
    { id: 'schools' as Tab, label: '🏫 Schools', count: schools.length },
    { id: 'language' as Tab, label: '📚 Language Schools', count: langSchools.length },
    { id: 'summer' as Tab,  label: '⛺ Summer Camps', count: camps.length },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0F0F1A', fontFamily: 'system-ui, sans-serif', color: '#F1F5F9' }}>

      {/* Top bar */}
      <header style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#4F46E5,#06B6D4)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '800', color: '#fff' }}>Q</div>
          <div>
            <div style={{ fontWeight: '800', fontSize: '1rem' }}>School Directory <span style={{ color: '#4F46E5' }}>CMS</span></div>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Content Management System</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="/" style={{ fontSize: '0.82rem', color: '#94A3B8', textDecoration: 'none', padding: '7px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>← View Site</a>
          <button onClick={() => setAuthed(false)} style={{ fontSize: '0.82rem', color: '#F87171', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '8px', padding: '7px 14px', cursor: 'pointer' }}>Sign Out</button>
        </div>
      </header>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Total Schools',          value: schools.length,    icon: '🏫', color: '#4F46E5' },
            { label: 'Language Schools',        value: langSchools.length, icon: '📚', color: '#06B6D4' },
            { label: 'Summer Camps',            value: camps.length,       icon: '⛺', color: '#F59E0B' },
          ].map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: `${s.color}18`, border: `1px solid ${s.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '5px', marginBottom: '24px', width: 'fit-content' }}>
          {tabCfg.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '9px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '700', transition: 'all 0.2s', background: tab === t.id ? 'linear-gradient(135deg,#4F46E5,#06B6D4)' : 'transparent', color: tab === t.id ? '#fff' : '#64748B' }}>
              {t.label} <span style={{ marginLeft: '5px', fontSize: '0.72rem', background: tab === t.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)', borderRadius: '50px', padding: '1px 7px' }}>{t.count}</span>
            </button>
          ))}
        </div>

        {/* Add button + table */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', overflow: 'hidden' }}>

          {/* Table header bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>{tabCfg.find(t => t.id === tab)?.label}</span>
            <button
              onClick={() => {
                if (tab === 'schools') { setEditSchool(emptySchool()); setModal('add') }
                else if (tab === 'language') { setEditLang(emptyLang()); setModal('add') }
                else { setEditCamp(emptyCamp()); setModal('add') }
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: 'linear-gradient(135deg,#4F46E5,#06B6D4)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              + Add New
            </button>
          </div>

          {/* ── Schools table ── */}
          {tab === 'schools' && (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                  {['Name', 'Type', 'Country / City', 'Curriculum', 'Fees', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#64748B', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schools.map(s => (
                  <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '20px' }}>{s.emoji}</span>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '0.88rem' }}>{s.name}</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{s.description.slice(0, 40)}…</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: '0.75rem', padding: '3px 10px', background: 'rgba(79,70,229,0.12)', border: '1px solid rgba(79,70,229,0.2)', borderRadius: '50px', color: '#818CF8' }}>{s.type}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#94A3B8' }}>{s.country} / {s.city}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#94A3B8' }}>{s.curriculum}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.82rem', fontWeight: '700', color: '#F59E0B' }}>{s.fees}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => { setEditSchool(s); setModal('edit') }} style={{ padding: '5px 12px', background: 'rgba(79,70,229,0.15)', border: '1px solid rgba(79,70,229,0.25)', borderRadius: '7px', color: '#818CF8', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => deleteSchool(s.id)} style={{ padding: '5px 12px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '7px', color: '#F87171', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer' }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* ── Language Schools table ── */}
          {tab === 'language' && (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                  {['Name', 'Language', 'Level', 'Country / City', 'Fees', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#64748B', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {langSchools.map(s => (
                  <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '20px' }}>{s.emoji}</span>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '0.88rem' }}>{s.name}</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{s.description.slice(0, 40)}…</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: '0.75rem', padding: '3px 10px', background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: '50px', color: '#06B6D4' }}>{s.language}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#94A3B8' }}>{s.level}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#94A3B8' }}>{s.country} / {s.city}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.82rem', fontWeight: '700', color: '#F59E0B' }}>{s.fees}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => { setEditLang(s); setModal('edit') }} style={{ padding: '5px 12px', background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: '7px', color: '#06B6D4', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => deleteLang(s.id)} style={{ padding: '5px 12px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '7px', color: '#F87171', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer' }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* ── Summer Camps table ── */}
          {tab === 'summer' && (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                  {['Name', 'Type', 'Age Range', 'Duration', 'Country / City', 'Fees', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#64748B', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {camps.map(s => (
                  <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '20px' }}>{s.emoji}</span>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '0.88rem' }}>{s.name}</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{s.description.slice(0, 40)}…</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: '0.75rem', padding: '3px 10px', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '50px', color: '#F59E0B' }}>{s.type}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#94A3B8' }}>{s.ageRange}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#94A3B8' }}>{s.duration}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#94A3B8' }}>{s.country} / {s.city}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.82rem', fontWeight: '700', color: '#F59E0B' }}>{s.fees}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => { setEditCamp(s); setModal('edit') }} style={{ padding: '5px 12px', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '7px', color: '#F59E0B', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => deleteCamp(s.id)} style={{ padding: '5px 12px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '7px', color: '#F87171', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer' }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ══════════ MODALS ══════════ */}

      {/* School modal */}
      {(modal === 'add' || modal === 'edit') && tab === 'schools' && editSchool && (
        <Modal title={modal === 'add' ? 'Add School' : 'Edit School'} onClose={() => { setModal(null); setEditSchool(null) }}>
          <SchoolForm initial={editSchool} onSave={saveSchool} onCancel={() => { setModal(null); setEditSchool(null) }} />
        </Modal>
      )}

      {/* Language modal */}
      {(modal === 'add' || modal === 'edit') && tab === 'language' && editLang && (
        <Modal title={modal === 'add' ? 'Add Language School' : 'Edit Language School'} onClose={() => { setModal(null); setEditLang(null) }}>
          <LangForm initial={editLang} onSave={saveLang} onCancel={() => { setModal(null); setEditLang(null) }} />
        </Modal>
      )}

      {/* Camp modal */}
      {(modal === 'add' || modal === 'edit') && tab === 'summer' && editCamp && (
        <Modal title={modal === 'add' ? 'Add Summer Camp' : 'Edit Summer Camp'} onClose={() => { setModal(null); setEditCamp(null) }}>
          <CampForm initial={editCamp} onSave={saveCamp} onCancel={() => { setModal(null); setEditCamp(null) }} />
        </Modal>
      )}
    </div>
  )
}

/* ─────────────── Modal wrapper ─────────────── */
function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#1A1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', width: '100%', maxWidth: '620px', maxHeight: '90vh', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <h2 style={{ fontWeight: '800', fontSize: '1.05rem' }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '8px', color: '#94A3B8', fontSize: '16px', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>
        <div style={{ padding: '24px' }}>{children}</div>
      </div>
    </div>
  )
}

/* ─────────────── School form ─────────────── */
function SchoolForm({ initial, onSave, onCancel }: { initial: School; onSave: (s: School) => void; onCancel: () => void }) {
  const [form, setForm] = useState<School>(initial)
  const set = (k: keyof School, v: string) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <Field label="School Name"><input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Eton School" /></Field>
        <Field label="Emoji"><input style={{ ...inputStyle, width: '100px' }} value={form.emoji} onChange={e => set('emoji', e.target.value)} placeholder="🏫" /></Field>
        <Field label="Type">
          <Select value={form.type} onChange={v => set('type', v)} options={['International School', 'Boarding School', 'Grammar School']} />
        </Field>
        <Field label="Curriculum"><input style={inputStyle} value={form.curriculum} onChange={e => set('curriculum', e.target.value)} placeholder="e.g. IB Diploma, A-Levels" /></Field>
        <Field label="Country"><input style={inputStyle} value={form.country} onChange={e => set('country', e.target.value)} placeholder="e.g. UK" /></Field>
        <Field label="City"><input style={inputStyle} value={form.city} onChange={e => set('city', e.target.value)} placeholder="e.g. London" /></Field>
        <Field label="Fees"><input style={inputStyle} value={form.fees} onChange={e => set('fees', e.target.value)} placeholder="e.g. £40,000/yr" /></Field>
        <Field label="Age Range"><input style={inputStyle} value={form.ageRange} onChange={e => set('ageRange', e.target.value)} placeholder="e.g. 13–18" /></Field>
      </div>
      <Field label="Highlights (comma-separated)"><input style={inputStyle} value={form.highlights} onChange={e => set('highlights', e.target.value)} placeholder="e.g. IB World School, Boarding" /></Field>
      <Field label="Description"><textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Brief description of the school…" /></Field>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '8px' }}>
        <button onClick={onCancel} style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#94A3B8', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
        <button onClick={() => onSave(form)} style={{ padding: '10px 24px', background: 'linear-gradient(135deg,#4F46E5,#06B6D4)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>Save School</button>
      </div>
    </div>
  )
}

/* ─────────────── Language form ─────────────── */
function LangForm({ initial, onSave, onCancel }: { initial: LangSchool; onSave: (s: LangSchool) => void; onCancel: () => void }) {
  const [form, setForm] = useState<LangSchool>(initial)
  const set = (k: keyof LangSchool, v: string) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <Field label="School Name"><input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Alliance Française" /></Field>
        <Field label="Emoji"><input style={{ ...inputStyle, width: '100px' }} value={form.emoji} onChange={e => set('emoji', e.target.value)} placeholder="📚" /></Field>
        <Field label="Language Taught">
          <Select value={form.language} onChange={v => set('language', v)} options={['English (ESL)', 'French', 'German', 'Spanish', 'Mandarin', 'Japanese', 'Other']} />
        </Field>
        <Field label="Level"><input style={inputStyle} value={form.level} onChange={e => set('level', e.target.value)} placeholder="e.g. All Levels / A1–C2" /></Field>
        <Field label="Country"><input style={inputStyle} value={form.country} onChange={e => set('country', e.target.value)} placeholder="e.g. France" /></Field>
        <Field label="City"><input style={inputStyle} value={form.city} onChange={e => set('city', e.target.value)} placeholder="e.g. Paris" /></Field>
        <Field label="Fees"><input style={inputStyle} value={form.fees} onChange={e => set('fees', e.target.value)} placeholder="e.g. €380/week" /></Field>
      </div>
      <Field label="Highlights (comma-separated)"><input style={inputStyle} value={form.highlights} onChange={e => set('highlights', e.target.value)} placeholder="e.g. DELF Prep, Cultural Events" /></Field>
      <Field label="Description"><textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Brief description…" /></Field>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '8px' }}>
        <button onClick={onCancel} style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#94A3B8', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
        <button onClick={() => onSave(form)} style={{ padding: '10px 24px', background: 'linear-gradient(135deg,#4F46E5,#06B6D4)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>Save School</button>
      </div>
    </div>
  )
}

/* ─────────────── Camp form ─────────────── */
function CampForm({ initial, onSave, onCancel }: { initial: SummerCamp; onSave: (s: SummerCamp) => void; onCancel: () => void }) {
  const [form, setForm] = useState<SummerCamp>(initial)
  const set = (k: keyof SummerCamp, v: string) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <Field label="Programme Name"><input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Oxford Summer Courses" /></Field>
        <Field label="Emoji"><input style={{ ...inputStyle, width: '100px' }} value={form.emoji} onChange={e => set('emoji', e.target.value)} placeholder="⛺" /></Field>
        <Field label="Type">
          <Select value={form.type} onChange={v => set('type', v)} options={['Academic', 'Language + Fun', 'Sports Camp', 'STEM Camp', 'Cultural Exchange', 'Adventure', 'Summer Camp']} />
        </Field>
        <Field label="Age Range"><input style={inputStyle} value={form.ageRange} onChange={e => set('ageRange', e.target.value)} placeholder="e.g. 12–17 yrs" /></Field>
        <Field label="Country"><input style={inputStyle} value={form.country} onChange={e => set('country', e.target.value)} placeholder="e.g. UK" /></Field>
        <Field label="City"><input style={inputStyle} value={form.city} onChange={e => set('city', e.target.value)} placeholder="e.g. Oxford" /></Field>
        <Field label="Duration"><input style={inputStyle} value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="e.g. 2–6 weeks" /></Field>
        <Field label="Fees"><input style={inputStyle} value={form.fees} onChange={e => set('fees', e.target.value)} placeholder="e.g. £1,950/week" /></Field>
      </div>
      <Field label="Highlights (comma-separated)"><input style={inputStyle} value={form.highlights} onChange={e => set('highlights', e.target.value)} placeholder="e.g. Oxford Schools, 60+ Subjects" /></Field>
      <Field label="Description"><textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Brief description…" /></Field>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '8px' }}>
        <button onClick={onCancel} style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#94A3B8', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
        <button onClick={() => onSave(form)} style={{ padding: '10px 24px', background: 'linear-gradient(135deg,#4F46E5,#06B6D4)', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>Save Camp</button>
      </div>
    </div>
  )
}
