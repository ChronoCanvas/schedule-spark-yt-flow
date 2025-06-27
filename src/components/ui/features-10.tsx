import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Calendar, LucideIcon, BarChart3 } from 'lucide-react'
import { ReactNode } from 'react'
import Lottie from 'lottie-react'
import analyticsAnimation from 'public/lottiefiles/Analytics-lottie.json'

export function Features() {
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
                                <Lottie 
                                    animationData={analyticsAnimation}
                                    loop={true}
                                    autoplay={true}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                        </div>
                    </FeatureCard>

                    <FeatureCard>
                        <CardHeader className="pb-3">
                            <CardHeading
                                icon={Calendar}
                                title="Advanced Scheduling"
                                description="Scheduling system, Instantly locate all your assets."
                            />
                        </CardHeader>

                        <CardContent>
                            <div className="relative mb-6 sm:mb-0">
                                <div className="absolute -inset-6 bg-gradient-to-r from-transparent via-black/10 to-black"></div>
                                <div className="aspect-[76/59] border border-gray-600">
                                    <DualModeImage
                                        darkSrc="https://tailark.com/_next/image?url=%2Forigin-cal-dark.png&w=3840&q=75"
                                        lightSrc="https://tailark.com/_next/image?url=%2Forigin-cal.png&w=3840&q=75"
                                        alt="calendar illustration"
                                        width={1207}
                                        height={929}
                                    />
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

interface DualModeImageProps {
    darkSrc: string
    lightSrc: string
    alt: string
    width: number
    height: number
    className?: string
}

const DualModeImage = ({ darkSrc, lightSrc, alt, width, height, className }: DualModeImageProps) => (
    <>
        <img
            src={darkSrc}
            className={cn('block', className)}
            alt={`${alt} dark`}
            width={width}
            height={height}
        />
    </>
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
