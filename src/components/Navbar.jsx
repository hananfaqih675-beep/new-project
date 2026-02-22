import { useEffect, useRef, useState } from 'react'
import { ShoppingCart, Menu, Sun, Moon } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'

const navLinks = [
  { href: '#hero', label: 'الرئيسية' },
  { href: '#store', label: 'المتجر' },
  { href: '#custom-order', label: 'الطلبات الخاصة' },
  { href: '#contact', label: 'تواصل' },
]

export default function Navbar({ theme, onThemeToggle }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { cartCount } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--bg-surface)]/95 backdrop-blur-xl shadow-lg rounded-b-[2rem] mx-4 mt-0 py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2" aria-label="متجر Pen Art">
          <Logo />
          <span className="font-bold text-xl text-[var(--text-primary)] hidden sm:block">
            متجر Pen Art
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-300 font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.a
            href="#store"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative flex items-center gap-2 bg-[var(--accent)] text-white px-5 py-2.5 rounded-[1rem] font-semibold hover:shadow-lg hover:shadow-[var(--accent)]/25 transition-shadow"
          >
            تسوق الآن
            <ShoppingCart size={18} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.a>

          <motion.button
            onClick={onThemeToggle}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="hidden sm:flex w-10 h-10 rounded-full border border-[var(--text-muted)]/30 hover:border-[var(--accent)] transition-colors items-center justify-center"
            aria-label="تبديل السمة"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
            aria-label="القائمة"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6 pt-0 border-t border-[var(--text-muted)]/20">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[var(--text-muted)] hover:text-[var(--accent)] py-2"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
