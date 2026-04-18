'use client'

import { useState } from 'react'
import Image from 'next/image'

const projects = [
  {
    id: 1,
    name: 'The Meridian Towers',
    location: 'Downtown District',
    price: '$2.5M - $8.5M',
    image: '/project-1.jpg',
    description: 'Luxury residential towers with panoramic city views',
    units: '256 units',
    completion: '2025',
  },
  {
    id: 2,
    name: 'Riverside Gardens',
    location: 'Waterfront Area',
    price: '$1.8M - $6.2M',
    image: '/project-2.jpg',
    description: 'Serene waterfront community with contemporary architecture',
    units: '180 units',
    completion: '2026',
  },
  {
    id: 3,
    name: 'Urban Oasis',
    location: 'Central Park Adjacent',
    price: '$3.2M - $12.5M',
    image: '/project-3.jpg',
    description: 'Premium residential complex with integrated wellness facilities',
    units: '142 units',
    completion: '2024',
  },
  {
    id: 4,
    name: 'Skyline Heights',
    location: 'Business District',
    price: '$2.1M - $9.8M',
    image: '/project-4.jpg',
    description: 'Modern luxury apartments with smart home technology',
    units: '198 units',
    completion: '2025',
  },
]

export function FeaturedProjects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Featured Projects</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Handpicked developments that combine architectural excellence with investment potential
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-80 bg-muted rounded-lg overflow-hidden mb-6">
                {/* Image Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary/40 mb-2">
                      {project.name.substring(0, 1)}
                    </div>
                    <p className="text-foreground/40">{project.location}</p>
                  </div>
                </div>
                
                {/* Overlay on hover */}
                <div
                  className={`absolute inset-0 bg-primary/20 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredId === project.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                    View Gallery
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground">{project.name}</h3>
                <p className="text-foreground/60">{project.location}</p>
                
                <div className="flex items-center justify-between text-sm text-foreground/70">
                  <span>{project.units}</span>
                  <span>Completion {project.completion}</span>
                </div>

                <p className="text-foreground/80 leading-relaxed">{project.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xl font-bold text-primary">{project.price}</span>
                  <button className="text-primary hover:text-primary/80 font-semibold transition-colors">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="border-2 border-primary text-primary px-10 py-4 rounded-lg text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  )
}
