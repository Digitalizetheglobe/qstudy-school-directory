'use client'

import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import InternationalBanner from './components/InternationalBanner'
import ContactForm from './components/ContactForm'
// import ThreeAreas from './components/ThreeAreas'
import Features from './components/Features'
import Explorer from './components/Explorer'
import SchoolDetail from './components/SchoolDetail'
import ServicesHighlight from './components/ServicesHighlight'
import Services from './components/Services'
import Dashboard from './components/Dashboard'
import Events from './components/Events'
import Blog from './components/Blog'
import CTA from './components/CTA'
import Footer from './components/Footer'
import ProductStyle from './components/product-style'

export default function Page() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  return (
    <>
      <Navbar />
      <main>
        <Hero onApplyNowClick={() => setIsContactFormOpen(true)} />
        
        <ProductStyle onApplyNowClick={() => setIsContactFormOpen(true)} />
        {/* <ThreeAreas /> */}
        <Features onApplyNowClick={() => setIsContactFormOpen(true)} />
        <Explorer onApplyNowClick={() => setIsContactFormOpen(true)} />
        <SchoolDetail onApplyNowClick={() => setIsContactFormOpen(true)} />
        <ServicesHighlight onApplyNowClick={() => setIsContactFormOpen(true)} />
        <Services onApplyNowClick={() => setIsContactFormOpen(true)} />
        <Dashboard onApplyNowClick={() => setIsContactFormOpen(true)} />
        <Events onApplyNowClick={() => setIsContactFormOpen(true)} />
        <Blog onApplyNowClick={() => setIsContactFormOpen(true)} />
        <CTA onApplyNowClick={() => setIsContactFormOpen(true)} />
      </main>
      <Footer />
      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />
    </>
  )
}
