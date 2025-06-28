
import React from 'react';
import { motion } from 'framer-motion';
import { GlowCard } from '@/components/ui/spotlight-card';
import { ProjectStateSection as ProjectStateSectionType } from '@/types/project';
import ProjectCard from './ProjectCard';

interface ProjectStateSectionProps {
  section: ProjectStateSectionType;
  index: number;
}

const ProjectStateSection: React.FC<ProjectStateSectionProps> = ({ section, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <GlowCard 
        glowColor={section.color}
        customSize={true}
        className="bg-gray-950 border border-gray-900 rounded-lg p-4 h-full min-h-[350px]"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-white">{section.title}</h3>
          <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
            {section.projects.length}
          </span>
        </div>
        
        <div className="space-y-2 max-h-[280px] overflow-y-auto scrollbar-hide">
          {section.projects.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              <p className="text-sm">No projects in {section.title.toLowerCase()}</p>
            </div>
          ) : (
            section.projects.map((project, projectIndex) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={projectIndex}
              />
            ))
          )}
        </div>
      </GlowCard>
    </motion.div>
  );
};

export default ProjectStateSection;
