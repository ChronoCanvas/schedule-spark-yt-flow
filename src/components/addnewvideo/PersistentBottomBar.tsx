
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';

interface PersistentBottomBarProps {
  isFormValid: boolean;
  onBack: () => void;
  onSave: () => void;
}

const PersistentBottomBar: React.FC<PersistentBottomBarProps> = ({
  isFormValid,
  onBack,
  onSave
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 p-4 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <GlowButton
          glowColor="red"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={onBack}
          className="bg-gray-800 hover:bg-gray-700 rounded-lg px-6 h-10"
        >
          Back
        </GlowButton>

        <GlowButton
          glowColor="red"
          onClick={onSave}
          disabled={!isFormValid}
          className={`rounded-lg px-8 h-10 ${
            isFormValid 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-gray-600 cursor-not-allowed opacity-50'
          }`}
        >
          Save Project
        </GlowButton>
      </div>
    </div>
  );
};

export default PersistentBottomBar;
