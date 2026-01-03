# ☕ Coffee Shop - Next.js Project

A modern, fully responsive coffee shop website built with Next. JS 16, React 19, TypeScript, Tailwind CSS, and Framer Motion animations.

![Coffee Shop Project](https://github.com/Ismail2830/coffee-shop/blob/master/public/images/hero-section.png)

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Features](#pages--features)
- [Components](#components)
- [Getting Started](#getting-started)
- [Deployment](#deployment)

---

## 🎯 Overview

This is a complete coffee shop website featuring an elegant design with smooth animations, interactive menu system, product catalog, and more. The project demonstrates modern web development practices with a focus on user experience and visual appeal.

## 🛠 Tech Stack

### Core Technologies
- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12.23.26** - Animation library

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **@tailwindcss/postcss** - Tailwind PostCSS plugin

---

## 📁 Project Structure

```
coffee-shop/
├── app/
│   ├── components/          # Reusable React components
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── CoffeeHeavenSection.tsx
│   │   ├── JeansCoffeeSection.tsx
│   │   ├── BestSellingSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── NewsletterSection.tsx
│   │   └── Footer.tsx
│   ├── about/              # About page
│   ├── menu/               # Menu pages with dynamic routes
│   │   └── [id]/          # Dynamic product details
│   ├── products/           # Products catalog
│   ├── specials/           # Special offers page
│   ├── hours/              # Opening hours page
│   ├── page.tsx            # Homepage
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Global styles
│   └── favicon.ico
├── public/
│   ├── images/             # Product and content images
│   └── without-bg.png      # Logo
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.ts
```

---

## 🌐 Pages & Features

### 🏠 Homepage (`app/page.tsx`)
The main landing page featuring:
- **Navigation Bar** - Responsive navbar with links to all pages
- **Hero Section** - Eye-catching banner with call-to-action
- **Coffee Heaven Section** - Showcasing the coffee experience
- **Jeans Coffee Section** - Brand story and values
- **Best Selling Products** - Featured menu items
- **Testimonials** - Customer reviews and feedback
- **Newsletter Signup** - Email subscription form
- **Footer** - Contact information and links

![Homepage Example](https://raw.githubusercontent.com/Ismail2830/coffee-shop/master/public/images/american-heritage-chocolate-DoK5qEy2L60-unsplash.jpg)

---

### 📖 Menu Page (`app/menu/page.tsx`)
Interactive menu system with:
- **Category Filters** - Coffee ☕, Food 🍰, Drinks 🥤, Desserts 🍮
- **Product Cards** - Name, price, and description for each item
- **Click-through Navigation** - Links to detailed product pages
- **Smooth Animations** - Framer Motion page transitions

**Menu Categories:**
- Coffee (Espresso, Cappuccino, Latte, Americano, Mocha, Macchiato)
- Food (Croissant, Bagel, Avocado Toast, Breakfast Sandwich, Quiche, Muffin)
- Drinks (Fresh Juice, Iced Tea, Smoothies, Hot Chocolate, Frappe)
- Desserts (Cakes, Cookies, Brownies, Pastries)

![Menu Items](https://raw.githubusercontent.com/Ismail2830/coffee-shop/master/public/images/menu.png)

---

### 🔍 Product Details Page (`app/menu/[id]/page.tsx`)
Dynamic route for individual menu items:
- **Large Product Image** - High-quality food photography
- **Detailed Description** - Full product information
- **Pricing** - Clear price display in DH (Dirham)
- **Customization Options** - Size, extras, special requests
- **Add to Cart** - Shopping functionality (UI ready)
- **Related Products** - Suggestions for similar items

![Product Detail](https://raw.githubusercontent.com/Ismail2830/coffee-shop/master/public/images/product-detail.png)


---

### 🎉 Specials Page (`app/specials/page.tsx`)
Limited-time offers and promotions: 
- **Featured Deals** - Rotating special offers
- **Seasonal Items** - Holiday and seasonal menu items
- **Countdown Timers** - Time-limited promotions
- **Dynamic Product Display** - Auto-rotating specials from full product catalog

![Special Offers](https://raw.githubusercontent.com/Ismail2830/coffee-shop/master/public/images/special.png)

---

### 🕐 Opening Hours Page (`app/hours/page.tsx`)
Business hours information:
- **Weekly Schedule** - Breakfast and lunch service times
- **Visual Calendar** - Easy-to-read schedule display
- **Holiday Hours** - Special scheduling information

**Standard Hours:**
- **Monday-Friday:** Breakfast 7:00 AM - 11:00 AM, Lunch 12:00 PM - 3:00 PM
- **Saturday-Sunday:** Breakfast 8:00 AM - 12:00 PM, Lunch 1:00 PM - 4:00 PM

---

### 👥 About Page (`app/about/page.tsx`)
Company story and team: 
- **Brand Story** - "Brewing Excellence Since 2005"
- **Core Values:**
  - ☕ Quality First - Finest beans, perfect roasting
  - ❤️ Made With Love - Crafted with passion
  - 🌱 Sustainability - Ethical sourcing practices
  - 👥 Community - Welcoming space for all
- **Team Section** - Meet the coffee experts
  - Ismail - Founder & Head Roaster
  - Sarah - Master Barista
  - Michael - Coffee Sommelier
  - Emma - Pastry Chef

![About Team](https://raw.githubusercontent.com/Ismail2830/coffee-shop/master/public/images/about.png)

---

## 🧩 Components

### Navigation (`components/Navbar.tsx`)
- Responsive mobile menu
- Smooth scroll behavior
- Active link highlighting
- Logo integration

### Hero Section (`components/HeroSection.tsx`)
- Full-screen hero banner
- Animated text and buttons
- Background image optimization

### Coffee Heaven Section (`components/CoffeeHeavenSection. tsx`)
- Feature showcase
- Image gallery integration
- Parallax effects

### Best Selling Section (`components/BestSellingSection.tsx`)
- Product carousel
- Featured items display
- Quick view functionality

### Testimonials Section (`components/TestimonialsSection.tsx`)
- Customer reviews slider
- Star ratings
- Avatar images

### Newsletter Section (`components/NewsletterSection.tsx`)
- Email subscription form
- Form validation
- Success/error messaging

### Footer (`components/Footer.tsx`)
- Contact information
- Social media links
- Quick navigation
- Copyright information

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Ismail2830/coffee-shop.git
cd coffee-shop
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. **Open your browser**
Navigate to [http://localhost:3000]([http://localhost:3000](https://coffee-shop-seven-alpha.vercel.app/)) to see the application.

### Development

- **Edit pages** - Modify files in `app/` directory
- **Add components** - Create new components in `app/components/`
- **Update styles** - Edit `app/globals.css` or use Tailwind classes
- **Add images** - Place images in `public/images/` directory
- **Hot reload** - Changes are automatically reflected in the browser

---

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deploy on Vercel

The easiest way to deploy this Next.js app:

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure the build settings
4. Deploy!  🚀

[Learn more about Next.js deployment](https://nextjs.org/docs/app/building-your-application/deploying)

### Other Deployment Options
- **Netlify** - `npm run build` → Deploy `out/` folder
- **AWS Amplify** - Connect GitHub repository
- **Docker** - Use included Dockerfile (if available)
- **Self-hosted** - Run `npm run start` on your server

---

## 🖼️ Image Credits

All product images are from [Unsplash](https://unsplash.com) - sourced from talented photographers worldwide.

Sample images include works from:
- Jeremy Yap, Joe Hepburn, Nicolas Horn, Nathan Dumlao
- Kobby Mendez, James Harris, Patrick Tomasso
- And many other talented photographers

---

## 📝 License

This project is for educational purposes.  Feel free to use it as a template for your own coffee shop or restaurant website.

---

## 👨‍💻 Author

**Ismail** - [GitHub Profile](https://github.com/Ismail2830)

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment tools
- Unsplash photographers for beautiful imagery
- Open source community for tools and inspiration

---

**Need help?** Check out: 
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [React Documentation](https://react.dev)

---

Made with ☕ and ❤️
