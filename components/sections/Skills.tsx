'use client'

import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef, useState, type KeyboardEvent } from 'react'
import { Code2, Database, Cloud, Wrench, Smartphone, Globe } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import TechBadge from '@/components/TechBadge'
import { getTechIcon } from '@/lib/tech-icons'

const skillCategories = [
  {
    name: 'Frontend',
    icon: Globe,
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'Framer', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'JavaScript', level: 94 },
    ],
  },
  {
    name: 'Backend',
    icon: Code2,
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'PHP', level: 95 },
      { name: 'Express', level: 88 },
      { name: 'GraphQL', level: 82 },
      { name: 'REST APIs', level: 93 },
    ],
  },
  {
    name: 'Database',
    icon: Database,
    skills: [
      { name: 'PostgreSQL', level: 87 },
      { name: 'MongoDB', level: 90 },
      { name: 'Supabase', level: 80 },
      { name: 'Redis', level: 80 },
      { name: 'Prisma', level: 85 },
      { name: 'MySQL', level: 85 },
    ],
  },
  {
    name: 'DevOps',
    icon: Cloud,
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'AWS', level: 80 },
      { name: 'Git/GitHub', level: 90 },
      { name: 'Vercel', level: 92 },
      { name: 'CI/CD', level: 83 },
      { name: 'Jest', level: 80 },
    ],
  },
  {
    name: 'Tools',
    icon: Wrench,
    skills: [
      { name: 'Git', level: 93 },
      { name: 'VS Code', level: 95 },
      { name: 'Figma', level: 88 },
      { name: 'Postman', level: 90 },
      { name: 'Base44', level: 90 },
      { name: 'Claude / Claude Code', level: 98 },
      { name: 'Gemini', level: 97 },
      { name: 'CodeFlying', level: 79 },
    ],
  },
  {
    name: 'Mobile',
    icon: Smartphone,
    skills: [
      { name: 'React Native', level: 82 },
      { name: 'Expo', level: 85 },
      { name: 'PWA', level: 88 },
      { name: 'Flutter', level: 80 },
    ],
  },
]

const alsoExperienced = [
  'HTML5', 'CSS3', 'Sass', 'Webpack', 'Vite', 'Jest',
  'Cypress', 'Storybook', 'Redux', 'Zustand', 'TanStack Query', 'Socket.io',
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const category = skillCategories[activeCategory]

  // WAI-ARIA tabs: arrow keys move focus and selection.
  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (index + (e.key === 'ArrowRight' ? 1 : -1) + skillCategories.length) % skillCategories.length
    setActiveCategory(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="skills" ref={ref} className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Toolkit"
          title="Skills & Expertise"
          subtitle="Technologies and tools I work with to bring ideas to life"
          isInView={isInView}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          className="flex justify-center mb-12"
        >
          <div
            role="tablist"
            aria-label="Skill categories"
            className="neu-inset rounded-3xl p-2 flex flex-wrap justify-center gap-1 max-w-full"
          >
            {skillCategories.map((cat, index) => {
              const selected = activeCategory === index
              return (
                <button
                  key={cat.name}
                  ref={(el) => {
                    tabRefs.current[index] = el
                  }}
                  id={`skills-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="skills-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveCategory(index)}
                  onKeyDown={(e) => onTabKeyDown(e, index)}
                  className={`focus-ring relative flex items-center gap-2 min-h-[44px] px-5 rounded-2xl text-sm font-semibold transition-colors ${
                    selected ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="skills-pill"
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                      className="neu-raised-sm absolute inset-0 rounded-2xl"
                    />
                  )}
                  <cat.icon
                    className="relative w-4 h-4"
                    style={selected ? { color: 'hsl(var(--color-3))' } : undefined}
                  />
                  <span className="relative">{cat.name}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeCategory}
              id="skills-panel"
              role="tabpanel"
              aria-labelledby={`skills-tab-${activeCategory}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.15, ease: 'easeIn' } }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="neu-raised rounded-[2rem] p-6 sm:p-8 md:p-10"
            >
              <ul className="grid md:grid-cols-2 gap-x-10 gap-y-7">
                {category.skills.map((skill, index) => {
                  const tech = getTechIcon(skill.name)
                  const Icon = tech?.icon
                  return (
                    <li key={skill.name} className="flex items-center gap-4">
                      <span className="neu-inset w-12 h-12 shrink-0 rounded-2xl grid place-items-center text-foreground">
                        {Icon ? (
                          <Icon aria-hidden="true" className="w-6 h-6" style={{ color: tech.color }} />
                        ) : (
                          <category.icon aria-hidden="true" className="w-5 h-5" />
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-2.5 gap-3">
                          <span className="font-semibold text-foreground truncate">{skill.name}</span>
                          <span className="text-sm font-semibold tabular-nums gradient-text">{skill.level}%</span>
                        </div>
                        <div
                          className="neu-inset-sm h-2.5 rounded-full p-0.5"
                          role="progressbar"
                          aria-label={`${skill.name} proficiency`}
                          aria-valuenow={skill.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 0.8, delay: 0.1 + index * 0.06, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{
                              background: 'linear-gradient(90deg, hsl(var(--color-1)), hsl(var(--color-3)))',
                              boxShadow: '0 0 10px hsl(var(--color-3) / 0.4)',
                            }}
                          />
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          className="mt-16"
        >
          <h3 className="text-center text-xl font-heading font-bold text-foreground mb-8">Also Experienced With</h3>
          <ul className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {alsoExperienced.map((tech) => (
              <li key={tech} className="transition-transform duration-200 ease-out hover:-translate-y-0.5">
                <TechBadge name={tech} />
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
