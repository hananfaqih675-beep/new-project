import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    text: 'تجربة فريدة! الدفتر وصل بأجمل مما توقعت. التصميم دقيق وذو جودة عالية.',
    author: 'سارة المطيري',
    role: 'فنانة تشكيلية',
  },
  {
    text: 'طلب مخصص تماماً كما تخيلته. فريق Pen Art فهم رؤيتي وحققها ببراعة.',
    author: 'محمد العتيبي',
    role: 'مصمم جرافيك',
  },
  {
    text: 'تتبع الطلب مباشرة كان مميزاً. شاهدت دفترك يُخلق من الصفر.',
    author: 'نورة الحمد',
    role: 'كاتبة',
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)
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
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-[var(--bg-surface)]/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          آراء عملائنا
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.author}
              ref={(el) => (cardsRef.current[i] = el)}
              whileHover={{ y: -5 }}
              className="bg-[var(--bg-primary)] rounded-[2rem] p-8 border border-[var(--text-muted)]/10"
            >
              <Quote className="text-[var(--accent)]/50 mb-4" size={32} />
              <p className="text-[var(--text-primary)] mb-6 leading-relaxed">{t.text}</p>
              <div>
                <p className="font-semibold">{t.author}</p>
                <p className="text-sm text-[var(--text-muted)]">{t.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
