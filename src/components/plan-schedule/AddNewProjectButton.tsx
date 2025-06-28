
import React from 'react';
import { Plus } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';

interface AddNewProjectButtonProps {
  onClick: () => void;
}

const AddNewProjectButton: React.FC<AddNewProjectButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center mb-8">
      <GlowButton
        glowColor="red"
        onClick={onClick}
        leftIcon={<Plus className="w-5 h-5" />}
        className="px-8 py-3 text-base font-semibold"
      >
        Add New Project
      </GlowButton>
    </div>
  );
};

export default AddNewProjectButton;
