
import { WorldMap } from "@/components/ui/world-map";
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
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
          
          <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: -3,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: 12,
            }}
            transition={{
                duration: 2.4,
                delay: 0.3,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className="absolute left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
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
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/[0.15] to-transparent backdrop-blur-[2px] border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: -30,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: -15,
            }}
            transition={{
                duration: 2.4,
                delay: 0.5,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className="absolute right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
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
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500/[0.15] to-transparent backdrop-blur-[2px] border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: -23,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: -8,
            }}
            transition={{
                duration: 2.4,
                delay: 0.4,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className="absolute left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
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
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/[0.15] to-transparent backdrop-blur-[2px] border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: 5,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: 20,
            }}
            transition={{
                duration: 2.4,
                delay: 0.6,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className="absolute right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
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
                    width: 200,
                    height: 60,
                }}
                className="relative"
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/[0.15] to-transparent backdrop-blur-[2px] border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: -40,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: -25,
            }}
            transition={{
                duration: 2.4,
                delay: 0.7,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className="absolute left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
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
                    width: 150,
                    height: 40,
                }}
                className="relative"
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/[0.15] to-transparent backdrop-blur-[2px] border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Header theme="dark" />

      {/* Background World Map */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <WorldMap
          dots={[
            {
              start: { lat: 40.7128, lng: -74.006 },
              end: { lat: 51.5074, lng: -0.1278 },
            },
            {
              start: { lat: 35.6762, lng: 139.6503 },
              end: { lat: -33.8688, lng: 151.2093 },
            },
            {
              start: { lat: 48.8566, lng: 2.3522 },
              end: { lat: 55.7558, lng: 37.6176 },
            },
          ]}
          lineColor="#ff0003"
        />
      </motion.div>

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
