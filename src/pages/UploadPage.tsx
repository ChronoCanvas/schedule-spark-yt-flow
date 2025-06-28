
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const UploadPage: React.FC = () => {
  return (
    <DashboardLayout title="Upload & Scheduling">
      <div className="space-y-6">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Upload Video</h2>
          <p className="text-gray-400">Video upload interface coming soon...</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadPage;
