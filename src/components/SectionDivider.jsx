export default function SectionDivider({ fill = 'var(--bg-surface)' }) {
  return (
    <svg className="w-full h-16 -mt-1" viewBox="0 0 1440 64" preserveAspectRatio="none">
      <path
        d="M0 64 L0 20 Q360 0 720 20 T1440 20 L1440 64 Z"
        fill={fill}
      />
    </svg>
  )
}
