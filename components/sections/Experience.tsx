'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, GraduationCap, CalendarDays, MapPin, CheckCircle2 } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'

const experiences = [
  {
    type: 'work',
    title: 'Full Stack Developer',
    company: 'GIX Agency',
    location: 'Kampala, Uganda',
    period: '2026 - Present',
    description: 'Building websites and web platforms for the agency and its clients using Next.js, React, TypeScript, and Tailwind CSS.',
    achievements: [
      'Built and launched the GIX Agency website (gixagency.com)',
      'Built the GIX Media Agency website (gixmedia.co)',
    ],
  },
  {
    type: 'work',
    title: 'Senior Full Stack Developer',
    company: 'Vortexx',
    location: 'Entebbe, Uganda',
    period: '2023 - Present',
    description: 'Leading development of enterprise web applications using React, Next.js, and Node.js. Learning more from senior developers and architecting scalable solutions.',
    achievements: [
      'Reduced application load time by 60% through optimization',
      'Led team of 5 developers on major product redesign',
      'Implemented CI/CD pipeline reducing deployment time by 80%',
    ],
  },
  {
    type: 'work',
    title: 'Full Stack Developer',
    company: 'Vortexx',
    location: 'Entebbe, Uganda',
    period: '2024 - Present',
    description: 'Developed and maintained multiple client projects using modern web technologies. Collaborated with designers and product managers.',
    achievements: [
      'Built 15+ production-ready web applications',
      'Improved code quality with comprehensive testing',
      'Contributed to open-source projects',
    ],
  },
  {
    type: 'work',
    title: 'Andabye',
    company: 'Systems',
    location: 'Kampala, Uganda',
    period: '2023 - Present',
    description: 'Created responsive user interfaces and implemented interactive features for various web applications.',
    achievements: [
      'Developed reusable component library',
      'Improved accessibility compliance to WCAG 2.1',
    ],
  },
  {
    type: 'education',
    title: 'Diploma in Software Engineering',
    company: 'Sai Pali Institute of Technology and Management',
    location: 'Entebbe, Uganda',
    period: '2024 - 2026',
    description: 'Focused on software engineering, algorithms, web development, mobile application development and management systems development. Graduated with honors.',
    achievements: [
      'GPA: 4.9/5.0',
      "Dean's List all semesters",
      'One of the best',
    ],
  },
  {
    type: 'work',
    title: 'Full Stack Developer',
    company: 'Gix Agency',
    location: 'Lungujja, Uganda',
    period: '2026',
    description: 'Created responsive user interfaces and implemented interactive features for various web applications.',
    achievements: [
      'Built 10+ production-ready web applications',
      'Improved code quality with comprehensive testing',
      'Contributed to open-source projects',
    ],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" ref={ref} className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Journey"
          title="Experience & Education"
          subtitle="My professional journey and academic background"
          isInView={isInView}
        />

        <ol className="relative max-w-4xl mx-auto space-y-10 md:pl-24">
          {/* Pressed-in timeline rail */}
          <span aria-hidden="true" className="neu-inset-sm hidden md:block absolute left-[2.15rem] top-4 bottom-4 w-2 rounded-full" />

          {experiences.map((exp, index) => {
            const Icon = exp.type === 'work' ? Briefcase : GraduationCap
            return (
              <motion.li
                key={`${exp.title}-${exp.period}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
                className="relative"
              >
                <span
                  aria-hidden="true"
                  className="neu-raised-sm hidden md:grid absolute -left-24 top-6 w-[4.75rem] h-[4.75rem] rounded-full place-items-center"
                >
                  <span className="neu-inset w-14 h-14 rounded-full grid place-items-center">
                    <Icon className="w-6 h-6" strokeWidth={1.75} style={{ color: 'hsl(var(--color-3))' }} />
                  </span>
                </span>

                <article className="neu-raised rounded-[2rem] p-6 md:p-8 transition-transform duration-300 ease-out hover:-translate-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <span className="neu-inset md:hidden w-12 h-12 shrink-0 rounded-2xl grid place-items-center">
                        <Icon className="w-5 h-5" strokeWidth={1.75} style={{ color: 'hsl(var(--color-3))' }} />
                      </span>
                      <div>
                        <h3 className="text-xl font-heading font-bold text-foreground mb-1">{exp.title}</h3>
                        <p className="font-semibold text-muted-foreground">{exp.company}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 shrink-0">
                      <span className="neu-inset-sm inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-1 text-xs text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-5 leading-relaxed">{exp.description}</p>

                  <ul className="space-y-2.5">
                    {exp.achievements.map((achievement) => (
                      <li key={achievement} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: 'hsl(var(--color-3))' }}
                          aria-hidden="true"
                        />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
