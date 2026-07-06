import { Helmet } from 'react-helmet-async'
import Portfolio from '../components/Portfolio'

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-cream ">
      <Helmet>
        <title>Our Portfolio | Featured Web & AI Automation Projects | Zalvro</title>
        <meta name="description" content="Browse featured web development and AI automation projects by Zalvro. See how we help small businesses and clinics optimize their operations." />
        <link rel="canonical" href="https://zalvrohq.com/projects" />
        <meta property="og:url" content="https://zalvrohq.com/projects" />
      </Helmet>
      <Portfolio />
    </main>
  )
}

