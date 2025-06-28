
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProjectStateSection from '@/components/plan-schedule/ProjectStateSection';
import AddNewProjectButton from '@/components/plan-schedule/AddNewProjectButton';
import { Project, ProjectStateSection as ProjectStateSectionType } from '@/types/project';

// Mock data for projects
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'How to Grow Your YouTube Channel Fast',
    state: 'planning',
    createdAt: '2024-06-25',
    lastModified: '2024-06-27',
    teamMembers: [
      { id: '1', name: 'John Doe', role: 'Script Writer' },
      { id: '2', name: 'Jane Smith', role: 'Editor' }
    ]
  },
  {
    id: '2',
    title: 'Best YouTube SEO Tips for Beginners',
    state: 'production',
    createdAt: '2024-06-20',
    lastModified: '2024-06-26',
    teamMembers: [
      { id: '1', name: 'John Doe', role: 'Host' }
    ]
  },
  {
    id: '3',
    title: 'Creating Viral Content: What Actually Works',
    state: 'scheduled',
    createdAt: '2024-06-18',
    lastModified: '2024-06-25',
    scheduledDate: '2024-06-30',
    teamMembers: [
      { id: '1', name: 'John Doe', role: 'Host' },
      { id: '2', name: 'Jane Smith', role: 'Editor' },
      { id: '3', name: 'Mike Johnson', role: 'Uploader' }
    ]
  },
  {
    id: '4',
    title: 'YouTube Analytics Deep Dive',
    state: 'uploaded',
    createdAt: '2024-06-15',
    lastModified: '2024-06-23',
    uploadedDate: '2024-06-23',
    teamMembers: [
      { id: '1', name: 'John Doe', role: 'Host' }
    ]
  }
];

const PlanSchedulePage: React.FC = () => {
  const [projects] = useState<Project[]>(mockProjects);

  const handleAddNewProject = () => {
    console.log('Add new project clicked');
    // TODO: Implement add new project flow
  };

  // Group projects by state
  const projectSections: ProjectStateSectionType[] = [
    {
      state: 'planning',
      title: '🟡 Planning',
      color: 'orange',
      projects: projects.filter(p => p.state === 'planning')
    },
    {
      state: 'production',
      title: '🛠️ Production',
      color: 'blue',
      projects: projects.filter(p => p.state === 'production')
    },
    {
      state: 'scheduled',
      title: '🗓 Scheduled',
      color: 'purple',
      projects: projects.filter(p => p.state === 'scheduled')
    },
    {
      state: 'uploaded',
      title: '✅ Uploaded',
      color: 'green',
      projects: projects.filter(p => p.state === 'uploaded')
    }
  ];

  return (
    <DashboardLayout title="Plan & Schedule">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AddNewProjectButton onClick={handleAddNewProject} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {projectSections.map((section, index) => (
            <ProjectStateSection
              key={section.state}
              section={section}
              index={index}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlanSchedulePage;
