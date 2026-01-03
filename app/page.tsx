import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CoffeeHeavenSection from './components/CoffeeHeavenSection';
import JeansCoffeeSection from './components/JeansCoffeeSection';
import BestSellingSection from './components/BestSellingSection';
import TestimonialsSection from './components/TestimonialsSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

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