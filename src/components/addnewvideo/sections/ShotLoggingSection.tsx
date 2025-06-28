
import React from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowButton } from '@/components/ui/glow-button';
import { GlowInput } from '@/components/ui/glow-input';
import { Plus, X } from 'lucide-react';

interface Scene {
  id: string;
  name: string;
  tags: string[];
  shots: Array<{
    id: string;
    name: string;
  }>;
}

interface ShotLoggingSectionProps {
  scenes: Scene[];
  onChange: (scenes: Scene[]) => void;
}

const presetTags = [
  'Talking Head',
  'Interview Style', 
  'Voiceover',
  'Screen Recording',
  'Action',
  'B-Roll'
];

const ShotLoggingSection: React.FC<ShotLoggingSectionProps> = ({ scenes, onChange }) => {
  const addScene = () => {
    const newScene: Scene = {
      id: Date.now().toString(),
      name: '',
      tags: [],
      shots: []
    };
    onChange([...scenes, newScene]);
  };

  const updateScene = (sceneId: string, updates: Partial<Scene>) => {
    const updatedScenes = scenes.map(scene =>
      scene.id === sceneId ? { ...scene, ...updates } : scene
    );
    onChange(updatedScenes);
  };

  const removeScene = (sceneId: string) => {
    onChange(scenes.filter(scene => scene.id !== sceneId));
  };

  const addShot = (sceneId: string) => {
    const newShot = {
      id: Date.now().toString(),
      name: ''
    };
    
    const updatedScenes = scenes.map(scene =>
      scene.id === sceneId 
        ? { ...scene, shots: [...scene.shots, newShot] }
        : scene
    );
    onChange(updatedScenes);
  };

  const updateShot = (sceneId: string, shotId: string, name: string) => {
    const updatedScenes = scenes.map(scene =>
      scene.id === sceneId
        ? {
            ...scene,
            shots: scene.shots.map(shot =>
              shot.id === shotId ? { ...shot, name } : shot
            )
          }
        : scene
    );
    onChange(updatedScenes);
  };

  const removeShot = (sceneId: string, shotId: string) => {
    const updatedScenes = scenes.map(scene =>
      scene.id === sceneId
        ? { ...scene, shots: scene.shots.filter(shot => shot.id !== shotId) }
        : scene
    );
    onChange(updatedScenes);
  };

  const toggleTag = (sceneId: string, tag: string) => {
    const scene = scenes.find(s => s.id === sceneId);
    if (!scene) return;

    const newTags = scene.tags.includes(tag)
      ? scene.tags.filter(t => t !== tag)
      : [...scene.tags, tag];
    
    updateScene(sceneId, { tags: newTags });
  };

  return (
    <GlowCard glowColor="green" customSize className="w-full p-6 mb-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Shot Logging & Metadata</h2>
          <GlowButton
            glowColor="green"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={addScene}
            className="bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2"
          >
            Add Scene
          </GlowButton>
        </div>

        {scenes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <div className="text-4xl mb-2">🎬</div>
              <p>No scenes added yet</p>
              <p className="text-sm">Click "Add Scene" to start planning your shots</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {scenes.map((scene) => (
              <div key={scene.id} className="bg-gray-800 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <GlowInput
                    glowColor="green"
                    placeholder="Scene name"
                    value={scene.name}
                    onChange={(e) => updateScene(scene.id, { name: e.target.value })}
                    className="flex-1 mr-4"
                  />
                  <button
                    onClick={() => removeScene(scene.id)}
                    className="text-red-400 hover:text-red-300 p-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-300">Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {presetTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(scene.id, tag)}
                        className={`px-3 py-1 rounded-full text-xs transition-colors ${
                          scene.tags.includes(tag)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shots */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-300">Shots:</p>
                    <GlowButton
                      glowColor="green"
                      leftIcon={<Plus className="w-3 h-3" />}
                      onClick={() => addShot(scene.id)}
                      className="bg-green-600 hover:bg-green-700 rounded px-3 py-1 text-xs"
                    >
                      Add Shot
                    </GlowButton>
                  </div>

                  {scene.shots.map((shot) => (
                    <div key={shot.id} className="flex items-center space-x-2">
                      <GlowInput
                        glowColor="green"
                        placeholder="Shot name"
                        value={shot.name}
                        onChange={(e) => updateShot(scene.id, shot.id, e.target.value)}
                        className="flex-1 h-8 text-sm"
                      />
                      <button
                        onClick={() => removeShot(scene.id, shot.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </GlowCard>
  );
};

export default ShotLoggingSection;
