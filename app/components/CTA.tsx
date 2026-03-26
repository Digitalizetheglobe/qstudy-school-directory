'use client'

import Link from 'next/link'
import { ArrowUpRight, Send, CalendarCheck, MessageCircle } from 'lucide-react'

const ctaCards = [
  {
    icon: '✈️',
    lucideIcon: Send,
    title: 'Apply Now',
    desc: "Submit your application to your dream school today — it's quick, free, and paperless.",
    cta: 'Start Application',
    href: '#explorer',
    gradient: 'linear-gradient(135deg,#4F46E5,#3730A3)',
    glow: 'rgba(79,70,229,0.35)',
    accentBorder: 'rgba(79,70,229,0.4)',
  },
  {
    icon: '🎙️',
    lucideIcon: CalendarCheck,
    title: 'Book Free Counselling',
    desc: 'Schedule a 1-on-1 session with a certified education counsellor at zero cost.',
    cta: 'Book a Session',
    href: '#cta',
    gradient: 'linear-gradient(135deg,#06B6D4,#0891B2)',
    glow: 'rgba(6,182,212,0.35)',
    accentBorder: 'rgba(6,182,212,0.4)',
  },
  {
    icon: '💬',
    lucideIcon: MessageCircle,
    title: 'Contact Us',
    desc: 'Have questions? Reach our team via email, phone, or WhatsApp — we reply fast.',
    cta: 'Get in Touch',
    href: '#cta',
    gradient: 'linear-gradient(135deg,#F59E0B,#D97706)',
    glow: 'rgba(245,158,11,0.35)',
    accentBorder: 'rgba(245,158,11,0.4)',
  },
]

export default function CTA() {
  return (
    <section id="cta" style={{
      padding: '100px 24px',
      background: 'linear-gradient(135deg, #0f0f1a 0%, #1e1b4b 50%, #0c4a6e 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top border glow */}
      <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(79,70,229,0.5), rgba(6,182,212,0.5), transparent)' }} />

      {/* Ambient blobs */}
      <div style={{ position: 'absolute', top: '-200px', right: '-200px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-150px', left: '-150px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      {/* Grid overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>

        {/* Header */}
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '24px' }}>
          <span>🚀</span> Get Started Today
        </div>
        <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: '800', marginBottom: '20px', lineHeight: '1.15', letterSpacing: '-0.02em' }}>
          Start Your Global Education{' '}
          <span className="text-blue-800-solid">Journey Today!</span>
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto 64px', lineHeight: '1.75' }}>
          Join over 50,000 students who&apos;ve found their dream school through QStudy World. Your future starts with a single click.
        </p>

        {/* 3 CTA Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '56px' }}>
          {ctaCards.map((card, i) => {
            const LucideIcon = card.lucideIcon
            return (
              <div
                key={card.title}
                className="glass-card animate-fade-up"
                style={{
                  padding: '40px 28px',
                  opacity: 0,
                  animationDelay: `${i * 0.15}s`,
                  textAlign: 'left',
                  position: 'relative',
                  overflow: 'hidden',
                  border: `1px solid ${card.accentBorder}`,
                }}
              >
                {/* Top accent line */}
                <div style={{ position: 'absolute', top: 0, left: '15%', width: '70%', height: '2px', background: card.gradient }} />

                {/* Icon box */}
                <div style={{
                  width: '64px', height: '64px',
                  background: card.gradient,
                  borderRadius: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '28px',
                  marginBottom: '22px',
                  boxShadow: `0 8px 24px ${card.glow}`,
                }}>
                  {card.icon}
                </div>

                <h3 style={{ fontWeight: '800', fontSize: '1.25rem', marginBottom: '12px', color: 'var(--text-primary)' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '28px' }}>
                  {card.desc}
                </p>

                {/* Button */}
                <Link href={card.href}>
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      width: '100%',
                      padding: '13px 20px',
                      background: card.gradient,
                      border: 'none',
                      borderRadius: '12px',
                      color: 'white',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      justifyContent: 'center',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'
                        ; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 12px 28px ${card.glow}`
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.transform = ''
                        ; (e.currentTarget as HTMLButtonElement).style.boxShadow = ''
                    }}
                  >
                    <LucideIcon size={16} />
                    <span>{card.cta}</span>
                    <ArrowUpRight size={15} style={{ marginLeft: 'auto' }} />
                  </button>
                </Link>
              </div>
            )
          })}
        </div>

        {/* Trust bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          padding: '20px 32px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '16px',
          maxWidth: '780px',
          margin: '0 auto',
        }}>
          {[
            { icon: '✅', text: 'No hidden fees' },
            { icon: '🏆', text: 'Trusted by 50,000+ students' },
            { icon: '⚡', text: '24/7 Support' },
            { icon: '🔒', text: 'Secure & Private' },
          ].map((item, i, arr) => (
            <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>{item.icon}</span> {item.text}
              </span>
              {i < arr.length - 1 && (
                <span style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)' }} />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
