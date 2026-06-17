import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppBtn() {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleClick = () => {
    window.open('https://wa.me/923037741461', '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center">
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg text-white hover:bg-[#20ba56] transition-colors focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />

        {/* Pulse animation ring (green) */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping -z-10" />
      </motion.button>

      {/* Tooltip on hover (appears to the right) */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-full ml-3 bg-charcoal text-white text-xs font-medium rounded-lg px-3 py-1.5 whitespace-nowrap shadow-lg pointer-events-none select-none"
          >
            Chat on WhatsApp
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
