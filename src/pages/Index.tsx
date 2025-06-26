
"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { LogIn } from "lucide-react"
import { NavigationTabs } from "@/components/ui/expandable-tabs"
import HeroButton from "@/components/ui/hero-button"
import { MacbookPro } from "@/components/ui/macbook-pro"
import { Button } from "@/components/ui/button"

const Index = () => {
  const { scrollY } = useScroll()
  
  // Transform the laptop scale based on scroll
  const laptopScale = useTransform(scrollY, [0, 500], [1, 1.2])
  const laptopY = useTransform(scrollY, [0, 500], [0, -50])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section with Integrated Navigation */}
      <section className="pt-8 pb-16 px-4">
        <div className="container mx-auto">
          {/* Top Navigation Bar */}
          <div className="flex items-center justify-between mb-16">
            {/* Logo */}
            <div className="font-bebas text-3xl font-bold tracking-wider">
              YTManager
            </div>
            
            {/* Center Navigation and Right Sign In */}
            <div className="flex items-center gap-4">
              {/* Navigation Menu */}
              <div className="hidden md:block">
                <NavigationTabs />
              </div>
              
              {/* Sign In Button */}
              <Button 
                className="bg-red-500 text-white hover:bg-transparent hover:border-red-500 hover:text-red-500 border-2 border-red-500 transition-all duration-300 h-10 px-4 py-2 rounded-2xl relative overflow-hidden group"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-transform duration-700 group-hover:translate-x-full -translate-x-full" />
              </Button>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center">
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
