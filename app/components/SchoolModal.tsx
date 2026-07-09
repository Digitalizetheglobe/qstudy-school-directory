'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { X, MapPin, DollarSign, CheckCircle2, BookOpen, Clock, Calendar, Users, Home, Activity, Info } from 'lucide-react'

const DetailSection = ({ title, icon: Icon, children, fullWidth = false }: any) => {
  return (
    <div style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
        {Icon && <Icon size={18} color="var(--primary)" />}
        {title}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: fullWidth ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {children}
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }: { label: string, value: any }) => {
  const displayValue = (!value || value === '') ? '-' : value;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
      <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '500' }}>{displayValue}</span>
    </div>
  );
};

interface SchoolModalProps {
  item: any
  onClose: () => void
  onApplyNowClick?: () => void
}

export default function SchoolModal({ item, onClose, onApplyNowClick }: SchoolModalProps) {
  const [showAllImages, setShowAllImages] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden'
      setShowAllImages(false)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [item])

  const formatFee = (val: any, location: string) => {
    if (!val || val === '-' || val === '') return val;
    // Check if the value is purely a number or numeric string
    const num = Number(val);
    if (!isNaN(num)) {
      let currencyCode = 'USD';
      const loc = (location || '').toLowerCase();
      if (loc.includes('malaysia')) currencyCode = 'MYR';
      else if (loc.includes('india')) currencyCode = 'INR';
      else if (loc.includes('uk') || loc.includes('united kingdom')) currencyCode = 'GBP';
      else if (loc.includes('canada')) currencyCode = 'CAD';
      else if (loc.includes('australia')) currencyCode = 'AUD';
      else if (loc.includes('switzerland')) currencyCode = 'CHF';

      // Format as currency
      const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode, maximumFractionDigits: 0 }).format(num);
      
      // If it's INR, you might want to call it "Rupees", MYR -> "RM", etc for clarity.
      let currencySuffix = currencyCode;
      if (currencyCode === 'INR') currencySuffix = 'Rupees';
      else if (currencyCode === 'MYR') currencySuffix = 'RM';

      return `${formatted} ${currencySuffix}`;
    }
    // If it's a string that already has text (e.g. "Contact for fees"), return as is
    return val;
  };

  return (
    <AnimatePresence>
      {item && (
        <div 
          key={item?.name || 'school-modal-overlay'}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999, 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px'
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(12px)',
            }}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="glass-card"
            style={{
              position: 'relative',
              width: '100%', maxWidth: '640px',
              maxHeight: '90vh', overflowY: 'auto',
              background: 'var(--surface)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              padding: '40px 32px',
              boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.05) inset',
              zIndex: 1,
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: '24px', right: '24px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%', width: '36px', height: '36px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-secondary)', cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.color = 'white'
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: '32px' }}>
              {item.image ? (
                <div style={{
                  width: '90px', height: '90px', minWidth: '90px',
                  position: 'relative', borderRadius: '20px', overflow: 'hidden',
                  background: 'white',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <Image src={encodeURI(item.image)} alt={item.name} fill style={{ objectFit: 'contain', padding: '10px' }} />
                </div>
              ) : (
                <div style={{
                  width: '90px', height: '90px', minWidth: '90px',
                  background: 'linear-gradient(135deg, rgba(79,70,229,0.2), rgba(6,182,212,0.2))',
                  borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '40px', border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  {item.emoji}
                </div>
              )}
              
              <div style={{ flex: 1, paddingTop: '4px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                  {item.name}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '14px' }}>
                  <MapPin size={16} color="var(--primary)" />
                  {item.location}
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {item.type && <span style={{ background: 'rgba(79,70,229,0.15)', border: '1px solid rgba(79,70,229,0.3)', color: '#818cf8', padding: '5px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '700' }}>{item.type}</span>}
                  {item.language && <span style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)', color: '#22d3ee', padding: '5px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '700' }}>{item.language}</span>}
                  {item.level && <span style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399', padding: '5px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '700' }}>{item.level}</span>}
                  {item.ageRange && <span style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24', padding: '5px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '700' }}>{item.ageRange}</span>}
                </div>
              </div>
            </div>

            {/* Details Sections */}
            <div style={{ marginBottom: '32px' }}>
              <DetailSection title="School Info" icon={Info}>
                <DetailItem label="Full Name" value={item.fullName || item.name} />
                <DetailItem label="Establishment Since" value={item.establishmentSince} />
                <DetailItem label="Campus Info" value={item.campusDescription} />
                <DetailItem label="Total Campuses" value={item.totalCampuses} />
                <DetailItem label="Address / Location" value={item.fullAddress || item.location} />
                <DetailItem label="Type of School" value={item.schoolType || item.type} />
                <DetailItem label="Levels Served" value={item.levelsServed || item.level} />
                <DetailItem label="Operational Model" value={item.operationalModel} />
                <DetailItem label="Curriculum / Programme" value={item.curriculum || item.stream} />
                <DetailItem label="Language of Instruction" value={item.languageOfInstruction || item.language} />
                <DetailItem label="Other Languages" value={item.otherLanguages} />
                <DetailItem label="Categories / Gender" value={item.genderCategory} />
                <DetailItem label="Ages Enrolled" value={item.agesEnrolled || item.ageRange} />
              </DetailSection>

              <DetailSection title="Fees (Estimated)" icon={DollarSign}>
                <DetailItem label="Per Term (With Boarding)" value={formatFee(item.feesPerTermWithBoarding, item.location)} />
                <DetailItem label="Per Year (With Boarding)" value={formatFee(item.feesPerYearWithBoarding, item.location)} />
                <DetailItem label="Per Term (Without Boarding)" value={formatFee(item.feesPerTermWithoutBoarding, item.location)} />
                <DetailItem label="Per Year (Without Boarding)" value={formatFee(item.feesPerYearWithoutBoarding || item.fees, item.location)} />
              </DetailSection>

              <DetailSection title="About the School" icon={Users}>
                <DetailItem label="Total Enrolled Students" value={item.totalEnrolledStudents} />
                <DetailItem label="Student Nationalities (Top 5)" value={item.studentNationalitiesTop5} />
                <DetailItem label="Student Diversity (Countries)" value={item.studentDiversityCountries} />
                <DetailItem label="Staff Diversity" value={item.staffDiversity} />
                <DetailItem label="Key Qualities" value={item.keyQualities} />
                <DetailItem label="Teaching Approaches" value={item.teachingApproaches} />
              </DetailSection>

              <DetailSection title="Admission" icon={Calendar}>
                <DetailItem label="Academic Calendar / Intakes" value={item.academicCalendarIntakes} />
                <DetailItem label="Registration Deadline" value={item.registrationDeadline} />
                <DetailItem label="Can join after start?" value={item.joinAfterStart} />
              </DetailSection>

              <DetailSection title="School Day" icon={Clock}>
                <DetailItem label="Start Time" value={item.schoolStartTime} />
                <DetailItem label="End Time" value={item.schoolEndTime} />
                <DetailItem label="Supervised Care (Before/After)" value={item.supervisedCare} />
                <DetailItem label="School Lunches" value={item.schoolLunches} />
                <DetailItem label="Special Dietary Alternatives" value={item.specialDietaryNeeds} />
                <DetailItem label="School Bus Service" value={item.schoolBusService} />
                <DetailItem label="Uniform Required" value={item.uniformRequired} />
              </DetailSection>

              <DetailSection title="Accommodation & Boarding" icon={Home}>
                <DetailItem label="Type of Hostel / Boarding" value={item.typeOfHostel} />
                <DetailItem label="Type of Boarding" value={item.typeOfBoarding} />
              </DetailSection>

              <DetailSection title="Extracurricular Activities" icon={Activity} fullWidth>
                <DetailItem label="Activities / Clubs" value={item.extracurricularActivities} />
              </DetailSection>

              <DetailSection title="Facilities & Infrastructure" icon={CheckCircle2} fullWidth>
                <DetailItem label="Available Facilities" value={item.availableFacilities} />
                <DetailItem label="Campus Facilities" value={item.campusFacilities} />
                <DetailItem label="Sports Facilities" value={item.sportsFacilities} />
              </DetailSection>

              {item.highlights && item.highlights.length > 0 && (
                <DetailSection title="Programme Highlights" icon={BookOpen} fullWidth>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {item.highlights.map((h: string, idx: number) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        <span style={{ color: 'var(--primary)', marginTop: '6px', fontSize: '10px' }}>■</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </DetailSection>
              )}
            </div>            {item.gallery && item.gallery.length > 0 && (
              <div style={{ marginBottom: '36px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px' }}>Campus & Facilities</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
                  {(showAllImages ? item.gallery : item.gallery.slice(0, 8)).map((img: string, idx: number) => (
                    <div 
                      key={idx} 
                      onClick={() => setSelectedImageIndex(idx)}
                      style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}
                    >
                      <Image src={encodeURI(img)} alt={`${item.name} gallery ${idx + 1}`} fill style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                    </div>
                  ))}
                </div>
                {item.gallery.length > 8 && (
                  <button 
                    onClick={() => setShowAllImages(!showAllImages)}
                    style={{
                      marginTop: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--text-primary)', padding: '10px 16px', borderRadius: '12px',
                      fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease',
                      width: '100%'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  >
                    {showAllImages ? 'Show Less' : `Show ${item.gallery.length - 8} More Images`}
                  </button>
                )}
              </div>
            )}

            <button 
              onClick={() => {
                if (onApplyNowClick) onApplyNowClick();
                onClose(); // Optional: close the details modal when opening contact form
              }}
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.05rem', borderRadius: '14px' }}
            >
              <span>Apply Now to {item.name}</span>
            </button>
          </motion.div>
        </div>
      )}
      
      {/* Lightbox for Full-size Image */}
      {selectedImageIndex !== null && item && item.gallery && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)'
        }}>
          <button 
            onClick={() => setSelectedImageIndex(null)}
            style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', color: 'white', cursor: 'pointer', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <X size={24} />
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex(prev => (prev === null ? 0 : (prev - 1 + item.gallery.length) % item.gallery.length));
            }}
            style={{ position: 'absolute', left: '24px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', color: 'white', cursor: 'pointer', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div style={{ position: 'relative', width: '90%', height: '85%', maxWidth: '1200px' }}>
            <Image 
              src={encodeURI(item.gallery[selectedImageIndex])} 
              alt="Full size view" 
              fill 
              style={{ objectFit: 'contain' }} 
            />
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex(prev => (prev === null ? 0 : (prev + 1) % item.gallery.length));
            }}
            style={{ position: 'absolute', right: '24px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', color: 'white', cursor: 'pointer', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      )}
    </AnimatePresence>
  )
}
