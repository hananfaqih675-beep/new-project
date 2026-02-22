import { motion } from 'framer-motion'
import { Instagram, Twitter, Linkedin } from 'lucide-react'

const footerLinks = [
  { href: '#hero', label: 'الرئيسية' },
  { href: '#store', label: 'المتجر' },
  { href: '#custom-order', label: 'الطلبات الخاصة' },
  { href: '#contact', label: 'تواصل' },
]

const socialIcons = [
  { icon: Instagram, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Linkedin, href: '#' },
]

export default function Footer() {
  return (
    <footer id="contact" className="relative">
      <svg
        className="absolute top-0 left-0 right-0 w-full h-16 -mt-1"
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
      >
        <path
          d="M0 64 L0 0 Q360 64 720 0 T1440 0 L1440 64 Z"
          fill="var(--bg-surface)"
        />
      </svg>

      <div className="bg-[var(--bg-surface)] rounded-t-[3rem] pt-16 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-right max-w-md">
              <h3 className="font-bold text-2xl mb-2">متجر Pen Art</h3>
              <p className="text-[var(--text-muted)]">
                نصنع دفاتر فنية وتصاميم مخصصة بدقة إبداعية عالية. كل دفتر قطعة فنية فريدة.
              </p>
            </div>

            <nav className="flex gap-8">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex gap-4">
              {socialIcons.map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  className="w-10 h-10 rounded-full bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:scale-105 transition-all"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[var(--text-muted)]/20 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="text-sm text-[var(--text-muted)]">
                النظام يعمل
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              © {new Date().getFullYear()} متجر Pen Art. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
