export function Hero() {
  return (
    <section className="min-h-[600px] flex items-center justify-center bg-gradient-to-br from-background via-background to-muted py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 text-primary text-sm font-medium tracking-widest uppercase">
          Contemporary Architectural Developments
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
          Discover Your Dream Property
        </h1>
        <p className="text-xl text-foreground/70 mb-12 leading-relaxed max-w-2xl mx-auto">
          Explore curated residential developments with contemporary design, sustainable living, and investment potential.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity">
            Explore Projects
          </button>
          <button className="border-2 border-primary text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/10 transition-colors">
            Schedule Tour
          </button>
        </div>
      </div>
    </section>
  )
}
