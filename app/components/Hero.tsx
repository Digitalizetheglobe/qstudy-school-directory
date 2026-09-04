'use client'

import { ArrowUpRight, ArrowRight } from 'lucide-react'

interface HeroProps {
  onApplyNowClick?: () => void
}

export default function Hero({ onApplyNowClick }: HeroProps) {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/hero-banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Dark gradient overlay - heavier on bottom-left, lighter top-right (like NSLC) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(5,5,20,0.78) 0%, rgba(5,5,20,0.48) 55%, rgba(5,5,20,0.15) 100%)',
        }}
      />
      {/* Extra bottom fade for text readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(5,5,20,0.65) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 40px 80px',
          width: '100%',
        }}
      >
        {/* Label chip */}
        {/* <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '100px',
            padding: '6px 16px',
            fontSize: '0.8rem',
            fontWeight: '600',
            color: '#fff',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 8px #4ade80' }} />
          Global School Directory
        </div> */}

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
            fontWeight: '800',
            lineHeight: '1.1',
            color: '#ffffff',
            marginBottom: '20px',
            letterSpacing: '-0.02em',
            maxWidth: '680px',
            textShadow: '0 2px 24px rgba(0,0,0,0.4)',
          }}
        >
          Find &amp; Apply to{' '}
          {/* <span
            style={{
              background: 'linear-gradient(135deg, #818cf8, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          > */}
          Schools Worldwide
          {/* </span> */}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '1.15rem',
            color: 'rgba(255,255,255,0.78)',
            maxWidth: '520px',
            marginBottom: '40px',
            lineHeight: '1.75',
            textShadow: '0 1px 8px rgba(0,0,0,0.3)',
          }}
        >
          Students from over 110 countries explore schools, scholarships, and
          services - all in one powerful platform built for ambitious students like you.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button
            className="qs-cta"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
              e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
            }}
            onClick={() => (window.location.href = '#explorer')}
            style={{ fontSize: '1rem', padding: '7px 8px 7px 18px' }}
          >
            <span className="qs-cta-ripple" />
            <span className="qs-cta-label">Global School Directory</span>
            <span className="qs-cta-icon-wrap">
              <span className="arrow-default">
                <ArrowUpRight size={14} strokeWidth={3} />
              </span>
              <span className="arrow-hover">
                <ArrowRight size={14} strokeWidth={3} />
              </span>
            </span>
          </button>

          <button
            className="qs-cta"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
              e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
            }}
            onClick={(e) => {
              e.preventDefault();
              if (onApplyNowClick) onApplyNowClick();
            }}
            style={{ fontSize: '1rem', padding: '7px 8px 7px 18px' }}
          >
            <span className="qs-cta-ripple" />
            <span className="qs-cta-label">Contact Us</span>
            <span className="qs-cta-icon-wrap">
              <span className="arrow-default">
                <ArrowUpRight size={14} strokeWidth={3} />
              </span>
              <span className="arrow-hover">
                <ArrowRight size={14} strokeWidth={3} />
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
