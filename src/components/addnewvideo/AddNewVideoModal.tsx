
import React, { useState } from 'react';
import { X } from 'lucide-react';
import PlanningShootingPage from './PlanningShootingPage';
import SchedulePage from './SchedulePage';
import ProjectOverview from './ProjectOverview';
import PersistentBottomBar from './PersistentBottomBar';

interface AddNewVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewVideoModal: React.FC<AddNewVideoModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<'plan' | 'schedule' | 'overview'>('plan');
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
    selectedMode: 'schedule' as 'schedule' | 'upload',
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
  };

  const handleNext = () => {
    if (currentStep === 'plan') {
      setCurrentStep('schedule');
    } else if (currentStep === 'schedule') {
      setCurrentStep('overview');
    } else {
      // Close from overview page
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep === 'overview') {
      setCurrentStep('schedule');
    } else if (currentStep === 'schedule') {
      setCurrentStep('plan');
    } else {
      onClose();
    }
  };

  const handleEdit = () => {
    // Navigate back to planning page from overview
    setCurrentStep('plan');
  };

  const handleStateChange = (newState: 'Planning' | 'Production') => {
    console.log('State changed to:', newState);
  };

  // Convert formData to project format for overview
  const projectForOverview = {
    id: 'new',
    title: formData.title || 'Untitled Project',
    state: 'Planning' as const,
    description: formData.metadata.description,
    tags: formData.metadata.tags,
    script: formData.script,
    ideas: formData.ideas,
    scheduledDate: formData.scheduledDate?.toISOString(),
    storyboardFiles: formData.storyboardFiles.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    })),
    scenes: formData.scenes,
    teamAssignments: formData.teamAssignments
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[10000] text-gray-400 hover:text-white transition-colors"
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
          ) : currentStep === 'schedule' ? (
            <SchedulePage
              formData={formData}
              onChange={handleFormChange}
            />
          ) : (
            <ProjectOverview
              project={projectForOverview}
              onEdit={handleEdit}
              onStateChange={handleStateChange}
            />
          )}
        </div>

        {currentStep !== 'overview' && (
          <PersistentBottomBar
            currentStep={currentStep}
            isFormValid={isFormValid}
            onBack={handleBack}
            onSave={handleSave}
            onNext={handleNext}
          />
        )}
      </div>
    </div>
  );
};

export default AddNewVideoModal;
