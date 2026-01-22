'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    title: 'Vortexx Library Management System',
    description: 'Comprehensive library management system with user authentication, book cataloging, borrowing tracking, and administrative controls. Powered by VORTEXX technology.',
    image: '/projects/library-system.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: true,
  },
  {
    title: 'TEXX Wifi Management System',
    description: 'Real-time wifi hotspot management system with revenue tracking, voucher management, device monitoring, and comprehensive analytics for network administrators.',
    image: '/projects/wifi-system.png',
    tags: ['React', 'TypeScript', 'Node.js', 'Chart.js'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: true,
  },
  {
    title: 'Vortexx Tech Company Website',
    description: 'Modern corporate website for a full-service technology company. Features innovative design, service showcases, and client engagement tools for transforming ideas into digital reality.',
    image: '/projects/vortexx-website.png',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com',
    demo: 'https://thevortexx.com',
    featured: true,
  },
  {
    title: 'Chanse Clinic Website',
    description: 'A CHRIST Centered Clinic providing exceptional health care services with online appointment booking and patient portal.',
    image: '/projects/website.jpg',
    tags: ['React', 'Firebase', 'Material-UI', 'WebSocket'],
    github: 'https://github.com',
    demo: 'https://chansepc.com',
  },
  {
    title: 'Hospital Management System',
    description: 'Complete hospital management solution with patient records, appointment scheduling, billing, and staff management features.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [showAll, setShowAll] = useState(false)

  const displayedProjects = showAll ? projects : projects.slice(0, 3)

  return (
    <section id="projects" ref={ref} className="relative py-24 md:py-32 bg-accent/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 gradient-text">
            Featured Projects
          </h2>
          <div className="section-divider mb-6" style={{ backgroundColor: 'hsl(var(--color-3))' }} />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of projects that showcase my skills and experience
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="card card-hover overflow-hidden h-full flex flex-col gradient-border">
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-accent">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: 'hsl(var(--color-1) / 0.3)' }}
                  />
                  
                  {/* Overlay Links */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-background rounded-lg shadow-lg pulse-glow"
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-background rounded-lg shadow-lg pulse-glow"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:gradient-text transition-all">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium gradient-border rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {!showAll && projects.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAll(true)}
              className="px-8 py-4 rounded-lg font-semibold relative overflow-hidden group text-white"
              style={{
                backgroundColor: 'hsl(var(--color-3))'
              }}
            >
              <span className="relative z-10">View All Projects</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
