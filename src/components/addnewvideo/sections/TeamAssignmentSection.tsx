
import React, { useState } from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowButton } from '@/components/ui/glow-button';
import { Users, UserPlus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Updated interface to support all 8 roles
interface TeamAssignments {
  scriptwriter: string[];
  storyboardArtist: string[];
  researcher: string[];
  director: string[];
  videoEditor: string[];
  thumbnailDesigner: string[];
  videographer: string[];
  insightsLead: string[];
}

interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  email: string;
}

interface TeamAssignmentSectionProps {
  teamAssignments: TeamAssignments;
  onChange: (assignments: TeamAssignments) => void;
}

// TODO: Connect to user settings for team member management
// This should be populated from user's team settings/preferences
const mockTeamMembers: TeamMember[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@example.com' },
  { id: '2', name: 'Sarah Chen', email: 'sarah@example.com' },
  { id: '3', name: 'Mike Rodriguez', email: 'mike@example.com' },
  { id: '4', name: 'Emma Wilson', email: 'emma@example.com' },
  { id: '5', name: 'David Kim', email: 'david@example.com' },
  { id: '6', name: 'Lisa Thompson', email: 'lisa@example.com' }
];

const roleLabels = {
  scriptwriter: 'Scriptwriter',
  storyboardArtist: 'Storyboard Artist',
  researcher: 'Researcher',
  director: 'Director',
  videoEditor: 'Video Editor',
  thumbnailDesigner: 'Thumbnail Designer',
  videographer: 'Videographer',
  insightsLead: 'Insights Lead (Analytics)'
};

const TeamAssignmentSection: React.FC<TeamAssignmentSectionProps> = ({
  teamAssignments,
  onChange
}) => {
  const [selectedMemberId, setSelectedMemberId] = useState<string>('');

  const getSelectedMember = () => {
    return mockTeamMembers.find(member => member.id === selectedMemberId);
  };

  const isAssigned = (memberId: string, role: keyof TeamAssignments) => {
    return teamAssignments[role].includes(memberId);
  };

  const toggleAssignment = (memberId: string, role: keyof TeamAssignments) => {
    const currentAssignments = teamAssignments[role];
    const isCurrentlyAssigned = currentAssignments.includes(memberId);
    
    const updatedAssignments = {
      ...teamAssignments,
      [role]: isCurrentlyAssigned
        ? currentAssignments.filter(id => id !== memberId)
        : [...currentAssignments, memberId]
    };
    
    onChange(updatedAssignments);
  };

  const getMemberName = (memberId: string) => {
    const member = mockTeamMembers.find(m => m.id === memberId);
    return member ? member.name : 'Unknown';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const selectedMember = getSelectedMember();

  return (
    <GlowCard glowColor="orange" customSize className="w-full p-6">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">Team Assignment</h2>
        
        {/* Team Member Selector */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-orange-400" />
            <label className="text-sm text-gray-300">Select Team Member</label>
          </div>
          
          <Select value={selectedMemberId} onValueChange={setSelectedMemberId}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Choose a team member to assign roles" />
            </SelectTrigger>
            <SelectContent 
              className="bg-gray-700 border-gray-600 text-white" 
              position="popper"
            >
              {mockTeamMembers.map((member) => (
                <SelectItem 
                  key={member.id} 
                  value={member.id}
                  className="text-white hover:bg-gray-600"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-xs text-white">
                      {getInitials(member.name)}
                    </div>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-xs text-gray-400">{member.email}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Assignment Interface */}
        {selectedMember && (
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              {/* Selected Member Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {getInitials(selectedMember.name)}
                </div>
                <div>
                  <h3 className="text-white font-medium">{selectedMember.name}</h3>
                  <p className="text-gray-400 text-sm">{selectedMember.email}</p>
                </div>
              </div>

              {/* Role Assignment Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.entries(roleLabels).map(([roleKey, roleLabel]) => {
                  const role = roleKey as keyof TeamAssignments;
                  const assigned = isAssigned(selectedMember.id, role);
                  
                  return (
                    <GlowButton
                      key={role}
                      glowColor="orange"
                      onClick={() => toggleAssignment(selectedMember.id, role)}
                      className={`text-xs px-3 py-2 rounded-lg transition-colors ${
                        assigned
                          ? 'bg-orange-600 hover:bg-orange-700 text-white'
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                      leftIcon={assigned ? <UserPlus className="w-3 h-3" /> : undefined}
                    >
                      {assigned ? 'Assigned' : 'Assign'} {roleLabel}
                    </GlowButton>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Current Assignments Summary */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Current Assignments</h3>
          
          {Object.entries(roleLabels).map(([roleKey, roleLabel]) => {
            const role = roleKey as keyof TeamAssignments;
            const assignedMembers = teamAssignments[role];
            
            if (assignedMembers.length === 0) return null;
            
            return (
              <div key={role} className="bg-gray-800 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium text-sm">{roleLabel}</h4>
                  <span className="text-orange-400 text-xs">
                    {assignedMembers.length} member{assignedMembers.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {assignedMembers.map((memberId) => (
                    <div
                      key={memberId}
                      className="flex items-center gap-2 bg-gray-700 rounded-full px-3 py-1"
                    >
                      <div className="w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center text-xs text-white">
                        {getInitials(getMemberName(memberId))}
                      </div>
                      <span className="text-white text-sm">{getMemberName(memberId)}</span>
                      <button
                        onClick={() => toggleAssignment(memberId, role)}
                        className="text-gray-400 hover:text-red-400 ml-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {Object.values(teamAssignments).every(arr => arr.length === 0) && (
            <div className="text-center py-8">
              <div className="text-gray-400">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No team members assigned yet</p>
                <p className="text-sm">Select a team member above to start assigning roles</p>
              </div>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-400 space-y-1">
          <p>• Team members can be assigned to multiple roles</p>
          <p>• Use the dropdown to select and assign team members to specific roles</p>
          <p>• Click on assigned member tags to remove them from roles</p>
        </div>
      </div>
    </GlowCard>
  );
};

export default TeamAssignmentSection;
