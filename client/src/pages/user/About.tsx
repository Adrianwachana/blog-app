/**
 * @copyright 2026 Adrianwachana
 * @license Apache-2.0
 */

import { motion } from "motion/react";
import { Heart, Sparkles, Coffee, BookOpen, Pen, Camera } from "lucide-react";

// Note: Header/Footer removed because they are provided by RootLayout
import ButterflyLogo from "@/components/ButterflyLogo";

export const About = () => {
  const passions = [
    {
      icon: BookOpen,
      title: "Avid Reader",
      description:
        "Always lost in a good book—fiction, self-help, or anything that sparks curiosity.",
    },
    {
      icon: Pen,
      title: "Storyteller",
      description:
        "I believe everyone has a story worth telling, and I love sharing mine.",
    },
    {
      icon: Camera,
      title: "Life Observer",
      description:
        "Finding beauty in everyday moments and turning them into words.",
    },
  ];

  const funFacts = [
    { emoji: "☕", fact: "Powered by coffee" },
    { emoji: "🌅", fact: "Morning person" },
    { emoji: "🎵", fact: "Write with music on" },
    { emoji: "🐱", fact: "Cat parent" },
  ];

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/10 rounded-full blur-[100px] animate-pulse" />
          </div>

          <div className="container px-4">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8"
              >
                <ButterflyLogo size="lg" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold tracking-tight mb-8"
              >
                Hey, I'm the Voice Behind{" "}
                <span className="text-orange-600 underline decoration-orange-200 underline-offset-8">
                  Bearbubbles
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-muted-foreground leading-relaxed"
              >
                Welcome to my little corner of the internet where I share
                thoughts, stories, and everything in between. Grab a cup of
                coffee and stay a while! ☕
              </motion.p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-muted/30 border-y border-border/50">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 text-orange-600">
                  <Heart className="w-5 h-5 fill-current" />
                  <span className="text-sm font-bold uppercase tracking-widest">
                    My Story
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold">
                  Why I Started This Blog
                </h2>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="italic">
                    I've always been a word-magpie tending wildflower journals —
                    tucking moonlit balcony whispers, starlit observations, and
                    rooftop-dancing questions into pages that overflowed like
                    untamed gardens and well-loved paperbacks.
                  </p>

                  <p>
                    Then one silver night, those pages conspired. They rustled
                    from the garden:{" "}
                    <span className="text-coral font-medium">
                      "Let us bloom where others can wander."
                    </span>{" "}
                    They murmured from the balcony:{" "}
                    <span className="text-coral font-medium">
                      "Share us with the night owls."
                    </span>{" "}
                    They fluttered from the bookshelves:{" "}
                    <span className="text-coral font-medium">
                      "Put us on display for fellow seekers."
                    </span>
                  </p>

                  <p>
                    So here we are. This glowing digital meadow where wildflower
                    words finally stretch toward sunlight, inviting night owls,
                    garden wanderers, and book-dreamers to gather. Pull up a
                    moonlit cushion. The conversation's just beginning. ✨🌿📚
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative p-10 rounded-[2.5rem] bg-background border border-border shadow-xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-bl-[5rem] -z-0" />

                <h3 className="relative font-bold text-2xl mb-8 text-center">
                  Fun Facts About Me
                </h3>

                <div className="relative grid grid-cols-2 gap-4">
                  {funFacts.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center p-6 rounded-2xl bg-muted/50 border border-transparent hover:border-orange-200 transition-all group"
                    >
                      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                        {item.emoji}
                      </div>
                      <div className="text-sm font-medium text-muted-foreground text-center">
                        {item.fact}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Passions Section */}
        <section className="py-24">
          <div className="container px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-2 text-orange-600 mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest">
                  What Drives Me
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold">My Passions</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {passions.map((passion, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="p-8 rounded-3xl bg-background border border-border/60 shadow-sm hover:shadow-xl hover:border-orange-500/20 transition-all duration-300"
                >
                  <div className="w-14 h-14 mb-6 rounded-2xl bg-orange-50 flex items-center justify-center">
                    <passion.icon className="w-7 h-7 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    {passion.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {passion.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Expectation Section */}
        <section className="py-24 bg-orange-50/30">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 text-orange-600 mb-6">
                <Coffee className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest text-foreground">
                  What to Expect
                </span>
              </div>

              <h2 className="text-4xl font-bold mb-8 leading-tight">
                Here You'll Find...
              </h2>

              <p className="text-xl text-muted-foreground leading-relaxed mb-10 italic">
                Personal essays, life lessons, travel reflections, and honest
                reflections on navigating this beautiful, messy thing called
                life. I write about what moves me, and I hope it resonates with
                you too.
              </p>

              <div className="h-px w-24 bg-orange-300 mx-auto mb-10" />

              <p className="text-2xl font-medium text-foreground">
                Thanks for being here. It means more than you know. 💜
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
