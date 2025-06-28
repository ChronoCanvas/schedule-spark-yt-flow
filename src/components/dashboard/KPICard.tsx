
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  index: number;
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon,
  index 
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-700/50 rounded-lg">
          <Icon className="w-5 h-5 text-gray-300" />
        </div>
        <span className={`text-sm font-medium ${getChangeColor()}`}>
          {change}
        </span>
      </div>
      
      <div>
        <div className="text-2xl font-semibold text-white mb-1">
          {value}
        </div>
        <div className="text-sm text-gray-400">
          {title}
        </div>
      </div>
    </motion.div>
  );
};

export default KPICard;
