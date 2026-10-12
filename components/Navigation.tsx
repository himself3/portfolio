'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Moon, Sun, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from './theme-provider'

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })
  const isDark = theme === 'dark'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navItems.map((item) => item.href.substring(1))
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 120 && rect.bottom >= 120
      })
      if (current) setActiveSection(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock page scroll and allow Escape to close while the mobile sheet is open.
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMobileMenuOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 inset-x-0 z-50 px-4 pt-4"
      >
        <nav
          aria-label="Primary"
          className={`container mx-auto flex items-center justify-between rounded-2xl px-3 py-2.5 transition-all duration-300 ${
            isScrolled ? 'glass' : 'border border-transparent'
          }`}
        >
          <button
            type="button"
            onClick={() => scrollToSection('#hero')}
            aria-label="Kamugisha Ali, back to top"
            className="neu-btn focus-ring w-12 h-12 rounded-full p-1"
          >
            <span className="relative block w-full h-full rounded-full overflow-hidden">
              <Image src="/avatar.jpg" alt="" fill sizes="48px" className="object-cover" priority />
            </span>
          </button>

          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = activeSection === item.href.substring(1)
              return (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.href)}
                    aria-current={active ? 'true' : undefined}
                    className={`focus-ring relative px-4 py-2 min-h-[44px] text-sm font-medium rounded-xl transition-colors ${
                      active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                        className="absolute inset-0 rounded-xl neu-inset-sm"
                      />
                    )}
                    <span className="relative">{item.name}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="neu-btn focus-ring w-11 h-11 rounded-xl grid place-items-center text-foreground"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.span>
              </AnimatePresence>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((o) => !o)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="md:hidden neu-btn focus-ring w-11 h-11 rounded-xl grid place-items-center text-foreground"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 md:hidden glass !rounded-none !border-0"
          >
            <ul className="flex flex-col items-stretch justify-center h-full gap-4 px-8">
              {navItems.map((item, index) => {
                const active = activeSection === item.href.substring(1)
                return (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.05, duration: 0.3, ease: 'easeOut' }}
                  >
                    <button
                      type="button"
                      onClick={() => scrollToSection(item.href)}
                      aria-current={active ? 'true' : undefined}
                      className={`focus-ring w-full py-4 rounded-2xl text-xl font-heading font-semibold ${
                        active ? 'neu-inset text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {item.name}
                    </button>
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden="true"
        className="fixed top-0 inset-x-0 h-1 origin-left z-[60]"
        style={{ scaleX: progress, background: 'hsl(var(--color-3))' }}
      />
    </>
  )
}
