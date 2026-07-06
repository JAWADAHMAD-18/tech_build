import { Helmet } from 'react-helmet-async'
import Services from '../components/Services'

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-cream ">
      <Helmet>
        <title>Our Services | Custom Web Development & AI Automation | Zalvro</title>
        <meta name="description" content="Explore our services: custom website design, AI integration, AI voice receptionists, and automated lead follow-up systems designed to scale your business." />
        <link rel="canonical" href="https://zalvrohq.com/services" />
        <meta property="og:url" content="https://zalvrohq.com/services" />
      </Helmet>
      <Services />
    </main>
  )
}

