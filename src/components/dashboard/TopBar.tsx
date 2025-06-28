
import React, { useState } from 'react';
import { Search, Bell, Menu, Upload, Radio, UserPlus } from 'lucide-react';

interface TopBarProps {
  title: string;
  onMenuClick: () => void;
  showMobileMenu?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ title, onMenuClick, showMobileMenu = false }) => {
  const [searchValue, setSearchValue] = useState('');

  const quickActions = [
    {
      id: 'upload',
      label: 'Upload Video',
      icon: Upload,
      color: 'bg-red-500 hover:bg-red-600',
      href: '/dashboard/upload'
    },
    {
      id: 'livestream',
      label: 'Schedule Livestream',
      icon: Radio,
      color: 'bg-blue-500 hover:bg-blue-600',
      href: '/dashboard/livestreams'
    },
    {
      id: 'team',
      label: 'Add Team Member',
      icon: UserPlus,
      color: 'bg-green-500 hover:bg-green-600',
      href: '/dashboard/team'
    }
  ];

  return (
    <div className="bg-black border-b border-gray-800 px-4 py-3 flex items-center justify-between">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        {showMobileMenu && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 text-gray-400"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        
        <div>
          <h1 className="text-xl font-semibold text-white">{title}</h1>
        </div>
      </div>

      {/* Center - Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search videos, comments..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-3">
        {/* Mobile search */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-800 text-gray-400">
          <Search className="w-5 h-5" />
        </button>

        {/* Quick Actions */}
        <div className="hidden sm:flex items-center space-x-2">
          {quickActions.map((action) => (
            <button
              key={action.id}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium
                ${action.color} text-white
                transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
              `}
            >
              <action.icon className="w-4 h-4" />
              <span className="hidden lg:block">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Quick Actions - Icons only */}
        <div className="sm:hidden flex items-center space-x-1">
          {quickActions.map((action) => (
            <button
              key={action.id}
              className={`
                p-2 rounded-lg
                ${action.color} text-white
                transition-all duration-200 focus:outline-none
              `}
            >
              <action.icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
