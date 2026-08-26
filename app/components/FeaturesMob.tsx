'use client'

import { ArrowUpRight, Building2, FileText, Globe, GraduationCap, Users } from 'lucide-react'

const cards = [
  {
    icon: <Building2 size={24} strokeWidth={1.8} />,
    label: 'Schools',
    title: 'Browse Schools',
    desc: 'Thousands of schools across 120+ countries — in one place.',
    accent: '#4F46E5',
    accentBg: 'rgba(79,70,229,0.15)',
    accentBorder: 'rgba(79,70,229,0.3)',
  },
  {
    icon: <GraduationCap size={24} strokeWidth={1.8} />,
    label: 'Scholarships',
    title: 'Find Scholarships',
    desc: 'Curated grants and financial aid matched to your profile.',
    accent: '#06B6D4',
    accentBg: 'rgba(6,182,212,0.15)',
    accentBorder: 'rgba(6,182,212,0.3)',
  },
  {
    icon: <FileText size={24} strokeWidth={1.8} />,
    label: 'Applications',
    title: 'Apply Online',
    desc: 'Fast, paperless applications — submitted in minutes.',
    accent: '#10B981',
    accentBg: 'rgba(16,185,129,0.15)',
    accentBorder: 'rgba(16,185,129,0.3)',
  },
  {
    icon: <Users size={24} strokeWidth={1.8} />,
    label: 'Community',
    title: 'Expert Support',
    desc: 'Connect with peers and advisors for personalized guidance.',
    accent: '#F59E0B',
    accentBg: 'rgba(245,158,11,0.15)',
    accentBorder: 'rgba(245,158,11,0.3)',
  },
]

interface FeaturesMobProps {
  onApplyNowClick?: () => void
}

export default function FeaturesMob({ onApplyNowClick: _onApplyNowClick }: FeaturesMobProps) {
  return (
    <section
      id="features-mob"
      style={{
        padding: '36px 16px',
        background: 'var(--surface)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '-80px', left: '-80px',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '12px' }}>
          <Globe size={13} /> Why Choose Us
        </div>
        <h2 style={{
          fontSize: '1.6rem',
          fontWeight: '800',
          lineHeight: '1.2',
          marginBottom: '10px',
          letterSpacing: '-0.01em',
          color: 'var(--text-primary)',
        }}>
          One Platform.<br />
          <span className="text-blue-800-solid">Every Opportunity.</span>
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '300px', margin: '0 auto' }}>
          Everything you need to study abroad — schools, scholarships, visas, and more.
        </p>
      </div>

      {/* 2×2 card grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '12px',
      }}>
        {cards.map((card) => (
          <div
            key={card.label}
            className="glass-card"
            style={{
              padding: '20px 16px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top accent line */}
            <div style={{
              position: 'absolute', top: 0, left: '15%',
              width: '70%', height: '2px',
              background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
            }} />

            {/* Label */}
            <p style={{
              fontSize: '0.62rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: card.accent,
              marginBottom: '12px',
            }}>
              {card.label}
            </p>

            {/* Icon */}
            <div style={{
              width: '42px', height: '42px',
              background: card.accentBg,
              border: `1px solid ${card.accentBorder}`,
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '14px',
              color: card.accent,
            }}>
              {card.icon}
            </div>

            <h3 style={{
              fontSize: '0.92rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '6px',
              lineHeight: 1.3,
            }}>
              {card.title}
            </h3>
            <p style={{
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.55',
            }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Global Reach banner */}
      <div
        className="glass-card"
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '130px',
          background: '#0a0a14',
          border: '1px solid var(--border)',
        }}
      >
        {/* BG image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('/global-reach.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(10,10,20,0.92) 50%, rgba(10,10,20,0.5) 100%)',
        }} />
        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 1,
          padding: '24px 20px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%',
        }}>
          <div style={{
            width: '38px', height: '38px',
            background: 'rgba(79,70,229,0.2)',
            border: '1px solid rgba(79,70,229,0.4)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '10px',
          }}>
            <Globe style={{ width: '18px', height: '18px', color: '#818CF8' }} strokeWidth={2} />
          </div>
          <p style={{ fontSize: '0.62rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#818CF8', marginBottom: '4px' }}>
            Global Reach
          </p>
          <div style={{ fontSize: '2rem', fontWeight: '800', lineHeight: 1, marginBottom: '4px' }}>
            <span className="text-blue-800-blue">120+</span>
            <span style={{ color: 'var(--text-primary)', marginLeft: '6px', fontSize: '1.4rem' }}>Countries</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Schools &amp; programmes spanning 6 continents
          </p>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href="#explorer">
          <button className="btn-primary" style={{ fontSize: '0.85rem', padding: '11px 24px', width: '100%', justifyContent: 'center' }}>
            <span>Explore Schools</span>
            <ArrowUpRight size={15} />
          </button>
        </a>
      </div>
    </section>
  )
}
