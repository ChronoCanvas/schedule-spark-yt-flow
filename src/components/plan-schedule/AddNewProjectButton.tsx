
import React from 'react';
import { Plus } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';

interface AddNewProjectButtonProps {
  onClick: () => void;
}

const AddNewProjectButton: React.FC<AddNewProjectButtonProps> = ({ onClick }) => {
  return (
    <GlowButton
      glowColor="red"
      onClick={onClick}
      leftIcon={<Plus className="w-4 h-4" />}
      className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700"
    >
      Add New Project
    </GlowButton>
  );
};

export default AddNewProjectButton;
