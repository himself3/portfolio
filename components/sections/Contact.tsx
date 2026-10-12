'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react'
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import SectionHeading from '@/components/SectionHeading'

const CONTACT_EMAIL = 'kamugishaali3@gmail.com'

const contactInfo = [
  { icon: Mail, label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { icon: Phone, label: 'Phone', value: '+256 790 956548', href: 'tel:+256790956548' },
  { icon: Phone, label: 'Phone', value: '+256 702 133329', href: 'tel:+256702133329' },
  { icon: MapPin, label: 'Location', value: 'Entebbe, Uganda', href: undefined },
]

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FaXTwitter, href: 'https://twitter.com', label: 'X (Twitter)' },
]

const emptyForm = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formState, setFormState] = useState(emptyForm)
  const [isHandedOff, setIsHandedOff] = useState(false)

  // No backend: hand the composed message to the visitor's mail client so it is
  // actually delivered, rather than pretending to send it.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, email, subject, message } = formState
    const body = `${message.trim()}\n\n— ${name.trim()} (${email.trim()})`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(body)}`
    setIsHandedOff(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    if (isHandedOff) setIsHandedOff(false)
  }

  return (
    <section id="contact" ref={ref} className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Contact"
          title="Get In Touch"
          subtitle="Have a project in mind? Let's work together to bring your ideas to life"
          isInView={isInView}
        />

        <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-3">Let&apos;s Connect</h3>
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your
                vision.
              </p>
            </div>

            <ul className="space-y-5">
              {contactInfo.map((info) => {
                const content = (
                  <>
                    <span className="neu-inset w-12 h-12 shrink-0 rounded-2xl grid place-items-center">
                      <info.icon className="w-5 h-5" strokeWidth={1.75} style={{ color: 'hsl(var(--color-3))' }} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground">{info.label}</span>
                      <span className="block font-semibold text-foreground truncate">{info.value}</span>
                    </span>
                  </>
                )
                return (
                  <li key={info.value}>
                    {info.href ? (
                      <a href={info.href} className="neu-btn focus-ring flex items-center gap-4 p-4 rounded-3xl">
                        {content}
                      </a>
                    ) : (
                      <div className="neu-raised-sm flex items-center gap-4 p-4 rounded-3xl">{content}</div>
                    )}
                  </li>
                )
              })}
            </ul>

            <div>
              <p className="text-muted-foreground mb-4 font-medium">Follow me</p>
              <div className="flex gap-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
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
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="neu-raised rounded-[2rem] p-6 sm:p-8 md:p-10 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2.5 pl-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    className="neu-field"
                    placeholder="Jane Nakato"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2.5 pl-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    maxLength={254}
                    className="neu-field"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2.5 pl-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  maxLength={150}
                  className="neu-field"
                  placeholder="Project inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2.5 pl-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  maxLength={2000}
                  rows={5}
                  className="neu-field resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="btn-primary focus-ring w-full min-h-[56px] rounded-2xl font-semibold flex items-center justify-center gap-2"
              >
                Send Message
                <Send className="w-5 h-5" />
              </button>

              <p
                role="status"
                className={`flex items-center justify-center gap-2 text-sm text-muted-foreground transition-opacity duration-300 ${
                  isHandedOff ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                {isHandedOff ? 'Your email app should open with the message ready to send.' : ' '}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
