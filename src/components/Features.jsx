import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Award, PenTool, Radio } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Award,
    title: 'تصاميم احترافية',
    desc: 'كل قطعة مصنوعة بدقة فنية عالية',
  },
  {
    icon: PenTool,
    title: 'طلبات مخصصة',
    desc: 'احصل على تصميمك الفريد حسب رغبتك',
  },
  {
    icon: Radio,
    title: 'تتبع مباشر',
    desc: 'شاهد عملية إنشاء طلبك لحظة بلحظة',
  },
]

export default function Features() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-24 px-6 bg-[var(--bg-surface)]/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          لماذا متجر Pen Art؟
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              ref={(el) => (cardsRef.current[i] = el)}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-[var(--bg-primary)] rounded-[2rem] p-8 shadow-xl border border-[var(--text-muted)]/10"
            >
              <div className="w-14 h-14 rounded-[1rem] bg-[var(--accent)]/20 flex items-center justify-center mb-6">
                <feature.icon className="text-[var(--accent)]" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-[var(--text-muted)]">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
