import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
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
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

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
            <span className="text-charcoal">Tech</span>
            <span className="text-green-dark">Builds</span>
          </span>
        </Link>

        {/* Right - Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
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
          onClick={() => setIsOpen(true)}
          className="p-2 -mr-2 text-charcoal md:hidden hover:bg-subtle rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6"
          >
            {/* Close button top right */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 text-green-dark hover:bg-subtle rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Menu links centered */}
            <nav className="flex flex-col items-center gap-8 w-full max-w-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-bold transition-colors py-2 w-full text-center ${
                    isActiveRoute(link.path)
                      ? 'text-green-dark'
                      : 'text-charcoal hover:text-green-dark'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsOpen(false)
                  navigate('/contact')
                }}
                className="mt-6 w-full bg-green-dark text-white rounded-xl py-3 text-lg font-medium transition-colors hover:bg-[#2a5a40] shadow-md"
              >
                Get Started
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
