import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import DarkVeil from "./DarkVeil";
import Navbar from "./Navbar";
import AnimatedTooltipPreview from "@/components/ui/animated-tooltip-demo";

const HeroSection = () => {
  return (
    <>
      <Navbar />
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Dark Veil Background */}
        <div className="absolute inset-0 z-0">
          <DarkVeil
            hueShift={280}
            noiseIntensity={0.1}
            scanlineIntensity={0.05}
            speed={0.3}
            warpAmount={0.1}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
          <div className="space-y-6">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed whitespace-nowrap">
              "Technology is the campfire around which we tell our stories." - Laurie Anderson
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight whitespace-nowrap">
              Connecting Ideas, Weaving Stories
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore the intricate connections between technology, creativity, and human experience
              through our carefully curated articles and insights.
            </p>

            <div className="pt-6">
              <Button
                size="lg"
                className="bg-white text-black text-lg px-8 py-6 rounded-full"
              >
                Start Reading
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Contributors Section */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground mb-2">Meet our contributors</p>
            <AnimatedTooltipPreview />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
