'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowUpRight, ArrowRight, Globe as GlobeIcon } from 'lucide-react'

// Must be client-only - Three.js cannot run on the server
const Globe3D = dynamic(
  () => import('@/app/components/ui/3d-globe').then(m => m.Globe3D),
  { ssr: false }
)

const globeMarkers = [
  { lat: 51.5074, lng: -0.1278, src: 'https://assets.aceternity.com/avatars/2.webp', label: 'London' },
  { lat: 40.7128, lng: -74.006, src: 'https://assets.aceternity.com/avatars/1.webp', label: 'New York' },
  { lat: 35.6762, lng: 139.6503, src: 'https://assets.aceternity.com/avatars/3.webp', label: 'Tokyo' },
  { lat: -33.8688, lng: 151.2093, src: 'https://assets.aceternity.com/avatars/4.webp', label: 'Sydney' },
  { lat: 48.8566, lng: 2.3522, src: 'https://assets.aceternity.com/avatars/5.webp', label: 'Paris' },
  { lat: 28.6139, lng: 77.209, src: 'https://assets.aceternity.com/avatars/6.webp', label: 'New Delhi' },
  { lat: 25.2048, lng: 55.2708, src: 'https://assets.aceternity.com/avatars/10.webp', label: 'Dubai' },
  { lat: 1.3521, lng: 103.8198, src: 'https://assets.aceternity.com/avatars/12.webp', label: 'Singapore' },
  { lat: 37.5665, lng: 126.978, src: 'https://assets.aceternity.com/avatars/13.webp', label: 'Seoul' },
  { lat: -22.9068, lng: -43.1729, src: 'https://assets.aceternity.com/avatars/8.webp', label: 'Rio de Janeiro' },
  { lat: 31.2304, lng: 121.4737, src: 'https://assets.aceternity.com/avatars/9.webp', label: 'Shanghai' },
  { lat: 55.7558, lng: 37.6173, src: 'https://assets.aceternity.com/avatars/7.webp', label: 'Moscow' },
  { lat: -34.6037, lng: -58.3816, src: 'https://assets.aceternity.com/avatars/11.webp', label: 'Buenos Aires' },
  // India
  { lat: 19.0760, lng: 72.8777, src: 'https://assets.aceternity.com/avatars/1.webp', label: 'Mumbai' },
  { lat: 18.5204, lng: 73.8567, src: 'https://assets.aceternity.com/avatars/3.webp', label: 'Pune' },
  { lat: 13.0827, lng: 80.2707, src: 'https://assets.aceternity.com/avatars/5.webp', label: 'Chennai' },
  // UAE
  { lat: 24.4539, lng: 54.3773, src: 'https://assets.aceternity.com/avatars/4.webp', label: 'Abu Dhabi' },
]

interface HeroProps {
  onApplyNowClick?: () => void
}

export default function Hero({ onApplyNowClick }: HeroProps) {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        background: 'var(--gradient-hero)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '0px',
      }}
    >
      {/* Background decorations */}
      <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '0', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      {/* Grid lines */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>

        {/* Left: Text */}
        <div className="animate-fade-up" style={{ opacity: 0 }}>
          {/* <div className="section-label">
            <GlobeIcon size={14} /> Global Education Platform
          </div> */}
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: '800', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Find &amp; Apply to{' '}
            <span className="text-blue-800-solid">Schools Worldwide</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '480px', marginBottom: '40px', lineHeight: '1.75' }}>
            Explore schools, courses, scholarships, and services - all in one powerful platform built for ambitious students like you.
          </p>

          {/* Stats */}
          {/* <div style={{ display: 'flex', gap: '32px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {[
              { value: '5,000+', label: 'Schools Listed' },
              { value: '120+', label: 'Countries' },
              { value: '50K+', label: 'Students Placed' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontSize: '1.6rem', fontWeight: '800' }} className="text-blue-800-blue">{stat.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '500' }}>{stat.label}</div>
              </div>
            ))}
          </div> */}

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              className="qs-cta"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
                e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
              }}
              onClick={() => window.location.href = '#explorer'}
              style={{ fontSize: '1rem', padding: '7px 8px 7px 18px' }}
            >
              <span className="qs-cta-ripple" />
              <span className="qs-cta-label">Global School Directory</span>
              <span className="qs-cta-icon-wrap">
                <span className="arrow-default"><ArrowUpRight size={14} strokeWidth={3} /></span>
                <span className="arrow-hover"><ArrowRight size={14} strokeWidth={3} /></span>
              </span>
            </button>
            <button
              className="qs-cta"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
                e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
              }}
              onClick={() => window.location.href = '#cta'}
              style={{ fontSize: '1rem', padding: '7px 8px 7px 18px' }}
            >
              <span className="qs-cta-ripple" />
              <span className="qs-cta-label">✈ Contact Us</span>
              <span className="qs-cta-icon-wrap">
                <span className="arrow-default"><ArrowUpRight size={14} strokeWidth={3} /></span>
                <span className="arrow-hover"><ArrowRight size={14} strokeWidth={3} /></span>
              </span>
            </button>
          </div>
        </div>

        {/* Right: 3D Globe */}
        <div className="animate-fade-in delay-300" style={{ opacity: 0, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>


          <Globe3D
            markers={globeMarkers}
            config={{
              radius: 2.6,
              showAtmosphere: false,
              bumpScale: 5,
              autoRotateSpeed: 0.4,
              enableZoom: false,
              ambientIntensity: 0.8,
              pointLightIntensity: 1.8,
            }}
            className="h-[650px]!"
            onMarkerClick={(marker) => console.log('Clicked:', marker.label)}
          />

          {/* Floating badge - Application Approved */}
          {/* <div style={{
            position: 'absolute', bottom: '32px', left: '0px',
            background: 'rgba(15,15,26,0.9)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(79,70,229,0.3)',
            borderRadius: '12px', padding: '12px 16px',
            display: 'flex', alignItems: 'center', gap: '10px',
            pointerEvents: 'none',
          }}>
            <span style={{ fontSize: '24px' }}>🎓</span>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>Application Approved!</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Melbourne High School</div>
            </div>
          </div> */}

          {/* Floating chip */}
          {/* <div style={{
            position: 'absolute', top: '10px', right: '10px',
            background: 'linear-gradient(135deg, #4F46E5, #06B6D4)',
            borderRadius: '50%', width: '72px', height: '72px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', boxShadow: 'var(--shadow-glow)',
            pointerEvents: 'none',
          }}>
            🌏
          </div> */}
        </div>

      </div>
    </section>
  )
}
