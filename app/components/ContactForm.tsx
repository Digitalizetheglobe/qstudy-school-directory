'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface ContactFormProps {
  isOpen: boolean
  onClose: () => void
}

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  countryCode: '+60',
  mobile: '',
  programType: '',
  destination: '',
  targetGrade: '',
  studentGrade: '',
  message: '',
  callbackConsent: true,
}

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState(initialFormData)
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

    const fullPhone = `${formData.countryCode} ${formData.mobile}`.trim()

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          countryCode: formData.countryCode,
          mobile: formData.mobile,
          phone: fullPhone,
          programType: formData.programType,
          destination: formData.destination,
          targetGrade: formData.targetGrade,
          studentGrade: formData.studentGrade,
          message: formData.message,
          callbackConsent: formData.callbackConsent,
        })
      })

      const data = await response.json()
      if (data.success) {
        setSubmitStatus('success')
        setTimeout(() => {
          onClose()
          setFormData(initialFormData)
          setSubmitStatus('idle')
        }, 2200)
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target

    if (name === 'mobile') {
      // Allow only digits up to 15
      const numericValue = value.replace(/\D/g, '')
      if (numericValue.length > 15) return
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
    padding: '11px 13px',
    background: 'rgba(255,255,255,0.04)',
    border: '1.5px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    fontSize: '0.88rem',
    color: '#ffffff',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease, background 0.2s ease',
  }

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.6)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '14px',
    paddingRight: '32px',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '5px',
    fontSize: '0.74rem',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.68)',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
  }

  return (
    /* ── Backdrop ── */
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 9998,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* ── Wide Panel ── */}
      <div
        onClick={e => e.stopPropagation()}
        className="qs-modal-panel"
        style={{
          width: '100%',
          maxWidth: '860px',
          height: '100%',
          background: 'linear-gradient(165deg, #1b1844 0%, #0d0c24 100%)',
          borderLeft: '1px solid rgba(255,255,255,0.12)',
          display: 'flex',
          flexDirection: 'column',
          padding: '36px 40px 36px',
          overflowY: 'auto',
          transform: mounted ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          position: 'relative',
          boxShadow: '-24px 0 70px rgba(0,0,0,0.55)',
          colorScheme: 'dark',
        }}
      >
        <style>{`
          .qs-modal-input::placeholder { color: rgba(255,255,255,0.32) !important; }
          .qs-modal-input { color: #ffffff !important; }
          .qs-modal-input option { background-color: #17153b; color: #ffffff; }

          .qs-form-grid-3 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }

          .qs-form-grid-2 {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          @media (max-width: 820px) {
            .qs-form-grid-3,
            .qs-form-grid-2 {
              grid-template-columns: 1fr;
              gap: 12px;
            }
            .qs-modal-panel {
              padding: 28px 20px 28px !important;
              max-width: 100% !important;
            }
          }
        `}</style>

        {/* Close button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '20px',
            right: '24px',
            width: '38px',
            height: '38px',
            borderRadius: '9px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            transition: 'background 0.2s ease',
          }}
          onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
          onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
        >
          <X size={19} />
        </button>

        {/* Heading */}
        <div style={{ marginBottom: '24px', paddingRight: '48px' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '4px 11px',
              borderRadius: '20px',
              background: 'rgba(99, 102, 241, 0.16)',
              border: '1px solid rgba(129, 140, 248, 0.35)',
              color: '#A5B4FC',
              fontSize: '0.74rem',
              fontWeight: '700',
              letterSpacing: '0.7px',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            Admissions & Student Inquiry
          </span>
          <h2
            style={{
              fontSize: '1.65rem',
              fontWeight: '800',
              color: '#ffffff',
              margin: '0 0 6px 0',
              letterSpacing: '-0.02em',
            }}
          >
            Apply & Connect With Us
          </h2>
        
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
          
          {/* ── ROW 1 (3 fields): First Name | Last Name | Email ── */}
          <div className="qs-form-grid-3">
            <div>
              <label style={labelStyle}>First Name *</label>
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
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
              />
            </div>

            <div>
              <label style={labelStyle}>Last Name *</label>
              <input
                type="text"
                name="lastName"
                placeholder="e.g. Sharma"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="qs-modal-input"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#818CF8')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
              />
            </div>

            <div>
              <label style={labelStyle}>Mail Id *</label>
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
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
              />
            </div>
          </div>

          {/* ── ROW 2 (3 fields): Mobile (with Country Code) | Program Type | Preferred Country ── */}
          <div className="qs-form-grid-3">
            <div>
              <label style={labelStyle}>Mobile No *</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="qs-modal-input"
                  style={{
                    ...selectStyle,
                    width: '100px',
                    minWidth: '100px',
                    paddingLeft: '8px',
                    paddingRight: '22px',
                    fontSize: '0.82rem',
                    backgroundPosition: 'right 6px center',
                    backgroundSize: '12px',
                  }}
                  title="Country Code"
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+1_CA">🇨🇦 +1</option>
                  <option value="+41">🇨🇭 +41</option>
                  <option value="+49">🇩🇪 +49</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+61">🇦🇺 +61</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+65">🇸🇬 +65</option>
                  <option value="+966">🇸🇦 +966</option>
                  <option value="+86">🇨🇳 +86</option>
                  <option value="+81">🇯🇵 +81</option>
                  <option value="+60">🇲🇾 +60</option>
                  <option value="+34">🇪🇸 +34</option>
                  <option value="+39">🇮🇹 +39</option>
                  <option value="+64">🇳🇿 +64</option>
                  <option value="+353">🇮🇪 +353</option>
                </select>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="9876543210"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{7,15}"
                  maxLength={15}
                  title="Please enter a valid phone number"
                  className="qs-modal-input"
                  style={{ ...inputStyle, flex: 1 }}
                  onFocus={e => (e.target.style.borderColor = '#818CF8')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Program / School Type *</label>
              <select
                name="programType"
                value={formData.programType}
                onChange={handleChange}
                required
                className="qs-modal-input"
                style={selectStyle}
                onFocus={e => (e.target.style.borderColor = '#818CF8')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
              >
                <option value="">Select Program Type</option>
                <option value="Boarding School">Boarding School</option>
                <option value="Day School">Day School</option>
                <option value="Summer Camp / Study Tour">Summer Camp / Study Tour</option>
                <option value="Language School">Language School</option>
                <option value="High School Diploma (IB / Cambridge / OSSD)">High School Diploma (IB / Cambridge / OSSD)</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Preferred Country *</label>
              <select
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                className="qs-modal-input"
                style={selectStyle}
                onFocus={e => (e.target.style.borderColor = '#818CF8')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
              >
                <option value="">Select Country</option>
                <option value="United Kingdom">United Kingdom 🇬🇧</option>
                <option value="Canada">Canada 🇨🇦</option>
                <option value="United States">United States 🇺🇸</option>
                <option value="Switzerland">Switzerland 🇨🇭</option>
                <option value="Germany">Germany 🇩🇪</option>
                <option value="France">France 🇫🇷</option>
                <option value="Australia">Australia 🇦🇺</option>
                <option value="Other / Open">Other / Open 🌍</option>
              </select>
            </div>
          </div>

          {/* ── ROW 3 (2 fields): Target Admission | Student Grade/Level ── */}
          <div className="qs-form-grid-2">
            <div>
              <label style={labelStyle}>Target Admission *</label>
              <select
                name="targetGrade"
                value={formData.targetGrade}
                onChange={handleChange}
                required
                className="qs-modal-input"
                style={selectStyle}
                onFocus={e => (e.target.style.borderColor = '#818CF8')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
              >
                <option value="">Select Timeline</option>
                <option value="2025 - 2026 Academic Year">2025 – 2026 Academic Year</option>
                <option value="2026 - 2027 Academic Year">2026 – 2027 Academic Year</option>
                <option value="Summer 2025/2026">Summer 2025 / 2026</option>
                <option value="Immediate Intake">Immediate Intake</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Student Grade / Level *</label>
              <select
                name="studentGrade"
                value={formData.studentGrade}
                onChange={handleChange}
                required
                className="qs-modal-input"
                style={selectStyle}
                onFocus={e => (e.target.style.borderColor = '#818CF8')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
              >
                <option value="">Select Current / Target Grade</option>
                <option value="Pre-School / Kindergarten">Pre-School / Kindergarten</option>
                <option value="Primary School (Grades 1-5)">Primary School (Grades 1-5)</option>
                <option value="Middle School (Grades 6-8)">Middle School (Grades 6-8)</option>
                <option value="High School (Grades 9-10)">High School (Grades 9-10)</option>
                <option value="Senior High (Grades 11-12 / IB / A-Levels)">Senior High (Grades 11-12 / IB / A-Levels)</option>
              </select>
            </div>
          </div>

          {/* ── ROW 4: Message (Full Width) ── */}
          <div>
            <label style={labelStyle}>Message / Specific Inquiries</label>
            <textarea
              name="message"
              placeholder="Tell us about student goals, preferred cities, specific schools, or any special questions..."
              value={formData.message}
              onChange={handleChange}
              rows={1}
              className="qs-modal-input"
              style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
              onFocus={e => (e.target.style.borderColor = '#818CF8')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
            />
          </div>

          {/* ── ROW 5: WhatsApp & Phone Updates Consent ── */}
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', marginTop: '2px' }}>
            <input
              type="checkbox"
              name="callbackConsent"
              checked={formData.callbackConsent}
              onChange={handleChange}
              style={{
                marginTop: '3px',
                width: '16px',
                height: '16px',
                accentColor: '#6366F1',
                cursor: 'pointer',
              }}
            />
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.45 }}>
              I agree to receive school brochures, fee details, and admission counseling on WhatsApp & Phone.
            </span>
          </label>

          {/* ── ROW 6: Submit Button ── */}
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
              fontSize: '0.94rem',
              fontWeight: '800',
              cursor: isSubmitting || submitStatus === 'success' ? 'not-allowed' : 'pointer',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              transition: 'all 0.2s ease',
              opacity: isSubmitting || submitStatus === 'success' ? 0.8 : 1,
            }}
            onMouseOver={e => {
              if (!isSubmitting && submitStatus !== 'success') {
                e.currentTarget.style.opacity = '0.9'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }
            }}
            onMouseOut={e => {
              if (!isSubmitting && submitStatus !== 'success') {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = 'translateY(0)'
              }
            }}
          >
            {submitStatus === 'success' ? 'Inquiry Submitted Successfully! ✓' : isSubmitting ? 'Submitting...' : 'Submit Inquiry →'}
          </button>
        </form>
      </div>
    </div>
  )
}

