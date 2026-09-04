import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
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
        
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '24px' }}>Privacy Policy</h1>
        
        <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          <p style={{ marginBottom: '24px' }}>Last updated: September 2026</p>
          
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '40px', marginBottom: '16px' }}>1. Information We Collect</h2>
          <p style={{ marginBottom: '24px' }}>
            We collect information you provide directly to us when you use our website, such as when you fill out a contact form, request a callback, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide.
          </p>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '40px', marginBottom: '16px' }}>2. How We Use Your Information</h2>
          <p style={{ marginBottom: '24px' }}>
            We use the information we collect to respond to your inquiries, provide the services you request, improve our website, and send you important updates or marketing communications (if you have opted in).
          </p>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '40px', marginBottom: '16px' }}>3. Information Sharing</h2>
          <p style={{ marginBottom: '24px' }}>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except to trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
          </p>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '40px', marginBottom: '16px' }}>4. Security</h2>
          <p style={{ marginBottom: '24px' }}>
            We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.
          </p>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '40px', marginBottom: '16px' }}>5. Contact Us</h2>
          <p style={{ marginBottom: '24px' }}>
            If you have any questions regarding this privacy policy, you may contact us using the information on our website.
          </p>
        </div>
      </div>
    </div>
  );
}
