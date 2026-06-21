import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code, Code2, ChevronRight } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActiveRoute = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  // Automatically close menu when location changes (route/back button)
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-subtle transition-all duration-300 ${
        isScrolled ? 'shadow-md py-3' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Left - Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="bg-green-dark rounded-lg p-1.5 text-white flex items-center justify-center transition-transform group-hover:scale-105">
            <Code className="w-5 h-5" />
          </div>
          <span className="flex text-xl font-bold tracking-tight">
            <span className="text-charcoal">Zal</span>
            <span className="text-green-dark">Vro</span>
          </span>
        </Link>

        {/* Right - Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-sm font-medium transition-colors py-1.5 ${
                isActiveRoute(link.path)
                  ? 'text-green-dark'
                  : 'text-charcoal hover:text-green-dark'
              }`}
            >
              {link.name}
              {isActiveRoute(link.path) && (
                <motion.span
                  layoutId="activeDot"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-green-dark rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <button
            onClick={() => navigate('/contact')}
            className="ml-4 bg-green-dark text-white rounded-xl px-5 py-2 text-sm font-medium transition-all duration-300 hover:bg-[#2a5a40] active:scale-95 shadow-sm hover:shadow"
          >
            Get Started
          </button>
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 -mr-2 text-charcoal lg:hidden hover:bg-subtle rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[99] bg-black/40 w-screen h-screen"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 z-[100] w-[75vw] h-screen bg-white shadow-[-4px_0_20px_rgba(0,0,0,0.1)] flex flex-col"
            >
              {/* Top Row */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                {/* Logo (small) */}
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-green-dark" />
                  <span className="flex text-lg font-bold tracking-tight">
                    <span className="text-charcoal">Zal</span>
                    <span className="text-green-dark">vro</span>
                  </span>
                </div>

                {/* X button */}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-[#F0EDE8] rounded-full p-2 text-green-dark hover:opacity-90 transition-opacity flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="mt-8 px-6 flex-1 overflow-y-auto pb-36">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-4 border-b border-gray-100 flex justify-between items-center transition-colors text-xl font-semibold ${
                      isActiveRoute(link.path)
                        ? 'text-green-dark'
                        : 'text-charcoal hover:text-green-dark'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </Link>
                ))}
              </nav>

              {/* Bottom Section */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-white">
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    navigate('/contact')
                  }}
                  className="w-full bg-[#35694D] text-white rounded-xl py-3 font-semibold hover:opacity-95 transition-opacity"
                >
                  Get Started
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">
                  zalvrohq.com
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
