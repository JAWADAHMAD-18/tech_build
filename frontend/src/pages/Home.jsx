import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Portfolio from '../components/Portfolio'
import WhyUs from '../components/WhyUs'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'

export default function Home() {
  return (
    <main>
      <Helmet>
        <title>Zalvro | Web Development & AI Automation Agency</title>
        <meta name="description" content="Zalvro builds high-performance websites and custom AI tools, including AI voice receptionists and lead automation systems, to help small businesses grow." />
        <link rel="canonical" href="https://zalvrohq.com/" />
        <meta property="og:url" content="https://zalvrohq.com/" />
      </Helmet>
      <Hero />
      <Services />
      <Portfolio />
      <WhyUs />
      <Testimonials />
      <CTA />
    </main>
  )
}







