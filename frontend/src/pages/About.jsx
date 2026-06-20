import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Zap, Shield, TrendingUp } from 'lucide-react'

export default function About() {
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' })

  const storyRef = useRef(null)
  const isStoryInView = useInView(storyRef, { once: true, margin: '-100px' })

  const valuesRef = useRef(null)
  const isValuesInView = useInView(valuesRef, { once: true, margin: '-100px' })

  const values = [
    {
      icon: Zap,
      title: 'Speed',
      desc: 'Fast delivery without compromising quality.',
    },
    {
      icon: Shield,
      title: 'Transparency',
      desc: 'Clear communication and honest pricing always.',
    },
    {
      icon: TrendingUp,
      title: 'Growth Focus',
      desc: 'Every decision we make is focused on your business growth.',
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
    <main className="overflow-x-hidden bg-cream">
      {/* SECTION 1 — HERO */}
      <section ref={heroRef} className="py-20 bg-subtle px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Hero */}
          <div className="flex flex-col items-start">
            <span className="inline-block bg-white rounded-full px-4 py-1.5 text-sm text-green-dark font-medium shadow-sm">
              ABOUT US
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-charcoal leading-tight mt-6">
              Building Digital <span className="text-green-dark">Excellence</span>{' '}
              Since Day One.
            </h1>
            <p className="text-gray-500 mt-4 max-w-md leading-relaxed">
              We are a lean, AI-powered digital agency dedicated to building
              world-class websites for businesses ready to grow globally.
            </p>

            {/* Stats Row */}
            <div className="mt-10 flex gap-8 flex-wrap">
              <div>
                <div className="text-green-dark font-bold text-3xl">50+</div>
                <div className="text-gray-500 text-sm mt-1 font-medium">
                  Projects
                </div>
              </div>
              <div>
                <div className="text-green-dark font-bold text-3xl">15+</div>
                <div className="text-gray-500 text-sm mt-1 font-medium">
                  Countries
                </div>
              </div>
              <div>
                <div className="text-green-dark font-bold text-3xl">100%</div>
                <div className="text-gray-500 text-sm mt-1 font-medium">
                  Satisfaction
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-subtle flex flex-col w-full max-w-md mx-auto lg:max-w-none"
          >
            <div className="bg-subtle rounded-xl p-3 w-fit text-green-dark">
              <Code2 className="w-10 h-10" />
            </div>
            <h3 className="font-bold text-xl text-charcoal mt-4">Jawad Ahmad</h3>
            <p className="text-green-dark text-sm mt-1 font-medium">
              Founder & Lead Developer
            </p>
            <div className="w-full h-px bg-subtle my-4" />

            {/* Skill Tags */}
            <div className="flex flex-wrap gap-2">
              {[
                'React',
                'Node.js',
                'MongoDB',
                'AI Integration',
                'Python',
                'Django',
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-subtle text-green-dark rounded-full text-xs px-3 py-1 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <blockquote className="mt-6 italic text-gray-500 text-sm leading-relaxed">
              "I believe every business deserves a powerful online presence.
              That's why I started Zalvro."
            </blockquote>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2 — STORY */}
      <section ref={storyRef} className="py-20 px-6 bg-cream border-y border-subtle">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isStoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="inline-block bg-white rounded-full px-4 py-1.5 text-sm text-green-dark font-medium shadow-sm">
            OUR STORY
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mt-4">
            Why <span className="text-green-dark">Zalvro</span> Exists
          </h2>

          <div className="flex flex-col gap-6 mt-8 text-left max-w-2xl mx-auto text-gray-500 text-base leading-relaxed">
            <p>
              Zalvro was born from a simple observation — thousands of
              businesses worldwide have no online presence, and they're losing
              customers every single day because of it.
            </p>
            <p>
              As a solo developer powered by cutting-edge AI tools, I can deliver
              agency-quality work at a fraction of the cost — without the overhead
              of a large team.
            </p>
            <p>
              My mission is simple: help businesses in Australia, Canada, Europe
              and beyond establish their digital presence and grow their customer
              base through modern, effective websites.
            </p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 3 — VALUES */}
      <section ref={valuesRef} className="py-20 bg-subtle px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal">
              Our <span className="text-green-dark">Values</span>
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.div
                  key={value.title}
                  custom={index}
                  initial="hidden"
                  animate={isValuesInView ? 'visible' : 'hidden'}
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-8 border border-transparent hover:border-charcoal shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="text-green-dark w-fit">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-xl text-charcoal mt-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                    {value.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
