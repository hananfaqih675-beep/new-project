import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Eye, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

gsap.registerPlugin(ScrollTrigger)

const products = [
  { id: 1, name: 'دفتر الإلهام الفني', price: 89, image: '/assets/products/1.jpg', limited: true },
  { id: 2, name: 'دفتر الخطوط الذهبية', price: 75, image: '/assets/products/2.jpg', limited: false },
  { id: 3, name: 'دفتر الطبيعة المرسومة', price: 95, image: '/assets/products/3.jpg', limited: true },
  { id: 4, name: 'دفتر الإبداع الكلاسيكي', price: 65, image: '/assets/products/4.jpg', limited: false },
]

const placeholderImage = 'data:image/svg+xml,' + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
  <rect fill="#24343D" width="400" height="500" rx="20"/>
  <path d="M100 200 L200 100 L300 200 L200 300 Z" stroke="#F19A8E" stroke-width="2" fill="none" opacity="0.5"/>
  <path d="M150 250 L200 180 L250 250 L200 320 Z" stroke="#F19A8E" stroke-width="1.5" fill="none" opacity="0.3"/>
</svg>`)

function ProductCard({ product, index }) {
  const cardRef = useRef(null)
  const [added, setAdded] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          },
        }
      )
    }, cardRef)
    return () => ctx.revert()
  }, [])

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const imgSrc = product.image

  return (
    <>
      <motion.article
        ref={cardRef}
        whileHover={{ y: -6, transition: { duration: 0.3 } }}
        className="group relative bg-[var(--bg-surface)] rounded-[1.5rem] overflow-hidden"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <motion.img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover rounded-t-[1.5rem]"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            onError={(e) => { e.target.src = placeholderImage }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {product.limited && (
            <span className="absolute top-4 right-4 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full">
              محدود
            </span>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPreviewOpen(true)}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-xl"
          >
            <Eye size={18} /> معاينة سريعة
          </motion.button>
        </div>

        <div className="p-5">
          <h3 className="font-semibold text-lg text-[var(--text-primary)]">{product.name}</h3>
          <p className="text-[var(--accent)] font-bold text-xl mt-1">{product.price} ر.س</p>
          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
              added
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-[var(--accent)] text-white hover:shadow-lg'
            }`}
          >
            {added ? 'تمت الإضافة ✓' : 'أضف للسلة'}
            <ShoppingCart size={18} />
          </motion.button>
        </div>
      </motion.article>

      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setPreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--bg-surface)] rounded-[2rem] max-w-lg w-full overflow-hidden"
            >
              <div className="relative aspect-[4/5]">
                <img
                  src={imgSrc}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = placeholderImage }}
                />
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="absolute top-4 left-4 p-2 rounded-full bg-black/30 hover:bg-black/50"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-[var(--accent)] font-bold text-2xl mt-2">{product.price} ر.س</p>
                <motion.button
                  onClick={() => { addToCart(product); setPreviewOpen(false) }}
                  whileHover={{ scale: 1.02 }}
                  className="mt-4 w-full bg-[var(--accent)] text-white py-4 rounded-xl font-semibold"
                >
                  أضف للسلة
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function FeaturedProducts() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="store" ref={sectionRef} className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-center mb-16">
          المنتجات المميزة
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
