'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, CheckCircle2 } from 'lucide-react'

interface ApplicationFormModalProps {
  item: any
  onClose: () => void
}

export default function ApplicationFormModal({ item, onClose }: ApplicationFormModalProps) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      onClose()
    }, 2500)
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
    color: 'var(--text-primary)', fontSize: '0.95rem',
    outline: 'none', transition: 'all 0.2s ease',
  }
  const labelStyle = { display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }

  return (
    <AnimatePresence>
      <div 
        style={{
          position: 'fixed', inset: 0, zIndex: 9999999, 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px'
        }}
      >
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="glass-card"
          style={{
            position: 'relative', width: '100%', maxWidth: '500px',
            background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px', padding: '36px',
            boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.7)', zIndex: 1,
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%', width: '32px', height: '32px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s ease'
            }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <X size={16} />
          </button>

          {!submitted ? (
            <>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>
                Apply to {item?.name}
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Fill out the form below and their admissions team will contact you shortly.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input type="text" required placeholder="John Doe" style={inputStyle} 
                    onFocus={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input type="email" required placeholder="john@example.com" style={inputStyle} 
                    onFocus={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input type="tel" required placeholder="+1 234 567 890" style={inputStyle} 
                    onFocus={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Questions / Message (Optional)</label>
                  <textarea rows={3} placeholder="Tell us about your interests..." style={{ ...inputStyle, resize: 'none' }} 
                    onFocus={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem', borderRadius: '12px', marginTop: '8px' }}>
                  <span>Submit Application</span>
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
                style={{ width: '64px', height: '64px', background: 'rgba(16,185,129,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}
              >
                <CheckCircle2 size={32} color="#10b981" />
              </motion.div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '10px' }}>Application Sent!</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>The admissions team at {item?.name} has received your details and will be in touch soon.</p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
