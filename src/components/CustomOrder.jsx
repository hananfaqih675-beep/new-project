import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Lightbulb, Palette, Package } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { icon: Lightbulb, title: 'اختر فكرتك', desc: 'شاركنا أفكارك ورؤيتك الفنية' },
  { icon: Palette, title: 'نصمم لك', desc: 'فريقنا يحول أفكارك إلى تصاميم احترافية' },
  { icon: Package, title: 'تستلم', desc: 'دفترك الفريد بين يديك' },
]

export default function CustomOrder() {
  const sectionRef = useRef(null)
  const pathRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        )
      })

      if (pathRef.current) {
        gsap.set(pathRef.current, { strokeDasharray: 500, strokeDashoffset: 500 })
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="custom-order" ref={sectionRef} className="py-24 px-6 bg-[var(--bg-surface)]/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-20"
        >
          تجربة الطلبات المخصصة
        </motion.h2>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
          <svg
            className="absolute inset-0 w-full h-full hidden md:block pointer-events-none"
          >
            <path
              ref={pathRef}
              d="M 10% 50 Q 30% 30, 50% 50 T 90% 50"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="500"
              opacity="0.5"
            />
          </svg>

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              ref={(el) => (cardsRef.current[i] = el)}
              whileHover={{ scale: 1.03, y: -5 }}
              className="relative z-10 flex flex-col items-center text-center max-w-xs"
            >
              <div className="w-20 h-20 rounded-[1.5rem] bg-[var(--accent)]/20 flex items-center justify-center mb-4">
                <step.icon className="text-[var(--accent)]" size={36} />
              </div>
              <h3 className="font-bold text-xl mb-2">{step.title}</h3>
              <p className="text-[var(--text-muted)]">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="#contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
          className="mt-16 mx-auto block w-fit bg-[var(--accent)] text-white px-8 py-4 rounded-[1.5rem] font-semibold"
        >
          اطلب تصميمك المخصص
        </motion.a>
      </div>
    </section>
  )
}
