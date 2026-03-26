import Navbar from './components/Navbar'
import Hero from './components/Hero'
import InternationalBanner from './components/InternationalBanner'
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
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        
        <ProductStyle />
        {/* <ThreeAreas /> */}
        <Features />
        <Explorer />
        <SchoolDetail />
        <ServicesHighlight />
        <Services />
        <Dashboard />
        <Events />
        <Blog />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
