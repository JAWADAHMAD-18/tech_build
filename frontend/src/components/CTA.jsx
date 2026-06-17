import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      className="bg-green-dark py-20 px-4 text-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto flex flex-col items-center"
      >
        <h2 className="text-white font-bold text-4xl md:text-5xl leading-tight">
          Ready to Build Your
          <span className="block mt-2">Digital Presence?</span>
        </h2>

        <p className="text-green-light mt-4 text-lg md:text-xl font-medium max-w-xl">
          Let's create something extraordinary together. Your growth starts here.
        </p>

        {/* Buttons Row */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          {/* Button 1 - Start Your Project */}
          <button
            onClick={() => navigate('/contact')}
            className="group bg-white text-green-dark rounded-xl px-8 py-4 font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:bg-subtle active:scale-98 shadow-md"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>

          {/* Button 2 - View Our Work */}
          <button
            onClick={() => navigate('/portfolio')}
            className="bg-transparent border-2 border-white text-white rounded-xl px-8 py-4 font-semibold transition-all duration-300 hover:bg-white/10 active:scale-98"
          >
            View Our Work
          </button>
        </div>

        {/* Small Notice */}
        <p className="mt-8 text-green-light/70 text-sm">
          Free consultation &bull; No commitment required
        </p>
      </motion.div>
    </section>
  )
}
