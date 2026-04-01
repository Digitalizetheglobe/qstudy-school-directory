import { Check, FileText, Plane, Settings, ShieldCheck, House } from 'lucide-react'

const serviceColorMap: Record<string, string> = {
  '#4F46E5': 'indigo',
  '#06B6D4': 'cyan',
  '#10B981': 'green',
  '#F59E0B': 'amber',
}

const services = [
  {
    icon: FileText,
    title: 'Admission Support',
    desc: 'End-to-end assistance with applications - from shortlisting schools to submitting the final paperwork. We\'ve helped 50,000+ students get accepted.',
    features: ['School shortlisting', 'SOP & essay review', 'Application submission', 'Interview prep'],
    color: '#4F46E5',
  },
  {
    icon: ShieldCheck,
    title: 'Visa Assistance',
    desc: 'Navigate the visa process with confidence. Our experts keep up with the latest regulations to ensure your application is always compliant.',
    features: ['Document checklist', 'Visa application fill', 'Embassy guidance', 'Biometric support'],
    color: '#06B6D4',
  },
  {
    icon: House,
    title: 'Accommodation',
    desc: 'Find verified, affordable housing near your school - from university dorms to private apartments in the best neighborhoods.',
    features: ['On-campus housing', 'Private rentals', 'Verified listings', 'Move-in support'],
    color: '#10B981',
  },
  {
    icon: Plane,
    title: 'Travel & Tickets',
    desc: 'Get the best flight deals, airport transfers, and travel insurance - all coordinated so your arrival Day 1 goes perfectly.',
    features: ['Flight booking', 'Airport transfers', 'Travel insurance', 'Orientation schedules'],
    color: '#F59E0B',
  },
]

interface ServicesProps {
  onApplyNowClick?: () => void
}

export default function Services({ onApplyNowClick: _onApplyNowClick }: ServicesProps) {
  return (
    <section id="services-detail" style={{ padding: '40px 24px', background: 'var(--surface-2)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <Settings size={14} /> Detailed Services
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            How We <span className="text-blue-800-solid">Support You</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto' }}>
            Four core pillars of support - delivered by experts who&apos;ve been through the journey themselves.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {services.map((s, i) => {
            const colorName = serviceColorMap[s.color] ?? 'indigo'
            return (
              <div
                key={s.title}
                className="glass-card animate-fade-up"
                style={{
                  padding: '36px 28px', opacity: 0,
                  animationDelay: `${i * 0.1}s`,
                  position: 'relative', overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                {/* Top gradient bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${s.color}, transparent)` }} />

                <div style={{
                  width: '60px', height: '60px',
                  background: `${s.color}18`,
                  border: `1.5px solid ${s.color}30`,
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <s.icon size={26} strokeWidth={1.8} />
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>{s.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '24px' }}>{s.desc}</p>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {s.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.85rem' }}>
                      <Check size={12} color={s.color} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button className={`service-btn service-btn-${colorName}`} style={{ marginTop: 'auto' }}>
                  Learn More →
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
