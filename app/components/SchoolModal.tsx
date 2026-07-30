'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { X, MapPin, DollarSign, Calendar, Users, Home, GraduationCap, Plane, ChevronRight, CheckCircle2, BookOpen, Clock, Activity, Info } from 'lucide-react'

const DetailSection = ({ title, icon: Icon, children, fullWidth = false }: any) => {
  const validChildren = React.Children.toArray(children).filter((child: any) => {
    if (React.isValidElement(child) && child.props) {
      const value = (child.props as any).value;
      if (value === undefined || value === null || value === '' || value === '-' || value === 'N/A') {
        return false;
      }
    }
    return true;
  });

  if (validChildren.length === 0) return null;

  return (
    <div style={{ marginBottom: '32px', background: 'rgba(6, 182, 212, 0.02)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(6, 182, 212, 0.1)' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0ea5e9', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        {Icon && <Icon size={18} color="#0ea5e9" />}
        {title}
      </h3>
      <div style={{ columnWidth: fullWidth ? '100%' : '240px', columnGap: '24px' }}>
        {validChildren}
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, justify, fullWidth }: { label: string, value: any, justify?: boolean, fullWidth?: boolean }) => {
  if (value === undefined || value === null || value === '' || value === '-' || value === 'N/A') return null;
  let displayValue = value;
  if (Array.isArray(displayValue) && displayValue.length > 0 && typeof displayValue[0] === 'string') {
    displayValue = displayValue.join(', ');
  }
  return (
    <div style={{ 
      display: 'flex', flexDirection: 'column', gap: '6px', 
      WebkitColumnSpan: fullWidth ? 'all' : 'none',
      columnSpan: fullWidth ? 'all' : 'none',
      breakInside: 'avoid',
      pageBreakInside: 'avoid',
      marginBottom: '24px'
    }}>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700' }}>{label}</span>
      <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '500', lineHeight: '1.4', textAlign: justify ? 'justify' : undefined }}>{displayValue}</div>
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

  const formatAddressData = (rawAddress: any) => {
    if (!rawAddress) return null;
    const str = String(rawAddress);
    
    let s = str.replace(/Campus(?=[A-Za-z0-9])/gi, 'Campus\n');
    s = s.replace(/([a-z])([A-Z])/g, (match, p1, p2) => p1 + '.\n' + p2);
    s = s.replace(/\.([A-Z])/g, (match, p1) => '.\n' + p1);
    
    const blocks = s.split('\n').filter(b => b.trim() !== '');
    
    if (blocks.length <= 1) {
      const parts = str.split(',').map(p => p.trim()).filter(p => p !== '');
      return (
        <div style={{ lineHeight: '1.6' }}>
          {parts.map((p, i) => {
            const isLast = i === parts.length - 1;
            const isSecondToLast = i === parts.length - 2;
            return (
              <span key={i} style={{ display: isLast || isSecondToLast ? 'inline' : 'block' }}>
                {p}{!isLast && ','}
                {isSecondToLast && ' '}
              </span>
            );
          })}
        </div>
      );
    }
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
        {blocks.map((block, index) => {
          const isCampusName = block.toLowerCase().endsWith('campus');
          if (isCampusName) {
            return (
              <div key={index} style={{ fontWeight: '700', color: '#0ea5e9', marginTop: index > 0 ? '8px' : '0' }}>
                {block.trim()}
              </div>
            );
          } else {
            const parts = block.split(',').map(p => p.trim()).filter(p => p !== '');
            return (
              <div key={index} style={{ color: 'inherit', lineHeight: '1.5' }}>
                {parts.join(', ')}
              </div>
            );
          }
        })}
      </div>
    );
  };

  const formatBulletList = (text: any) => {
    if (!text) return null;
    const str = String(text);
    const items = str.split(',').map(s => s.trim()).filter(s => s !== '');
    if (items.length <= 1) return text;
    return (
      <ul style={{ margin: '4px 0 0', paddingLeft: '18px', listStyleType: 'disc', lineHeight: '1.6' }}>
        {items.map((item, i) => (
          <li key={i} style={{ marginBottom: '4px' }}>{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <AnimatePresence>
        {item && (
          <motion.div 
            key={item?.name || 'school-modal-overlay'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
                  <Image src={encodeURI(item.logo || item.image)} alt={`${item.name} logo`} fill style={{ objectFit: 'contain', padding: '8px' }} />
                </div>
              )}
              <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                {item.name}
              </h1>
            </div>

            <div className="sm-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px' }}>
              {/* Left Column */}
              <div>
                {item.introduction && (
                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0ea5e9', marginBottom: '12px' }}>Introduction</h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', textAlign: 'justify' }}>
                      {item.introduction}
                    </p>
                  </div>
                )}
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
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{item.schoolInfo?.genderCategories || 'N/A'} | {item.schoolInfo?.typeOfSchools || 'N/A'}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <Users size={18} color="var(--text-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>Number of pupils</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{item.aboutSchool?.totalEnrolled || 'N/A'}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <Plane size={18} color="var(--text-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>Nearest International Airport</span>
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
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{item.schoolInfo?.studentAges || 'N/A'}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <DollarSign size={18} color="var(--text-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>Fees per term</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{formatFee(item.schoolInfo?.feesPerTermUSDWithBoarding || item.fees, item.location)}</span>
                    </div>
                  </div>
                </div>

                {/* Additional Detailed Sections that were requested */}
                <DetailSection title="School Info" icon={Info}>
                  <DetailItem label="Institution Name" value={item.schoolInfo?.fullName || item.name} />
                  <DetailItem label="Establishment Since" value={item.schoolInfo?.establishmentSince} />
                  <DetailItem label="Total Campuses" value={item.schoolInfo?.totalCampuses ? String(item.schoolInfo?.totalCampuses).match(/^\d+/)?.[0] || item.schoolInfo?.totalCampuses : item.schoolInfo?.totalCampuses} />
                  <DetailItem label="Address / Location" value={formatAddressData(item.schoolInfo?.address || item.location)} fullWidth />
                  <DetailItem label="Type of School" value={item.schoolInfo?.typeOfSchools || item.type} />
                  <DetailItem label="Levels Served" value={formatBulletList(item.schoolInfo?.levelsServed || item.level)} />
                  <DetailItem label="Operational Model" value={item.schoolInfo?.operationalModel} />
                  <DetailItem label="Curriculum / Programme" value={item.schoolInfo?.curriculumOffered || item.stream} />
                  <DetailItem label="Language of Instruction" value={item.schoolInfo?.languageOfInstruction || item.language} />
                  <DetailItem label="Other Languages" value={item.schoolInfo?.otherLanguages} />
                  <DetailItem label="Categories / Gender" value={item.schoolInfo?.genderCategories} />
                </DetailSection>

                <DetailSection title="Fees (Estimated)" icon={DollarSign}>
                  <DetailItem label="Per Term (With Boarding)" value={formatFee(item.schoolInfo?.feesPerTermUSDWithBoarding, item.location)} />
                  <DetailItem label="Per Year (With Boarding)" value={formatFee(item.schoolInfo?.feesPerYearUSDWithBoarding, item.location)} />
                  <DetailItem label="Per Term (Without Boarding)" value={formatFee(item.schoolInfo?.feesPerTermUSDWithoutBoarding, item.location)} />
                  <DetailItem label="Per Year (Without Boarding)" value={formatFee(item.schoolInfo?.feesPerYearUSDWithoutBoarding || item.fees, item.location)} />
                </DetailSection>

                <DetailSection title="About the School" icon={Users}>
                  <DetailItem label="Total Enrolled Students" value={item.aboutSchool?.totalEnrolled} />
                  <DetailItem label="Student Nationalities (Top 5)" value={item.aboutSchool?.studentNationalitiesTop5} />
                  <DetailItem label="Student Diversity (Countries)" value={item.aboutSchool?.studentDiversityCountries} />
                  <DetailItem label="Staff Diversity" value={item.aboutSchool?.staffDiversity} />
                  <DetailItem label="Key Qualities" value={item.aboutSchool?.keyQualities} justify />
                  <DetailItem label="Teaching Approaches" value={item.aboutSchool?.teachingApproaches} justify />
                </DetailSection>

                <DetailSection title="Admission" icon={Calendar}>
                  <DetailItem label="Academic Calendar / Intakes" value={item.admission?.academicCalendar} />
                  <DetailItem label="Registration Deadline" value={item.admission?.registrationDeadline} />
                  <DetailItem label="Can join after start?" value={item.admission?.canJoinMidYear !== undefined ? (item.admission?.canJoinMidYear ? 'Yes' : 'No') : undefined} />
                </DetailSection>

                <DetailSection title="School Day" icon={Clock}>
                  <DetailItem label="Start Time" value={item.schoolDay?.startTime} />
                  <DetailItem label="End Time" value={item.schoolDay?.endTime} />
                  <DetailItem label="Supervised Care (Before/After)" value={item.schoolDay?.supervisedCare !== undefined ? (item.schoolDay?.supervisedCare ? 'Yes' : 'No') : undefined} />
                  <DetailItem label="School Lunches" value={item.schoolDay?.providedLunches !== undefined ? (item.schoolDay?.providedLunches ? 'Yes' : 'No') : undefined} />
                  <DetailItem label="Special Dietary Alternatives" value={item.schoolDay?.specialDietaryNeeds !== undefined ? (item.schoolDay?.specialDietaryNeeds ? 'Yes' : 'No') : undefined} />
                  <DetailItem label="School Bus Service" value={item.schoolDay?.busService !== undefined ? (item.schoolDay?.busService ? 'Yes' : 'No') : undefined} />
                  <DetailItem label="Uniform Required" value={item.schoolDay?.uniformRequired !== undefined ? (item.schoolDay?.uniformRequired ? 'Yes' : 'No') : undefined} />
                </DetailSection>

                <DetailSection title="Accommodation & Boarding" icon={Home}>
                  <DetailItem label="Type of Hostel / Boarding" value={item.accommodation?.hostelType} />
                  <DetailItem label="Type of Boarding" value={item.accommodation?.boardingType} />
                </DetailSection>

                <DetailSection title="Extracurricular Activities" icon={Activity} fullWidth>
                  <DetailItem label="Activities / Clubs" value={item.extracurricular?.description} justify />
                </DetailSection>

                <DetailSection title="Facilities & Infrastructure" icon={CheckCircle2} fullWidth>
                  <DetailItem label="Available Facilities" value={item.facilities?.generalDescription} justify />
                  <DetailItem label="Campus Facilities" value={item.facilities?.campusFacilities} justify />
                  <DetailItem label="Sports Facilities" value={item.facilities?.sportsFacilities} justify />
                </DetailSection>

                {item.scholarships && (
                  <>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0ea5e9', marginBottom: '16px' }}>Scholarships And Bursaries</h3>
                    <div style={{ marginBottom: '40px' }}>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.7', textAlign: 'justify' }}>
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
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'right', flex: 1 }}>{formatAddressData(item.schoolInfo?.address || item.location) || 'N/A'}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>Contact</span>
                    <button
                      onClick={() => {
                        if (onApplyNowClick) onApplyNowClick();
                        onClose();
                      }}
                      style={{ 
                        background: 'none', border: 'none', padding: 0, 
                        fontSize: '0.85rem', color: '#0ea5e9', textDecoration: 'none', 
                        cursor: 'pointer', textAlign: 'right', fontWeight: '500'
                      }}
                    >
                      Enquire Now
                    </button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>City/Borough</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.city || item.location?.split(',')[0] || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>Zip/Postal Code</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.zipCode || 'N/A'}</span>
                  </div>
                </div>

                {item.news && item.news.length > 0 && (
                  <>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0ea5e9', marginBottom: '16px' }}>News</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
                      {item.news.map((newsItem: any, i: number) => (
                        <div key={i} style={{ borderBottom: i < item.news.length - 1 ? '1px solid var(--border)' : 'none', paddingBottom: i < item.news.length - 1 ? '24px' : '0' }}>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0ea5e9', marginBottom: '8px' }}>{newsItem.title}</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '12px', textAlign: 'justify' }}>{newsItem.desc}</p>
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
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5', textAlign: 'justify' }}>
                    Contact one of our English Speaking educational consultants and let us help you find the right school.
                  </p>
                  <button 
                    onClick={() => {
                      if (onApplyNowClick) onApplyNowClick();
                      onClose();
                    }}
                    style={{ width: '100%', padding: '10px', background: '#0ea5e9', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '700', cursor: 'pointer', marginBottom: '12px', fontSize: '0.85rem' }}
                  >
                    Contact Us
                  </button>
                
                </div>
              </div>
            </div>
            </div>
            
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

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
    </>
  )
}
