import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-semibold transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:shadow-lg': variant === 'default',
            'glass border border-white/20 hover:bg-white/20': variant === 'outline',
            'hover:bg-white/10': variant === 'ghost',
            'h-10 px-4 py-2': size === 'default',
            'h-9 px-3 text-sm': size === 'sm',
            'h-11 px-8': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
