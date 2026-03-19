import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children: ReactNode
}

const variantStyles = {
  primary: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold',
  secondary: 'bg-white border border-[#E8E8E8] text-[#1A1A1A] font-medium',
  ghost: 'bg-transparent text-[#6B6B6B] font-medium',
}

const sizeStyles = {
  sm: 'h-9 px-4 text-sm rounded-xl',
  md: 'h-12 px-5 text-sm rounded-xl',
  lg: 'h-14 px-6 text-base rounded-2xl',
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2 leading-none',
        'active:opacity-70 transition-opacity duration-100',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
