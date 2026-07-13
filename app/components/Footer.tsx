import Link from 'next/link'
import { WorldMap } from '@/app/components/ui/world-map'
import { Mail, Phone, MessageCircle } from 'lucide-react'

const footerLinks = {
  Explore: [
    { label: 'Browse Schools', href: '#explorer' },
    { label: 'Scholarships', href: '#school-detail' },
    { label: 'Country Guides', href: '#blog' },
    { label: 'Admission Tips', href: '#blog' },
  ],
  Services: [
    { label: 'Admission Support', href: '#services-detail' },
    { label: 'Visa Assistance', href: '#services-detail' },
    { label: 'Accommodation', href: '#services-detail' },
    { label: 'Travel & Tickets', href: '#services-detail' },
  ],
  Company: [
    { label: 'Explore Schools', href: '#explorer' },
    { label: 'Events', href: '#events' },
    { label: 'FAQ', href: '#faq' },
  ],
}

const socialIcons = ['𝕏', 'in', 'f', '▲']

export default function Footer() {
  return (
    <footer
      id="contact"
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        padding: '72px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .ft-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
          .ft-brand {
            grid-column: 1 / -1;
          }
          .ft-bottom {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center;
          }
          .ft-bottom-links {
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 14px !important;
          }
          .ft-map { opacity: 0.2 !important; }
        }
        @media (max-width: 480px) {
          .ft-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      {/* ── World Map Background ── */}
      <div className="ft-map" style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.5,
        pointerEvents: 'none',
        zIndex: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <WorldMap
          lineColor="#5d6be7ff"
          // dots={[
          //   { start: { lat: 19.0760, lng: 72.8777  }, end: { lat: 51.5074, lng: -0.1278  } }, // Mumbai → London
          //   { start: { lat: 28.6139, lng: 77.2090  }, end: { lat: 40.7128, lng: -74.0060 } }, // New Delhi → New York
          //   { start: { lat: 28.6139, lng: 77.2090  }, end: { lat: 48.8566, lng: 2.3522   } }, // New Delhi → Paris
          //   { start: { lat: 1.3521,  lng: 103.8198 }, end: { lat: 25.2048, lng: 55.2708  } }, // Singapore → Dubai
          //   { start: { lat: 51.5074, lng: -0.1278  }, end: { lat: -33.8688,lng: 151.2093 } }, // London → Sydney
          // { start: { lat: 6.9271,  lng: 79.8612  }, end: { lat: 48.8566, lng: 151.2093   } }, // Sri Lanka → Paris
          // ]}
           dots={[
          {
            start: {
              lat: 64.2008,
              lng: -149.4937,
            }, // Alaska (Fairbanks)
            end: {
              lat: 34.0522,
              lng: -118.2437,
            }, // Los Angeles
          },
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
            end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
          },
          {
            start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },
           { start: { lat: 6.9271,  lng: 79.8612  }, end: { lat: 48.8566, lng: 152.3522   } }, // Sri Lanka → Paris
        ]}
        />
      </div>

      {/* ── Footer Content (above map) ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <div className="ft-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '56px' }}>

          {/* Brand */}
          <div className="ft-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                width: 40, height: 40,
                background: 'linear-gradient(135deg, #4F46E5, #06B6D4)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', fontWeight: '800', color: 'white',
              }}>Q</div>
              <span style={{ fontSize: '1.2rem', fontWeight: '700' }}>
                School <span style={{ background: 'linear-gradient(135deg,#818CF8,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Directory</span>
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '280px', marginBottom: '24px' }}>
              The world&apos;s most comprehensive platform for international education - connecting students to their dream schools globally.
            </p>
            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {[
                { icon: <Mail size={15} />, label: 'hello@qstudyworld.com', href: 'mailto:hello@qstudyworld.com' },
                { icon: <Phone size={15} />, label: '+91 98765 43210', href: 'tel:+919876543210' },
                { icon: <MessageCircle size={15} />, label: 'WhatsApp Us', href: 'https://wa.me/919876543210' },
              ].map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--primary-light)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                  <span style={{ color: 'var(--primary-light)', flexShrink: 0 }}>{c.icon}</span>
                  <span>{c.label}</span>
                </a>
              ))}
            </div>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {socialIcons.map((s, i) => (
                <a key={i} href="#" className="social-icon">{s}</a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([cat, links]) => (
            <div key={cat}>
              <h4 style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '20px', color: 'var(--text-primary)' }}>{cat}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map(l => (
                  <li key={l.label}>
                    <Link 
                      href={l.href} 
                      className="footer-nav-link"
                      onClick={(e) => {
                        if (l.href.startsWith('#') && l.href !== '#') {
                          e.preventDefault();
                          const target = document.querySelector(l.href);
                          if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="ft-bottom" style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            © 2025 School Directory. All rights reserved.
          </p>
          <div className="ft-bottom-links" style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
              <Link key={l} href="#" className="footer-nav-link">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
