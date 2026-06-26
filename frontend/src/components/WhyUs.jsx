import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function WhyUs() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const rightCardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        delay: 0.4,
      },
    },
  }

  const reasons = [
    {
      num: '1',
      title: 'Solo + AI Power',
      desc: 'One dedicated developer using n8n automation, voice AI and cutting-edge tools to deliver agency-quality work at freelancer prices.',
    },
    {
      num: '2',
      title: 'Fast Turnaround',
      desc: 'Most websites delivered in 7-14 days. No waiting in queues or slow corporate processes.',
    },
    {
      num: '3',
      title: 'Direct Communication',
      desc: 'You talk directly to the person building your website — no middlemen, no miscommunication.',
    },
    {
      num: '4',
      title: 'Ongoing Support',
      desc: "We don't disappear after launch. Monthly maintenance packages keep your site running perfectly.",
    },
  ]

  return (
    <section ref={sectionRef} className="bg-subtle py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-white rounded-full px-4 py-1.5 text-sm text-green-dark font-medium shadow-sm">
            WHY Zalvro
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mt-4">
            Why Clients <span className="text-green-dark">Choose Us</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            We combine technical expertise with genuine care for your business
            growth.
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - 4 Reasons */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col"
          >
            {reasons.map((reason) => (
              <motion.div
                key={reason.num}
                variants={itemVariants}
                className="flex gap-4 mb-8 last:mb-0"
              >
                <div className="bg-green-dark text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0 shadow-sm">
                  {reason.num}
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal text-lg">
                    {reason.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column - Visual Card */}
          <motion.div
            variants={rightCardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="bg-white rounded-2xl p-8 shadow-sm border border-subtle flex flex-col items-center max-w-md mx-auto lg:max-w-none w-full"
          >
            <CheckCircle className="text-green-dark mb-6 shrink-0" size={48} />

            <div className="w-full flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-dark shrink-0" />
                <span className="font-semibold text-charcoal text-sm md:text-base">
                  50+ Projects Delivered
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-dark shrink-0" />
                <span className="font-semibold text-charcoal text-sm md:text-base">
                  15+ Countries Served
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-dark shrink-0" />
                <span className="font-semibold text-charcoal text-sm md:text-base">
                  100% Client Satisfaction
                </span>
              </div>
            </div>

            <div className="w-full h-px bg-subtle my-6" />

            <blockquote className="italic text-gray-500 text-sm text-center leading-relaxed">
              "Zalvro delivered our website in just 10 days. Absolutely
              professional work."
              <cite className="block not-italic font-medium text-charcoal mt-2 text-xs">
                — Michael T., Sydney
              </cite>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
