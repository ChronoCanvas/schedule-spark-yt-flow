import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Calendar, LucideIcon, BarChart3 } from 'lucide-react'
import { ReactNode, useState, useEffect } from 'react'
import Lottie from 'lottie-react'

// Animated Calendar Component
const AnimatedCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [highlightedDates, setHighlightedDates] = useState<number[]>([]);

  useEffect(() => {
    // Animate highlighted dates on load
    const dates = [8, 15, 22, 29];
    let index = 0;
    const interval = setInterval(() => {
      if (index < dates.length) {
        setHighlightedDates(prev => [...prev, dates[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-rose-50 to-pink-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-float">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
          </div>
          
          {/* Week Days */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth().map((day, index) => (
              <div
                key={index}
                className={cn(
                  "h-8 w-8 flex items-center justify-center text-sm rounded-lg transition-all duration-300",
                  {
                    "text-gray-300": day === null,
                    "text-gray-700 hover:bg-gray-100": day && !highlightedDates.includes(day),
                    "bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-md transform scale-110 animate-pulse": 
                      day && highlightedDates.includes(day),
                    "bg-rose-100 text-rose-700": day === new Date().getDate() && !highlightedDates.includes(day)
                  }
                )}
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* Scheduled Items Indicator */}
          <div className="mt-4 flex justify-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-600">Scheduled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function Features() {
    const [analyticsAnimation, setAnalyticsAnimation] = useState(null);

    useEffect(() => {
        fetch('/lottiefiles/Analytics-lottie.json')
            .then(response => response.json())
            .then(data => setAnalyticsAnimation(data))
            .catch(error => console.error('Error loading animation:', error));
    }, []);

    return (
        <section className="bg-black py-16 md:py-32">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-5xl">
                <div className="mx-auto grid gap-4 lg:grid-cols-2">
                    <FeatureCard>
                        <CardHeader className="pb-3">
                            <CardHeading
                                icon={BarChart3}
                                title="AI-Powered Channel Insights"
                                description="Real-time performance intelligence, so you never miss what's working—or what isn't."
                            />
                        </CardHeader>

                        <div className="relative mb-6 border-t border-dashed border-gray-600 sm:mb-0">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black"></div>
                            <div className="aspect-[76/59] p-1 px-6 flex items-center justify-center">
                                {analyticsAnimation ? (
                                    <Lottie 
                                        animationData={analyticsAnimation}
                                        loop={true}
                                        autoplay={true}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-800 rounded flex items-center justify-center">
                                        <span className="text-gray-400">Loading animation...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </FeatureCard>

                    <FeatureCard>
                        <CardHeader className="pb-3">
                            <CardHeading
                                icon={Calendar}
                                title="Smart Scheduling System"
                                description="Plan content like a pro. Easily schedule videos, Shorts, and livestreams with precision."
                            />
                        </CardHeader>

                        <CardContent>
                            <div className="relative mb-6 sm:mb-0">
                                <div className="absolute -inset-6 bg-gradient-to-r from-transparent via-black/10 to-black"></div>
                                <div className="aspect-[76/59] border border-gray-600 rounded-lg overflow-hidden">
                                    <AnimatedCalendar />
                                </div>
                            </div>
                        </CardContent>
                    </FeatureCard>

                    <FeatureCard className="p-6 lg:col-span-2">
                        <p className="mx-auto my-6 max-w-md text-balance text-center text-2xl font-semibold text-white">Smart scheduling with automated reminders for maintenance.</p>

                        <div className="flex justify-center gap-6 overflow-hidden">
                            <CircularUI
                                label="Inclusion"
                                circles={[{ pattern: 'border' }, { pattern: 'border' }]}
                            />

                            <CircularUI
                                label="Inclusion"
                                circles={[{ pattern: 'none' }, { pattern: 'primary' }]}
                            />

                            <CircularUI
                                label="Join"
                                circles={[{ pattern: 'red' }, { pattern: 'none' }]}
                            />

                            <CircularUI
                                label="Exclusion"
                                circles={[{ pattern: 'primary' }, { pattern: 'none' }]}
                                className="hidden sm:block"
                            />
                        </div>
                    </FeatureCard>
                </div>
            </div>
        </section>
    )
}

interface FeatureCardProps {
    children: ReactNode
    className?: string
}

const FeatureCard = ({ children, className }: FeatureCardProps) => (
    <Card className={cn('group relative rounded-none shadow-zinc-950/5 bg-black border-gray-700', className)}>
        <CardDecorator />
        {children}
    </Card>
)

const CardDecorator = () => (
    <>
        <span className="absolute -left-px -top-px block size-2 border-l-2 border-t-2 border-color-1"></span>
        <span className="absolute -right-px -top-px block size-2 border-r-2 border-t-2 border-color-1"></span>
        <span className="absolute -bottom-px -left-px block size-2 border-b-2 border-l-2 border-color-1"></span>
        <span className="absolute -bottom-px -right-px block size-2 border-b-2 border-r-2 border-color-1"></span>
    </>
)

interface CardHeadingProps {
    icon: LucideIcon
    title: string
    description: string
}

const CardHeading = ({ icon: Icon, title, description }: CardHeadingProps) => (
    <div className="p-6">
        <span className="text-gray-400 flex items-center gap-2">
            <Icon className="size-4" />
            {title}
        </span>
        <p className="mt-8 text-2xl font-semibold text-white">{description}</p>
    </div>
)

interface CircleConfig {
    pattern: 'none' | 'border' | 'primary' | 'red'
}

interface CircularUIProps {
    label: string
    circles: CircleConfig[]
    className?: string
}

const CircularUI = ({ label, circles, className }: CircularUIProps) => (
    <div className={className}>
        <div className="bg-gradient-to-b from-gray-600 to-black size-fit rounded-2xl p-px">
            <div className="bg-gradient-to-b from-gray-800 to-black relative flex aspect-square w-fit items-center -space-x-4 rounded-[15px] p-4">
                {circles.map((circle, i) => (
                    <div
                        key={i}
                        className={cn('size-7 rounded-full border sm:size-8', {
                            'border-gray-500': circle.pattern === 'none',
                            'border-gray-500 bg-[repeating-linear-gradient(-45deg,#374151,#374151_1px,transparent_1px,transparent_4px)]': circle.pattern === 'border',
                            'border-color-1 bg-gray-800 bg-[repeating-linear-gradient(-45deg,hsl(var(--color-1)),hsl(var(--color-1))_1px,transparent_1px,transparent_4px)]': circle.pattern === 'primary',
                            'bg-gray-800 z-1 border-color-1 bg-[repeating-linear-gradient(-45deg,hsl(var(--color-1)),hsl(var(--color-1))_1px,transparent_1px,transparent_4px)]': circle.pattern === 'red',
                        })}></div>
                ))}
            </div>
        </div>
        <span className="text-gray-400 mt-1.5 block text-center text-sm">{label}</span>
    </div>
)
