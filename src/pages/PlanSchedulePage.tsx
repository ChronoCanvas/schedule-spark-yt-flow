
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectStateSection from '@/components/plan-schedule/ProjectStateSection';
import AddNewProjectButton from '@/components/plan-schedule/AddNewProjectButton';
import StateFilters from '@/components/plan-schedule/StateFilters';
import { Project, ProjectStateSection as ProjectStateSectionType, ProjectState } from '@/types/project';

// Mock data for projects with thumbnails
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'How to Grow Your YouTube Channel Fast',
    state: 'planning',
    createdAt: '2024-06-25',
    lastModified: '2024-06-27',
    thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop',
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
    thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop',
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
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop',
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
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop',
    teamMembers: [
      { id: '1', name: 'John Doe', role: 'Host' }
    ]
  },
  {
    id: '5',
    title: 'Beginner Guide to Video Editing',
    state: 'planning',
    createdAt: '2024-06-22',
    lastModified: '2024-06-27',
    teamMembers: [
      { id: '2', name: 'Jane Smith', role: 'Editor' }
    ]
  }
];

const PlanSchedulePage: React.FC = () => {
  const [projects] = useState<Project[]>(mockProjects);
  const [activeFilter, setActiveFilter] = useState<ProjectState | 'all'>('all');

  const handleAddNewProject = () => {
    console.log('Add new project clicked');
    // TODO: Implement add new project flow
  };

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.state === activeFilter);

  // Group projects by state
  const projectSections: ProjectStateSectionType[] = [
    {
      state: 'planning',
      title: '🟡 Planning',
      color: 'orange',
      projects: filteredProjects.filter(p => p.state === 'planning')
    },
    {
      state: 'production',
      title: '🛠️ Production',
      color: 'blue',
      projects: filteredProjects.filter(p => p.state === 'production')
    },
    {
      state: 'scheduled',
      title: '🗓 Scheduled',
      color: 'purple',
      projects: filteredProjects.filter(p => p.state === 'scheduled')
    },
    {
      state: 'uploaded',
      title: '✅ Uploaded',
      color: 'green',
      projects: filteredProjects.filter(p => p.state === 'uploaded')
    }
  ];

  // Hide sections if they're empty and we're filtering
  const visibleSections = activeFilter === 'all' 
    ? projectSections 
    : projectSections.filter(section => section.projects.length > 0);

  return (
    <div className="min-h-screen bg-black">
      {/* Custom header without DashboardLayout */}
      <div className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-white">Plan & Schedule</h1>
            <AddNewProjectButton onClick={handleAddNewProject} />
          </div>
          <StateFilters 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {visibleSections.map((section, index) => (
            <ProjectStateSection
              key={section.state}
              section={section}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanSchedulePage;
