import dynamic from 'next/dynamic';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';

// Lazy load heavy components
const CoffeeHeavenSection = dynamic(() => import('./components/CoffeeHeavenSection'), {
  loading: () => <div className="h-96 bg-[#e8dcc8]"></div>
});

const JeansCoffeeSection = dynamic(() => import('./components/JeansCoffeeSection'), {
  loading: () => <div className="h-96 bg-[#e8dcc8]"></div>
});

const BestSellingSection = dynamic(() => import('./components/BestSellingSection'), {
  loading: () => <div className="h-96 bg-[#c9a981]"></div>
});

const TestimonialsSection = dynamic(() => import('./components/TestimonialsSection'), {
  loading: () => <div className="h-96 bg-[#e8dcc8]"></div>
});

const NewsletterSection = dynamic(() => import('./components/NewsletterSection'), {
  loading: () => <div className="h-64 bg-[#c9a981]"></div>
});

export default function Home() {
  return (
    <>
    <div className="min-h-screen bg-[#e8dcc8]">
      <Navbar />
      <main>
        <HeroSection />
        <CoffeeHeavenSection />
        <JeansCoffeeSection />
        <BestSellingSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
    </>
  );
}