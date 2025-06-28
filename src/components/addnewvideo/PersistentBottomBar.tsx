
import React from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PersistentBottomBarProps {
  onBack: () => void;
  onSave: () => void;
  canSave: boolean;
}

const PersistentBottomBar: React.FC<PersistentBottomBarProps> = ({
  onBack,
  onSave,
  canSave
}) => {
  return (
    <div className="border-t border-gray-800 bg-black px-6 py-4 flex items-center justify-between">
      <Button
        variant="ghost"
        onClick={onBack}
        className="text-white hover:bg-gray-800 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>
      
      <Button
        onClick={onSave}
        disabled={!canSave}
        className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:opacity-50 flex items-center gap-2"
      >
        <Save className="w-4 h-4" />
        Save Project
      </Button>
    </div>
  );
};

export default PersistentBottomBar;
