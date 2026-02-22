# متجر Pen Art — Cinematic E-Commerce Experience

تجربة تسوق فنية سينمائية لدفاتر فنية وتصاميم مخصصة.

## التشغيل

```bash
npm install
npm run dev
```

## رفع المشروع على GitHub

```bash
git init
git add .
git commit -m "Initial commit: Pen Art Store"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

استبدل `YOUR_USERNAME` باسم مستخدمك و `YOUR_REPO` باسم المستودع.

## البنية

- **الصفحة الرئيسية**: Hero، المنتجات، الطلبات الخاصة، تتبع الطلبات، المميزات، البروتوكول الإبداعي، الشهادات، CTA
- **التصميم**: Dark mode افتراضي، RTL، خطوط Tajawal و Playfair Display
- **الرسوم المتحركة**: GSAP + ScrollTrigger، Framer Motion

## الأصول

أضف الشعار والصور في:
- `/public/assets/logo.png` — شعار المتجر
- `/public/assets/products/1.jpg`, `2.jpg`, ... — صور المنتجات

الصور المفقودة ستُستبدل بتصاميم بديلة تلقائياً.
