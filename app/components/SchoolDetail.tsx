'use client'

import { useState } from 'react'
import { Check, CircleDollarSign, ClipboardList, GraduationCap, School, ShieldCheck, UserRoundCog } from 'lucide-react'

const tabs = [
  {
    id: 'overview',
    label: 'Overview',
    icon: ClipboardList,
    content: {
      title: 'School Overview',
      desc: 'Get a comprehensive snapshot of the school - its history, school life, rankings, accreditations, and global reputation. Compare schools across 50+ metrics to make confident decisions.',
      bullets: ['World rankings & accreditations', 'School size & facilities', 'Student diversity ratio', 'Alumni network strength'],
    },
  },
  {
    id: 'courses',
    label: 'Courses & Fees',
    icon: GraduationCap,
    content: {
      title: 'Curriculum & Fee Structure',
      desc: 'Browse the full catalogue of academic curricula and extracurricular programs. Explore detailed fee breakdowns, duration, and term windows for each program.',
      bullets: ['Full curriculum catalogue', 'Term & annual fee breakdowns', 'Extracurricular options', 'Term dates & deadlines'],
    },
  },
  {
    id: 'admission',
    label: 'Admission Requirements',
    icon: ShieldCheck,
    content: {
      title: 'Admission Requirements',
      desc: 'Understand exactly what each school expects. From academic grades to language scores, we break down every requirement so you\'re prepared to apply with confidence.',
      bullets: ['Minimum grade requirements', 'Language proficiency scores', 'Application guidelines', 'Interview criteria'],
    },
  },
  {
    id: 'scholarships',
    label: 'Scholarships',
    icon: CircleDollarSign,
    content: {
      title: 'Scholarship Opportunities',
      desc: 'Discover merit and need-based scholarships offered by the school and external bodies. Filter by eligibility and apply directly through our platform.',
      bullets: ['Merit & need-based scholarships', 'Country-specific funding', 'Financial aid programs', 'Automatic scholarship matching'],
    },
  },
  {
    id: 'services',
    label: 'Student Services',
    icon: UserRoundCog,
    content: {
      title: 'Student Support Services',
      desc: 'Beyond academics - explore the full range of student support services including boarding, on-site health, sports, and well-being programs.',
      bullets: ['Boarding options', 'Health & mental wellness', 'Student clubs & activities'],
    },
  },
]

interface SchoolDetailProps {
  onApplyNowClick?: () => void
}

export default function SchoolDetail({ onApplyNowClick: _onApplyNowClick }: SchoolDetailProps) {
  const [active, setActive] = useState('overview')
  const current = tabs.find(t => t.id === active)!

  return (
    <section id="school-detail" style={{ padding: '40px 24px', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <School size={14} /> School Details
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '10px', letterSpacing: '-0.02em' }}>
            Everything You Need <span className="text-blue-800-solid">to Know</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Deep-dive into every aspect of a school before you commit.
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center',
          marginBottom: '20px', padding: '6px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                background: active === tab.id ? '#4f46E5' : 'transparent',
                color: active === tab.id ? 'white' : 'var(--text-secondary)',
                whiteSpace: 'nowrap',
              }}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="glass-card" style={{ padding: '48px', minHeight: '280px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '16px' }}>
            {current.content.title}
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', marginBottom: '28px', maxWidth: '680px' }}>
            {current.content.desc}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            {current.content.bullets.map(b => (
              <div key={b} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '12px 16px',
                background: 'rgba(79,70,229,0.08)',
                border: '1px solid rgba(79,70,229,0.15)',
                borderRadius: '10px',
              }}>
                <Check size={16} color="#4f46E5" />
                <span style={{ fontSize: '0.88rem', fontWeight: '500' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
