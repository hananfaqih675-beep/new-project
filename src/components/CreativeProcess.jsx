import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Brush, Gift } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { num: 1, icon: Sparkles, title: 'الإلهام', desc: 'نستلهم من رؤيتك وأفكارك' },
  { num: 2, icon: Brush, title: 'الإبداع الفني', desc: 'نحول الأفكار إلى تصاميم فريدة' },
  { num: 3, icon: Gift, title: 'تجربة التسليم', desc: 'دفترك الجاهز بين يديك' },
]

export default function CreativeProcess() {
  const containerRef = useRef(null)
  const stickyRef = useRef(null)
  const stepsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=2000',
        pin: stickyRef.current,
        scrub: 1,
      })

      stepsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top+=${i * 600} top`,
              end: `top+=${(i + 1) * 600} top`,
              scrub: 1,
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative" style={{ minHeight: '2200px' }}>
      <div ref={stickyRef} className="sticky top-0 min-h-screen flex items-center bg-[var(--bg-primary)]">
        <div className="w-full py-24 px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">
            بروتوكول العمل الإبداعي
          </h2>

          <div className="relative max-w-2xl mx-auto">
            {steps.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => (stepsRef.current[i] = el)}
                className="flex items-center gap-8 py-12 first:pt-0 opacity-0"
              >
                <div className="w-20 h-20 rounded-[1.5rem] bg-[var(--accent)]/20 flex items-center justify-center shrink-0">
                  <step.icon className="text-[var(--accent)]" size={36} />
                </div>
                <div>
                  <span className="text-[var(--accent)] font-bold text-sm">
                    الخطوة {step.num}
                  </span>
                  <h3 className="text-2xl font-bold mt-1">{step.title}</h3>
                  <p className="text-[var(--text-muted)] mt-2">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
