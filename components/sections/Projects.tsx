'use client'

import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown, Star } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import Image from 'next/image'
import Ambient from '@/components/Ambient'
import SectionHeading from '@/components/SectionHeading'
import TechBadge from '@/components/TechBadge'

type ProjectImage = {
  src: string
  /** Shown on the image switcher when a project has more than one screenshot. */
  label: string
}

type Project = {
  title: string
  description: string
  images: [ProjectImage, ...ProjectImage[]]
  tags: string[]
  github: string
  demo: string
  /** Optional link to the product itself, shown as a second button beside "Live site". */
  app?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    title: 'GIX Agency',
    description: 'Full-service digital agency website offering branding, web development, and marketing solutions to help businesses grow their online presence.',
    images: [{ src: '/projects/gixagency.png', label: 'Screenshot' }],
    tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com',
    demo: 'https://gixagency.com',
  },
  {
    title: 'VorxxPOS',
    description: 'Point-of-sale system built in Uganda, for Uganda: keeps selling offline, files EFRIS invoices with URA, and takes MTN and Airtel mobile money. Covers multi-branch inventory, sales, returns and refunds, shift cash-ups, and reports.',
    images: [
      { src: '/projects/vorxxpos-website.png', label: 'Website' },
      { src: '/projects/vorxxpos-app.png', label: 'App' },
    ],
    tags: ['POS', 'Offline-first', 'EFRIS', 'Mobile Money', 'Multi-branch'],
    github: 'https://github.com',
    demo: 'https://vorxxpos.com',
    app: 'https://app.vorxxpos.com',
  },
  {
    title: 'GIX Media Agency Website',
    description: 'Professional media agency website showcasing creative services, portfolio, and client solutions with modern design and engaging user experience.',
    images: [{ src: '/projects/gixmedia-website.png', label: 'Screenshot' }],
    tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com',
    demo: 'https://gixmedia.co',
  },
  {
    title: 'SocialMaze Platform',
    description: 'Social media management and analytics platform designed to help businesses navigate and optimize their social media presence.',
    images: [{ src: '/projects/socialmaze-website.png', label: 'Screenshot' }],
    tags: ['Next.js', 'Postgres', 'TypeScript', 'Node.js', 'Analytics'],
    github: 'https://github.com',
    demo: 'https://socialmaze.co',
  },
  {
    title: 'Viewix Management System',
    description: 'Comprehensive digital signage management system application supporting various screens, data visualization, and administrative controls.',
    images: [
      { src: '/projects/viewix-website.png', label: 'Website' },
      { src: '/projects/viewix-system.png', label: 'Dashboard' },
    ],
    tags: ['Next.js', 'MySQL', 'TypeScript', 'Dashboard', 'Analytics'],
    github: 'https://github.com',
    demo: 'https://viewix.co',
    app: 'https://app.viewix.co',
  },
  {
    title: 'Preacher Holdings',
    description: 'Corporate holdings company website showcasing investment portfolio, business ventures, and strategic partnerships with professional design.',
    images: [{ src: '/projects/preacherholdings.png', label: 'Screenshot' }],
    tags: ['Next.js', 'Tailwind CSS', 'Corporate'],
    github: 'https://github.com',
    demo: 'https://preacherholdings.com',
  },
  {
    title: 'Preacher University',
    description: 'Educational platform providing online courses, resources, and training programs with interactive learning features and student management.',
    images: [{ src: '/projects/preacheruniversity.png', label: 'Screenshot' }],
    tags: ['Next.js', 'TypeScript', 'Education', 'LMS'],
    github: 'https://github.com',
    demo: 'https://preacheruniversity.com',
  },
  {
    title: 'Vortexx Library Management System',
    description: 'Comprehensive library management system with user authentication, book cataloging, borrowing tracking, and administrative controls. Powered by VORTEXX technology.',
    images: [{ src: '/projects/library-system.png', label: 'Screenshot' }],
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com',
    demo: 'https://lib-system.netlify.app/',
    featured: true,
  },
  {
    title: 'Vortexx Tech Company Website',
    description: 'Modern corporate website for a full-service technology company. Features innovative design, service showcases, and client engagement tools for transforming ideas into digital reality.',
    images: [{ src: '/projects/vortexx-website.png', label: 'Screenshot' }],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com',
    demo: 'https://thevortexx.com',
    featured: true,
  },
  {
    title: 'E-Commerce Mobile Application',
    description: 'Complete e-commerce mobile application.',
    images: [{ src: '/projects/chintown.png', label: 'Screenshot' }],
    tags: ['React Native', 'React', 'PostgreSQL', 'TypeScript'],
    github: 'https://github.com',
    demo: 'https://china-town-13b4e617.base44.app',
  },
  {
    title: 'Chanse Clinic Website',
    description: 'A CHRIST Centered Clinic providing exceptional health care services with online appointment booking and patient portal.',
    images: [{ src: '/projects/website.jpg', label: 'Screenshot' }],
    tags: ['React', 'Firebase', 'Material UI', 'Tailwind CSS'],
    github: 'https://github.com',
    demo: 'https://chansepc.com',
  },
  {
    title: 'TEXX Wifi Management System',
    description: 'Real-time wifi hotspot management system with revenue tracking, voucher management, device monitoring, and comprehensive analytics for network administrators.',
    images: [{ src: '/projects/wifi-system.png', label: 'Screenshot' }],
    tags: ['React', 'TypeScript', 'Node.js', 'Chart.js', 'Laravel'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: true,
  },
]

const INITIAL_COUNT = 3

/** Card screenshot area. Projects with several screenshots get a frosted switcher;
 *  every image stays mounted so switching is an instant crossfade, not a fresh load. */
function ProjectMedia({ project }: { project: Project }) {
  const [active, setActive] = useState(0)
  const hasGallery = project.images.length > 1

  return (
    <div className="relative aspect-[16/10] rounded-[1.25rem] overflow-hidden">
      {project.images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={hasGallery ? `${project.title}: ${img.label}` : `Screenshot of ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          aria-hidden={i !== active}
          className={`object-cover object-top transition-[opacity,transform] duration-500 ease-out group-hover:scale-105 ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {project.featured && (
        <span className="glass absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-foreground">
          <Star className="w-3.5 h-3.5 fill-current" style={{ color: 'hsl(var(--color-3))' }} />
          Featured
        </span>
      )}

      {hasGallery && (
        <div
          role="group"
          aria-label={`${project.title} screenshots`}
          className="absolute bottom-3 right-3 flex gap-1 rounded-full p-1 border border-[hsl(var(--glass-edge))] bg-[hsl(var(--background)/0.82)] backdrop-blur-md shadow-lg"
        >
          {project.images.map((img, i) => {
            const selected = i === active
            return (
              <button
                key={img.src}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={selected}
                className={`focus-ring relative min-h-[44px] px-4 rounded-full text-xs font-semibold transition-colors ${
                  selected ? 'text-primary-foreground' : 'text-foreground/75 hover:text-foreground'
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId={`gallery-pill-${project.title}`}
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    className="absolute inset-0 rounded-full bg-[hsl(var(--color-1))] shadow-sm"
                  />
                )}
                <span className="relative">{img.label}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [showAll, setShowAll] = useState(false)

  const displayedProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT)

  return (
    <section id="projects" ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      <Ambient preset="projects" />

      <div className="relative z-10 container mx-auto px-4">
        <SectionHeading
          eyebrow="Selected work"
          title="Featured Projects"
          subtitle="A selection of projects that showcase my skills and experience"
          isInView={isInView}
        />

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          <AnimatePresence initial={false}>
            {displayedProjects.map((project, index) => (
              <motion.li
                key={project.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, y: 10, transition: { duration: 0.15, ease: 'easeIn' } }}
                transition={{ duration: 0.45, delay: (index % INITIAL_COUNT) * 0.08, ease: 'easeOut' }}
              >
                <article className="glass glass-hover group h-full rounded-[1.75rem] p-3 flex flex-col">
                  <ProjectMedia project={project} />

                  <div className="px-3 pt-5 pb-3 flex-1 flex flex-col">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-5 line-clamp-3 flex-1">{project.description}</p>

                    <ul className="flex flex-wrap gap-2 mb-5" aria-label="Technologies">
                      {project.tags.map((tag) => (
                        <li key={tag}>
                          <TechBadge name={tag} variant="glass" size="sm" />
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-3">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary focus-ring flex-1 min-h-[44px] rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2"
                      >
                        Live site
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                      {project.app && (
                        <a
                          href={project.app}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open the ${project.title} app`}
                          className="glass focus-ring min-h-[44px] px-4 rounded-xl text-sm font-semibold text-foreground inline-flex items-center justify-center gap-2 transition-transform duration-150 hover:-translate-y-0.5 active:scale-95"
                        >
                          Open app
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} source code on GitHub`}
                        className="glass focus-ring w-11 h-11 rounded-xl grid place-items-center text-foreground transition-transform duration-150 hover:-translate-y-0.5 active:scale-95"
                      >
                        <FaGithub className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {projects.length > INITIAL_COUNT && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <button
              type="button"
              onClick={() => {
                if (showAll) document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                setShowAll((v) => !v)
              }}
              aria-expanded={showAll}
              className="neu-btn focus-ring min-h-[52px] px-8 rounded-2xl font-semibold text-foreground inline-flex items-center gap-2"
            >
              {showAll ? 'Show fewer projects' : `View all ${projects.length} projects`}
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                style={{ color: 'hsl(var(--color-3))' }}
              />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
