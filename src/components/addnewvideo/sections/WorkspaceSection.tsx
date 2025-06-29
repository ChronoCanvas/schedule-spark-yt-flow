
import React, { useState, useRef, useEffect } from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowTextarea, GlowTextareaRef } from '@/components/ui/glow-textarea';
import { GlowButton } from '@/components/ui/glow-button';
import { Upload, FileText, Play, Bold, Highlighter } from 'lucide-react';
import TeleprompterMode from '../teleprompter/TeleprompterMode';
import { useTextFormatting } from '@/hooks/useTextFormatting';

interface WorkspaceSectionProps {
  ideas: string;
  script: string;
  storyboardFiles: File[];
  onIdeasChange: (value: string) => void;
  onScriptChange: (value: string) => void;
  onStoryboardFilesChange: (files: File[]) => void;
}

const WorkspaceSection: React.FC<WorkspaceSectionProps> = ({
  ideas,
  script,
  storyboardFiles,
  onIdeasChange,
  onScriptChange,
  onStoryboardFilesChange
}) => {
  const [showTeleprompter, setShowTeleprompter] = useState(false);
  const scriptTextareaRef = useRef<GlowTextareaRef>(null);
  
  const {
    isBoldActive,
    isHighlightActive,
    toggleBold,
    toggleHighlight,
    checkFormattingAtCursor
  } = useTextFormatting(scriptTextareaRef, script);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onStoryboardFilesChange([...storyboardFiles, ...files]);
  };

  const removeFile = (index: number) => {
    const newFiles = storyboardFiles.filter((_, i) => i !== index);
    onStoryboardFilesChange(newFiles);
  };

  const handleScriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onScriptChange(e.target.value);
    setTimeout(checkFormattingAtCursor, 0);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey)) {
        if (e.key === 'b') {
          e.preventDefault();
          toggleBold();
        } else if (e.key === 'h') {
          e.preventDefault();
          toggleHighlight();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleBold, toggleHighlight]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left Column - Ideation */}
        <GlowCard glowColor="blue" customSize className="w-full p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Ideation</h2>
            
            <GlowTextarea
              glowColor="blue"
              value={ideas}
              onChange={(e) => onIdeasChange(e.target.value)}
              placeholder="Brainstorm your video ideas here... What's the concept? Target audience? Key messages?"
              className="min-h-[200px]"
            />

            {/* File Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Storyboard Files</h3>
              
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400 mb-2">Drop files here or click to upload</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.gif"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="storyboard-upload"
                />
                <label htmlFor="storyboard-upload">
                  <GlowButton
                    glowColor="blue"
                    leftIcon={<Upload className="w-4 h-4" />}
                    className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
                  >
                    Choose Files
                  </GlowButton>
                </label>
              </div>

              {/* File List */}
              {storyboardFiles.length > 0 && (
                <div className="space-y-2">
                  {storyboardFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span className="text-white text-sm">{file.name}</span>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </GlowCard>

        {/* Right Column - Script Editor */}
        <GlowCard glowColor="purple" customSize className="w-full p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Script Editor</h2>
              <div className="flex space-x-2">
                <GlowButton
                  glowColor="purple"
                  leftIcon={<FileText className="w-4 h-4" />}
                  className="bg-purple-600 hover:bg-purple-700 rounded-lg px-4 py-2"
                >
                  Export PDF
                </GlowButton>
                <GlowButton
                  glowColor="purple"
                  leftIcon={<Play className="w-4 h-4" />}
                  onClick={() => setShowTeleprompter(true)}
                  className="bg-purple-600 hover:bg-purple-700 rounded-lg px-4 py-2"
                >
                  Teleprompter
                </GlowButton>
              </div>
            </div>
            
            <GlowTextarea
              ref={scriptTextareaRef}
              glowColor="purple"
              value={script}
              onChange={handleScriptChange}
              placeholder="Write your script here... Use formatting for emphasis and clarity."
              className="min-h-[300px]"
              onSelect={checkFormattingAtCursor}
              onClick={checkFormattingAtCursor}
            />

            <div className="flex space-x-2 flex-wrap">
              <button 
                onClick={toggleBold}
                className={`flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors ${
                  isBoldActive 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                <Bold className="w-3 h-3" />
                <span>Bold</span>
              </button>
              <button 
                onClick={toggleHighlight}
                className={`flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors ${
                  isHighlightActive 
                    ? 'bg-yellow-600 text-white' 
                    : 'bg-red-900/30 hover:bg-red-900/50 text-white'
                }`}
              >
                <Highlighter className="w-3 h-3" />
                <span>Highlight</span>
              </button>
            </div>

            <div className="text-xs text-gray-500 mt-2">
              <p>Tip: Select text and click formatting buttons, or use Ctrl+B (bold) and Ctrl+H (highlight)</p>
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Teleprompter Mode */}
      {showTeleprompter && (
        <TeleprompterMode
          script={script}
          onClose={() => setShowTeleprompter(false)}
        />
      )}
    </>
  );
};

export default WorkspaceSection;
