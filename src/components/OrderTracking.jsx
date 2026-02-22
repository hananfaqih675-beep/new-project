import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Pencil, Palette, Box, Truck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const phases = [
  { icon: Pencil, label: 'مرحلة الرسم', color: '#F19A8E' },
  { icon: Palette, label: 'مرحلة التلوين', color: '#E87A6D' },
  { icon: Box, label: 'الإنتاج', color: '#2C5E72' },
  { icon: Truck, label: 'التوصيل', color: '#24343D' },
]

export default function OrderTracking() {
  const sectionRef = useRef(null)
  const progressRef = useRef(null)
  const [activePhase, setActivePhase] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          onUpdate: (self) => {
            const phase = Math.min(3, Math.floor(self.progress * 4))
            setActivePhase(phase)
          },
        },
      })

      tl.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          تتبع طلبك مباشرة
        </motion.h2>

        <div className="relative">
          <div className="flex justify-between mb-8">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col items-center transition-all duration-300 ${
                  i <= activePhase ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-2 transition-all ${
                    i <= activePhase ? 'bg-[var(--accent)]/30' : 'bg-[var(--bg-surface)]'
                  }`}
                >
                  <phase.icon size={28} className="text-[var(--accent)]" />
                </div>
                <span className="text-sm font-medium text-center">{phase.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="h-2 bg-[var(--bg-surface)] rounded-full overflow-hidden">
            <motion.div
              ref={progressRef}
              className="h-full bg-[var(--accent)] rounded-full origin-left"
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[var(--text-muted)] mt-8 max-w-xl mx-auto"
        >
          تابع رحلة دفترك من الإلهام حتى وصوله إليك
        </motion.p>
      </div>
    </section>
  )
}
