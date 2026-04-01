import Image from 'next/image'
import { ArrowRight, BriefcaseBusiness, CreditCard, FileText, House, MessageCircle, Plane, ShieldCheck } from 'lucide-react'

const serviceHighlights = [
  { icon: ShieldCheck, label: 'Visa Assistance' },
  { icon: House, label: 'Accommodation' },
  { icon: Plane, label: 'Travel Support' },
  { icon: MessageCircle, label: 'Counselling' },
  { icon: FileText, label: 'Document Help' },
  { icon: CreditCard, label: 'Fee Guidance' },
]

interface ServicesHighlightProps {
  onApplyNowClick?: () => void
}

export default function ServicesHighlight({ onApplyNowClick: _onApplyNowClick }: ServicesHighlightProps) {
  return (
    <section id="services" style={{ padding: '40px 24px', background: 'var(--background)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', bottom: '-100px', left: '-100px',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
        {/* Left: Text */}
        <div className="animate-slide-right" style={{ opacity: 0 }}>
          <div className="section-label">
            <BriefcaseBusiness size={14} /> Student Services
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '20px', letterSpacing: '-0.02em' }}>
            Every Service You Need,{' '}
            <span className="text-blue-800-solid">Under One Roof</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.75', marginBottom: '36px' }}>
            From the moment you decide to study abroad to the day you land, QStudy World is with you every step of the way. Our end-to-end support ensures a smooth, stress-free journey.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '36px' }}>
            {serviceHighlights.map(s => (
              <div key={s.label} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '10px',
                transition: 'all 0.2s ease',
              }}>
                <s.icon size={20} />
                <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>{s.label}</span>
              </div>
            ))}
          </div>
          <a href="#services-detail" className="btn-primary">
            <span>Explore All Services</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Right: Image */}
        <div className="animate-fade-in delay-200" style={{ opacity: 0 }}>
          <div style={{
            borderRadius: '24px', overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: 'var(--shadow-card), 0 0 60px rgba(6,182,212,0.1)',
          }}>
            <Image src="/counselor.png" alt="Education counselor in consultation with student" width={600} height={480} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
