'use client'

import { useState } from 'react'
import { CircleHelp, Plus } from 'lucide-react'

const blogs = [
  { icon: '📋', tag: 'Admission Tips', title: '10 Things Your SOP Must Include in 2025', date: 'Mar 15, 2025', read: '5 min read', desc: 'Craft a statement of purpose that stands out from thousands of applicants.' },
  { icon: '🛂', tag: 'Visa Updates', title: 'Canada Student Visa: March 2025 Changes', date: 'Mar 10, 2025', read: '4 min read', desc: 'New biometric requirements and processing times - everything you need to know.' },
  { icon: '🌱', tag: 'Student Life', title: 'First 30 Days in Australia: A Survival Guide', date: 'Mar 5, 2025', read: '7 min read', desc: 'From SIM cards to supermarkets - your complete guide to settling in Down Under.' },
  { icon: '💸', tag: 'Cost of Living', title: 'Living in the UK on a Student Budget', date: 'Feb 28, 2025', read: '6 min read', desc: 'Smart tips to manage your finances without sacrificing the full student experience.' },
]

const faqs = [
  { q: 'How do I create an account on QStudy World?', a: 'Sign up with your email or Google account. It takes under 2 minutes and gives you instant access to school listings, applications, and counsellor support.' },
  { q: 'Is there a fee to use QStudy World?', a: 'Browsing schools and using basic features is completely free. Premium counselling packages are available for students who want dedicated one-on-one support.' },
  { q: 'How long does the visa assistance process take?', a: 'It depends on the destination country. Most student visa applications take 4-8 weeks. Our team ensures your documents are perfectly prepared to avoid delays.' },
  { q: 'Can I apply to multiple schools at once?', a: 'Absolutely! Our platform allows unlimited applications. You can track each one\'s status from your personal dashboard in real time.' },
  { q: 'What support do you provide after I get admitted?', a: 'Post-admission we assist with accommodation, travel booking, pre-departure orientation, and airport reception services at select destinations.' },
]

export default function Blog() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section id="blog" style={{ padding: '100px 24px', background: 'var(--surface-2)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Blog Header */}


        {/* FAQ */}
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>
              <CircleHelp size={14} /> FAQs
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
              Frequently Asked <span className="text-blue-800-solid">Questions</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${openFaq === i ? 'rgba(79,70,229,0.35)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: '14px',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', padding: '18px 24px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    gap: '12px', textAlign: 'left',
                  }}
                >
                  <span style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--text-primary)' }}>{faq.q}</span>
                  <span style={{
                    minWidth: '24px', height: '24px',
                    background: openFaq === i ? 'linear-gradient(135deg,#4F46E5,#06B6D4)' : 'rgba(255,255,255,0.08)',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', transition: 'all 0.2s ease',
                    transform: openFaq === i ? 'rotate(45deg)' : 'none',
                  }}>
                    <Plus size={14} />
                  </span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
