
import React, { useState } from 'react';
import { X } from 'lucide-react';
import PlanningShootingPage from './PlanningShootingPage';
import PersistentBottomBar from './PersistentBottomBar';

interface AddNewVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewVideoModal: React.FC<AddNewVideoModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    ideas: '',
    script: '',
    storyboardFiles: [] as File[],
    scenes: [] as Array<{
      id: string;
      name: string;
      tags: string[];
      shots: Array<{
        id: string;
        name: string;
      }>;
    }>,
    teamAssignments: {
      scriptwriter: [] as string[],
      storyboardArtist: [] as string[],
      researcher: [] as string[],
      director: [] as string[],
      videoEditor: [] as string[],
      thumbnailDesigner: [] as string[],
      videographer: [] as string[],
      insightsLead: [] as string[]
    }
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleFormChange = (newData: any) => {
    setFormData(newData);
    // Basic validation - at least one scene or some content
    const hasContent = newData.ideas || newData.script || newData.scenes.length > 0;
    setIsFormValid(hasContent);
  };

  const handleSave = () => {
    console.log('Saving project:', formData);
    // TODO: Implement save logic
    onClose();
  };

  const handleNext = () => {
    console.log('Moving to next step:', formData);
    // TODO: Implement next step logic
    // This would typically navigate to the next page in the flow
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-60 text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main content */}
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto pb-20">
          <PlanningShootingPage 
            formData={formData}
            onChange={handleFormChange}
          />
        </div>

        <PersistentBottomBar
          isFormValid={isFormValid}
          onBack={onClose}
          onSave={handleSave}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default AddNewVideoModal;
