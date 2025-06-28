
import React, { useState } from 'react';
import NewAppSidebar from '@/components/dashboard/NewAppSidebar';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowButton } from '@/components/ui/glow-button';
import { Badge } from '@/components/ui/badge';
import { Plus, ChevronDown, Play, Eye, MessageSquare, Clock, ThumbsUp } from 'lucide-react';

// Project state type
type ProjectState = 'Planning' | 'Production' | 'Scheduled' | 'Uploaded';

// Project interface with YouTube stats
interface Project {
  id: string;
  title: string;
  thumbnail: string;
  state: ProjectState;
  createdAt: string;
  description?: string;
  stats: {
    views: number;
    comments: number;
    watchTime: number; // in minutes
    likes: number;
  };
}

// Mock data for projects with YouTube stats
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'How to Build a React App',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
    state: 'Planning',
    createdAt: '2024-06-20',
    description: 'Complete tutorial on React development',
    stats: { views: 0, comments: 0, watchTime: 0, likes: 0 }
  },
  {
    id: '2',
    title: 'JavaScript ES6 Features',
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
    state: 'Production',
    createdAt: '2024-06-18',
    description: 'Advanced JavaScript concepts explained',
    stats: { views: 0, comments: 0, watchTime: 0, likes: 0 }
  },
  {
    id: '3',
    title: 'CSS Grid vs Flexbox',
    thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
    state: 'Scheduled',
    createdAt: '2024-06-15',
    description: 'Layout comparison and best practices',
    stats: { views: 0, comments: 0, watchTime: 0, likes: 0 }
  },
  {
    id: '4',
    title: 'Node.js Backend Setup',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
    state: 'Uploaded',
    createdAt: '2024-06-10',
    description: 'Server-side development tutorial',
    stats: { views: 12500, comments: 89, watchTime: 2340, likes: 456 }
  },
  {
    id: '5',
    title: 'Database Design Principles',
    thumbnail: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop',
    state: 'Planning',
    createdAt: '2024-06-25',
    description: 'SQL and NoSQL database concepts',
    stats: { views: 0, comments: 0, watchTime: 0, likes: 0 }
  },
  {
    id: '6',
    title: 'API Development Best Practices',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    state: 'Production',
    createdAt: '2024-06-22',
    description: 'RESTful API design and implementation',
    stats: { views: 0, comments: 0, watchTime: 0, likes: 0 }
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

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const formatWatchTime = (minutes: number) => {
  if (minutes === 0) return '0 min';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins} min`;
};

const PlanSchedulePage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [selectedState, setSelectedState] = useState<ProjectState | 'All'>('All');
  const [filterOpen, setFilterOpen] = useState(false);

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
              
              {/* Filter Dropdown with GlowCard - Override default styles */}
              <div className="relative">
                <div 
                  className="cursor-pointer"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <GlowCard
                    glowColor="red"
                    customSize={true}
                    className="w-auto h-10 bg-gray-900/80 border border-gray-700 hover:border-red-500/50 transition-all duration-200 rounded-full p-0 flex items-center justify-center gap-0"
                  >
                    <div className="flex items-center justify-center space-x-2 h-full px-4">
                      <span className="text-white text-sm font-medium">{selectedState}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${filterOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </GlowCard>
                </div>
                
                {filterOpen && (
                  <div className="absolute top-full left-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                    {states.map(state => (
                      <div
                        key={state}
                        className="px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer first:rounded-t-lg last:rounded-b-lg"
                        onClick={() => {
                          setSelectedState(state);
                          setFilterOpen(false);
                        }}
                      >
                        {state}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Add New Project Button */}
            <GlowButton
              glowColor="red"
              leftIcon={<Plus className="w-4 h-4" />}
              className="bg-red-600 hover:bg-red-700 rounded-lg px-6 h-10"
            >
              Add New Video
            </GlowButton>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {filteredProjects.map((project) => (
              <GlowCard
                key={project.id}
                glowColor="red"
                customSize={true}
                className="w-full h-auto bg-gray-900/50 border border-gray-800 hover:border-red-500/50 transition-all duration-200 cursor-pointer p-3"
              >
                <div className="flex flex-col h-full">
                  {/* Video Thumbnail - 16:9 aspect ratio */}
                  <div className="relative mb-3 rounded-lg overflow-hidden">
                    <div className="aspect-[16/9] w-full">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className={`${getStateColor(project.state)} border text-xs`}>
                        {project.state}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 leading-tight">
                      {project.title}
                    </h3>

                    {/* YouTube Stats - Single horizontal line with icons only */}
                    <div className="flex items-center justify-between text-xs mb-2">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-300">{formatNumber(project.stats.views)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-300">{formatNumber(project.stats.likes)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-300">{formatNumber(project.stats.comments)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-300">{formatWatchTime(project.stats.watchTime)}</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      {new Date(project.createdAt).toLocaleDateString()}
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
                <h3 className="text-xl font-semibold mb-2">No videos found</h3>
                <p className="text-sm">
                  {selectedState === 'All' 
                    ? 'Create your first video to get started'
                    : `No videos in ${selectedState} state`
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {filterOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setFilterOpen(false)}
        />
      )}
    </div>
  );
};

export default PlanSchedulePage;
