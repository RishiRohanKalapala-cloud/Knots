import HeroSection from "@/components/HeroSection";
import FeaturedArticles from "@/components/FeaturedArticles";
import InfiniteMovingCardsDemo from "@/components/ui/infinite-moving-cards-demo";
import AppleCardsCarouselDemo from "@/components/ui/apple-cards-carousel-demo";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturedArticles />
      <InfiniteMovingCardsDemo />
      <AppleCardsCarouselDemo />
      <Footer />
    </div>
  );
};

export default Index;
