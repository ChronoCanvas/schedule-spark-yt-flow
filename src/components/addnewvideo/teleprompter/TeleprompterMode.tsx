
import React, { useState, useEffect } from 'react';
import { X, Settings, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface TeleprompterModeProps {
  script: string;
  onClose: () => void;
}

const TeleprompterMode: React.FC<TeleprompterModeProps> = ({ script, onClose }) => {
  const [scrollSpeed, setScrollSpeed] = useState([2]);
  const [highlightColor, setHighlightColor] = useState('#ff6b6b');
  const [toolbarVisible, setToolbarVisible] = useState(true);

  const colors = [
    { name: 'Red', value: '#ff6b6b' },
    { name: 'Yellow', value: '#ffd93d' },
    { name: 'Green', value: '#6bcf7f' },
    { name: 'Blue', value: '#4dabf7' },
    { name: 'Purple', value: '#845ef7' }
  ];

  // Create dynamic CSS for animation
  useEffect(() => {
    const styleId = 'teleprompter-animation';
    let existingStyle = document.getElementById(styleId);
    
    if (!existingStyle) {
      existingStyle = document.createElement('style');
      existingStyle.id = styleId;
      document.head.appendChild(existingStyle);
    }

    const animationDuration = 20 / scrollSpeed[0];
    existingStyle.textContent = `
      @keyframes teleprompter-scroll {
        0% { transform: translateY(100vh); }
        100% { transform: translateY(-100%); }
      }
      .teleprompter-content {
        animation: teleprompter-scroll ${animationDuration}s linear infinite;
      }
    `;

    return () => {
      const style = document.getElementById(styleId);
      if (style) {
        style.remove();
      }
    };
  }, [scrollSpeed]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Collapsible Toolbar */}
      {toolbarVisible ? (
        <div className="absolute top-0 left-0 right-0 bg-black/90 border-b border-gray-800 p-4 z-10">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <span className="text-white text-sm">Scroll Speed:</span>
                <div className="w-32">
                  <Slider
                    value={scrollSpeed}
                    onValueChange={setScrollSpeed}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
                <span className="text-gray-400 text-sm">{scrollSpeed[0]}x</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Palette className="w-4 h-4 text-white" />
                <div className="flex space-x-1">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setHighlightColor(color.value)}
                      className={`w-6 h-6 rounded-full border-2 ${
                        highlightColor === color.value ? 'border-white' : 'border-gray-600'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setToolbarVisible(false)}
                className="text-gray-400 hover:text-white"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setToolbarVisible(true)}
          className="absolute top-4 right-4 z-10 bg-gray-800/80 hover:bg-gray-700 rounded-full p-2"
        >
          <Settings className="w-4 h-4" />
        </Button>
      )}

      {/* Script Content */}
      <div className="h-full flex items-center justify-center p-8 pt-20">
        <div className="max-w-4xl w-full">
          <div 
            className="teleprompter-content text-white text-2xl md:text-3xl lg:text-4xl leading-relaxed text-center whitespace-pre-wrap"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${highlightColor}20 30%, ${highlightColor}20 70%, transparent 100%)`
            }}
          >
            {script || 'Your script will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeleprompterMode;
