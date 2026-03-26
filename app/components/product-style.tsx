'use client';

import React from 'react';
import { ArrowRight, BookOpenText, Globe, School, TentTree } from 'lucide-react';
import styles from './product-style.module.css';

interface AreaData {
  id: number;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  tag: string;
  title: string;
  desc: string;
  tags: string[];
  color: string;
  bg: string;
  border: string;
  count: string;
  href: string;
  image: string;
}

const areas: AreaData[] = [
  {
    id: 1,
    icon: School,
    tag: 'Schools',
    title: 'International, Boarding & Grammar Schools',
    desc: 'Discover world-class schools across every category - from elite boarding schools in the UK to grammar schools in Europe and international schools worldwide.',
    tags: ['International Schools', 'Boarding Schools', 'Grammar Schools'],
    color: '#4F46E5',
    bg: '#EEF0FD',
    border: 'rgba(79,70,229,0.25)',
    count: '3,200+ Schools',
    image: '/schools-boarding.png',
    href: '#explorer',
  },
  {
    id: 2,
    icon: BookOpenText,
    tag: 'Language Schools',
    title: 'English, French, German & More',
    desc: 'Immersive language education programs at accredited schools across Europe, Canada, Australia, and beyond. Study the language, live the culture.',
    tags: ['English (ESL)', 'French', 'German', 'Spanish', 'Mandarin'],
    color: '#06B6D4',
    bg: '#E0F7FA',
    border: 'rgba(6,182,212,0.25)',
    count: '800+ Language Schools',
    image: '/language-school.png',
    href: '#explorer',
  },
  {
    id: 3,
    icon: TentTree,
    tag: 'Summer Camps & Study Trips',
    title: 'Summer Camps & Study Trips',
    desc: 'Short-term educational adventures for students of all ages - summer camps, academic study trips, cultural exchanges, and sports programmes worldwide.',
    tags: ['Summer Camps', 'Study Trips', 'Cultural Exchange', 'Sports Camps'],
    color: '#F59E0B',
    bg: '#FEF9EE',
    border: 'rgba(245,158,11,0.25)',
    count: '500+ Programmes',
    image: '/summer-camp.png',
    href: '#explorer',
  },
];

const ProductStyle: React.FC = () => {
  return (
    <section className={styles.section}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>
          <Globe size={14} /> What We Cover
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Three Pillars of <span className="text-blue-800-solid">Global Education</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
          Whether you&apos;re searching for a full-time school, a language programme, or a life-changing summer experience - we have it all.
        </p>
      </div>
      <div className={styles.outerWrap}>
        <div className={styles.stickyContainer}>
          {areas.map((area) => (
            <div key={area.id} className={styles.stickySquare} style={{ background: area.bg, border: `1px solid ${area.border}` }}>
              {/* Top accent line */}
              <div className={styles.accentLine} style={{ background: `${area.color}` }} />

              <div className={styles.productCard}>
                {/* Left: Background Image */}
                <div className={styles.imageWrapper}>
                  {/* Background photo */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url('${area.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }} />
                  {/* Colour gradient overlay at bottom */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(to top, ${area.color}CC 0%, ${area.color}44 40%, transparent 70%)`,
                  }} />
                  {/* Floating icon + count badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '24px',
                    right: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    zIndex: 2,
                  }}>
                    <area.icon size={36} strokeWidth={1.9} />
                    <div style={{
                      background: 'rgba(255,255,255,0.92)',
                      borderRadius: '50px',
                      padding: '6px 16px',
                      fontSize: '0.82rem',
                      fontWeight: '800',
                      color: area.color,
                      backdropFilter: 'blur(8px)',
                    }}>
                      {area.count}
                    </div>
                  </div>
                </div>

                {/* Right: Content */}
                <div className={styles.productContent}>
                  {/* Category pill */}
                  <span className={styles.categoryPill} style={{ color: area.color }}>
                    {area.tag}
                  </span>

                  <h2 className={styles.productHeading} style={{ color: 'var(--text-primary)' }}>
                    {area.title}
                  </h2>

                  <p className={styles.contentText}>{area.desc}</p>

            
                  <div className={styles.subTagRow}>
                    {area.tags.map((t) => (
                      <span
                        key={t}
                        className={styles.subTag}
                        style={{ background: `${area.color}10`, border: `1px solid ${area.color}24`, color: area.color }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className={styles.cardFooter}>
                    <span className={styles.countText} style={{ color: area.color }}>
                      {area.count}
                    </span>
                    <a href={area.href} className={styles.exploreLink} style={{ color: area.color, borderColor: `${area.color}44` }}>
                      Explore <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductStyle;