'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowUp, BookOpenText, Grid3X3, List, School, Search, SlidersHorizontal, TentTree } from 'lucide-react'

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const schools = [
  { name: 'Eton College', location: '🇬🇧 Windsor, UK', type: 'Boarding School', stream: 'General', fees: '£48,501/yr', highlights: ['World-Famous Alumni', 'All-Boys Boarding', 'Top UK School'], emoji: '🎩' },
  { name: 'Harrow School', location: '🇬🇧 London, UK', type: 'Boarding School', stream: 'General', fees: '£45,735/yr', highlights: ['Founded 1572', 'Global Alumni', 'Boarding Excellence'], emoji: '🏆' },
  { name: 'St Paul\'s School', location: '🇬🇧 London, UK', type: 'Grammar School', stream: 'Sciences', fees: '£29,400/yr', highlights: ['Top Grammar UK', 'Oxbridge Results', 'STEM Excellence'], emoji: '📐' },
  { name: 'TASIS England', location: '🇬🇧 Surrey, UK', type: 'International School', stream: 'IB Diploma', fees: '£42,000/yr', highlights: ['IB World School', 'US Curriculum', 'Boarding Option'], emoji: '🌍' },
  { name: 'Institut Le Rosey', location: '🇨🇭 Rolle, Switzerland', type: 'Boarding School', stream: 'General', fees: 'CHF 130,000/yr', highlights: ['Most Expensive School', 'Bi-Campus', 'Royal Alumni'], emoji: '👑' },
  { name: 'United World College', location: '🇨🇦 Victoria, Canada', type: 'International School', stream: 'IB Diploma', fees: 'Need-based', highlights: ['Scholarship Mission', 'IB Only', 'Global Community'], emoji: '🤝' },
  { name: 'Gordonstoun School', location: '🇬🇧 Elgin, Scotland', type: 'Boarding School', stream: 'General', fees: '£39,465/yr', highlights: ['Outdoor Learning', 'Royal Connections', 'Leadership Focus'], emoji: '🏔️' },
  { name: 'The American School Paris', location: '🇫🇷 Paris, France', type: 'International School', stream: 'IB Diploma', fees: '€38,000/yr', highlights: ['IB & AP', 'Since 1946', 'Expat Community'], emoji: '🗼' },
  { name: 'King\'s College School', location: '🇬🇧 Wimbledon, UK', type: 'Grammar School', stream: 'Humanities', fees: '£24,900/yr', highlights: ['Top 10 UK', 'Choristers', 'Oxbridge Track'], emoji: '📚' },
  { name: 'Nord Anglia International', location: '🇭🇰 Hong Kong', type: 'International School', stream: 'IB Diploma', fees: 'HK$185,000/yr', highlights: ['Arts by Juilliard', 'Sport by IMG', 'STEM by MIT'], emoji: '🎭' },
  { name: 'Millfield School', location: '🇬🇧 Somerset, UK', type: 'Boarding School', stream: 'Sport & Arts', fees: '£43,650/yr', highlights: ['Olympic Athletes', 'Arts & Sport Focus', 'Top Boarding'], emoji: '🏊' },
  { name: 'Deutsche Schule', location: '🇩🇪 Berlin, Germany', type: 'International School', stream: 'German Abitur', fees: '€8,400/yr', highlights: ['Trilingual', 'EU Recognition', 'Low Fees'], emoji: '🇩🇪' },
  { name: 'The Perse School', location: '🇬🇧 Cambridge, UK', type: 'Grammar School', stream: 'Sciences', fees: '£22,890/yr', highlights: ['Cambridge Setting', 'STEM Focus', 'Selective Entry'], emoji: '🔬' },
  { name: 'Collège Champittet', location: '🇨🇭 Lausanne, Switzerland', type: 'Boarding School', stream: 'IB Diploma', fees: 'CHF 85,000/yr', highlights: ['Swiss Excellence', 'Bilingual', 'Lake Views'], emoji: '🏔️' },
  { name: 'GEMS Wellington Academy', location: '🇦🇪 Dubai, UAE', type: 'International School', stream: 'British Curriculum', fees: 'AED 85,000/yr', highlights: ['British Curriculum', 'Award-Winning', 'KHDA Outstanding'], emoji: '🏙️' },
  { name: 'Singapore American School', location: '🇸🇬 Singapore', type: 'International School', stream: 'AP / IB', fees: 'S$55,000/yr', highlights: ['Largest Int\'l School', 'AP & IB', 'Top Rated'], emoji: '🌴' },
]

const languageSchools = [
  { name: 'British Study Centres', location: '🇬🇧 Oxford, UK', language: 'English (ESL)', level: 'All Levels', fees: '£350/week', highlights: ['Central Oxford', 'Oxford Uni Affiliation', 'Cultural Trips'], emoji: '🎓' },
  { name: 'EC Language Schools', location: '🇬🇧 London, UK', language: 'English (ESL)', level: 'Beginner-Advanced', fees: '£280/week', highlights: ['30+ Locations', 'Online Option', 'Accredited ALTA'], emoji: '🌐' },
  { name: 'Inlingua Geneva', location: '🇨🇭 Geneva, Switzerland', language: 'French', level: 'All Levels', fees: 'CHF 620/week', highlights: ['Native Trainers', 'Business French', 'Diplomatic City'], emoji: '🇫🇷' },
  { name: 'Goethe Institut Berlin', location: '🇩🇪 Berlin, Germany', language: 'German', level: 'A1-C2', fees: '€450/week', highlights: ['Official German Cert', 'Cultural Programme', 'CEFR Aligned'], emoji: '🇩🇪' },
  { name: 'Instituto Cervantes', location: '🇪🇸 Madrid, Spain', language: 'Spanish', level: 'All Levels', fees: '€320/week', highlights: ['DELE Exams', 'Spanish Govt Backed', 'Immersive'], emoji: '🇪🇸' },
  { name: 'Alliance Française Paris', location: '🇫🇷 Paris, France', language: 'French', level: 'All Levels', fees: '€380/week', highlights: ['DELF/DALF Prep', 'Cultural Events', 'Heart of Paris'], emoji: '🗼' },
  { name: 'Mandarin House', location: '🇨🇳 Shanghai, China', language: 'Mandarin', level: 'Beginner-Advanced', fees: '$420/week', highlights: ['HSK Preparation', 'Business Chinese', 'Cultural Immersion'], emoji: '🏮' },
  { name: 'Japan Language School', location: '🇯🇵 Tokyo, Japan', language: 'Japanese', level: 'All Levels', fees: '¥85,000/month', highlights: ['JLPT Prep', 'Visa Support', 'Anime Culture'], emoji: '⛩️' },
  { name: 'ILSC Language Schools', location: '🇨🇦 Toronto, Canada', language: 'English (ESL)', level: 'All Levels', fees: 'CAD 400/week', highlights: ['Post-Study Work', 'Multicultural City', 'PR Pathway'], emoji: '🍁' },
  { name: 'Kaplan International', location: '🇦🇺 Sydney, Australia', language: 'English (ESL)', level: 'Beginner-Advanced', fees: 'AUD 380/week', highlights: ['IELTS Preparation', 'Work Rights', 'Beach City'], emoji: '🌊' },
]

const summerCamps = [
  { name: 'Oxford Summer Courses', location: '🇬🇧 Oxford, UK', type: 'Academic', ageRange: '9-24 yrs', duration: '2-6 weeks', fees: '£1,950/week', highlights: ['Oxford Colleges', 'Academic Enrichment', '60+ Subjects'], emoji: '📖' },
  { name: 'Cambridge Immerse', location: '🇬🇧 Cambridge, UK', type: 'Academic', ageRange: '13-18 yrs', duration: '2 weeks', fees: '£4,295/programme', highlights: ['Cambridge Uni Setting', 'Research Projects', '90+ Nationalities'], emoji: '🔭' },
  { name: 'Camp America', location: '🇺🇸 USA', type: 'Summer Camp', ageRange: '18-30 yrs (staff)', duration: '8-12 weeks', fees: 'Paid Placement', highlights: ['USA J-1 Visa', 'Paid + Travel', 'Lifelong Friends'], emoji: '🏕️' },
  { name: 'EF Summer School', location: '🇬🇧 London, UK', type: 'Language + Fun', ageRange: '8-18 yrs', duration: '1-8 weeks', fees: '£999/week', highlights: ['English + Activities', 'Sports & Arts', '70+ Countries'], emoji: '⚽' },
  { name: 'IMG Academy Summer', location: '🇺🇸 Florida, USA', type: 'Sports Camp', ageRange: '9-18 yrs', duration: '1-4 weeks', fees: '$2,995/week', highlights: ['Elite Sports Training', 'NFL/NBA Alumni', 'Multi-Sport'], emoji: '🏆' },
  { name: 'Alps Science Camp', location: '🇨🇭 Swiss Alps', type: 'STEM Camp', ageRange: '12-17 yrs', duration: '2-3 weeks', fees: 'CHF 4,200/program', highlights: ['Robotics & AI', 'Swiss Precision', 'Mountain Setting'], emoji: '🤖' },
  { name: 'Nacel Cultural Exchange', location: '🇫🇷 Paris, France', type: 'Cultural Exchange', ageRange: '13-18 yrs', duration: '3-4 weeks', fees: '€2,100/programme', highlights: ['Host Family', 'French Classes', 'Eiffel Tower'], emoji: '🗼' },
  { name: 'Raleigh International', location: '🌍 Multiple Countries', type: 'Adventure', ageRange: '17-24 yrs', duration: '5-10 weeks', fees: '£3,200-£4,000', highlights: ['Community Projects', 'Jungle Expeditions', 'Global Volunteering'], emoji: '🌿' },
]

const INITIAL_LIMIT = 6

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function Explorer() {
  const [activeTab, setActiveTab] = useState<'schools' | 'language' | 'summer'>('schools')
  const [schoolType, setSchoolType] = useState('All Types')
  const [country, setCountry] = useState('All Countries')
  const [language, setLanguage] = useState('All Languages')
  const [campType, setCampType] = useState('All Types')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [showAll, setShowAll] = useState(false)

  // Reset showAll when tab/filter changes
  const handleTab = (t: typeof activeTab) => { setActiveTab(t); setShowAll(false) }

  const schoolTypes = ['All Types', 'International School', 'Boarding School', 'Grammar School']
  const schoolCountries = ['All Countries', 'UK', 'Switzerland', 'France', 'Canada', 'Germany', 'UAE', 'Singapore', 'Hong Kong']
  const languages = ['All Languages', 'English (ESL)', 'French', 'German', 'Spanish', 'Mandarin', 'Japanese']
  const campTypes = ['All Types', 'Academic', 'Language + Fun', 'Sports Camp', 'STEM Camp', 'Cultural Exchange', 'Adventure', 'Summer Camp']

  // Filtering
  const filteredSchools = schools.filter(s =>
    (schoolType === 'All Types' || s.type === schoolType) &&
    (country === 'All Countries' || s.location.includes(country))
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
    <section id="explorer" style={{ padding: '100px 24px', background: 'var(--background)', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <Search size={14} /> Directory Explorer
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            Find Your Perfect <span className="text-blue-800">Programme</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto' }}>
            Browse schools, language programmes, and summer camps from one unified directory.
          </p>
        </div>

        {/* ── Category Tabs ── */}
        <div style={{
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
                fontWeight: '700',
                transition: 'all 0.25s ease',
                background: activeTab === tab.id ? 'linear-gradient(135deg,#4F46E5,#06B6D4)' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                whiteSpace: 'nowrap',
              }}
            >
              <tab.icon size={14} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} />
              {tab.label}
              <span style={{
                marginLeft: '6px', fontSize: '0.72rem',
                background: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)',
                borderRadius: '50px', padding: '1px 7px',
              }}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* ── Main Layout ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 4fr', gap: '32px', alignItems: 'start' }}>

          {/* Left: Image + Filters */}
          <div style={{ position: 'sticky', top: '100px', alignSelf: 'start' }}>
            <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: 'var(--shadow-card)' }}>
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
                      {schoolTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <select value={country} onChange={e => { setCountry(e.target.value); setShowAll(false) }} style={selectStyle}>
                      {schoolCountries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </>
                )}
                {activeTab === 'language' && (
                  <select value={language} onChange={e => { setLanguage(e.target.value); setShowAll(false) }} style={selectStyle}>
                    {languages.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                )}
                {activeTab === 'summer' && (
                  <select value={campType} onChange={e => { setCampType(e.target.value); setShowAll(false) }} style={selectStyle}>
                    {campTypes.map(t => <option key={t} value={t}>{t}</option>)}
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
                    background: view === v ? 'linear-gradient(135deg,#4F46E5,#06B6D4)' : 'rgba(255,255,255,0.05)',
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
            <div style={{
              display: view === 'grid' ? 'grid' : 'flex',
              flexDirection: view === 'list' ? 'column' : undefined,
              gridTemplateColumns: view === 'grid' ? 'repeat(auto-fill, minmax(240px, 1fr))' : undefined,
              gap: '14px',
            }}>
              {visible.map((item: any) => (
                <div key={item.name} className="glass-card" style={{
                  padding: '18px',
                  display: view === 'list' ? 'flex' : 'block',
                  alignItems: view === 'list' ? 'center' : undefined,
                  gap: view === 'list' ? '14px' : undefined,
                }}>
                  {/* Icon */}
                  <div style={{
                    width: view === 'list' ? '44px' : '48px',
                    height: view === 'list' ? '44px' : '48px',
                    minWidth: '44px',
                    background: 'linear-gradient(135deg, rgba(79,70,229,0.2), rgba(6,182,212,0.2))',
                    borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '22px', marginBottom: view === 'grid' ? '12px' : 0,
                  }}>
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: view === 'grid' ? '8px' : '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.location}
                      {item.type ? ` · ${item.type}` : ''}
                      {item.language ? ` · ${item.language}` : ''}
                      {item.ageRange ? ` · ${item.ageRange}` : ''}
                    </p>
                    {view === 'grid' && (
                      <div style={{ marginBottom: '10px' }}>
                        {item.highlights?.slice(0, 2).map((h: string) => (
                          <span key={h} style={{
                            display: 'inline-block', fontSize: '0.66rem', padding: '2px 7px',
                            background: 'rgba(79,70,229,0.12)', border: '1px solid rgba(79,70,229,0.2)',
                            borderRadius: '50px', marginRight: '4px', marginBottom: '3px', color: 'var(--primary-light)',
                          }}>{h}</span>
                        ))}
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--gold)' }}>{item.fees}</span>
                      <button style={{
                        background: 'linear-gradient(135deg,#4F46E5,#06B6D4)',
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
                    background: showAll ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg,#4F46E5,#06B6D4)',
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
    </section>
  )
}
