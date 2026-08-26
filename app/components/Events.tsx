import { CalendarDays, Globe, GraduationCap, MicVocal, Monitor, School } from 'lucide-react'

const events = [
  {
    icon: School,
    type: 'School Fairs',
    title: 'Global School Fair 2025',
    date: 'April 12-14, 2025',
    location: '🇮🇳 New Delhi & Mumbai',
    desc: 'Meet representatives from 200+ universities across Canada, UK, Australia, and more. Get on-spot offers and scholarship guidance.',
    badge: 'In-Person',
    badgeColor: '#4F46E5',
  },
  {
    icon: Monitor,
    type: 'Live Webinars',
    title: 'Study in Canada: 2025 Guide',
    date: 'March 28, 2025 · 6 PM IST',
    location: '🌐 Online (Zoom)',
    desc: 'Join our expert panel for a live deep-dive into Canadian universities, visa updates, PR pathways, and scholarship opportunities.',
    badge: 'Live Soon',
    badgeColor: '#10B981',
  },
  {
    icon: Globe,
    type: 'Global Expos',
    title: 'International Education Expo',
    date: 'May 5, 2025',
    location: '🇦🇪 Dubai, UAE',
    desc: 'The largest education expo in the Middle East - featuring 300+ schools, cultural exchanges, and exclusive application sessions.',
    badge: 'Registration Open',
    badgeColor: '#F59E0B',
  },
]

interface EventsProps {
  onApplyNowClick?: () => void
}

export default function Events({ onApplyNowClick: _onApplyNowClick }: EventsProps) {
  return (
    <section id="events" style={{ padding: '40px 24px', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <MicVocal size={14} /> Events & Webinars
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '10px', letterSpacing: '-0.02em' }}>
            Stay Connected. <span className="text-blue-800-solid">Stay Informed.</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto' }}>
            Join thousands of students at our events to get the latest insights, meet advisors, and take your next step.
          </p>
        </div>

        {/* Event Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {events.map((ev, i) => (
            <div
              key={ev.title}
              className="glass-card animate-fade-up"
              style={{ padding: '32px 28px', opacity: 0, animationDelay: `${i * 0.15}s`, position: 'relative' }}
            >
              {/* Badge */}
              <span style={{
                position: 'absolute', top: '20px', right: '20px',
                background: `${ev.badgeColor}22`,
                border: `1px solid ${ev.badgeColor}44`,
                color: ev.badgeColor,
                borderRadius: '50px', padding: '4px 12px',
                fontSize: '0.72rem', fontWeight: '700',
              }}>
                {ev.badge}
              </span>

              <div style={{ marginBottom: '16px' }}>
                <ev.icon size={40} strokeWidth={1.75} />
              </div>
              <div style={{
                fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px',
                color: 'var(--primary-light)', marginBottom: '10px',
              }}>
                {ev.type}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '12px', lineHeight: '1.3' }}>{ev.title}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <CalendarDays size={14} />
                  {ev.date}
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{ev.location}</span>
              </div>
              <p style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '24px' }}>{ev.desc}</p>
              <button 
                onClick={_onApplyNowClick}
                style={{
                  width: '100%', padding: '10px',
                  background: '#4F46E5',
                  border: 'none', borderRadius: '10px',
                  color: 'white', fontWeight: '700', fontSize: '0.85rem',
                  cursor: 'pointer',
                }}>
                Register Now →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
