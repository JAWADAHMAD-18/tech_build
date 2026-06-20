import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { projects } from '../data/projects'

export default function Portfolio() {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

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
    <section ref={sectionRef} className="bg-cream py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-16">
          <span className="inline-block bg-white rounded-full px-4 py-1.5 text-sm text-green-dark font-medium shadow-sm">
            OUR WORK
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mt-4">
            Featured <span className="text-green-dark">Projects</span>
          </h2>
          <p className="mt-4 text-gray-500 text-base md:text-lg leading-relaxed">
            Real projects. Real results. Built with modern technology.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl overflow-hidden border border-transparent hover:border-charcoal shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Section */}
              <div className="relative h-56 w-full overflow-hidden bg-subtle">
                {/* Category Badge */}
                <span className="absolute top-0 left-0 z-20 bg-green-dark text-white text-xs rounded-full px-3 py-1 m-4 font-semibold shadow-sm">
                  {project.category}
                </span>

                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark Hover Overlay */}
                <div
                  onClick={() =>
                    window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                  }
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 z-10 cursor-pointer"
                >
                  <ExternalLink className="text-white w-8 h-8" />
                  <span className="text-white text-sm font-semibold">View Live</span>
                </div>
              </div>

              {/* Bottom Content */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-bold text-xl text-charcoal">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Stack Tags */}
                  <div className="mt-4 flex gap-2 flex-wrap">
                    {project.stack.map((tag) => (
                      <span
                        key={tag}
                        className="bg-subtle text-green-dark text-xs rounded-full px-3 py-1 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Row */}
                <div className="mt-6 flex justify-between items-center pt-4 border-t border-subtle">
                  <button
                    onClick={() =>
                      window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                    }
                    className="text-green-dark font-semibold text-sm hover:underline transition-all"
                  >
                    View Live &rarr;
                  </button>
                  <ExternalLink className="text-green-dark" size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm md:text-base">
            Have a project in mind?{' '}
            <button
              onClick={() => navigate('/contact')}
              className="text-green-dark font-semibold hover:underline transition-all ml-1"
            >
              Let's build it together &rarr;
            </button>
          </p>
        </div>
      </motion.div>
    </section>
  )
}
