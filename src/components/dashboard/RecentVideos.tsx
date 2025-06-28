
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ThumbsUp, MessageCircle, Calendar } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  publishDate: string;
  status: 'published' | 'scheduled' | 'draft';
}

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'How to Grow Your YouTube Channel Fast in 2024',
    thumbnail: '/placeholder.svg',
    views: 45230,
    likes: 1205,
    comments: 89,
    publishDate: '2024-06-27',
    status: 'published'
  },
  {
    id: '2',
    title: 'Best YouTube SEO Tips for Beginners',
    thumbnail: '/placeholder.svg',
    views: 32100,
    likes: 892,
    comments: 67,
    publishDate: '2024-06-25',
    status: 'published'
  },
  {
    id: '3',
    title: 'Creating Viral Content: What Actually Works',
    thumbnail: '/placeholder.svg',
    views: 18750,
    likes: 445,
    comments: 34,
    publishDate: '2024-06-23',
    status: 'published'
  },
  {
    id: '4',
    title: 'YouTube Analytics Deep Dive',
    thumbnail: '/placeholder.svg',
    views: 0,
    likes: 0,
    comments: 0,
    publishDate: '2024-06-30',
    status: 'scheduled'
  }
];

const RecentVideos: React.FC = () => {
  const getStatusColor = (status: Video['status']) => {
    switch (status) {
      case 'published': return 'text-green-400 bg-green-400/20';
      case 'scheduled': return 'text-yellow-400 bg-yellow-400/20';
      case 'draft': return 'text-gray-400 bg-gray-400/20';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <GlowCard 
        glowColor="red" 
        customSize={true}
        className="bg-gray-950 border border-gray-900 rounded-lg p-6 w-full h-auto aspect-auto grid-rows-none gap-0"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Recent Videos</h2>
          <button className="text-sm text-red-400 hover:text-red-300">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {mockVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className="flex items-center space-x-4 p-3 rounded-xl hover:bg-red-500/10 hover:rounded-xl transition-all duration-300 cursor-pointer"
            >
              {/* Thumbnail - Made larger */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-32 h-20 bg-gray-800 rounded object-cover flex-shrink-0"
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-medium text-white truncate mb-1">
                  {video.title}
                </h3>
                
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{formatNumber(video.views)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{formatNumber(video.likes)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{formatNumber(video.comments)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{video.publishDate}</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex-shrink-0">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(video.status)}`}>
                  {video.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </GlowCard>
    </motion.div>
  );
};

export default RecentVideos;
