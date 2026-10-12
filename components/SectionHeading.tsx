'use client'

import { motion } from 'framer-motion'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  subtitle: string
  isInView: boolean
}

export default function SectionHeading({ eyebrow, title, subtitle, isInView }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative z-10 text-center mb-16"
    >
      <span className="eyebrow neu-inset-sm mb-6">{eyebrow}</span>
      <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground mb-5">{title}</h2>
      <div className="section-divider mb-6" />
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>
    </motion.div>
  )
}
