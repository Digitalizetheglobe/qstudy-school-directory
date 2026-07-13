'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { X, MapPin, DollarSign, Calendar, Users, Home, GraduationCap, Plane, ChevronRight, CheckCircle2, BookOpen, Clock, Activity, Info } from 'lucide-react'

const DetailSection = ({ title, icon: Icon, children, fullWidth = false }: any) => {
  return (
    <div style={{ marginBottom: '32px', background: 'rgba(6, 182, 212, 0.02)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.1)' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0ea5e9', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        {Icon && <Icon size={18} color="#0ea5e9" />}
        {title}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: fullWidth ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {children}
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }: { label: string, value: any }) => {
  const displayValue = (!value || value === '') ? '-' : value;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700' }}>{label}</span>
      <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '500', lineHeight: '1.4' }}>{displayValue}</span>
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

      const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode, maximumFractionDigits: 0 }).format(num);
      let currencySuffix = currencyCode;
      if (currencyCode === 'INR') currencySuffix = 'Rupees';
      else if (currencyCode === 'MYR') currencySuffix = 'RM';
      return `${formatted} ${currencySuffix}`;
    }
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
            style={{
              position: 'relative',
              width: '100%', maxWidth: '1100px',
              maxHeight: '90vh',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <style>{`
              @media (max-width: 768px) {
                .sm-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
                .sm-details-grid { grid-template-columns: 1fr !important; }
                .sm-address-grid { grid-template-columns: 1fr !important; }
                .sm-sidebar { position: static !important; }
              }
            `}</style>
            
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: '24px', right: '24px', zIndex: 10,
                background: 'var(--surface)', border: '1px solid rgba(128,128,128,0.2)',
                borderRadius: '50%', width: '36px', height: '36px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-primary)', cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ padding: '40px', overflowY: 'auto', flex: 1, position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
              {(item.logo || item.image) && (
                <div style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '16px', overflow: 'hidden', flexShrink: 0, background: 'white', border: '1px solid var(--border)' }}>
                  <Image src={item.logo || item.image} alt={`${item.name} logo`} fill style={{ objectFit: 'contain', padding: '8px' }} />
                </div>
              )}
              <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                {item.name}
              </h1>
            </div>

            <div className="sm-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px' }}>
              {/* Left Column */}
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0ea5e9', marginBottom: '16px' }}>Details</h3>
                <div className="sm-details-grid" style={{
                  background: 'rgba(6, 182, 212, 0.05)',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  borderRadius: '8px',
                  padding: '24px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '24px 32px',
                  marginBottom: '40px'
                }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <GraduationCap size={18} color="var(--text-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>Type of school</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{item.genderCategory || 'N/A'} | {item.schoolType || 'N/A'}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <Users size={18} color="var(--text-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>Number of pupils</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{item.totalEnrolledStudents || 'N/A'}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <Plane size={18} color="var(--text-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>Nearest intl airport</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{item.nearestAirport || 'N/A'}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <Home size={18} color="var(--text-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>Number of boarders</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{item.numberOfBoarders || 'N/A'}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <Calendar size={18} color="var(--text-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>Age Range</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{item.agesEnrolled || item.ageRange || 'N/A'}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <DollarSign size={18} color="var(--text-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>Fees per term</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{formatFee(item.feesPerTermWithBoarding || item.fees, item.location)}</span>
                    </div>
                  </div>
                </div>

                {/* Additional Detailed Sections that were requested */}
                <DetailSection title="School Info" icon={Info}>
                  <DetailItem label="Institution Name" value={item.fullName || item.name} />
                  <DetailItem label="Establishment Since" value={item.establishmentSince} />
                  <DetailItem label="Total Campuses" value={item.totalCampuses} />
                  <DetailItem label="Address / Location" value={item.fullAddress || item.location} />
                  <DetailItem label="Type of School" value={item.schoolType || item.type} />
                  <DetailItem label="Levels Served" value={item.levelsServed || item.level} />
                  <DetailItem label="Operational Model" value={item.operationalModel} />
                  <DetailItem label="Curriculum / Programme" value={item.curriculum || item.stream} />
                  <DetailItem label="Language of Instruction" value={item.languageOfInstruction || item.language} />
                  <DetailItem label="Other Languages" value={item.otherLanguages} />
                  <DetailItem label="Categories / Gender" value={item.genderCategory} />
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

                {item.scholarships && (
                  <>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0ea5e9', marginBottom: '16px' }}>Scholarships And Bursaries</h3>
                    <div style={{ marginBottom: '40px' }}>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                        {item.scholarships}
                      </p>
                    </div>
                  </>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0ea5e9', margin: 0 }}>Address</h3>
                  <button style={{ background: '#0052cc', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={12} /> open on google maps
                  </button>
                </div>
                <div className="sm-address-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px 32px',
                  marginBottom: '40px',
                  borderTop: '1px solid var(--border)',
                  borderBottom: '1px solid var(--border)',
                  padding: '24px 0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>Address</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'right', flex: 1 }}>{item.fullAddress || item.location || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>Phone</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.phone || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>City/Borough</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.city || item.location?.split(',')[0] || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>Email</span>
                    {item.email ? (
                      <a href={`mailto:${item.email}`} style={{ fontSize: '0.85rem', color: '#0ea5e9', textDecoration: 'none' }}>{item.email}</a>
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>N/A</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>Zip/Postal Code</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.zipCode || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>Website</span>
                    {item.website ? (
                      <a href={item.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: '#0ea5e9', textDecoration: 'none' }}>Visit Website</a>
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>N/A</span>
                    )}
                  </div>
                </div>

                {item.news && item.news.length > 0 && (
                  <>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0ea5e9', marginBottom: '16px' }}>News</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
                      {item.news.map((newsItem: any, i: number) => (
                        <div key={i} style={{ borderBottom: i < item.news.length - 1 ? '1px solid var(--border)' : 'none', paddingBottom: i < item.news.length - 1 ? '24px' : '0' }}>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0ea5e9', marginBottom: '8px' }}>{newsItem.title}</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '12px' }}>{newsItem.desc}</p>
                          <button style={{ background: 'var(--text-primary)', color: 'var(--surface)', border: 'none', borderRadius: '4px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                
                {item.gallery && item.gallery.length > 0 && (
                  <div style={{ marginBottom: '36px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0ea5e9', marginBottom: '16px' }}>Gallery</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
                      {(showAllImages ? item.gallery : item.gallery.slice(0, 12)).map((img: string, idx: number) => (
                        <div 
                          key={idx} 
                          onClick={() => setSelectedImageIndex(idx)}
                          style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}
                        >
                          <Image src={encodeURI(img)} alt={`${item.name} gallery ${idx + 1}`} fill style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                        </div>
                      ))}
                    </div>
                    {item.gallery.length > 12 && (
                      <button 
                        onClick={() => setShowAllImages(!showAllImages)}
                        style={{
                          marginTop: '16px', background: 'rgba(128,128,128,0.1)', border: 'none',
                          color: 'var(--text-primary)', padding: '10px 16px', borderRadius: '12px',
                          fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease',
                          width: '100%'
                        }}
                      >
                        {showAllImages ? 'Show Less' : `Show ${item.gallery.length - 12} More Images`}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column (Sidebar) */}
              <div className="sm-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '20px', alignSelf: 'flex-start' }}>
                <div style={{ width: '100%', height: '140px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                  {/* Mock map image using an existing asset */}
                  <div style={{ position: 'absolute', inset: 0, opacity: 0.8, backgroundImage: "url('/student-search.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <MapPin size={40} color="#ef4444" fill="white" />
                  </div>
                </div>

                <div style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '24px', background: 'rgba(255,255,255,0.02)' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0ea5e9', marginBottom: '12px' }}>Consultant</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
                    Contact one of our English Speaking educational consultants and let us help you find the right school.
                  </p>
                  <button 
                    onClick={() => {
                      if (onApplyNowClick) onApplyNowClick();
                      onClose();
                    }}
                    style={{ width: '100%', padding: '10px', background: '#0ea5e9', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '700', cursor: 'pointer', marginBottom: '12px', fontSize: '0.85rem' }}
                  >
                    Contact Consultant
                  </button>
                  <button style={{ width: '100%', padding: '10px', background: 'transparent', color: '#0ea5e9', border: '1px solid #0ea5e9', borderRadius: '4px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                    Book a consultation
                  </button>
                </div>
              </div>
            </div>
            </div>
            
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
          >
            <X size={24} />
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex(prev => (prev === null ? 0 : (prev - 1 + item.gallery.length) % item.gallery.length));
            }}
            style={{ position: 'absolute', left: '24px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', color: 'white', cursor: 'pointer', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      )}
    </AnimatePresence>
  )
}
