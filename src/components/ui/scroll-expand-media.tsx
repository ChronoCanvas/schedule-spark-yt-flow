'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [scrollVelocity, setScrollVelocity] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number>();
  const lastScrollTimeRef = useRef<number>(0);
  const velocityDecayRef = useRef<number>();

  // Smooth easing function
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Smooth progress update with easing
  const updateProgressSmooth = (targetProgress: number, duration: number = 300) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const startProgress = scrollProgress;
    const startTime = Date.now();
    setIsTransitioning(true);

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      const currentProgress = startProgress + (targetProgress - startProgress) * easedProgress;
      setScrollProgress(currentProgress);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsTransitioning(false);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
    setIsTransitioning(false);
  }, [mediaType]);

  // Intersection Observer with smoother detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const newIsInView = entry.isIntersecting && entry.intersectionRatio > 0.2;
        setIsInView(newIsInView);
        
        if (!entry.isIntersecting) {
          // Smooth reset when out of view
          if (scrollProgress > 0) {
            updateProgressSmooth(0, 200);
          }
          setShowContent(false);
          setMediaFullyExpanded(false);
        }
      },
      {
        threshold: [0, 0.2, 0.5, 0.8, 1],
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [scrollProgress]);

  // Velocity decay effect
  useEffect(() => {
    if (Math.abs(scrollVelocity) > 0.001 && !isTransitioning) {
      velocityDecayRef.current = setTimeout(() => {
        setScrollVelocity(prev => prev * 0.95);
      }, 16);
    }

    return () => {
      if (velocityDecayRef.current) {
        clearTimeout(velocityDecayRef.current);
      }
    };
  }, [scrollVelocity, isTransitioning]);

  useEffect(() => {
    if (!isInView) return;

    const handleWheel = (e: Event) => {
      const wheelEvent = e as unknown as WheelEvent;
      const currentTime = Date.now();
      const deltaTime = currentTime - lastScrollTimeRef.current;
      lastScrollTimeRef.current = currentTime;

      // Calculate velocity for momentum
      const velocity = wheelEvent.deltaY / Math.max(deltaTime, 16);
      setScrollVelocity(velocity);

      if (mediaFullyExpanded) {
        // Smooth transition back when scrolling up at the top
        if (wheelEvent.deltaY < 0 && window.scrollY <= 50) {
          e.preventDefault();
          setMediaFullyExpanded(false);
          updateProgressSmooth(0.7, 400);
          setTimeout(() => setShowContent(false), 200);
        }
        return;
      }

      if (isInView && !isTransitioning) {
        e.preventDefault();
        
        // Unified sensitivity with momentum
        const baseSensitivity = 0.0012;
        const momentumFactor = Math.min(Math.abs(velocity) * 0.1, 0.5);
        const sensitivity = baseSensitivity * (1 + momentumFactor);
        
        const scrollDelta = wheelEvent.deltaY * sensitivity;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        
        setScrollProgress(newProgress);

        // Smooth state transitions
        if (newProgress >= 0.98 && !mediaFullyExpanded) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress <= 0.6 && showContent) {
          setShowContent(false);
        } else if (newProgress >= 0.7 && !showContent && !mediaFullyExpanded) {
          setShowContent(true);
        }
      }
    };

    const handleTouchStart = (e: Event) => {
      const touchEvent = e as unknown as TouchEvent;
      setTouchStartY(touchEvent.touches[0].clientY);
      lastScrollTimeRef.current = Date.now();
    };

    const handleTouchMove = (e: Event) => {
      const touchEvent = e as unknown as TouchEvent;
      if (!touchStartY) return;

      const touchY = touchEvent.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      const currentTime = Date.now();
      const deltaTime = currentTime - lastScrollTimeRef.current;
      lastScrollTimeRef.current = currentTime;

      // Calculate touch velocity
      const velocity = deltaY / Math.max(deltaTime, 16);
      setScrollVelocity(velocity);

      if (mediaFullyExpanded) {
        if (deltaY < -40 && window.scrollY <= 50) {
          e.preventDefault();
          setMediaFullyExpanded(false);
          updateProgressSmooth(0.7, 400);
          setTimeout(() => setShowContent(false), 200);
        }
        return;
      }

      if (isInView && !isTransitioning) {
        e.preventDefault();
        
        // Unified touch sensitivity with momentum
        const baseSensitivity = deltaY < 0 ? 0.004 : 0.003;
        const momentumFactor = Math.min(Math.abs(velocity) * 0.05, 0.3);
        const sensitivity = baseSensitivity * (1 + momentumFactor);
        
        const scrollDelta = deltaY * sensitivity;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        
        setScrollProgress(newProgress);

        // Smooth state transitions (same as wheel)
        if (newProgress >= 0.98 && !mediaFullyExpanded) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress <= 0.6 && showContent) {
          setShowContent(false);
        } else if (newProgress >= 0.7 && !showContent && !mediaFullyExpanded) {
          setShowContent(true);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
      // Apply momentum decay
      setTimeout(() => setScrollVelocity(0), 100);
    };

    // Use passive: false only when needed
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (velocityDecayRef.current) {
        clearTimeout(velocityDecayRef.current);
      }
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY, isInView, isTransitioning, scrollVelocity, showContent]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Smoother size calculations
  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden'
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          <div className='absolute inset-0 z-0 h-full bg-black' />

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <motion.div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl'
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                }}
                animate={{
                  scale: isTransitioning ? [1, 1.01, 1] : 1,
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className='relative w-full h-full pointer-events-none'>
                      <iframe
                        width='100%'
                        height='100%'
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc +
                              (mediaSrc.includes('?') ? '&' : '?') +
                              'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                            : mediaSrc.replace('watch?v=', 'embed/') +
                              '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                              mediaSrc.split('v=')[1]
                        }
                        className='w-full h-full rounded-xl'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                      <div
                        className='absolute inset-0 z-10'
                        style={{ pointerEvents: 'none' }}
                      ></div>

                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </div>
                  ) : (
                    <div className='relative w-full h-full pointer-events-none'>
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload='auto'
                        className='w-full h-full object-cover rounded-xl'
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div
                        className='absolute inset-0 z-10'
                        style={{ pointerEvents: 'none' }}
                      ></div>

                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </div>
                  )
                ) : (
                  <div className='relative w-full h-full'>
                    <img
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      className='w-full h-full object-cover rounded-xl'
                    />

                    <motion.div
                      className='absolute inset-0 bg-black/50 rounded-xl'
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </div>
                )}

                <motion.div 
                  className='flex flex-col items-center text-center relative z-10 mt-4'
                  animate={{ 
                    opacity: 1 - scrollProgress * 0.8,
                    y: scrollProgress * -20 
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {date && (
                    <p
                      className='text-xs text-blue-200'
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className='text-blue-200 font-medium text-center text-xs'
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </motion.div>
              </motion.div>

              <motion.div
                className={`flex flex-col items-center justify-center text-center w-full relative z-10 ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
                animate={{ 
                  opacity: 1 - scrollProgress * 0.6,
                  scale: 1 - scrollProgress * 0.1 
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.h2
                  className='text-4xl md:text-5xl lg:text-6xl font-bold text-blue-200'
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className='text-4xl md:text-5xl lg:text-6xl font-bold text-center text-blue-200 -mt-2 md:-mt-4'
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </motion.h2>
              </motion.div>
            </div>

            <motion.section
              className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  poster?: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

interface MediaContentCollection {
  [key: string]: MediaContent;
}

const sampleMediaContent: MediaContentCollection = {
  video: {
    src: 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1',
    poster:
      'https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg',
    title: 'See SpotPlan In Action',
    date: 'See How it Works',
    scrollToExpand: 'Scroll to Expand Demo',
    about: {
      overview:
        'This is a demonstration of SpotPlan\'s interactive planning interface. As you scroll, the demo expands to show you how our AI-powered travel planning works in real-time. Experience the seamless way to create your perfect itinerary.',
      conclusion:
        'SpotPlan transforms travel planning from a chore into an exciting journey of discovery. Our intelligent recommendations adapt to your preferences, making every trip uniquely yours.',
    },
  },
  image: {
    src: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1280&auto=format&fit=crop',
    title: 'Dynamic Travel Showcase',
    date: 'Your Next Adventure',
    scrollToExpand: 'Scroll to Explore',
    about: {
      overview:
        'Discover how SpotPlan curates stunning destinations tailored to your travel style. Our platform combines beautiful imagery with intelligent planning to inspire and organize your perfect getaway.',
      conclusion:
        'Whether you\'re planning a relaxing beach vacation or an adventurous mountain expedition, SpotPlan provides the tools and inspiration to make it happen effortlessly.',
    },
  },
};

const MediaContent = ({ mediaType }: { mediaType: 'video' | 'image' }) => {
  const currentMedia = sampleMediaContent[mediaType];

  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className='text-3xl font-bold mb-6 text-white'>
        About SpotPlan
      </h2>
      <p className='text-lg mb-8 text-blue-100'>
        {currentMedia.about.overview}
      </p>

      <p className='text-lg mb-8 text-blue-100'>
        {currentMedia.about.conclusion}
      </p>
    </div>
  );
};

const Demo = () => {
  const [mediaType, setMediaType] = useState<'video' | 'image'>('video');
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, [mediaType]);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export default Demo;
