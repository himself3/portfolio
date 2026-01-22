'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  Code2, Database, Cloud, Wrench, Smartphone, Globe
} from 'lucide-react'

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
      { name: 'php', level: 95},
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
      { name: 'GraphQL', level:80 },
    ],
  },
  {
    name: 'DevOps',
    icon: Cloud,
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'AWS', level: 80 },
      { name: 'Git/Github', level: 90 },
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
      { name: 'Claude ai/Claude code', level:98 },
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

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section id="skills" ref={ref} className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 gradient-text">
            Skills & Expertise
          </h2>
          <div className="section-divider mb-6" style={{ backgroundColor: 'hsl(var(--color-2))' }} />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {skillCategories.map((category, index) => (
            <motion.button
              key={category.name}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCategory(index)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeCategory === index
                  ? 'text-white shadow-lg'
                  : 'bg-accent border border-border hover:border-foreground/30'
              }`}
              style={activeCategory === index ? {
                backgroundColor: index % 3 === 0 ? 'hsl(var(--color-1))' : index % 3 === 1 ? 'hsl(var(--color-2))' : 'hsl(var(--color-3))'
              } : {}}
            >
              <category.icon className="w-5 h-5" />
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="card p-8 md:p-12">
            <div className="space-y-8">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-foreground">{skill.name}</span>
                    <span className="text-sm font-medium gradient-text">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-accent rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: activeCategory % 3 === 0 ? 'hsl(var(--color-1))' : activeCategory % 3 === 1 ? 'hsl(var(--color-2))' : 'hsl(var(--color-3))'
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-center text-xl font-heading font-bold gradient-text mb-8">
            Also Experienced With
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              'HTML5', 'CSS3', 'Sass', 'Webpack', 'Vite', 'Jest',
              'Cypress', 'Storybook', 'Redux', 'Zustand', 'TanStack Query', 'Socket.io'
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -4 }}
                className="px-4 py-2 rounded-lg text-sm font-medium gradient-border shimmer cursor-pointer"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
