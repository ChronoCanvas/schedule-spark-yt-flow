
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, Users, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const DemoPreviewSection = () => {
  return (
    <section id="demo-section" className="bg-black py-20 lg:py-40">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-4 mb-12">
          <div>
            <Badge variant="outline" className="border-gray-600 text-gray-300">Demo</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-white">
              See It in Action
            </h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-gray-400">
              Watch how Youtilify transforms your travel planning experience with AI-powered itineraries, smart recommendations, and collaborative features.
            </p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Demo Video/Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <Play className="w-6 h-6 text-white ml-1" fill="white" />
                </motion.button>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Complete Travel Planning Demo
              </h3>
              <p className="text-gray-400">
                See how you can plan a complete trip from start to finish in just minutes.
              </p>
            </div>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  AI-Powered Itineraries
                </h4>
                <p className="text-gray-400">
                  Generate personalized travel plans based on your preferences, budget, and travel style.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Collaborative Planning
                </h4>
                <p className="text-gray-400">
                  Plan trips with friends and family. Share itineraries, vote on activities, and coordinate together.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Smart Recommendations
                </h4>
                <p className="text-gray-400">
                  Discover hidden gems and local favorites with our intelligent recommendation engine.
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 mt-6"
            >
              Try Demo Now
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DemoPreviewSection;
