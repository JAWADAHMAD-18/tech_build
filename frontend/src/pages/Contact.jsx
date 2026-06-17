import { motion } from 'framer-motion'
import { Mail, MessageCircle, Globe } from 'lucide-react'

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

export default function Contact() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/923037741461', '_blank', 'noopener,noreferrer')
  }

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="overflow-x-hidden bg-cream">
      {/* SECTION 1 — HEADER */}
      <section className="py-16 bg-subtle px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto text-center"
        >
          <span className="inline-block bg-white rounded-full px-4 py-1.5 text-sm text-green-dark font-medium shadow-sm">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mt-6 leading-tight">
            Let's Build <span className="text-green-dark">Something Great</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-md mx-auto text-base md:text-lg">
            Ready to start your project? We'd love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* SECTION 2 — MAIN */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <h2 className="font-bold text-2xl text-charcoal">Get In Touch</h2>
            <p className="text-gray-500 text-sm mt-2 mb-8 leading-relaxed">
              Fill out the form or reach out directly — we respond within 24 hours.
            </p>

            {/* Info Cards */}
            <div className="flex flex-col gap-4">
              {/* Card 1 - Email */}
              <div className="bg-white rounded-xl p-5 flex gap-4 items-center border border-transparent hover:border-charcoal shadow-sm transition-all duration-300">
                <div className="bg-subtle text-green-dark p-3 rounded-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal text-sm">Email Us</h4>
                  <a
                    href="mailto:hello@techbuilds.dev"
                    className="text-gray-500 text-sm mt-0.5 hover:underline"
                  >
                    hello@techbuilds.dev
                  </a>
                </div>
              </div>

              {/* Card 2 - WhatsApp */}
              <div
                onClick={handleWhatsAppClick}
                className="bg-white rounded-xl p-5 flex gap-4 items-center border border-transparent hover:border-charcoal shadow-sm cursor-pointer transition-all duration-300"
              >
                <div className="bg-subtle text-green-dark p-3 rounded-lg">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal text-sm">WhatsApp</h4>
                  <span className="text-gray-500 text-sm mt-0.5 hover:underline">
                    +92 303 7741461
                  </span>
                </div>
              </div>

              {/* Card 3 - Globe */}
              <div className="bg-white rounded-xl p-5 flex gap-4 items-center border border-transparent hover:border-charcoal shadow-sm transition-all duration-300">
                <div className="bg-subtle text-green-dark p-3 rounded-lg">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal text-sm">Based In</h4>
                  <span className="text-gray-500 text-sm mt-0.5">
                    Pakistan — Serving Globally
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    handleSocialClick('https://github.com/JAWADAHMAD-18')
                  }
                  className="bg-white border border-gray-200 rounded-xl p-3 text-green-dark hover:border-charcoal transition-all shadow-sm focus:outline-none"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    handleSocialClick('https://linkedin.com/in/jawad-ahmad-18')
                  }
                  className="bg-white border border-gray-200 rounded-xl p-3 text-green-dark hover:border-charcoal transition-all shadow-sm focus:outline-none"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-8 border border-subtle shadow-sm"
          >
            <h3 className="font-bold text-xl text-green-dark">Send a Message</h3>
            <p className="text-gray-500 text-sm mt-1 mb-6">
              We'll get back to you within 24 hours.
            </p>

            <form
              action="https://formspree.io/f/meewpvdo"
              method="POST"
              className="flex flex-col gap-4"
            >
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-semibold text-charcoal">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Jack Edward"
                  className="bg-cream border border-gray-200 rounded-xl p-3 focus:border-green-dark outline-none text-charcoal text-sm transition-colors"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-semibold text-charcoal">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="hello@example.com"
                  className="bg-cream border border-gray-200 rounded-xl p-3 focus:border-green-dark outline-none text-charcoal text-sm transition-colors"
                />
              </div>

              {/* Service Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="service"
                  className="text-xs font-semibold text-charcoal"
                >
                  Required Service
                </label>
                <select
                  name="service"
                  id="service"
                  required
                  className="bg-cream border border-gray-200 rounded-xl p-3 focus:border-green-dark outline-none text-charcoal text-sm transition-colors cursor-pointer"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Website Maintenance">Website Maintenance</option>
                  <option value="AI Integration">AI Integration</option>
                  <option value="AI Automation">AI Automation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Budget Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="budget"
                  className="text-xs font-semibold text-charcoal"
                >
                  Project Budget
                </label>
                <select
                  name="budget"
                  id="budget"
                  required
                  className="bg-cream border border-gray-200 rounded-xl p-3 focus:border-green-dark outline-none text-charcoal text-sm transition-colors cursor-pointer"
                >
                  <option value="Under $500">Under $500</option>
                  <option value="$500-$1000">$500 - $1,000</option>
                  <option value="$1000-$2000">$1,000 - $2,000</option>
                  <option value="$2000+">$2,000+</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-semibold text-charcoal"
                >
                  Project Details
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  placeholder="Tell us about your project..."
                  className="bg-cream border border-gray-200 rounded-xl p-3 focus:border-green-dark outline-none text-charcoal text-sm h-32 resize-none transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-green-dark text-white rounded-xl py-4 font-semibold text-sm transition-all duration-300 hover:bg-[#2a5a40] active:scale-98 shadow-sm hover:shadow"
              >
                Send Message &rarr;
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
