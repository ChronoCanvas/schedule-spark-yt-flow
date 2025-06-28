
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, MoreHorizontal } from 'lucide-react';
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

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-sm font-medium text-white truncate flex-1 group-hover:text-red-300 transition-colors">
          {project.title}
        </h4>
        <button className="text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
        <span className={`capitalize ${getStateColor(project.state)}`}>
          {project.state}
        </span>
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(project.lastModified)}</span>
        </div>
      </div>
      
      {project.teamMembers.length > 0 && (
        <div className="flex items-center space-x-1">
          <Users className="w-3 h-3 text-gray-400" />
          <div className="flex -space-x-1">
            {project.teamMembers.slice(0, 3).map((member, idx) => (
              <div
                key={member.id}
                className="w-5 h-5 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center text-xs text-white"
                title={member.name}
              >
                {member.name.charAt(0).toUpperCase()}
              </div>
            ))}
            {project.teamMembers.length > 3 && (
              <div className="w-5 h-5 rounded-full bg-gray-600 border border-gray-500 flex items-center justify-center text-xs text-gray-300">
                +{project.teamMembers.length - 3}
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCard;
