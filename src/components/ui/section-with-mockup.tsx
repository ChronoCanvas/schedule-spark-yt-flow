
'use client';

import React from "react";
import { motion } from "framer-motion";

interface SectionWithMockupProps {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    primaryImageSrc: string;
    secondaryImageSrc: string;
    reverseLayout?: boolean;
}

const SectionWithMockup: React.FC<SectionWithMockupProps> = ({
    title,
    description,
    primaryImageSrc,
    secondaryImageSrc,
    reverseLayout = false,
}) => {

    const containerVariants = {
        hidden: {},
        visible: {
             transition: {
                staggerChildren: 0.2,
            }
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    };

    const layoutClasses = reverseLayout
        ? "md:grid-cols-2 md:grid-flow-col-dense"
        : "md:grid-cols-2";

    const textOrderClass = reverseLayout ? "md:col-start-2" : "";
    const imageOrderClass = reverseLayout ? "md:col-start-1" : "";

    return (
        <section className="relative py-12 md:py-24 bg-black overflow-hidden">
            <div className="container max-w-7xl w-full px-4 md:px-6 relative z-10 mx-auto">
                <motion.div
                     className={`grid grid-cols-1 gap-8 md:gap-12 w-full items-center ${layoutClasses}`}
                     variants={containerVariants}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Text Content */}
                    <motion.div
                        className={`flex flex-col items-start gap-4 max-w-lg mx-auto md:mx-0 ${textOrderClass}`}
                        variants={itemVariants}
                    >
                         <div className="space-y-2">
                            <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                                {title}
                            </h2>
                        </div>

                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                            {description}
                        </p>
                    </motion.div>

                    {/* App mockup/Image Content */}
                    <motion.div
                        className={`relative mx-auto ${imageOrderClass} w-full max-w-md md:max-w-lg lg:max-w-xl`}
                        variants={itemVariants}
                    >
                        {/* Decorative Background Element */}
                        <motion.div
                             className="absolute inset-0 w-full h-full bg-gray-900 rounded-2xl md:rounded-3xl transform rotate-2 scale-95 opacity-50 blur-sm"
                             initial={{ rotate: 2, scale: 0.95 }}
                             whileInView={{ rotate: reverseLayout ? -2 : 2, scale: 0.98 }}
                             transition={{ duration: 1.2, ease: "easeOut" }}
                             viewport={{ once: true, amount: 0.5 }}
                        />

                        {/* Main Mockup Card */}
                        <motion.div
                            className="relative w-full aspect-[4/3] bg-white/5 rounded-2xl md:rounded-3xl backdrop-blur-sm border border-white/10 overflow-hidden"
                            initial={{ y: 0 }}
                            whileInView={{ y: reverseLayout ? -8 : -12 }}
                             transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                             viewport={{ once: true, amount: 0.5 }}
                        >
                            <div className="w-full h-full p-2 md:p-4">
                                <div className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden bg-gray-100">
                                    {/* Primary Image */}
                                    <img
                                        src={primaryImageSrc}
                                        alt="Analytics Dashboard"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Decorative bottom gradient */}
            <div className="absolute w-full h-px bottom-0 left-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </section>
    );
};

export default SectionWithMockup;
