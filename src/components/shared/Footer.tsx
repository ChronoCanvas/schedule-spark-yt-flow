
import { Card } from "@/components/ui/card";
import { Twitter, Instagram, Facebook, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import socialData from "@/data/social.json";
import { Link } from "react-router-dom";

const iconMap = {
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
};

interface FooterProps {
  theme?: "light" | "dark";
}

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="w-full h-full text-white opacity-20"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

const Footer = ({ theme = "light" }: FooterProps) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="w-full py-12 sm:py-20 bg-black overflow-hidden">
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8">
        {/* Dark footer container */}
        <div className="relative text-white rounded-2xl border border-gray-800 shadow-lg overflow-hidden bg-black max-w-7xl mx-auto">
          {/* Background Paths */}
          <div className="absolute inset-0 overflow-hidden">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
          </div>

          {/* Content */}
          <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="w-full max-w-6xl mx-auto">
              {/* Hero Section */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12 sm:mb-16"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                  YOUR DREAM TRIP,
                  <br />
                  <span className="text-red-500">YOUR WAY</span>
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  Everyone's perfect journey looks different. Share your vision, and we'll
                  bring it to life with personalized recommendations that match your
                  unique travel style.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                   Discover Now
                </motion.button>
              </motion.div>

              {/* Footer Links Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12"
              >
                {/* Logo and description */}
                <div className="sm:col-span-2 text-center sm:text-left">
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white"
                  >
                    Youtilify
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-white/60 mb-4 sm:mb-6 max-w-md mx-auto sm:mx-0"
                  >
                    The smartest way to plan your travels. AI-powered itineraries, 
                    collaborative planning, and intelligent expense tracking.
                  </motion.p>
                  
                  {/* Social media links */}
                  <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
                    {socialData.socialLinks.map((social, index) => {
                      const IconComponent = iconMap[social.platform as keyof typeof iconMap];
                      
                      return (
                        <motion.a
                          key={social.platform}
                          href={social.url}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>

                {/* Quick links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center sm:text-left"
                >
                  <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Product</h4>
                  <ul className="space-y-2">
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                      viewport={{ once: true }}
                    >
                      <Link 
                        to="/" 
                        onClick={() => setTimeout(() => scrollToSection('features-section'), 100)}
                        className="text-white/60 hover:text-white transition-colors hover:underline text-sm sm:text-base"
                      >
                        Features
                      </Link>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <Link 
                        to="/" 
                        onClick={() => setTimeout(() => scrollToSection('how-it-works'), 100)}
                        className="text-white/60 hover:text-white transition-colors hover:underline text-sm sm:text-base"
                      >
                        How it Works
                      </Link>
                    </motion.li>
                  </ul>
                </motion.div>

                {/* Company links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center sm:text-left"
                >
                  <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Company</h4>
                  <ul className="space-y-2">
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <Link to="/" className="text-white/60 hover:text-white transition-colors hover:underline text-sm sm:text-base">
                        Home
                      </Link>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <Link to="/about" className="text-white/60 hover:text-white transition-colors hover:underline text-sm sm:text-base">
                        About
                      </Link>
                    </motion.li>
                    <motion.li 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 }}
                      viewport={{ once: true }}
                    >
                      <Link to="/privacy-policy" className="text-white/60 hover:text-white transition-colors hover:underline text-sm sm:text-base">
                        Privacy
                      </Link>
                    </motion.li>
                  </ul>
                </motion.div>
              </motion.div>

              {/* Copyright */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className="border-t border-gray-800 pt-6 sm:pt-8 text-center"
              >
                <p className="text-white/40 text-sm sm:text-base">
                  © 2025 Youtilify. All rights reserved.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
