import Link from 'next/link'
import { ArrowUpRight, Building2, FileText, Globe, GraduationCap, Users } from 'lucide-react'

const cards = [
  {
    icon: <Building2 size={28} strokeWidth={1.8} />,
    label: 'Schools',
    title: 'Browse Schools',
    desc: 'Discover thousands of universities, colleges, and institutions across 120+ countries - all in one place.',
    accent: '#4F46E5',
    accentBg: 'rgba(79,70,229,0.15)',
    accentBorder: 'rgba(79,70,229,0.35)',
    glowColor: 'rgba(79,70,229,0.2)',
  },
  {
    icon: <GraduationCap size={28} strokeWidth={1.8} />,
    label: 'Scholarships',
    title: 'Find Scholarships',
    desc: 'Access curated scholarships, grants, and financial aid opportunities tailored to your profile and goals.',
    accent: '#06B6D4',
    accentBg: 'rgba(6,182,212,0.15)',
    accentBorder: 'rgba(6,182,212,0.35)',
    glowColor: 'rgba(6,182,212,0.2)',
  },
  {
    icon: <FileText size={28} strokeWidth={1.8} />,
    label: 'Applications',
    title: 'Apply Online',
    desc: 'Submit your applications directly through our streamlined online process - fast, paperless, and stress-free.',
    accent: '#10B981',
    accentBg: 'rgba(16,185,129,0.15)',
    accentBorder: 'rgba(16,185,129,0.35)',
    glowColor: 'rgba(16,185,129,0.2)',
  },
  {
    icon: <Users size={28} strokeWidth={1.8} />,
    label: 'Counselling',
    title: 'Expert Counselling',
    desc: 'Connect with certified counsellors for visa guidance, accommodation support, and every step of your journey.',
    accent: '#F59E0B',
    accentBg: 'rgba(245,158,11,0.15)',
    accentBorder: 'rgba(245,158,11,0.35)',
    glowColor: 'rgba(245,158,11,0.2)',
  },
]

interface FeaturesProps {
  onApplyNowClick?: () => void
}

export default function Features({ onApplyNowClick: _onApplyNowClick }: FeaturesProps) {
  return (
    <section
      id="features"
      style={{
        padding: '40px 24px',
        background: 'var(--surface)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glows */}
      <div style={{
        position: 'absolute', top: '-120px', left: '-120px',
        width: '480px', height: '480px',
        background: 'radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-100px', right: '-100px',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── 3-column grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}>

          {/* ── TOP LEFT ── */}
          <FeatureCard card={cards[0]} />

          {/* ── TOP CENTER — Heading + CTA ── */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '40px 28px',
            // background: 'var(--gradient-card)',
            // border: '1px solid var(--border)',
            // borderRadius: '20px',
            // backdropFilter: 'blur(20px)',
          }}>
            <div className="section-label" style={{ justifyContent: 'center', marginBottom: '20px' }}>
              <Globe size={14} /> Why Choose Us
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
              fontWeight: '800',
              lineHeight: '1.2',
              marginBottom: '14px',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
            }}>
              One Platform.<br />
              <span className="text-blue-800-solid">Every Opportunity.</span>
            </h2>
            <Link href="/explorer">
              <button className="btn-primary" style={{ fontSize: '0.85rem', padding: '10px 22px' }}>
                <span>Explore Schools</span>
                <ArrowUpRight size={15} />
              </button>
            </Link>
          </div>

          {/* ── TOP RIGHT ── */}
          <FeatureCard card={cards[1]} />

          {/* ── BOTTOM LEFT ── */}
          <FeatureCard card={cards[2]} />

          {/* ── BOTTOM CENTER ── */}
          <FeatureCard card={cards[3]} />

          {/* ── BOTTOM RIGHT — Image card ── */}
          <div
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              minHeight: '220px',
              background: '#0a0a14',
              border: '1px solid var(--border)',
              transition: 'all 0.3s ease',
            }}
            className="glass-card"
          >
            {/* Background image */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url('/global-reach.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 1.35,
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }} />
            {/* Gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(10,10,20,0.95) 0%, rgba(10,10,20,0.5) 60%, transparent 100%)',
            }} />
            {/* Content */}
            <div style={{
              position: 'relative', zIndex: 1,
              padding: '28px',
              height: '100%',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            }}>
              <div style={{
                width: '44px', height: '44px',
                background: 'rgba(79,70,229,0.2)',
                border: '1px solid rgba(79,70,229,0.4)',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <Globe style={{ width: '22px', height: '22px', color: '#818CF8' }} strokeWidth={2} />
              </div>
              <p style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#818CF8', marginBottom: '6px' }}>
                Global Reach
              </p>
              <div style={{
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontWeight: '800',
                lineHeight: 1,
                marginBottom: '6px',
              }}>
                <span className="text-blue-800-blue">120+</span>
                <span style={{ color: 'var(--text-primary)', marginLeft: '6px' }}>Countries</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Schools & programmes spanning 6 continents
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ── Reusable Feature Card ── */
function FeatureCard({ card }: { card: typeof cards[0] }) {
  return (
    <div
      className="glass-card animate-fade-up"
      style={{
        padding: '32px 28px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '20%',
        width: '60%', height: '2px',
        background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
      }} />

      {/* Label */}
      <p style={{
        fontSize: '0.68rem',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        color: card.accent,
        marginBottom: '18px',
      }}>
        {card.label}
      </p>

      {/* Icon box */}
      <div style={{
        width: '52px', height: '52px',
        background: card.accentBg,
        border: `1px solid ${card.accentBorder}`,
        borderRadius: '14px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '20px',
        color: card.accent,
      }}>
        {card.icon}
      </div>

      <h3 style={{
        fontSize: '1.15rem',
        fontWeight: '700',
        color: 'var(--text-primary)',
        marginBottom: '10px',
      }}>
        {card.title}
      </h3>
      <p style={{
        fontSize: '0.88rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.65',
      }}>
        {card.desc}
      </p>
    </div>
  )
}
