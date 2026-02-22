import { motion } from 'framer-motion'

export default function ConversionCTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(135deg, var(--accent) 0%, transparent 50%, var(--bg-surface) 100%)`,
        }}
      />
      <div className="absolute inset-0 bg-[var(--bg-surface)]/40" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
          <span className="font-[family-name:var(--font-playfair)] italic text-[var(--accent)]">
            دفتر واحد
          </span>
          <br />
          <span>قد يغير يومك بالكامل.</span>
        </h2>
        <p className="text-[var(--text-muted)] text-lg mb-10">
          ابدأ رحلتك الإبداعية اليوم
        </p>
        <motion.a
          href="#store"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 bg-[var(--accent)] text-white px-12 py-5 rounded-[1.5rem] text-xl font-semibold hover:shadow-2xl hover:shadow-[var(--accent)]/30 transition-all"
        >
          تسوق الآن
        </motion.a>
      </motion.div>
    </section>
  )
}
