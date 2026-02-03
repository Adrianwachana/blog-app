import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router"; 
import heroIllustration from "@/assets/hero-illustration.jpeg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-28">
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            
            {/* Welcome badge */}
            <span className="animate-fade-up inline-flex items-center gap-2 px-5 py-2.5 rounded-full
              bg-orange-100/80 backdrop-blur-md
              text-orange-600 text-sm font-semibold
              mb-8 border border-orange-200
              shadow-sm shadow-orange-200/40">
              <Sparkles className="h-4 w-4 animate-pulse" />
              Welcome to the journey
            </span>
            
            {/* Hero heading */}
            <h1 className="animate-fade-up-delay-1 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] mb-6 tracking-tight">
              <span className="text-muted-foreground">Welcome to my</span>{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-orange-600">
                  little world of stories
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8C50 2 150 2 198 8"
                    stroke="hsl(var(--orange))"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </span>
            </h1>
            
            {/* Subtext */}
            <p className="animate-fade-up-delay-2 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Hey there! Let's dive into some travel stories, social highs and lows, 
              and a bit of everything in between. Ready to explore together?{" "}
              <span className="font-medium text-foreground">Vamos!</span>
            </p>
            
            {/* CTA buttons */}
            <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              
              {/* View all posts */}
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden
                  bg-orange-500 text-white
                  shadow-lg shadow-orange-500/40
                  transition-all duration-300
                  hover:bg-orange-600 hover:shadow-orange-500/60
                  hover:-translate-y-0.5"
              >
                <Link to="/blogs" className="flex items-center gap-2">
                  View all posts
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </Button>

              {/* About me */}
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group border-orange-200 text-orange-600
                  backdrop-blur-sm
                  transition-all duration-300
                  hover:bg-orange-50 hover:border-orange-300
                  hover:text-orange-700
                  hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-200/40"
              >
                <Link to="/about" className="flex items-center gap-2">
                  About me
                  <span className="opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    ✨
                  </span>
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Illustration */}
          <div className="animate-fade-up-delay-2 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative group animate-float">
              
              <div className="absolute -top-12 -right-12 w-56 h-56 bg-orange-400/30 blur-3xl animate-pulse-soft" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-orange-200 blur-3xl animate-pulse-soft" />
              <div className="absolute top-1/3 -right-8 w-32 h-32 bg-mustard/25 blur-2xl" />
              
              <div
                className="absolute -inset-10 opacity-[0.08] rounded-[2rem]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, hsl(var(--orange)) 2px, transparent 2px)',
                  backgroundSize: '18px 18px',
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 via-orange-200/20 to-mustard/15 rounded-[2rem] blur-3xl scale-110" />
              <div className="absolute -inset-3 rounded-[1.5rem] bg-gradient-to-br from-orange-200/20 via-orange-100/10 to-transparent backdrop-blur-sm border border-orange-200/40" />
              
              <img 
                src={heroIllustration} 
                alt="Creative flat lay" 
                className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg rounded-2xl
                  shadow-2xl shadow-orange-400/30
                  transition-all duration-500
                  group-hover:shadow-orange-500/40 group-hover:scale-[1.02]
                  object-cover ring-1 ring-orange-200/30"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// tests