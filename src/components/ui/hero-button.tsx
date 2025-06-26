
"use client"

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Eye, TriangleUp } from 'lucide-react'

interface HeroButtonProps {
  onGetStarted?: () => Promise<void> | void
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

const HeroButton: React.FC<HeroButtonProps> = ({
  onGetStarted = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Getting started!')
  },
  disabled = false,
  className = '',
  children = 'Level Up Your YT'
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [error, setError] = useState<string | null>(null)
  const [isAnimatingYT, setIsAnimatingYT] = useState(false)
  const [hasInitialAnimated, setHasInitialAnimated] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [viewerCount, setViewerCount] = useState(0)
  const [displayCount, setDisplayCount] = useState(0)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const animationTimersRef = useRef<NodeJS.Timeout[]>([])

  const addTimer = useCallback((callback: () => void, delay: number) => {
    const timer = setTimeout(() => {
      callback()
      animationTimersRef.current = animationTimersRef.current.filter(t => t !== timer)
    }, delay)
    animationTimersRef.current.push(timer)
    return timer
  }, [])

  const clearAllTimers = useCallback(() => {
    animationTimersRef.current.forEach(timer => clearTimeout(timer))
    animationTimersRef.current = []
  }, [])

  useEffect(() => {
    return () => {
      clearAllTimers()
    }
  }, [clearAllTimers])

  useEffect(() => {
    if (!hasInitialAnimated) {
      const initialTimer = setTimeout(() => {
        setIsInitialLoad(false)
        setTimeout(() => {
          setIsAnimatingYT(true)
          setViewerCount(0)

          addTimer(() => {
            setViewerCount(10000)
            let currentCount = 0
            const targetCount = 10000
            const increment = targetCount / 50
            const counterInterval = setInterval(() => {
              currentCount += increment
              if (currentCount >= targetCount) {
                setDisplayCount(targetCount)
                clearInterval(counterInterval)
              } else {
                setDisplayCount(Math.floor(currentCount))
              }
            }, 20)
          }, 500)

          addTimer(() => {
            setIsAnimatingYT(false)
            setHasInitialAnimated(true)
            setViewerCount(0)
            setDisplayCount(0)
          }, 1800)
        }, 300)
      }, 500)

      return () => clearTimeout(initialTimer)
    }
  }, [hasInitialAnimated, addTimer])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    if (Math.abs(x - mousePosition.x) > 1 || Math.abs(y - mousePosition.y) > 1) {
      setMousePosition({ x, y })
    }
  }, [mousePosition.x, mousePosition.y])

  const handleClick = async () => {
    if (disabled || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      await onGetStarted()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get started')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    setIsAnimatingYT(true)
    setViewerCount(0)
    clearAllTimers()

    addTimer(() => {
      setViewerCount(10000)
      let currentCount = 0
      const targetCount = 10000
      const increment = targetCount / 50
      const counterInterval = setInterval(() => {
        currentCount += increment
        if (currentCount >= targetCount) {
          setDisplayCount(targetCount)
          clearInterval(counterInterval)
        } else {
          setDisplayCount(Math.floor(currentCount))
        }
      }, 20)
    }, 500)

    addTimer(() => {
      setIsAnimatingYT(false)
      setViewerCount(0)
      setDisplayCount(0)
    }, 1800)
  }, [addTimer, clearAllTimers])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const buttonBackgroundStyle = useMemo(() => {
    return isHovered
      ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
      : 'transparent'
  }, [isHovered, mousePosition])

  const gradientBorderStyle = useMemo(() => {
    return `conic-gradient(from ${mousePosition.x * 3.6}deg at ${mousePosition.x}% ${mousePosition.y}%, 
        #ff0003, #dc2626, #b91c1c, #991b1b, #7f1d1d, #ffffff, #f8f8f8, #ff0003)`
  }, [mousePosition])

  return (
    <div className="relative inline-block p-8">
      <button
        ref={buttonRef}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        disabled={disabled || isLoading}
        className={`
          relative overflow-hidden
          px-8 py-4 md:px-10 md:py-5
          bg-black
          text-white
          font-semibold text-base md:text-lg
          rounded-full
          border-2 border-transparent
          transition-all duration-300 ease-out
          focus:outline-none focus:ring-4 focus:ring-red-500/20
          disabled:opacity-50 disabled:cursor-not-allowed
          active:scale-95
          group
          ${isHovered ? 'scale-105' : 'scale-100'}
          ${isInitialLoad ? 'opacity-0 blur-sm scale-95' : 'opacity-100 blur-0'}
          ${className}
        `}
        style={{ background: buttonBackgroundStyle }}
        aria-label={typeof children === 'string' ? children : 'Level up your YT'}
        aria-describedby={error ? 'hero-button-error' : undefined}
      >
        <div
          className={`
            absolute inset-0 rounded-full p-[2px]
            transition-all duration-500 ease-out
            ${isHovered ? 'opacity-100' : 'opacity-70'}
          `}
          style={{ background: gradientBorderStyle }}
        >
          <div className="w-full h-full bg-black rounded-full" />
        </div>

        <div className="relative z-10 flex items-center justify-center gap-3">
          <div className={`
            absolute flex items-center justify-center
            transition-all duration-500 ease-out
            ${isAnimatingYT ? 'translate-x-0 opacity-100' : '-translate-x-[150%] opacity-0'}
          `}>
            <div className={`
              relative
              transition-all duration-500 ease-out
              ${isAnimatingYT ? 'translate-y-0' : 'translate-y-[100%]'}
            `}>
              <div className="w-12 h-6 md:w-14 md:h-7 bg-red-500 rounded-md border-2 border-red-500 flex items-center justify-center">
                <Eye className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
            </div>

            <div className={`
              flex items-center ml-3
              transition-all duration-500 ease-out delay-300
              ${isAnimatingYT ? 'translate-x-0 opacity-100' : 'translate-x-[100%] opacity-0'}
            `}>
              <TriangleUp className="w-4 h-4 md:w-5 md:h-5 text-green-500 fill-current" />
              <span className="text-green-500 font-bold text-sm md:text-base ml-1">
                {displayCount.toLocaleString()}
              </span>
            </div>
          </div>

          <span className={`
            transition-all duration-200 ease-out
            ${isAnimatingYT ? 'opacity-0 blur-sm' : 'opacity-100 blur-0'}
            ${isLoading ? 'text-red-500' : 'text-white'}
            ${isAnimatingYT ? 'delay-0' : 'delay-[600ms]'}
          `}>
            {isLoading ? 'Loading...' : children}
          </span>
        </div>

        <div className={`
          absolute inset-0 rounded-full
          bg-gradient-to-r from-transparent via-white/20 to-transparent
          transform -skew-x-12
          transition-transform duration-1000
          ${isHovered ? 'translate-x-full' : '-translate-x-full'}
        `} />

        <div className={`
          absolute inset-0 rounded-full
          bg-red-500/20
          transition-transform duration-300
          ${isLoading ? 'scale-110 opacity-50' : 'scale-100 opacity-0'}
        `} />
      </button>

      {error && (
        <div
          id="hero-button-error"
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded-md animate-in slide-in-from-top-2 duration-200"
        >
          {error}
        </div>
      )}

      {/* Enhanced Glow Effects */}
      <div className={`
        absolute inset-0 rounded-full
        bg-gradient-to-r from-red-500/30 via-red-600/30 via-white/30 to-red-700/30
        blur-lg
        transition-all duration-700 ease-out
        -z-10
        ${isHovered ? 'opacity-80 scale-110' : 'opacity-40 scale-100'}
      `} />

      <div className={`
        absolute inset-0 rounded-full
        bg-gradient-to-r from-red-400/25 via-red-500/25 to-white/25
        blur-2xl
        transition-all duration-1000 ease-out
        -z-20
        ${isHovered ? 'opacity-70 scale-150' : 'opacity-20 scale-110'}
      `} />

      <div className={`
        absolute inset-0 rounded-full
        bg-gradient-to-r from-red-300/20 via-red-400/20 to-white/20
        blur-3xl
        transition-all duration-1200 ease-out
        -z-30
        ${isHovered ? 'opacity-60 scale-200' : 'opacity-10 scale-120'}
      `} />

      <div className={`
        absolute inset-0 rounded-full
        bg-gradient-to-r from-red-500/15 via-red-600/15 to-white/15
        blur-xl
        transition-all duration-2000 ease-out
        -z-40
        ${isHovered ? 'opacity-50 scale-300 animate-pulse' : 'opacity-0 scale-100'}
      `} />

      <div
        className={`
          absolute inset-0 rounded-full
          blur-2xl
          transition-all duration-800 ease-out
          -z-50
          ${isHovered ? 'opacity-40 scale-180' : 'opacity-20 scale-120'}
        `}
        style={{
          background: `conic-gradient(from ${mousePosition.x * 3.6}deg at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(255, 0, 3, 0.3), rgba(220, 38, 38, 0.3), rgba(185, 28, 28, 0.3), 
              rgba(127, 29, 29, 0.3), rgba(255, 255, 255, 0.3), rgba(248, 248, 248, 0.3), 
              rgba(248, 113, 113, 0.3), rgba(255, 0, 3, 0.3))`
        }}
      />
    </div>
  )
}

export default HeroButton
