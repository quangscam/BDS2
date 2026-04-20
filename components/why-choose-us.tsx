export function WhyChooseUs() {
  const features = [
    {
      icon: '🏗️',
      title: 'Expert Curation',
      description: 'Handpicked properties selected by industry experts with decades of experience',
    },
    {
      icon: '📊',
      title: 'Investment Focus',
      description: 'Data-driven insights to guide your investment decisions with confidence',
    },
    {
      icon: '🌱',
      title: 'Sustainable Design',
      description: 'Developments built with environmental responsibility and modern amenities',
    },
    {
      icon: '🎯',
      title: 'Transparent Pricing',
      description: 'Clear pricing structure with no hidden costs or surprise fees',
    },
  ]

  return (
    <section id="practice" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Choose Artifact</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            We&apos;re committed to helping you find the perfect property that matches your vision and investment goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-background p-8 rounded-lg border border-border hover:border-primary/30 transition-colors">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-primary/5 border border-primary/20 rounded-lg p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-foreground/70">Properties Listed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">2K+</div>
              <p className="text-foreground/70">Happy Clients</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <p className="text-foreground/70">Years Experience</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">$5B+</div>
              <p className="text-foreground/70">Transaction Value</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
