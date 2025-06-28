
import React from 'react';
import TitleSection from './sections/TitleSection';
import WorkspaceSection from './sections/WorkspaceSection';
import ShotLoggingSection from './sections/ShotLoggingSection';
import TeamAssignmentSection from './sections/TeamAssignmentSection';

interface PlanningShootingPageProps {
  formData: any;
  onChange: (data: any) => void;
}

const PlanningShootingPage: React.FC<PlanningShootingPageProps> = ({
  formData,
  onChange
}) => {
  const updateFormData = (section: string, value: any) => {
    const newFormData = { ...formData, [section]: value };
    onChange(newFormData);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Plan & Shoot New Video</h1>
        <p className="text-gray-400">Organize your ideas, script, and production workflow</p>
      </div>

      <TitleSection
        value={formData.title}
        onChange={(value) => updateFormData('title', value)}
      />

      <WorkspaceSection
        ideas={formData.ideas}
        script={formData.script}
        onIdeasChange={(value) => updateFormData('ideas', value)}
        onScriptChange={(value) => updateFormData('script', value)}
      />

      <ShotLoggingSection
        scenes={formData.scenes}
        onChange={(value) => updateFormData('scenes', value)}
      />

      <TeamAssignmentSection
        assignments={formData.teamAssignments}
        onChange={(value) => updateFormData('teamAssignments', value)}
      />
    </div>
  );
};

export default PlanningShootingPage;
