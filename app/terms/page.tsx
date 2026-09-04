import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--background)',
      color: 'var(--text-primary)',
      padding: '60px 24px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '32px',
          fontWeight: '600', fontSize: '0.9rem'
        }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '24px' }}>Terms of Service</h1>
        
        <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          <p style={{ marginBottom: '24px' }}>Last updated: September 2026</p>
          
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '40px', marginBottom: '16px' }}>1. Acceptance of Terms</h2>
          <p style={{ marginBottom: '24px' }}>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '40px', marginBottom: '16px' }}>2. Use of Service</h2>
          <p style={{ marginBottom: '24px' }}>
            You agree to use our services only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes harassing or causing distress or inconvenience to any person, transmitting obscene or offensive content or disrupting the normal flow of dialogue within our website.
          </p>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '40px', marginBottom: '16px' }}>3. Intellectual Property</h2>
          <p style={{ marginBottom: '24px' }}>
            All content included on the website, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the site, is the property of School Directory or its suppliers and protected by copyright and other laws that protect intellectual property and proprietary rights.
          </p>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '40px', marginBottom: '16px' }}>4. Disclaimer of Warranties</h2>
          <p style={{ marginBottom: '24px' }}>
            The materials on this website are provided "as is". We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '40px', marginBottom: '16px' }}>5. Limitation of Liability</h2>
          <p style={{ marginBottom: '24px' }}>
            In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
          </p>
        </div>
      </div>
    </div>
  );
}
