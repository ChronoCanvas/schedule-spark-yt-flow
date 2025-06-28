
import React from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowInput } from '@/components/ui/glow-input';
import { Users, Plus, X } from 'lucide-react';
import { GlowButton } from '@/components/ui/glow-button';

interface TeamAssignments {
  script: string[];
  editing: string[];
  uploading: string[];
}

interface TeamAssignmentSectionProps {
  teamAssignments: TeamAssignments;
  onChange: (assignments: TeamAssignments) => void;
}

const TeamAssignmentSection: React.FC<TeamAssignmentSectionProps> = ({
  teamAssignments,
  onChange
}) => {
  const addMember = (role: keyof TeamAssignments, member: string) => {
    if (!member.trim()) return;
    
    const updatedAssignments = {
      ...teamAssignments,
      [role]: [...teamAssignments[role], member.trim()]
    };
    onChange(updatedAssignments);
  };

  const removeMember = (role: keyof TeamAssignments, index: number) => {
    const updatedAssignments = {
      ...teamAssignments,
      [role]: teamAssignments[role].filter((_, i) => i !== index)
    };
    onChange(updatedAssignments);
  };

  const RoleSection = ({ 
    role, 
    title, 
    members 
  }: { 
    role: keyof TeamAssignments;
    title: string;
    members: string[];
  }) => {
    const [newMember, setNewMember] = React.useState('');

    const handleAdd = () => {
      addMember(role, newMember);
      setNewMember('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleAdd();
      }
    };

    return (
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-white flex items-center">
          <Users className="w-4 h-4 mr-2" />
          {title}
        </h3>
        
        <div className="flex space-x-2">
          <GlowInput
            glowColor="orange"
            placeholder="Enter team member name"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 h-9"
          />
          <GlowButton
            glowColor="orange"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={handleAdd}
            className="bg-orange-600 hover:bg-orange-700 rounded-lg px-4 py-2"
          >
            Add
          </GlowButton>
        </div>

        {members.length > 0 && (
          <div className="space-y-2">
            {members.map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-800 rounded-lg p-3"
              >
                <span className="text-white">{member}</span>
                <button
                  onClick={() => removeMember(role, index)}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <GlowCard glowColor="orange" customSize className="w-full p-6">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">Team Assignment</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RoleSection
            role="script"
            title="Script Writing"
            members={teamAssignments.script}
          />
          
          <RoleSection
            role="editing"
            title="Video Editing"
            members={teamAssignments.editing}
          />
          
          <RoleSection
            role="uploading"
            title="Upload & Publishing"
            members={teamAssignments.uploading}
          />
        </div>

        <div className="text-sm text-gray-400">
          <p>• Team members can be assigned to multiple roles</p>
          <p>• Leave roles empty if handling solo or assigning later</p>
        </div>
      </div>
    </GlowCard>
  );
};

export default TeamAssignmentSection;
