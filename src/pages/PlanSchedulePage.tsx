
import React, { useState } from 'react';
import NewAppSidebar from '@/components/dashboard/NewAppSidebar';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowButton } from '@/components/ui/glow-button';
import { Badge } from '@/components/ui/badge';
import { Plus, Filter, Play } from 'lucide-react';

// Project state type
type ProjectState = 'Planning' | 'Production' | 'Scheduled' | 'Uploaded';

// Project interface
interface Project {
  id: string;
  title: string;
  thumbnail: string;
  state: ProjectState;
  createdAt: string;
  description?: string;
}

// Mock data for projects
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'How to Build a React App',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
    state: 'Planning',
    createdAt: '2024-06-20',
    description: 'Complete tutorial on React development'
  },
  {
    id: '2',
    title: 'JavaScript ES6 Features',
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
    state: 'Production',
    createdAt: '2024-06-18',
    description: 'Advanced JavaScript concepts explained'
  },
  {
    id: '3',
    title: 'CSS Grid vs Flexbox',
    thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
    state: 'Scheduled',
    createdAt: '2024-06-15',
    description: 'Layout comparison and best practices'
  },
  {
    id: '4',
    title: 'Node.js Backend Setup',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
    state: 'Uploaded',
    createdAt: '2024-06-10',
    description: 'Server-side development tutorial'
  },
  {
    id: '5',
    title: 'Database Design Principles',
    thumbnail: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop',
    state: 'Planning',
    createdAt: '2024-06-25',
    description: 'SQL and NoSQL database concepts'
  },
  {
    id: '6',
    title: 'API Development Best Practices',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    state: 'Production',
    createdAt: '2024-06-22',
    description: 'RESTful API design and implementation'
  }
];

const getStateColor = (state: ProjectState) => {
  switch (state) {
    case 'Planning':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'Production':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    case 'Scheduled':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
    case 'Uploaded':
      return 'bg-green-500/20 text-green-400 border-green-500/50';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  }
};

const PlanSchedulePage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [selectedState, setSelectedState] = useState<ProjectState | 'All'>('All');

  const states: (ProjectState | 'All')[] = ['All', 'Planning', 'Production', 'Scheduled', 'Uploaded'];

  const filteredProjects = selectedState === 'All' 
    ? mockProjects 
    : mockProjects.filter(project => project.state === selectedState);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-black flex w-full">
      {/* Sidebar */}
      <NewAppSidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      {/* Main Content */}
      <div 
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        style={{ 
          marginLeft: sidebarCollapsed ? '60px' : '300px'
        }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">Plan & Schedule</h1>
              
              {/* Filter Dropdown */}
              <div className="relative">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value as ProjectState | 'All')}
                  className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg pr-8 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {states.map(state => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Add New Project Button */}
            <GlowButton
              glowColor="red"
              leftIcon={<Plus className="w-4 h-4" />}
              className="bg-red-600 hover:bg-red-700 rounded-lg px-6 py-3"
            >
              Add New Project
            </GlowButton>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <GlowCard
                key={project.id}
                glowColor="red"
                customSize={true}
                className="w-full h-auto aspect-auto grid-rows-none gap-0 p-6 bg-gray-900/50 border border-gray-800 hover:border-red-500/50 transition-all duration-200 cursor-pointer"
              >
                <div className="flex flex-col h-full">
                  {/* Project Thumbnail */}
                  <div className="relative mb-4 rounded-lg overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={`${getStateColor(project.state)} border`}>
                        {project.state}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2 truncate">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                      <span className="uppercase tracking-wide font-medium">
                        {project.state}
                      </span>
                    </div>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-gray-400 text-center">
                <div className="text-6xl mb-4">📹</div>
                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                <p className="text-sm">
                  {selectedState === 'All' 
                    ? 'Create your first project to get started'
                    : `No projects in ${selectedState} state`
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanSchedulePage;
