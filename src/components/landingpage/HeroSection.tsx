
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MacbookPro } from "@/components/ui/macbook-pro";
import Header from "@/components/shared/Header";
import PlanTripButton from "@/components/ui/plan-trip-button";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const laptopScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section
      ref={containerRef}
      className="relative bg-black pt-0 pb-20"
    >
      {/* Geometric Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] via-transparent to-rose-500/[0.02] blur-3xl" />
          
          {/* Large shape - top left area */}
          <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: -3,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: 8,
            }}
            transition={{
                duration: 2.4,
                delay: 0.3,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className="absolute left-[-20%] md:left-[-15%] top-[5%] md:top-[8%]"
          >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width: 800,
                    height: 180,
                }}
                className="relative"
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-500/[0.06] to-transparent backdrop-blur-[2px] border-2 border-white/[0.08] shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
            </motion.div>
          </motion.div>

          {/* Medium shape - top right */}
          <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: -30,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: -18,
            }}
            transition={{
                duration: 2.4,
                delay: 0.5,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className="absolute right-[-15%] md:right-[-10%] top-[12%] md:top-[15%]"
          >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width: 600,
                    height: 140,
                }}
                className="relative"
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/[0.06] to-transparent backdrop-blur-[2px] border-2 border-white/[0.08] shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
            </motion.div>
          </motion.div>

          {/* Large shape - bottom right */}
          <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: -23,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: -12,
            }}
            transition={{
                duration: 2.4,
                delay: 0.4,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className="absolute right-[-20%] md:right-[-15%] bottom-[8%] md:bottom-[12%]"
          >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width: 700,
                    height: 160,
                }}
                className="relative"
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500/[0.06] to-transparent backdrop-blur-[2px] border-2 border-white/[0.08] shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
            </motion.div>
          </motion.div>

          {/* Medium shape - bottom left */}
          <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: 5,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: 15,
            }}
            transition={{
                duration: 2.4,
                delay: 0.6,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className="absolute left-[-10%] md:left-[-5%] bottom-[15%] md:bottom-[18%]"
          >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width: 500,
                    height: 120,
                }}
                className="relative"
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/[0.06] to-transparent backdrop-blur-[2px] border-2 border-white/[0.08] shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
            </motion.div>
          </motion.div>

          {/* Small shape - center left */}
          <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: -40,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: -28,
            }}
            transition={{
                duration: 2.4,
                delay: 0.7,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className="absolute left-[2%] md:left-[5%] top-[45%] md:top-[50%]"
          >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width: 300,
                    height: 80,
                }}
                className="relative"
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/[0.06] to-transparent backdrop-blur-[2px] border-2 border-white/[0.08] shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
            </motion.div>
          </motion.div>

          {/* Small shape - center right */}
          <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: 25,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: 35,
            }}
            transition={{
                duration: 2.4,
                delay: 0.8,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className="absolute right-[5%] md:right-[8%] top-[55%] md:top-[60%]"
          >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width: 250,
                    height: 70,
                }}
                className="relative"
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/[0.06] to-transparent backdrop-blur-[2px] border-2 border-white/[0.08] shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Header theme="dark" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-32 pt-8">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-white mb-4"
          >
            YOUR YOUTUBE CHANNEL,
            <br />
            <span style={{ color: '#ff4d4f' }}>SUPERCHARGED.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Analytics, scheduling, live streaming, monetization & more—powered by AI and YouTube's official APIs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <PlanTripButton />
          </motion.div>
        </div>

        {/* Hero MacBook with Video */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="relative z-10 max-w-6xl mx-auto mt-8 mb-16"
        >
          <motion.div 
            style={{ scale: laptopScale }}
            className="drop-shadow-[0_35px_70px_rgba(255,0,3,0.3)] shadow-[#ff0003]/40"
          >
            <MacbookPro className="w-full h-auto mx-auto">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/images/landingpage/herovideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </MacbookPro>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
