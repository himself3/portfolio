'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Heart, Mail } from 'lucide-react'
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { SiNextdotjs, SiTypescript } from 'react-icons/si'
import { useState, useEffect } from 'react'
import Ambient from '@/components/Ambient'

const quickLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FaXTwitter, href: 'https://twitter.com', label: 'X (Twitter)' },
  { icon: Mail, href: 'mailto:kamugishaali3@gmail.com', label: 'Email' },
]

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative pt-12 pb-8 overflow-hidden">
      <Ambient preset="footer" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="glass rounded-[2rem] p-8 md:p-12">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-2">
              <p className="text-3xl font-heading font-bold text-foreground mb-4">
                Kamugisha <span className="gradient-text">Ali</span>
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Full Stack Developer passionate about creating exceptional digital experiences. Let&apos;s build
                something amazing together.
              </p>

              <div className="flex items-center gap-3 mt-6">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="glass focus-ring w-11 h-11 rounded-xl grid place-items-center text-muted-foreground hover:text-foreground transition-transform duration-150 hover:-translate-y-0.5 active:scale-95"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <nav aria-label="Footer">
              <h3 className="font-heading font-bold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-1">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(link.href)}
                      className="focus-ring rounded-md py-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="font-heading font-bold text-foreground mb-4">Get in Touch</h3>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li>Entebbe, Uganda</li>
                <li>
                  <a href="mailto:kamugishaali3@gmail.com" className="hover:text-foreground transition-colors break-all">
                    kamugishaali3@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+256702133329" className="hover:text-foreground transition-colors">
                    +256 (702) 133-329
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[hsl(var(--glass-edge))] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Kamugisha Ali. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              Built with <Heart className="w-4 h-4 text-rose-500 fill-current" aria-label="love" /> using
              <SiNextdotjs className="w-4 h-4 text-foreground" aria-hidden="true" /> Next.js &amp;
              <SiTypescript className="w-4 h-4" style={{ color: '#3178C6' }} aria-hidden="true" /> TypeScript
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.15, ease: 'easeIn' } }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="neu-btn focus-ring fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-14 h-14 rounded-full grid place-items-center"
            aria-label="Back to top"
          >
            <ArrowUp className="w-6 h-6" style={{ color: 'hsl(var(--color-3))' }} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}
