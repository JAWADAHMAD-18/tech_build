import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Zap, Code } from 'lucide-react'

export default function Hero() {
  const navigate = useNavigate()

  // Animation variants for the staggered heading lines
  const headingContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  }

  const headingLine = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 15,
      },
    },
  }

  return (
    <section className="min-h-screen w-full bg-cream flex items-center pt-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 py-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="flex flex-col items-start text-left">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-subtle rounded-full px-4 py-1.5 text-sm font-medium text-green-dark"
          >
            <span className="w-2 h-2 rounded-full bg-green-dark animate-pulse" />
            Available for new projects
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={headingContainer}
            initial="hidden"
            animate="visible"
            className="mt-4 text-5xl md:text-7xl font-bold leading-tight tracking-tight text-charcoal flex flex-col"
          >
            <motion.span variants={headingLine}>We Build.</motion.span>
            <motion.span variants={headingLine}>You Grow.</motion.span>
            <motion.span variants={headingLine}>Your Digital</motion.span>
            <motion.span variants={headingLine}>Presence,</motion.span>
            <motion.span variants={headingLine} className="text-green-dark">
              Perfected.
            </motion.span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-4 text-lg text-gray-500 max-w-md leading-relaxed"
          >
            Full-stack web development, AI integration, and digital solutions for
            businesses ready to grow globally.
          </motion.p>

          {/* Buttons Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 flex flex-wrap gap-4"
          >
            {/* Primary Button */}
            <button
              onClick={() => navigate('/portfolio')}
              className="group bg-green-dark text-white rounded-xl px-8 py-4 flex items-center justify-center gap-2 font-medium transition-all duration-300 hover:bg-[#2a5a40] active:scale-98 shadow-sm hover:shadow-md"
            >
              View Our Work
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>

            {/* Secondary Button */}
            <button
              onClick={() => navigate('/contact')}
              className="bg-transparent border-2 border-charcoal text-charcoal rounded-xl px-8 py-4 font-medium transition-all duration-300 hover:bg-charcoal hover:text-white active:scale-98"
            >
              Let's Talk
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex items-center gap-6 md:gap-8 border-t border-subtle pt-6 w-full"
          >
            <div>
              <div className="font-bold text-2xl md:text-3xl text-green-dark">50+</div>
              <div className="text-sm text-gray-500 mt-1">Projects</div>
            </div>
            <div className="h-8 w-px bg-subtle" />
            <div>
              <div className="font-bold text-2xl md:text-3xl text-green-dark">15+</div>
              <div className="text-sm text-gray-500 mt-1">Countries</div>
            </div>
            <div className="h-8 w-px bg-subtle" />
            <div>
              <div className="font-bold text-2xl md:text-3xl text-green-dark">100%</div>
              <div className="text-sm text-gray-500 mt-1">Satisfaction</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Floating Cards Visual */}
        <div className="relative flex items-center justify-center h-[400px] w-full max-w-[450px] mx-auto lg:max-w-none">
          {/* Background decoration: Large blur circle */}
          <div className="absolute w-72 h-72 rounded-full bg-[#90E4A1]/20 blur-3xl -z-10" />

          {/* Small scattered decorative dots */}
          <span className="absolute top-10 left-12 w-3 h-3 rounded-full bg-green-dark/80 animate-pulse" />
          <span className="absolute bottom-16 right-16 w-2 h-2 rounded-full bg-[#90E4A1]/80 animate-ping" />
          <span className="absolute top-1/2 right-4 w-3.5 h-3.5 rounded-full bg-green-dark/70 animate-pulse" />

          {/* Main Card */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-xl border border-subtle p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-subtle rounded-xl flex items-center justify-center text-green-dark">
                <Code className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-charcoal text-lg">TechBuilds</h3>
                <p className="text-gray-500 text-sm">Full Stack Agency</p>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              {['React', 'Node.js', 'AI','Python','Automation'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-subtle text-green-dark text-xs px-3 py-1 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 2 - Top Right */}
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{
              duration: 3,
              delay: 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-4 -right-2 md:-right-8 bg-white rounded-xl shadow-lg border border-subtle p-4 flex items-center gap-3 z-20 w-[180px] md:w-[200px]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#90E4A1]/20 flex items-center justify-center text-green-dark shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-charcoal text-xs md:text-sm leading-tight">
                Project Delivered
              </div>
              <div className="text-gray-400 text-[10px] md:text-xs mt-0.5">
                TechBuild Realty
              </div>
            </div>
          </motion.div>

          {/* Card 3 - Bottom Left */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{
              duration: 3,
              delay: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -bottom-4 -left-2 md:-left-8 bg-green-dark rounded-xl shadow-lg p-4 flex items-center gap-3 z-20 w-[180px] md:w-[200px]"
          >
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-xs md:text-sm leading-tight">
                AI Powered
              </div>
              <div className="text-[#90E4A1] text-[10px] md:text-xs mt-0.5">
                Smart Solutions
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
