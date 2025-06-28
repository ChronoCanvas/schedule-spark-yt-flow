
import React, { useState } from 'react';
import AppSidebar from './AppSidebar';
import TopBar from './TopBar';
import { NotificationProvider } from '@/contexts/NotificationContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-black flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <AppSidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMobileMenu} />
            <div className="relative">
              <AppSidebar collapsed={false} onToggle={toggleMobileMenu} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar 
            title={title} 
            onMenuClick={toggleMobileMenu}
            showMobileMenu={true}
          />
          
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </NotificationProvider>
  );
};

export default DashboardLayout;
