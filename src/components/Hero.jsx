import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'

export default function Hero() {
  const containerRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line1Ref.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
      )
      gsap.fromTo(
        line2Ref.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.8 }
      )
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.4 }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(18, 27, 33, 0.92) 0%, rgba(36, 52, 61, 0.85) 50%, rgba(44, 21, 24, 0.9) 100%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 30 L30 55 L5 30 Z' stroke='%23F19A8E' stroke-width='0.3' fill='none' opacity='0.15'/%3E%3Cpath d='M30 15 L45 30 L30 45 L15 30 Z' stroke='%23F19A8E' stroke-width='0.2' fill='none' opacity='0.08'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-primary)]/20 to-[var(--bg-primary)]" />

      {/* Decorative SVG divider at bottom */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-24"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 120 L0 60 Q360 0 720 60 T1440 60 L1440 120 Z"
          fill="var(--bg-primary)"
          opacity="0.95"
        />
      </svg>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
          <span
            ref={line1Ref}
            className="block font-[family-name:var(--font-tajawal)] text-[var(--text-primary)]"
          >
            الإبداع يبدأ من
          </span>
          <span
            ref={line2Ref}
            className="block font-[family-name:var(--font-playfair)] italic text-[var(--accent)] mt-2"
          >
            خط واحد.
          </span>
        </h1>

        <motion.a
          ref={ctaRef}
          href="#store"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 mt-12 bg-[var(--accent)] text-white px-10 py-4 rounded-[1.5rem] text-lg font-semibold hover:shadow-xl hover:shadow-[var(--accent)]/30 transition-all duration-300"
        >
          تسوق الآن
        </motion.a>
      </div>

      {/* Subtle scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-[var(--text-muted)]/50 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
