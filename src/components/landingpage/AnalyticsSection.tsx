
import React from 'react';
import SectionWithMockup from "@/components/ui/section-with-mockup";

const AnalyticsSection = () => {
    const analyticsData = {
        title: (
            <>
                Deep Analytics,
                <br />
                <span className="text-red-500">Delivered Instantly.</span>
            </>
        ),
        description: (
            <>
                Get comprehensive channel performance insights with real-time analytics.
                <br />
                Track subscriber growth, video performance, and engagement metrics
                <br />
                with AI-powered recommendations to optimize your content strategy
                <br />
                and maximize your channel's potential.
            </>
        ),
        primaryImageSrc: '/lovable-uploads/5b7ee6bb-2480-4ba4-92ce-58dbd51fec7b.png',
        secondaryImageSrc: '/lovable-uploads/5b7ee6bb-2480-4ba4-92ce-58dbd51fec7b.png',
    };

    return (
        <SectionWithMockup
            title={analyticsData.title}
            description={analyticsData.description}
            primaryImageSrc={analyticsData.primaryImageSrc}
            secondaryImageSrc={analyticsData.secondaryImageSrc}
        />
    );
};

export default AnalyticsSection;
