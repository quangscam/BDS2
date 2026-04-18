import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { FeaturedProjects } from '@/components/featured-projects'
import { NewsSection } from '@/components/news-section'
import { ConsultationForm } from '@/components/consultation-form'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedProjects />
      <NewsSection />
      <ConsultationForm />
      <Footer />
    </main>
  )
}
