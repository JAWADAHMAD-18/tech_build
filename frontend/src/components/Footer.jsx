import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  Code2,
  ChevronRight,
  Mail,
  MessageCircle,
  Globe,
} from 'lucide-react'

const GithubIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const LinkedinIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export default function Footer() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  }

  const columnVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  }

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <footer ref={sectionRef} className="bg-charcoal text-white overflow-hidden">
      {/* Top Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
      >
        {/* Col 1 — Brand */}
        <motion.div variants={columnVariants} className="flex flex-col">
          <Link to="/" className="flex items-center gap-2.5 w-fit">
            <div className="bg-green-dark rounded-lg p-1.5 text-white flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="flex text-xl font-bold tracking-tight">
              <span className="text-white">Tech</span>
              <span className="text-green-light">Builds</span>
            </span>
          </Link>
          <p className="text-gray-400 text-sm mt-4 leading-relaxed">
            Full-stack web development and AI solutions for businesses worldwide.
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={() =>
                handleSocialClick('https://github.com/JAWADAHMAD-18')
              }
              className="border border-gray-600 rounded-lg p-2 hover:border-green-dark text-gray-400 hover:text-green-light transition-all focus:outline-none"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                handleSocialClick('https://linkedin.com/in/jawad-ahmad-18')
              }
              className="border border-gray-600 rounded-lg p-2 hover:border-green-dark text-gray-400 hover:text-green-light transition-all focus:outline-none"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleSocialClick('https://Zalvro.dev')}
              className="border border-gray-600 rounded-lg p-2 hover:border-green-dark text-gray-400 hover:text-green-light transition-all focus:outline-none"
              aria-label="Website"
            >
              <Globe className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Col 2 — Quick Links */}
        <motion.div variants={columnVariants} className="flex flex-col">
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-3">
            {[
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
              { name: 'Portfolio', path: '/portfolio' },
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-gray-400 text-sm hover:text-green-light flex items-center gap-2 transition-colors w-fit"
                >
                  <ChevronRight className="w-3 h-3 text-green-light shrink-0" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Col 3 — Services */}
        <motion.div variants={columnVariants} className="flex flex-col">
          <h3 className="text-white font-semibold mb-4">Services</h3>
          <ul className="flex flex-col gap-3">
            {[
              'Web Development',
              'Website Maintenance',
              'AI Integration',
              'AI Automation',
            ].map((service) => (
              <li key={service}>
                <Link
                  to="/services"
                  className="text-gray-400 text-sm hover:text-green-light flex items-center gap-2 transition-colors w-fit"
                >
                  <ChevronRight className="w-3 h-3 text-green-light shrink-0" />
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Col 4 — Contact */}
        <motion.div variants={columnVariants} className="flex flex-col">
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <div className="flex flex-col gap-3">
            <div className="text-gray-400 text-sm flex items-center gap-2">
              <Mail className="w-4 h-4 text-green-light shrink-0" />
              <a href="mailto:hello@Zalvro.dev" className="hover:underline">
                hello@Zalvro.dev
              </a>
            </div>
            <div
              onClick={() =>
                window.open('https://wa.me/923037741461', '_blank', 'noopener,noreferrer')
              }
              className="text-gray-400 text-sm flex items-center gap-2 cursor-pointer hover:text-green-light transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-green-light shrink-0" />
              <span>+92 303 7741461</span>
            </div>
            <div className="text-gray-400 text-sm flex items-center gap-2">
              <Globe className="w-4 h-4 text-green-light shrink-0" />
              <span>Serving Globally</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Divider */}
      <hr className="border-gray-700" />

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-gray-400 text-sm">
          &copy; 2025 Zalvro. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
