export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
          Ready to Find Your Perfect Property?
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-12 leading-relaxed">
          Connect with our expert team to schedule a private showing or get personalized investment recommendations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary-foreground text-primary px-10 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity">
            Schedule Consultation
          </button>
          <button className="border-2 border-primary-foreground text-primary-foreground px-10 py-4 rounded-lg text-lg font-semibold hover:bg-primary-foreground/10 transition-colors">
            Download Brochure
          </button>
        </div>
      </div>
    </section>
  )
}
