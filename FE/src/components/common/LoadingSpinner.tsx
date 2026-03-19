interface LoadingSpinnerProps {
  size?: number
  color?: string
}

export function LoadingSpinner({ size = 24, color = '#3B82F6' }: LoadingSpinnerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeOpacity="0.2"
        strokeWidth="2.5"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
