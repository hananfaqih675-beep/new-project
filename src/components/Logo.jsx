import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const SVG_LOGO = (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="shrink-0">
    <path
      data-draw
      d="M12 36 L12 12 L24 8 L36 12 L36 36 L12 36 Z"
      stroke="#F19A8E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      data-draw
      d="M16 28 L24 16 L32 28"
      stroke="#F19A8E"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      data-draw
      d="M20 24 L28 24"
      stroke="#F19A8E"
      strokeWidth="1"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
)

export default function Logo({ className = '' }) {
  const logoRef = useRef(null)
  const [useImage, setUseImage] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = '/assets/logo.png'
    img.onload = () => setUseImage(true)
    img.onerror = () => setUseImage(false)
  }, [])

  useEffect(() => {
    if (useImage) return

    const paths = logoRef.current?.querySelectorAll('path[data-draw]')
    if (!paths?.length) return

    const ctx = gsap.context(() => {
      gsap.set(paths, { strokeDasharray: '1000', strokeDashoffset: '1000' })
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 1.8,
        stagger: 0.12,
        ease: 'power3.inOut',
        delay: 0.3,
      })
    }, logoRef)

    return () => ctx.revert()
  }, [useImage])

  if (useImage) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src="/assets/logo.png"
          alt="متجر Pen Art"
          className="w-12 h-12 object-contain"
        />
      </div>
    )
  }

  return (
    <div ref={logoRef} className={className}>
      {SVG_LOGO}
    </div>
  )
}
