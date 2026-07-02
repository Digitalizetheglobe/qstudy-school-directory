import Image from 'next/image'
import { Bell, ChartColumn, FileUp, LayoutDashboard, Rocket, Trophy } from 'lucide-react'

const features = [
  { icon: ChartColumn, title: 'Application Tracking', desc: 'Monitor every application in real-time with status updates, deadlines, and next steps.' },
  { icon: FileUp, title: 'Document Uploads', desc: 'Securely upload and manage all your documents - transcripts, passports, SOPs, and more.' },
  { icon: Bell, title: 'Counsellor Notifications', desc: 'Stay in sync with your assigned counsellor via instant notifications and chat.' },
  { icon: LayoutDashboard, title: 'Progress Analytics', desc: 'Visualize your application journey with intuitive dashboards and completion scores.' },
]

interface DashboardProps {
  onApplyNowClick?: () => void
}

export default function Dashboard({ onApplyNowClick: _onApplyNowClick }: DashboardProps) {
  return (
    <section id="dashboard" style={{ padding: '60px 24px', background: 'var(--background)', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @media (max-width: 768px) {
          .db-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .db-image-wrap { order: -1; }
          /* Keep floating badges inside card on mobile */
          .db-badge-top {
            top: 10px !important;
            right: 10px !important;
          }
          .db-badge-bottom {
            bottom: 10px !important;
            left: 10px !important;
          }
          .db-cta {
            align-self: stretch !important;
            justify-content: center;
          }
        }
      `}</style>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: '800px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(79,70,229,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <LayoutDashboard size={14} /> Student Dashboard
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '10px', letterSpacing: '-0.02em' }}>
            Your Personal <span className="text-blue-800-solid">Student Dashboard</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto' }}>
            A powerful command center for your international education journey - track everything in one place.
          </p>
        </div>

        {/* Two-column */}
        <div className="db-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'center' }}>
          {/* Left: Dashboard Image */}
          <div className="db-image-wrap" style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '24px', overflow: 'hidden',
              border: '1px solid rgba(79,70,229,0.2)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.5), var(--shadow-glow)',
            }}>
              <Image
                src="/dashboard.png"
                alt="Student dashboard showing application tracking and analytics"
                width={700}
                height={500}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            {/* Floating stat - top right */}
            <div className="db-badge-top" style={{
              position: 'absolute', top: '-16px', right: '-16px',
              background: 'rgba(15,15,26,0.95)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(79,70,229,0.3)',
              borderRadius: '14px', padding: '14px 18px',
              boxShadow: 'var(--shadow-card)',
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Applications Sent</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', lineHeight: 1 }} className="text-blue-800-blue">12</div>
            </div>
            {/* Floating stat - bottom left */}
            <div className="db-badge-bottom" style={{
              position: 'absolute', bottom: '-16px', left: '20px',
              background: 'rgba(15,15,26,0.95)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: '14px', padding: '14px 18px',
              boxShadow: 'var(--shadow-card)',
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span>Offers Received</span>
                <Trophy size={14} color="#10B981" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10B981', lineHeight: 1 }}>3</div>
            </div>
          </div>

          {/* Right: Feature Bullets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {features.map((f, i) => (
              <div
                key={f.title}
                className="glass-card animate-slide-right"
                style={{
                  padding: '20px 24px',
                  display: 'flex', gap: '16px', alignItems: 'flex-start',
                  opacity: 0,
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                <div style={{
                  width: '44px', height: '44px', minWidth: '44px',
                  background: 'linear-gradient(135deg, rgba(79,70,229,0.2), rgba(6,182,212,0.2))',
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
                }}>
                  <f.icon size={20} strokeWidth={2} />
                </div>
                <div>
                  <h4 style={{ fontWeight: '700', marginBottom: '6px', fontSize: '1rem' }}>{f.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{f.desc}</p>
                </div>
              </div>
            ))}
            <a href="#cta" className="btn-primary db-cta" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
              <Rocket size={16} />
              <span>Start Your Dashboard</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
