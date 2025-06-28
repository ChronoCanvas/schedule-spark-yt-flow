
import React from 'react';
import { Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { GlowCard } from '@/components/ui/spotlight-card';

interface TeamAssignmentSectionProps {
  assignments: Record<string, string[]>;
  onChange: (assignments: Record<string, string[]>) => void;
}

const TeamAssignmentSection: React.FC<TeamAssignmentSectionProps> = ({
  assignments,
  onChange
}) => {
  const roles = ['Script', 'Editing', 'Uploading'];
  const mockUsers = ['John Doe', 'Jane Smith', 'Mike Johnson']; // TODO: Replace with real user data

  return (
    <GlowCard
      glowColor="red"
      customSize={true}
      className="w-full h-auto bg-gray-900/50 border border-gray-800 hover:border-red-500/50 transition-all duration-200 p-6"
    >
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Users className="w-5 h-5" />
          Team Assignment
        </h2>
        
        <GlowCard
          glowColor="orange"
          customSize={true}
          className="w-full h-auto bg-gray-800/50 border border-gray-700 hover:border-orange-500/50 transition-all duration-200 p-4"
        >
          <div className="space-y-4">
            {roles.map((role) => (
              <div key={role} className="space-y-2">
                <h4 className="text-sm font-medium text-gray-300">{role}</h4>
                <div className="flex flex-wrap gap-2">
                  {mockUsers.map((user) => (
                    <Badge
                      key={user}
                      variant="outline"
                      className="cursor-pointer border-gray-600 text-gray-300 hover:bg-red-600 hover:border-red-600"
                    >
                      {user}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700/50 rounded text-sm text-yellow-300">
            <strong>Note:</strong> Role assignment logic will be handled on the backend. This is a placeholder interface.
          </div>
        </GlowCard>
      </div>
    </GlowCard>
  );
};

export default TeamAssignmentSection;
