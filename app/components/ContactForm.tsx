'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface ContactFormProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    mobile: '',
    message: '',
    callbackConsent: false,
  })
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Animate in
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setMounted(true), 10)
      document.body.style.overflow = 'hidden'
      setSubmitStatus('idle')
    } else {
      setMounted(false)
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.firstName,
          email: formData.email,
          phone: formData.mobile,
          message: formData.message,
        })
      })

      const data = await response.json()
      if (data.success) {
        setSubmitStatus('success')
        setTimeout(() => {
          onClose()
          setFormData({ firstName: '', email: '', mobile: '', message: '', callbackConsent: false })
          setSubmitStatus('idle')
        }, 2500)
      } else {
        setSubmitStatus('error')
        alert(data.message || 'Failed to send message.')
      }
    } catch (error) {
      setSubmitStatus('error')
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (name === 'mobile') {
      // Allow only digits
      const numericValue = value.replace(/\D/g, '')
      if (numericValue.length > 10) return // Prevent more than 10 digits
      setFormData(prev => ({ ...prev, [name]: numericValue }))
      return
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  if (!isOpen) return null

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px',
    background: 'transparent',
    border: '1.5px solid rgba(255,255,255,0.25)',
    borderRadius: '8px',
    fontSize: '0.9rem',
    color: '#ffffff',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease',
  }

  return (
    /* ── Backdrop ── */
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(3px)',
        zIndex: 9998,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* ── Panel ── */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          background: 'linear-gradient(160deg, #1e1b4b 0%, #0f0f2a 100%)',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          padding: '48px 40px 40px',
          overflowY: 'auto',
          transform: mounted ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          position: 'relative',
          boxShadow: '-24px 0 60px rgba(0,0,0,0.4)',
          colorScheme: 'dark',
        }}
      >
        <style>{`
          .qs-modal-input::placeholder { color: rgba(255,255,255,0.3) !important; }
          .qs-modal-input { color: #ffffff !important; background: transparent !important; }
        `}</style>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            transition: 'background 0.2s ease',
          }}
          onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
          onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
        >
          <X size={18} />
        </button>

        {/* Heading */}
       

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>

          {/* First Name */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.8rem', fontWeight: '600', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="e.g. Aanya"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="qs-modal-input"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = '#818CF8')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.25)')}
            />
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.8rem', fontWeight: '600', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Mail Id *
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
              title="Please enter a valid email address (e.g. name@domain.com)"
              className="qs-modal-input"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = '#818CF8')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.25)')}
            />
          </div>

          {/* Mobile */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.8rem', fontWeight: '600', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Mobile No *
            </label>
            <input
              type="tel"
              name="mobile"
              placeholder="9876543210"
              value={formData.mobile}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              maxLength={10}
              title="Please enter exactly 10 digits"
              className="qs-modal-input"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = '#818CF8')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.25)')}
            />
          </div>

          {/* Message */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.8rem', fontWeight: '600', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Message Here *
            </label>
            <textarea
              name="message"
              placeholder="Tell us about your goals, destination preference, budget..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={2}
              className="qs-modal-input"
              style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
              onFocus={e => (e.target.style.borderColor = '#818CF8')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.25)')}
            />
          </div>

          {/* Checkbox */}
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
            <input
              type="checkbox"
              name="callbackConsent"
              checked={formData.callbackConsent}
              onChange={handleChange}
              required
              style={{ marginTop: '2px', accentColor: '#4F46E5', width: '15px', height: '15px', flexShrink: 0 }}
            />
            <span>
              I agree to the <a href="/privacy" target="_blank" style={{ color: '#818CF8', textDecoration: 'underline' }}>Privacy Policy</a> and <a href="/terms" target="_blank" style={{ color: '#818CF8', textDecoration: 'underline' }}>Terms of Service</a>, and confirm my interest in a callback for my inquiry.
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || submitStatus === 'success'}
            style={{
              marginTop: '8px',
              width: '100%',
              padding: '14px',
              background: submitStatus === 'success' ? '#10B981' : 'linear-gradient(135deg, #4F46E5, #06B6D4)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '0.92rem',
              fontWeight: '800',
              cursor: (isSubmitting || submitStatus === 'success') ? 'not-allowed' : 'pointer',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              transition: 'all 0.2s ease',
              opacity: (isSubmitting || submitStatus === 'success') ? 0.8 : 1,
            }}
            onMouseOver={e => { if (!isSubmitting && submitStatus !== 'success') { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
            onMouseOut={e => { if (!isSubmitting && submitStatus !== 'success') { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' } }}
          >
            {submitStatus === 'success' ? 'Message Sent! ✓' : isSubmitting ? 'Sending...' : 'Send Message →'}
          </button>
        </form>
      </div>
    </div>
  )
}
