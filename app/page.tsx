import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { FeaturedProjects } from '@/components/featured-projects'
import { WhyChooseUs } from '@/components/why-choose-us'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedProjects />
      <WhyChooseUs />
      <CTASection />
      <Footer />
    </main>
  )
}
