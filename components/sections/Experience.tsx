'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react'

const experiences = [
  {
    type: 'work',
    title: 'Senior Full Stack Developer',
    company: 'Vortexx.',
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
    period: '2024 - present',
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
    period: '2023 - present',
    description: 'Created responsive user interfaces and implemented interactive features for various web applications.',
    achievements: [
      'Developed reusable component library',
      'Improved accessibility compliance to WCAG 2.1',
    ],
  },
  {
    type: 'education',
    title: 'Diploma In Softwae Engineering',
    company: 'Sai Pali Institute of Technology and Management',
    location: 'Entebbe, Uganda',
    period: '2024 - 2026',
    description: 'Focused on software engineering, algorithms, web development, mobile application development and management Systems Development. Graduated with honors.',
    achievements: [
      'GPA: 4.9/5.0',
      'Dean\'s List all semesters',
      'One of the best',
    ],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" ref={ref} className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 gradient-text">
            Experience & Education
          </h2>
          <div className="section-divider mb-6" style={{ backgroundColor: 'hsl(var(--color-3))' }} />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional journey and academic background
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="card card-hover p-6 md:p-8 gradient-border">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white"
                        style={{
                          backgroundColor: index % 3 === 0 ? 'hsl(var(--color-1))' : index % 3 === 1 ? 'hsl(var(--color-2))' : 'hsl(var(--color-3))'
                        }}
                      >
                        {exp.type === 'work' ? (
                          <Briefcase className="w-7 h-7" />
                        ) : (
                          <GraduationCap className="w-7 h-7" />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-lg font-semibold text-muted-foreground">{exp.company}</p>
                        </div>
                        <div className="flex flex-col md:items-end gap-1 mt-2 md:mt-0">
                          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-foreground mt-1.5 flex-shrink-0">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
