'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowUp, BookOpenText, Grid3X3, List, School, Search, SlidersHorizontal, TentTree } from 'lucide-react'

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
import SchoolModal from './SchoolModal'

const languageSchools = [
  { name: 'British Study Centres', location: '🇬🇧 Oxford, UK', language: 'English (ESL)', level: 'All Levels', fees: '£350/week', highlights: ['Central Oxford', 'Oxford School Affiliation', 'Cultural Trips'], emoji: '🎓' },
  { name: 'EC Language Schools', location: '🇬🇧 London, UK', language: 'English (ESL)', level: 'Beginner-Advanced', fees: '£280/week', highlights: ['30+ Locations', 'Online Option', 'Accredited ALTA'], emoji: '🌐' },
  { name: 'Inlingua Geneva', location: '🇨🇭 Geneva, Switzerland', language: 'French', level: 'All Levels', fees: 'CHF 620/week', highlights: ['Native Trainers', 'Interactive French', 'Diplomatic City'], emoji: '🇫🇷' },
  { name: 'Goethe Institut Berlin', location: '🇩🇪 Berlin, Germany', language: 'German', level: 'A1-C2', fees: '€450/week', highlights: ['Language Cert', 'Cultural Programme', 'CEFR Aligned'], emoji: '🇩🇪' },
  { name: 'Instituto Cervantes', location: '🇪🇸 Madrid, Spain', language: 'Spanish', level: 'All Levels', fees: '€320/week', highlights: ['DELE Exams', 'Spanish Govt Backed', 'Immersive'], emoji: '🇪🇸' },
  { name: 'Alliance Française Paris', location: '🇫🇷 Paris, France', language: 'French', level: 'All Levels', fees: '€380/week', highlights: ['DELF/DALF Prep', 'Cultural Events', 'Heart of Paris'], emoji: '🗼' },
  { name: 'Mandarin House', location: '🇨🇳 Shanghai, China', language: 'Mandarin', level: 'Beginner-Advanced', fees: '$420/week', highlights: ['HSK Preparation', 'Conversational Chinese', 'Cultural Immersion'], emoji: '🏮' },
  { name: 'Japan Language School', location: '🇯🇵 Tokyo, Japan', language: 'Japanese', level: 'All Levels', fees: '¥85,000/month', highlights: ['JLPT Prep', 'Safe Environment', 'Anime Culture'], emoji: '⛩️' },
  { name: 'ILSC Language Schools', location: '🇨🇦 Toronto, Canada', language: 'English (ESL)', level: 'All Levels', fees: 'CAD 400/week', highlights: ['After-School Care', 'Multicultural City', 'Interactive Learning'], emoji: '🍁' },
  { name: 'Kaplan International', location: '🇦🇺 Sydney, Australia', language: 'English (ESL)', level: 'Beginner-Advanced', fees: 'AUD 380/week', highlights: ['ESL Support', 'Safe Environment', 'Beach City'], emoji: '🌊' },
]

const summerCamps = [
  { name: 'Oxford Summer Courses', location: '🇬🇧 Oxford, UK', type: 'Academic', ageRange: '9-18 yrs', duration: '2-6 weeks', fees: '£1,950/week', highlights: ['Oxford Schools', 'Academic Enrichment', '60+ Subjects'], emoji: '📖' },
  { name: 'Cambridge Immerse', location: '🇬🇧 Cambridge, UK', type: 'Academic', ageRange: '13-18 yrs', duration: '2 weeks', fees: '£4,295/programme', highlights: ['Cambridge School Setting', 'Research Projects', '90+ Nationalities'], emoji: '🔭' },
  { name: 'Camp America', location: '🇺🇸 USA', type: 'Summer Camp', ageRange: '8-16 yrs', duration: '4-8 weeks', fees: '$1,500/week', highlights: ['Outdoor Activities', 'Safe Environment', 'Lifelong Friends'], emoji: '🏕️' },
  { name: 'EF Summer School', location: '🇬🇧 London, UK', type: 'Language + Fun', ageRange: '8-18 yrs', duration: '1-8 weeks', fees: '£999/week', highlights: ['English + Activities', 'Sports & Arts', '70+ Countries'], emoji: '⚽' },
  { name: 'IMG Academy Summer', location: '🇺🇸 Florida, USA', type: 'Sports Camp', ageRange: '9-18 yrs', duration: '1-4 weeks', fees: '$2,995/week', highlights: ['Elite Sports Training', 'Professional Coaches', 'Multi-Sport'], emoji: '🏆' },
  { name: 'Alps Science Camp', location: '🇨🇭 Swiss Alps', type: 'STEM Camp', ageRange: '12-17 yrs', duration: '2-3 weeks', fees: 'CHF 4,200/program', highlights: ['Robotics & AI', 'Swiss Precision', 'Mountain Setting'], emoji: '🤖' },
  { name: 'Nacel Cultural Exchange', location: '🇫🇷 Paris, France', type: 'Cultural Exchange', ageRange: '13-18 yrs', duration: '3-4 weeks', fees: '€2,100/programme', highlights: ['Host Family', 'French Classes', 'Eiffel Tower'], emoji: '🗼' },
  { name: 'Raleigh International', location: '🌍 Multiple Countries', type: 'Adventure', ageRange: '14-18 yrs', duration: '2-4 weeks', fees: '£1,200-£2,000', highlights: ['Community Projects', 'Jungle Expeditions', 'Global Volunteering'], emoji: '🌿' },
]

const INITIAL_LIMIT = 6

interface ExplorerProps {
  onApplyNowClick?: () => void
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function Explorer({ onApplyNowClick: _onApplyNowClick }: ExplorerProps) {
  const [schools, setSchools] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('https://schooldirectorycms.qstudyworld.com/api/schools')
        if (!response.ok) {
          throw new Error('Failed to fetch schools')
        }
        const data = await response.json()
        setSchools(data.data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSchools()
  }, [])

  const [activeTab, setActiveTab] = useState<'schools' | 'language' | 'summer'>('schools')
  const [schoolType, setSchoolType] = useState('All Types')
  const [country, setCountry] = useState('All Countries')
  const [language, setLanguage] = useState('All Languages')
  const [campType, setCampType] = useState('All Types')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [showAll, setShowAll] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  // Reset showAll when tab/filter changes
  const handleTab = (t: typeof activeTab) => { setActiveTab(t); setShowAll(false) }

  // Dynamically generate filter options from actual data
  const dynamicSchoolTypes = Array.from(new Set(schools.map((s: any) => s.type).filter(Boolean))).sort() as string[]
  const schoolTypes = ['All Types', ...dynamicSchoolTypes]

  const getCountry = (loc: string) => {
    if (!loc) return ''
    // Handle flags if any are in the string, or just split by comma
    const parts = loc.split(',')
    const lastPart = parts[parts.length - 1].trim()
    // Remove emojis if present to get clean country name for filtering
    return lastPart.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '').trim()
  }

  const dynamicCountries = Array.from(new Set(schools.map((s: any) => getCountry(s.location)).filter(Boolean))).sort() as string[]
  const schoolCountries = ['All Countries', ...dynamicCountries]

  const languages = ['All Languages', 'English (ESL)', 'French', 'German', 'Spanish', 'Mandarin', 'Japanese']
  const campTypes = ['All Types', 'Academic', 'Language + Fun', 'Sports Camp', 'STEM Camp', 'Cultural Exchange', 'Adventure', 'Summer Camp']

  // Filtering
  const filteredSchools = schools.filter((s: any) =>
    (schoolType === 'All Types' || s.type === schoolType) &&
    (country === 'All Countries' || getCountry(s.location) === country)
  )
  const filteredLang = languageSchools.filter(s =>
    language === 'All Languages' || s.language === language
  )
  const filteredCamps = summerCamps.filter(s =>
    campType === 'All Types' || s.type === campType
  )

  const allData = activeTab === 'schools' ? filteredSchools : activeTab === 'language' ? filteredLang : filteredCamps
  const visible = showAll ? allData : allData.slice(0, INITIAL_LIMIT)
  const hasMore = allData.length > INITIAL_LIMIT

  const selectStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    color: 'var(--text-primary)',
    padding: '10px 16px',
    fontSize: '0.85rem',
    cursor: 'pointer',
    outline: 'none',
    width: '100%',
  }

  const tabs = [
    { id: 'schools' as const, label: 'Schools', icon: School, count: schools.length },
    { id: 'language' as const, label: 'Language Schools', icon: BookOpenText, count: languageSchools.length },
    { id: 'summer' as const, label: 'Summer Camps', icon: TentTree, count: summerCamps.length },
  ]

  return (
    <section id="explorer" style={{ padding: '40px 24px', background: 'var(--background)', position: 'relative' }}>
      <style>{`
        @media (max-width: 768px) {
          /* Tab bar: scrollable row */
          .explorer-tabs {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            justify-content: flex-start !important;
            flex-wrap: nowrap !important;
            scrollbar-width: none;
            max-width: 100% !important;
            margin: 0 0 24px !important;
          }
          .explorer-tabs::-webkit-scrollbar { display: none; }
          .explorer-tabs button { flex-shrink: 0; padding: 9px 14px !important; font-size: 0.8rem !important; }

          /* Main layout: single column */
          .explorer-layout {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }

          /* Hide the image, show filters inline */
          .explorer-image { display: none !important; }
          .explorer-sidebar { position: static !important; }

          /* Cards: single column on mobile */
          .explorer-grid-wrap[data-view='grid'] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <Search size={14} /> Directory Explorer
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '10px', letterSpacing: '-0.02em' }}>
            Find Your Perfect <span className="text-blue-800-solid">Programme</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto' }}>
            Browse schools, language programmes, and summer camps from one unified directory.
          </p>
        </div>

        {/* ── Category Tabs ── */}
        <div className="explorer-tabs" style={{
          display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap',
          marginBottom: '48px', padding: '6px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          maxWidth: '640px', margin: '0 auto 48px',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTab(tab.id)}
              style={{
                flex: 1,
                padding: '11px 20px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: '800',
                transition: 'all 0.25s ease',
                background: activeTab === tab.id ? '#4f46E5' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <tab.icon size={14} />
              {tab.label}
              <span style={{
                fontSize: '0.72rem',
                background: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)',
                borderRadius: '50px', padding: '1px 7px',
                lineHeight: 1.6,
              }}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* ── Main Layout ── */}
        <div className="explorer-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 4fr', gap: '32px', alignItems: 'start' }}>

          {/* Left: Image + Filters */}
          <div className="explorer-sidebar" style={{ position: 'sticky', top: '100px', alignSelf: 'start' }}>
            <div className="explorer-image" style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'var(--shadow-card)' }}>
              <Image src="/student-search.png" alt="Student searching for schools" width={500} height={320} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>

            {/* Filters */}
            <div className="glass-card" style={{ padding: '20px' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '14px', fontSize: '0.9rem', color: 'var(--primary-light)', display: 'flex', gap: '6px', alignItems: 'center' }}>
                <SlidersHorizontal size={14} />
                Smart Filters
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeTab === 'schools' && (
                  <>
                    <select value={schoolType} onChange={e => { setSchoolType(e.target.value); setShowAll(false) }} style={selectStyle}>
                      {schoolTypes.map(t => <option key={t} value={t} style={{ background: '#1e1b4b', color: 'white' }}>{t}</option>)}
                    </select>
                    <select value={country} onChange={e => { setCountry(e.target.value); setShowAll(false) }} style={selectStyle}>
                      {schoolCountries.map(c => <option key={c} value={c} style={{ background: '#1e1b4b', color: 'white' }}>{c}</option>)}
                    </select>
                  </>
                )}
                {activeTab === 'language' && (
                  <select value={language} onChange={e => { setLanguage(e.target.value); setShowAll(false) }} style={selectStyle}>
                    {languages.map(l => <option key={l} value={l} style={{ background: '#1e1b4b', color: 'white' }}>{l}</option>)}
                  </select>
                )}
                {activeTab === 'summer' && (
                  <select value={campType} onChange={e => { setCampType(e.target.value); setShowAll(false) }} style={selectStyle}>
                    {campTypes.map(t => <option key={t} value={t} style={{ background: '#1e1b4b', color: 'white' }}>{t}</option>)}
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Right: Cards */}
          <div>
            {/* Count + view toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                <strong style={{ color: 'var(--text-primary)' }}>{allData.length}</strong> results
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {(['grid', 'list'] as const).map(v => (
                  <button key={v} onClick={() => setView(v)} style={{
                    background: view === v ? '#4f46E5' : 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px', padding: '7px 13px',
                    color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.78rem', fontWeight: '600',
                  }}>
                    {v === 'grid'
                      ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Grid3X3 size={13} /> Grid</span>
                      : <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><List size={13} /> List</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards grid/list */}
            <div
              className="explorer-grid-wrap"
              data-view={view}
              style={{
                display: view === 'grid' ? 'grid' : 'flex',
                flexDirection: view === 'list' ? 'column' : undefined,
                gridTemplateColumns: view === 'grid' ? 'repeat(auto-fill, minmax(240px, 1fr))' : undefined,
                gap: '14px',
              }}
            >
              {isLoading && activeTab === 'schools' ? (
                <div style={{ padding: '20px', color: 'var(--text-secondary)' }}>Loading schools...</div>
              ) : error && activeTab === 'schools' ? (
                <div style={{ padding: '20px', color: '#ef4444' }}>Error: {error}</div>
              ) : visible.map((item: any) => (
                <div key={item.name} className="glass-card" style={{
                  padding: '18px',
                  display: view === 'list' ? 'flex' : 'block',
                  alignItems: view === 'list' ? 'center' : undefined,
                  gap: view === 'list' ? '14px' : undefined,
                }}>
                  {/* Icon */}
                  {item.image ? (
                    <div style={{
                      width: view === 'list' ? '64px' : '100%',
                      height: view === 'list' ? '64px' : '120px',
                      minWidth: view === 'list' ? '64px' : undefined,
                      marginBottom: view === 'grid' ? '20px' : 0,
                      position: 'relative'
                    }}>
                      <Image
                        src={encodeURI(item.image)}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'contain', borderRadius: '12px', background: 'white', padding: '6px' }}
                      />
                    </div>
                  ) : (
                    <div style={{
                      width: view === 'list' ? '64px' : '100%',
                      height: view === 'list' ? '64px' : '120px',
                      minWidth: view === 'list' ? '64px' : undefined,
                      background: 'linear-gradient(135deg, rgba(79,70,229,0.2), rgba(6,182,212,0.2))',
                      borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: view === 'list' ? '32px' : '40px', marginBottom: view === 'grid' ? '16px' : 0,
                    }}>
                      {item.emoji}
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: view === 'grid' ? '8px' : '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {/* {item.location}
                      {item.type ? ` · ${item.type}` : ''}
                      {item.language ? ` · ${item.language}` : ''}
                      {item.ageRange ? ` · ${item.ageRange}` : ''} */}
                      {item.schoolInfo?.operationalModel || item.operationalModel}
                    </p>
                    {/* {view === 'grid' && (
                      <div style={{ marginBottom: '10px' }}>
                        {item.highlights?.slice(0, 2).map((h: string) => (
                          <span key={h} style={{
                            display: 'inline-block', fontSize: '0.66rem', padding: '2px 7px',
                            background: 'rgba(79,70,229,0.12)', border: '1px solid rgba(79,70,229,0.2)',
                            borderRadius: '50px', marginRight: '4px', marginBottom: '3px', color: 'var(--primary-light)',
                          }}>{h}</span>
                        ))}
                      </div>
                    )} */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--gold)' }}>
                        {(() => {
                          const val = item.fees || item.feesPerYearWithoutBoarding || item.feesPerTermWithBoarding;
                          if (!val || val === '-' || val === '') return 'Contact for fees';
                          const num = Number(val);
                          if (!isNaN(num)) {
                            let currencyCode = 'USD';
                            const loc = (item.location || '').toLowerCase();
                            if (loc.includes('malaysia')) currencyCode = 'MYR';
                            else if (loc.includes('india')) currencyCode = 'INR';
                            else if (loc.includes('uk') || loc.includes('united kingdom')) currencyCode = 'GBP';
                            else if (loc.includes('canada')) currencyCode = 'CAD';
                            else if (loc.includes('australia')) currencyCode = 'AUD';
                            else if (loc.includes('switzerland')) currencyCode = 'CHF';

                            const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode, maximumFractionDigits: 0 }).format(num);
                            let currencySuffix = currencyCode;
                            if (currencyCode === 'INR') currencySuffix = 'Rupees';
                            else if (currencyCode === 'MYR') currencySuffix = 'RM';

                            // Append " / year" if it's derived from perYear fees, or just standard display
                            return `${formatted} ${currencySuffix}`;
                          }
                          return val;
                        })()}
                      </span>
                      <button
                        onClick={() => setSelectedItem(item)}
                        style={{
                          background: '#4f46E5',
                          border: 'none', borderRadius: '8px', padding: '5px 12px',
                          color: 'white', fontSize: '0.72rem', fontWeight: '600', cursor: 'pointer',
                        }}>
                        View →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More / Less */}
            {hasMore && (
              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <button
                  onClick={() => setShowAll(p => !p)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '11px 30px',
                    background: showAll ? 'rgba(255,255,255,0.05)' : '#4f46E5',
                    border: showAll ? '1px solid rgba(255,255,255,0.12)' : 'none',
                    borderRadius: '50px', color: 'white',
                    fontWeight: '700', fontSize: '0.88rem', cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {showAll
                    ? <><ArrowUp size={14} /><span>Show Less</span></>
                    : <><span>Show {allData.length - INITIAL_LIMIT} More</span><ArrowDown size={14} /></>}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* School Details Modal */}
      <SchoolModal item={selectedItem} onClose={() => setSelectedItem(null)} onApplyNowClick={_onApplyNowClick} />
    </section>
  )
}
