import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'

export default function Testimonials() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const testimonials = [
    {
      stars: 5,
      quote: 'Zalvro transformed our online presence completely. The website looks stunning and works perfectly.',
      initials: 'MT',
      name: 'Michael Thompson',
      location: 'Sydney, Australia',
    },
    {
      stars: 5,
      quote: 'Delivered in 10 days exactly as promised. The AI chatbot feature has increased our inquiries by 40%.',
      initials: 'HC',
      name: 'Hans & Clara M.',
      location: 'Zurich, Switzerland',
    },
    {
      stars: 5,
      quote: 'Best investment we made for our business. Professional, responsive and genuinely cares about results.',
      initials: 'DR',
      name: 'David Richardson',
      location: 'Vancouver, Canada',
    },
  ]

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  }

  return (
    <section ref={sectionRef} className="bg-cream py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-white rounded-full px-4 py-1.5 text-sm text-green-dark font-medium shadow-sm">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mt-4">
            What Clients <span className="text-green-dark">Say</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              custom={index}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 border border-transparent hover:border-charcoal shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Large Green Quote Mark */}
                <div className="text-5xl text-green-light font-serif leading-none mb-2 select-none">
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400 shrink-0"
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-gray-500 text-sm leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* User Profile Info */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-subtle">
                <div className="w-10 h-10 rounded-full bg-green-dark text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal text-sm leading-tight">
                    {testimonial.name}
                  </h4>
                  <span className="text-gray-400 text-xs mt-1 block">
                    {testimonial.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
