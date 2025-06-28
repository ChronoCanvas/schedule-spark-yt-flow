
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface TagSelectorProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ selectedTags, onChange }) => {
  const [customTag, setCustomTag] = useState('');
  
  const presetTags = [
    'Talking Head',
    'Interview Style',
    'Voiceover',
    'Screen Recording',
    'Action',
    'B-Roll / Supplementary Shots'
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter(t => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  const addCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      onChange([...selectedTags, customTag.trim()]);
      setCustomTag('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addCustomTag();
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-2">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {presetTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedTags.includes(tag)
                  ? 'bg-red-600 border-red-600 hover:bg-red-700'
                  : 'border-gray-600 text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Add custom tag"
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          onKeyPress={handleKeyPress}
          className="bg-gray-800 border-gray-600 text-white text-sm"
        />
        <Button
          onClick={addCustomTag}
          disabled={!customTag.trim()}
          variant="outline"
          size="sm"
          className="border-gray-600 text-gray-300 hover:bg-gray-800"
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>

      {selectedTags.length > 0 && (
        <div className="text-xs text-gray-500">
          Selected: {selectedTags.join(', ')}
        </div>
      )}
    </div>
  );
};

export default TagSelector;
