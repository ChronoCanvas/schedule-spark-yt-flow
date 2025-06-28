
import React from 'react';
import { Calendar, Users, MoreHorizontal } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getStateColor = (state: string) => {
    switch (state) {
      case 'planning': return 'text-yellow-400';
      case 'production': return 'text-blue-400';
      case 'scheduled': return 'text-orange-400';
      case 'uploaded': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getGlowColor = (state: string) => {
    switch (state) {
      case 'planning': return 'orange' as const;
      case 'production': return 'blue' as const;
      case 'scheduled': return 'purple' as const;
      case 'uploaded': return 'green' as const;
      default: return 'blue' as const;
    }
  };

  return (
    <GlowCard 
      glowColor={getGlowColor(project.state)}
      customSize={true}
      className="bg-gray-950 border border-gray-900 rounded-lg p-6 h-full cursor-pointer group hover:border-red-500/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium capitalize ${getStateColor(project.state)}`}>
            {project.state}
          </span>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnail */}
      <div className="w-full h-32 bg-gray-700 rounded-lg mb-4 overflow-hidden">
        {project.thumbnail ? (
          <img 
            src={project.thumbnail} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <div className="w-16 h-12 bg-gray-600 rounded-sm"></div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white group-hover:text-red-300 transition-colors line-clamp-2">
          {project.title}
        </h4>
        
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>Modified {formatDate(project.lastModified)}</span>
          </div>
        </div>
        
        {project.teamMembers.length > 0 && (
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-400" />
            <div className="flex -space-x-1">
              {project.teamMembers.slice(0, 4).map((member, idx) => (
                <div
                  key={member.id}
                  className="w-6 h-6 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center text-xs text-white"
                  title={member.name}
                >
                  {member.name.charAt(0).toUpperCase()}
                </div>
              ))}
              {project.teamMembers.length > 4 && (
                <div className="w-6 h-6 rounded-full bg-gray-600 border border-gray-500 flex items-center justify-center text-xs text-gray-300">
                  +{project.teamMembers.length - 4}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </GlowCard>
  );
};

export default ProjectCard;
