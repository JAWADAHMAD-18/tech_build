import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Code2, RefreshCw, Bot, Zap } from 'lucide-react'

export default function Services() {
  const navigate = useNavigate()

  const servicesData = [
    {
      icon: Code2,
      title: 'Web Development',
      desc: 'Custom full-stack websites built with React, Node.js and MongoDB. Fast, responsive and scalable solutions tailored to your business needs.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    },
    {
      icon: RefreshCw,
      title: 'Website Maintenance',
      desc: 'Keep your website running perfectly with regular updates, bug fixes, performance optimization and security patches.',
      tags: ['Updates', 'Bug Fixes', 'Performance', 'Security'],
    },
    {
      icon: Bot,
      title: 'AI Integration',
      desc: 'Add intelligent features to your website — chatbots, recommendation engines, smart search and automated customer support powered by AI.',
      tags: ['Chatbots', 'Automation', 'Smart Search', 'GPT/Gemini'],
    },
    {
      icon: Zap,
      title: 'AI Automation',
      desc: 'Automate repetitive business tasks and workflows using AI — save time, reduce errors and focus on what matters most.',
      tags: ['Workflows', 'n8n', 'Zapier', 'Custom Bots'],
    },
  ]

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.15,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  }

  return (
    <section className="bg-subtle py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-white rounded-full px-4 py-1.5 text-sm text-green-dark font-medium shadow-sm">
            WHAT WE DO
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mt-4">
            Our <span className="text-green-dark">Services</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            We deliver end-to-end digital solutions that help businesses establish
            and grow their online presence globally.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {servicesData.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                custom={index}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-8 border border-transparent hover:border-charcoal shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="bg-green-dark rounded-xl p-3 w-fit text-white">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl text-charcoal mt-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                <div className="mt-6 flex gap-2 flex-wrap">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-subtle text-green-dark text-xs rounded-full px-3 py-1 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm md:text-base">
            Need a custom solution?{' '}
            <button
              onClick={() => navigate('/contact')}
              className="text-green-dark font-semibold hover:underline transition-all focus:outline-none ml-1"
            >
              Let's discuss your project &rarr;
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}
