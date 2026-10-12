'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download, MapPin } from 'lucide-react'
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import Ambient from '@/components/Ambient'
import { getTechIcon } from '@/lib/tech-icons'

const roles = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast']

const stats = [
  { value: '3+', label: 'Years experience' },
  { value: '25+', label: 'Projects shipped' },
  { value: '20+', label: 'Happy clients' },
  { value: '20+', label: 'Technologies' },
]

const coreStack = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL']

const socials = [
  { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FaXTwitter, href: 'https://twitter.com', label: 'X (Twitter)' },
]

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const interval = setInterval(() => setCurrentRole((prev) => (prev + 1) % roles.length), 3000)
    return () => clearInterval(interval)
  }, [reduceMotion])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
      <Ambient preset="hero" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          {/* Left: introduction */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <span className="neu-inset-sm inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-muted-foreground mb-8">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-60 animate-ping motion-reduce:hidden" />
                  <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
                </span>
                Available for new projects
              </span>

              <p className="text-muted-foreground text-lg mb-2">Hello, I&apos;m</p>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold tracking-tight text-foreground mb-4">
                Kamugisha <span className="gradient-text">Ali</span>
              </h1>
              <div className="h-12 md:h-14 flex items-center overflow-hidden" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentRole}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18, transition: { duration: 0.2, ease: 'easeIn' } }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="text-2xl md:text-3xl leading-normal font-heading font-medium"
                    style={{ color: 'hsl(var(--color-3))' }}
                  >
                    {roles[currentRole]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
              className="text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              I craft exceptional digital experiences that combine beautiful design with powerful functionality,
              specialising in modern web technologies and user-centric solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-wrap gap-4"
            >
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="btn-primary focus-ring group min-h-[52px] px-7 rounded-2xl font-semibold flex items-center gap-2"
              >
                Get In Touch
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <a
                href="/resume.pdf"
                download="Kamugisha-Ali-CV.pdf"
                className="neu-btn focus-ring min-h-[52px] px-7 rounded-2xl font-semibold flex items-center gap-2 text-foreground"
              >
                <Download className="w-5 h-5" style={{ color: 'hsl(var(--color-3))' }} />
                Download CV
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex items-center gap-4 pt-2"
            >
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="neu-btn focus-ring w-12 h-12 rounded-full grid place-items-center text-muted-foreground hover:text-foreground"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right: frosted profile card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <div className="glass rounded-[2rem] p-6 sm:p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1">Currently</p>
                  <p className="font-heading font-semibold text-foreground">Building at GixAgency</p>
                </div>
                <span className="glass rounded-full px-3 py-1.5 text-xs text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Entebbe, UG
                </span>
              </div>

              <dl className="grid grid-cols-2 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.45 + index * 0.08, ease: 'easeOut' }}
                    className="glass glass-hover rounded-2xl p-5"
                  >
                    <dd className="text-3xl sm:text-4xl font-heading font-bold gradient-text tabular-nums">{stat.value}</dd>
                    <dt className="text-sm text-muted-foreground mt-1">{stat.label}</dt>
                  </motion.div>
                ))}
              </dl>

              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">Core stack</p>
              <ul className="flex flex-wrap gap-3">
                {coreStack.map((name) => {
                  const tech = getTechIcon(name)
                  if (!tech) return null
                  const Icon = tech.icon
                  return (
                    <li key={name}>
                      <span
                        title={name}
                        className="glass glass-hover w-12 h-12 rounded-2xl grid place-items-center text-foreground"
                      >
                        <Icon aria-hidden="true" className="w-6 h-6" style={{ color: tech.color }} />
                        <span className="sr-only">{name}</span>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollTo('about')}
        aria-label="Scroll to About section"
        className="focus-ring hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 text-muted-foreground rounded-xl"
      >
        <span className="text-xs font-medium tracking-wide">Scroll to explore</span>
        <span className="neu-inset w-7 h-11 rounded-full flex justify-center pt-2">
          <motion.span
            animate={reduceMotion ? undefined : { y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: 3, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'hsl(var(--color-3))' }}
          />
        </span>
      </button>
    </section>
  )
}
