import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SectionDivider from './components/SectionDivider'
import FeaturedProducts from './components/FeaturedProducts'
import CustomOrder from './components/CustomOrder'
import OrderTracking from './components/OrderTracking'
import Features from './components/Features'
import CreativeProcess from './components/CreativeProcess'
import Testimonials from './components/Testimonials'
import ConversionCTA from './components/ConversionCTA'
import Footer from './components/Footer'
import { CartProvider } from './context/CartContext'

function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <CartProvider>
      <div className="noise-overlay min-h-screen">
        <Navbar theme={theme} onThemeToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />
        <main>
          <Hero />
          <FeaturedProducts />
          <SectionDivider fill="var(--bg-surface)" />
          <CustomOrder />
          <OrderTracking />
          <Features />
          <CreativeProcess />
          <Testimonials />
          <SectionDivider fill="var(--bg-primary)" />
          <ConversionCTA />
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
