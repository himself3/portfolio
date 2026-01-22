'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Palette, Zap, Users, Award, Target } from 'lucide-react'
import Image from 'next/image'

const highlights = [
  { icon: Code2, title: 'Clean Code', description: 'Writing maintainable, scalable solutions' },
  { icon: Palette, title: 'Design Focus', description: 'Pixel-perfect implementations' },
  { icon: Zap, title: 'Performance', description: 'Optimized for speed and efficiency' },
  { icon: Users, title: 'Collaboration', description: 'Team player and communicator' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32 bg-accent/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 gradient-text">
            About Me
          </h2>
          <div className="section-divider mb-6" style={{ backgroundColor: 'hsl(var(--color-1))' }} />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate about creating digital experiences that make a difference
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-foreground/5 rounded-2xl transform rotate-6" />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-border"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop"
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-heading font-bold text-foreground">
                Crafting Digital Excellence
              </h3>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Hello! I'm Kamugisha, a full-stack developer based in Entebbe, Uganda with over 3 years of experience
                  building web applications, mobile applications and management systems. I specialize in creating seamless user experiences backed by robust,
                  scalable architectures.
                </p>
                
                <p>
                  My expertise spans modern JavaScript frameworks, cloud technologies, and everything in between.
                  I'm passionate about writing clean, efficient code and staying current with industry best practices.
                </p>
                
                <p>
                  Beyond coding, I enjoy listening to different people in all aspects, contributing to open-source projects, and
                  continuously learning new technologies to deliver better solutions.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-lg text-sm font-medium gradient-border shimmer"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="card card-hover p-6 text-center gradient-border float-animation"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center text-white"
                  style={{
                    backgroundColor: index % 3 === 0 ? 'hsl(var(--color-1))' : index % 3 === 1 ? 'hsl(var(--color-2))' : 'hsl(var(--color-3))'
                  }}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
