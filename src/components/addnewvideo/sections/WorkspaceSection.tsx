
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Maximize } from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor';
import FileUpload from '../components/FileUpload';
import TeleprompterMode from '../teleprompter/TeleprompterMode';

interface WorkspaceSectionProps {
  ideas: string;
  script: string;
  onIdeasChange: (value: string) => void;
  onScriptChange: (value: string) => void;
}

const WorkspaceSection: React.FC<WorkspaceSectionProps> = ({
  ideas,
  script,
  onIdeasChange,
  onScriptChange
}) => {
  const [teleprompterOpen, setTeleprompterOpen] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Content Workspace</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Ideation */}
        <div className="space-y-4">
          <h3 className="text-md font-medium text-white flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Ideation
          </h3>
          
          <Textarea
            placeholder="Brainstorm your ideas, key points, topics to cover..."
            value={ideas}
            onChange={(e) => onIdeasChange(e.target.value)}
            className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-red-500 min-h-[200px] resize-none"
          />
          
          <FileUpload
            accept=".pdf,.png,.jpg,.jpeg"
            onUpload={(files) => console.log('Storyboard files:', files)}
            label="Upload Storyboards"
            description="PDF or image files"
          />
        </div>

        {/* Right Column - Script Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-medium text-white flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Script Editor
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTeleprompterOpen(true)}
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              <Maximize className="w-4 h-4 mr-2" />
              Teleprompter
            </Button>
          </div>
          
          <RichTextEditor
            value={script}
            onChange={onScriptChange}
            placeholder="Write your script here..."
          />
        </div>
      </div>

      {teleprompterOpen && (
        <TeleprompterMode
          script={script}
          onClose={() => setTeleprompterOpen(false)}
        />
      )}
    </div>
  );
};

export default WorkspaceSection;
