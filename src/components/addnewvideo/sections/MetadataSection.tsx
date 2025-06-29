
import React, { useState } from 'react';
import { Sparkles, RefreshCw, MessageSquare, Hash, Type, Lightbulb } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowButton } from '@/components/ui/glow-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface MetadataSectionProps {
  metadata: {
    title: string;
    description: string;
    tags: string[];
  };
  hasScript: boolean;
  onMetadataChange: (metadata: Partial<{ title: string; description: string; tags: string[] }>) => void;
}

const MetadataSection: React.FC<MetadataSectionProps> = ({
  metadata,
  hasScript,
  onMetadataChange
}) => {
  const [videoIdea, setVideoIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState({
    title: false,
    description: false,
    tags: false
  });

  // Mock AI generation functions
  const generateTitle = async () => {
    setIsGenerating(prev => ({ ...prev, title: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockTitles = [
      "10 Amazing Tips That Will Change Your Life",
      "The Ultimate Guide to Productivity",
      "Secret Techniques Professionals Don't Want You to Know",
      "How to Master Any Skill in 30 Days",
      "The Science Behind Success: What Really Works"
    ];
    
    const randomTitle = mockTitles[Math.floor(Math.random() * mockTitles.length)];
    onMetadataChange({ title: randomTitle });
    setIsGenerating(prev => ({ ...prev, title: false }));
  };

  const generateDescription = async () => {
    setIsGenerating(prev => ({ ...prev, description: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockDescription = `In this comprehensive video, we dive deep into the most effective strategies and techniques that can transform your approach to success. Whether you're a beginner or looking to refine your skills, this guide provides actionable insights and proven methods.

🔹 What you'll learn:
• Essential fundamentals everyone should know
• Advanced techniques for maximum impact
• Common mistakes to avoid
• Real-world applications and examples

Don't forget to subscribe for more valuable content and hit the notification bell to stay updated with our latest videos!

#Tutorial #Tips #Success #Productivity #Learning`;
    
    onMetadataChange({ description: mockDescription });
    setIsGenerating(prev => ({ ...prev, description: false }));
  };

  const generateTags = async () => {
    setIsGenerating(prev => ({ ...prev, tags: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockTags = [
      "tutorial", "tips", "guide", "howto", "success", "productivity", 
      "motivation", "education", "learning", "strategy", "technique", 
      "beginner", "advanced", "professional", "improvement"
    ];
    
    onMetadataChange({ tags: mockTags });
    setIsGenerating(prev => ({ ...prev, tags: false }));
  };

  const MetadataCard = ({ 
    title, 
    icon: Icon, 
    value, 
    isGenerating: cardIsGenerating, 
    onRegenerate, 
    isTextarea = false 
  }: {
    title: string;
    icon: any;
    value: string | string[];
    isGenerating: boolean;
    onRegenerate: () => void;
    isTextarea?: boolean;
  }) => (
    <GlowCard glowColor="purple" customSize className="w-full p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-medium text-white">{title}</h3>
          </div>
          <GlowButton
            glowColor="purple"
            leftIcon={<RefreshCw className={`w-4 h-4 ${cardIsGenerating ? 'animate-spin' : ''}`} />}
            onClick={onRegenerate}
            disabled={cardIsGenerating}
            className="bg-purple-600 hover:bg-purple-700 rounded-lg px-4 h-8 text-sm"
          >
            {cardIsGenerating ? 'Generating...' : 'Regenerate'}
          </GlowButton>
        </div>
        
        <div className="space-y-2">
          {isTextarea ? (
            <Textarea
              value={Array.isArray(value) ? value.join(', ') : value}
              onChange={(e) => {
                if (title === 'Description') {
                  onMetadataChange({ description: e.target.value });
                }
              }}
              className="bg-gray-800 border-gray-600 text-white min-h-[120px] resize-none"
              placeholder={cardIsGenerating ? 'Generating...' : `Enter ${title.toLowerCase()}...`}
              disabled={cardIsGenerating}
            />
          ) : (
            <Input
              value={Array.isArray(value) ? value.join(', ') : value}
              onChange={(e) => {
                if (title === 'Title') {
                  onMetadataChange({ title: e.target.value });
                } else if (title === 'Tags') {
                  onMetadataChange({ tags: e.target.value.split(', ').filter(tag => tag.trim()) });
                }
              }}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder={cardIsGenerating ? 'Generating...' : `Enter ${title.toLowerCase()}...`}
              disabled={cardIsGenerating}
            />
          )}
        </div>
      </div>
    </GlowCard>
  );

  return (
    <GlowCard glowColor="blue" customSize className="w-full p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">Generate Video Details</h2>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          Generate optimized titles, descriptions, and tags for your YouTube upload that are designed to maximize reach and engagement with your target audience.
        </p>

        {!hasScript && (
          <GlowCard glowColor="orange" customSize className="w-full p-4 mb-6 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-400/30">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-orange-400" />
                <p className="text-orange-100 font-medium">Got a video idea? Let AI do the heavy lifting!</p>
              </div>
              <p className="text-orange-200/80 text-sm mb-3">
                Describe your video concept and we'll generate all the metadata automatically.
              </p>
              <div className="flex gap-3">
                <Input
                  value={videoIdea}
                  onChange={(e) => setVideoIdea(e.target.value)}
                  placeholder="e.g., How to improve productivity using time management techniques"
                  className="bg-orange-900/20 border-orange-400/40 text-orange-50 placeholder:text-orange-300/60 flex-1 focus:border-orange-400"
                />
                <GlowButton
                  glowColor="orange"
                  onClick={() => console.log('Generate from idea:', videoIdea)}
                  disabled={!videoIdea.trim()}
                  className="bg-orange-600 hover:bg-orange-700 rounded-lg px-4 h-10 text-white"
                >
                  Generate All
                </GlowButton>
              </div>
            </div>
          </GlowCard>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <MetadataCard
            title="Title"
            icon={Type}
            value={metadata.title}
            isGenerating={isGenerating.title}
            onRegenerate={generateTitle}
          />
          
          <div className="lg:col-span-2 xl:col-span-1">
            <MetadataCard
              title="Tags"
              icon={Hash}
              value={metadata.tags}
              isGenerating={isGenerating.tags}
              onRegenerate={generateTags}
            />
          </div>
          
          <div className="lg:col-span-2 xl:col-span-3">
            <MetadataCard
              title="Description"
              icon={MessageSquare}
              value={metadata.description}
              isGenerating={isGenerating.description}
              onRegenerate={generateDescription}
              isTextarea={true}
            />
          </div>
        </div>
      </div>
    </GlowCard>
  );
};

export default MetadataSection;
