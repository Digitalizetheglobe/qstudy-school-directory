'use client'

export default function InternationalBanner() {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '400px',
      backgroundImage: 'url(/washington-monument-banner.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Overlay for better text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)',
      }} />
      
      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: '800px',
        padding: '0 24px'
      }}>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '800',
          color: '#FFFFFF',
          marginBottom: '24px',
          letterSpacing: '-0.02em',
          lineHeight: '1.1'
        }}>
          International Students
        </h2>
        <p style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          color: 'rgba(255, 255, 255, 0.9)',
          lineHeight: '1.6',
          fontWeight: '400',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Students from over 110 different countries have attended our interactive summer programs for high school and middle school students.
        </p>
      </div>
    </section>
  )
}
