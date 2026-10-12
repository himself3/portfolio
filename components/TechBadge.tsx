import { getTechIcon } from '@/lib/tech-icons'

type TechBadgeProps = {
  name: string
  variant?: 'neu' | 'glass'
  size?: 'sm' | 'md'
}

export default function TechBadge({ name, variant = 'neu', size = 'md' }: TechBadgeProps) {
  const tech = getTechIcon(name)
  const Icon = tech?.icon

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full font-medium text-foreground ${
        variant === 'glass' ? 'glass' : 'neu-raised-sm'
      } ${size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}`}
    >
      {Icon && (
        <Icon
          aria-hidden="true"
          className={size === 'sm' ? 'w-3.5 h-3.5 shrink-0' : 'w-4 h-4 shrink-0'}
          style={{ color: tech.color }}
        />
      )}
      {name}
    </span>
  )
}
