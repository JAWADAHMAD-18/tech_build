import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppBtn from './components/WhatsAppBtn'
import ScrollToTop from './components/ScrollToTop'

// Lazy load all pages
const Home = lazy(() => import('./pages/Home'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-[#F8F6F1] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-[#35694D] border-t-transparent animate-spin"/>
      <p className="text-[#35694D] text-sm font-medium">Loading...</p>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-cream text-charcoal">
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
        <Footer />
        <WhatsAppBtn />
      </div>
    </Router>
  )
}

export default App