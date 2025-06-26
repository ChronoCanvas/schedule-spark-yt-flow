
"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { LogIn } from "lucide-react"
import { NavigationTabs } from "@/components/ui/expandable-tabs"
import HeroButton from "@/components/ui/hero-button"
import { MacbookPro } from "@/components/ui/macbook-pro"
import { Button } from "@/components/ui/button"

const Index = () => {
  const [isSignInHovered, setIsSignInHovered] = useState(false)
  const { scrollY } = useScroll()
  
  // Transform the laptop scale based on scroll
  const laptopScale = useTransform(scrollY, [0, 500], [1, 1.2])
  const laptopY = useTransform(scrollY, [0, 500], [0, -50])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="font-bebas text-3xl font-bold tracking-wider">
            YTManager
          </div>
          
          {/* Navigation Menu */}
          <div className="hidden md:block">
            <NavigationTabs />
          </div>
          
          {/* Sign In Button */}
          <div 
            className="relative"
            onMouseEnter={() => setIsSignInHovered(true)}
            onMouseLeave={() => setIsSignInHovered(false)}
          >
            <Button 
              variant="outline" 
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 overflow-hidden"
            >
              <LogIn className="w-4 h-4 mr-2" />
              <span className={`transition-all duration-300 ${isSignInHovered ? 'w-auto opacity-100' : 'w-0 opacity-0 md:w-auto md:opacity-100'}`}>
                Sign In / Sign Up
              </span>
              <span className={`transition-all duration-300 ${isSignInHovered ? 'w-0 opacity-0' : 'w-auto opacity-100 md:w-0 md:opacity-0'}`}>
                Sign In
              </span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          {/* Hero Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your YouTube Channel,{" "}
              <span className="text-red-500 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Supercharged
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-4xl mx-auto leading-relaxed">
              Analytics, scheduling, live streaming, monetization & more—powered by AI and YouTube's official APIs.
            </p>
            
            {/* CTA Button */}
            <HeroButton>
              Get Started Free
            </HeroButton>
          </motion.div>

          {/* Hero Visual - Laptop Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ 
              scale: laptopScale,
              y: laptopY 
            }}
            className="flex justify-center items-center"
          >
            <div className="relative">
              <MacbookPro
                width={800}
                height={500}
                videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                className="drop-shadow-2xl"
              />
              
              {/* Glow effect around laptop */}
              <div className="absolute inset-0 bg-red-500/20 blur-3xl scale-110 -z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-red-500/30 to-transparent blur-2xl scale-105 -z-10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-20">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        
        {/* Red Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 0, 3, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 0, 3, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
    </div>
  )
}

export default Index
