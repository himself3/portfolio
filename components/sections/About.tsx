'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Palette, Gauge, Users } from 'lucide-react'
import Image from 'next/image'
import SectionHeading from '@/components/SectionHeading'
import TechBadge from '@/components/TechBadge'

const highlights = [
  { icon: Code2, title: 'Clean Code', description: 'Writing maintainable, scalable solutions' },
  { icon: Palette, title: 'Design Focus', description: 'Pixel-perfect implementations' },
  { icon: Gauge, title: 'Performance', description: 'Optimised for speed and efficiency' },
  { icon: Users, title: 'Collaboration', description: 'Team player and communicator' },
]

const stack = [
  'React',
  'TypeScript',
  'Node.js',
  'Next.js',
  'Tailwind CSS',
  'JavaScript',
  'Three.js',
  'shadcn/ui',
  'Framer Motion',
  'Redux / Zustand',
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="About"
          title="About Me"
          subtitle="Passionate about creating digital experiences that make a difference"
          isInView={isInView}
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            {/* Portrait: extruded frame with the photo pressed into it */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            >
              <div className="neu-raised relative w-full max-w-md mx-auto aspect-square rounded-[2.5rem] p-4 sm:p-5">
                <div className="neu-inset relative w-full h-full rounded-[2rem] p-2">
                  <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden">
                    <Image
                      src="/profile.png"
                      alt="Portrait of Kamugisha Ali"
                      fill
                      sizes="(max-width: 768px) 90vw, 448px"
                      className="object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
                      priority
                    />
                  </div>
                </div>

                <div className="glass absolute -bottom-5 -right-2 sm:-right-6 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <span
                    className="w-10 h-10 rounded-xl grid place-items-center text-sm font-heading font-bold"
                    style={{ background: 'hsl(var(--color-3) / 0.15)', color: 'hsl(var(--color-3))' }}
                  >
                    3+
                  </span>
                  <span className="text-sm leading-tight">
                    <span className="block font-semibold text-foreground">Years building</span>
                    <span className="text-muted-foreground">web &amp; mobile apps</span>
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-heading font-bold text-foreground">Crafting Digital Excellence</h3>

              <div className="space-y-4 text-muted-foreground leading-relaxed max-w-prose">
                <p>
                  Hello! I&apos;m Kamugisha, a full-stack developer based in Entebbe, Uganda with over 3 years of
                  experience building web applications, mobile applications and management systems. I specialise in
                  creating seamless user experiences backed by robust, scalable architectures.
                </p>
                <p>
                  My expertise spans modern JavaScript frameworks, cloud technologies, and everything in between.
                  I&apos;m passionate about writing clean, efficient code and staying current with industry best
                  practices.
                </p>
                <p>
                  Beyond coding, I enjoy listening to different people in all aspects, contributing to open-source
                  projects, and continuously learning new technologies to deliver better solutions.
                </p>
              </div>

              <ul className="flex flex-wrap gap-3 pt-2">
                {stack.map((tech) => (
                  <li key={tech}>
                    <TechBadge name={tech} />
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.08, ease: 'easeOut' }}
                className="neu-raised rounded-3xl p-6 text-center transition-transform duration-300 ease-out hover:-translate-y-1"
              >
                <div className="neu-inset w-16 h-16 mx-auto mb-5 rounded-2xl grid place-items-center">
                  <item.icon className="w-7 h-7" strokeWidth={1.75} style={{ color: 'hsl(var(--color-3))' }} />
                </div>
                <h4 className="font-heading font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
