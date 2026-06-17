import Hero from '../components/Hero'
import Services from '../components/Services'
import Portfolio from '../components/Portfolio'
import WhyUs from '../components/WhyUs'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Portfolio />
      <WhyUs />
      <Testimonials />
      <CTA />
    </main>
  )
}


