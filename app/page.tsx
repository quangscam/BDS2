import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { FeaturedProjects } from '@/components/featured-projects'
import { TrustSignals } from '@/components/trust-signals'
import { NewsSection } from '@/components/news-section'
import { ConsultationForm } from '@/components/consultation-form'
import { Footer } from '@/components/footer'
import ZaloButton from '@/components/zalo-button'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedProjects />
      <TrustSignals />
      <NewsSection />
      <ConsultationForm />
      <Footer />
      <ZaloButton />
    </main>
  )
}
