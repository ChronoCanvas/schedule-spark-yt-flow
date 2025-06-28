
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import PlanningShootingPage from './PlanningShootingPage';
import PersistentBottomBar from './PersistentBottomBar';

interface AddNewVideoModalProps {
  open: boolean;
  onClose: () => void;
}

const AddNewVideoModal: React.FC<AddNewVideoModalProps> = ({ open, onClose }) => {
  const [canSave, setCanSave] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    ideas: '',
    script: '',
    scenes: [],
    teamAssignments: {}
  });

  const handleSave = () => {
    console.log('Saving project:', formData);
    // TODO: Implement save logic
    onClose();
  };

  const handleFormChange = (data: any) => {
    setFormData(data);
    // Enable save button if required fields are filled
    setCanSave(data.title || data.ideas || data.script || data.scenes.length > 0);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] p-0 bg-black border-gray-800 overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            <PlanningShootingPage 
              formData={formData}
              onChange={handleFormChange}
            />
          </div>
          <PersistentBottomBar
            onBack={onClose}
            onSave={handleSave}
            canSave={canSave}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewVideoModal;
