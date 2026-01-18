import { Link } from "react-router"; // Import Link for navigation
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroIllustration from "@/assets/hero-illustration.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-28">
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <span className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-8 border border-orange-200">
              <Sparkles className="h-4 w-4" />
              Welcome to the journey
            </span>

            <h1 className="animate-fade-up-delay-1 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
              Welcome to my{" "}
              <span className="relative inline-block text-orange-600">
                Blog
                <span className="absolute -bottom-2 left-0 w-full h-[4px] bg-orange-400 rounded-full" />
              </span>
            </h1>

            <p className="animate-fade-up-delay-2 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Hey there! Let’s dive into travel stories, social highs and lows,
              and everything in between. Ready to explore together?{" "}
              <span className="font-medium text-foreground">Vamos!</span>
            </p>

            {/* Buttons */}
            <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* Navigate to Blogs */}
              <Button
                asChild
                size="lg"
                className="group bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/40 transition-all"
              >
                <Link to="/blogs">
                  View all posts
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              {/* Navigate to About Page */}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white transition-all"
              >
                <Link to="/about">About me</Link>
              </Button>
            </div>
          </div>

          {/* Illustration Section */}
          <div className="animate-fade-up-delay-2 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative animate-float-bounce">
              <div className="absolute inset-0 bg-orange-400/25 blur-3xl rounded-3xl scale-90" />
              <img
                src={heroIllustration}
                alt="Hero illustration"
                className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl opacity-90 drop-shadow-2xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export { Hero };