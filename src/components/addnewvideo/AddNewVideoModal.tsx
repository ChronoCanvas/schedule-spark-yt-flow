
import React, { useState } from 'react';
import { X } from 'lucide-react';
import PlanningShootingPage from './PlanningShootingPage';
import SchedulePage from './SchedulePage';
import PersistentBottomBar from './PersistentBottomBar';

interface AddNewVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewVideoModal: React.FC<AddNewVideoModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<'plan' | 'schedule'>('plan');
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
    },
    scheduledDate: null as Date | null,
    scheduledTime: '',
    uploadNow: false,
    metadata: {
      title: '',
      description: '',
      tags: []
    }
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleFormChange = (newData: any) => {
    setFormData(newData);
    
    // Check if at least one required field is filled
    const hasTitle = newData.title && newData.title.trim() !== '';
    const hasIdeas = newData.ideas && newData.ideas.trim() !== '';
    const hasScript = newData.script && newData.script.trim() !== '';
    const hasStoryboardFiles = newData.storyboardFiles && newData.storyboardFiles.length > 0;
    const hasShotLog = newData.scenes && newData.scenes.length > 0;
    
    // Check if any team assignment has at least one member
    const hasTeamAssignments = Object.values(newData.teamAssignments).some(
      (assignments: any) => Array.isArray(assignments) && assignments.length > 0
    );
    
    const isValid = hasTitle || hasIdeas || hasScript || hasStoryboardFiles || hasShotLog || hasTeamAssignments;
    setIsFormValid(isValid);
  };

  const handleSave = () => {
    console.log('Saving project:', formData);
    // TODO: Implement save logic
    onClose();
  };

  const handleNext = () => {
    if (currentStep === 'plan') {
      setCurrentStep('schedule');
    } else {
      console.log('Finishing project:', formData);
      // TODO: Implement finish logic
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep === 'schedule') {
      setCurrentStep('plan');
    } else {
      onClose();
    }
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
          {currentStep === 'plan' ? (
            <PlanningShootingPage 
              formData={formData}
              onChange={handleFormChange}
            />
          ) : (
            <SchedulePage
              formData={formData}
              onChange={handleFormChange}
            />
          )}
        </div>

        <PersistentBottomBar
          currentStep={currentStep}
          isFormValid={isFormValid}
          onBack={handleBack}
          onSave={handleSave}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default AddNewVideoModal;
