
import React from 'react';
import { Input } from '@/components/ui/input';
import { GlowCard } from '@/components/ui/spotlight-card';

interface TitleSectionProps {
  value: string;
  onChange: (value: string) => void;
}

const TitleSection: React.FC<TitleSectionProps> = ({ value, onChange }) => {
  return (
    <GlowCard
      glowColor="red"
      customSize={true}
      className="w-full h-auto bg-gray-900/50 border border-gray-800 hover:border-red-500/50 transition-all duration-200 p-6"
    >
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Video Title</h2>
        <div className="space-y-2">
          <Input
            placeholder="Enter video title (optional - AI will suggest if left blank)"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-red-500"
          />
          <p className="text-xs text-gray-500">
            Leave blank to generate an AI-powered title based on your content
          </p>
        </div>
      </div>
    </GlowCard>
  );
};

export default TitleSection;
