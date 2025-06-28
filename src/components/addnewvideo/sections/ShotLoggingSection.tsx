
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X, Video } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';
import TagSelector from '../components/TagSelector';

interface Scene {
  id: string;
  name: string;
  tags: string[];
  shots: Shot[];
}

interface Shot {
  id: string;
  name: string;
}

interface ShotLoggingSectionProps {
  scenes: Scene[];
  onChange: (scenes: Scene[]) => void;
}

const ShotLoggingSection: React.FC<ShotLoggingSectionProps> = ({
  scenes,
  onChange
}) => {
  const addScene = () => {
    const newScene: Scene = {
      id: `scene-${Date.now()}`,
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
    const newShot: Shot = {
      id: `shot-${Date.now()}`,
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

  return (
    <GlowCard
      glowColor="red"
      customSize={true}
      className="w-full h-auto bg-gray-900/50 border border-gray-800 hover:border-red-500/50 transition-all duration-200 p-6"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Video className="w-5 h-5" />
            Shot Logging & Metadata
          </h2>
          <Button
            onClick={addScene}
            className="bg-red-600 hover:bg-red-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Scene
          </Button>
        </div>

        <div className="space-y-4">
          {scenes.map((scene) => (
            <GlowCard
              key={scene.id}
              glowColor="green"
              customSize={true}
              className="w-full h-auto bg-gray-800/50 border border-gray-700 hover:border-green-500/50 transition-all duration-200 p-4"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Input
                    placeholder="Scene name"
                    value={scene.name}
                    onChange={(e) => updateScene(scene.id, { name: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeScene(scene.id)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <TagSelector
                  selectedTags={scene.tags}
                  onChange={(tags) => updateScene(scene.id, { tags })}
                />

                {/* Shots */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-300">Shots</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addShot(scene.id)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Shot
                    </Button>
                  </div>
                  
                  {scene.shots.map((shot) => (
                    <div key={shot.id} className="flex items-center gap-2">
                      <Input
                        placeholder="Shot name"
                        value={shot.name}
                        onChange={(e) => updateShot(scene.id, shot.id, e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white text-sm"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeShot(scene.id, shot.id)}
                        className="text-gray-400 hover:text-red-400 px-2"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </GlowCard>
          ))}

          {scenes.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <Video className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No scenes added yet. Click "Add Scene" to get started.</p>
            </div>
          )}
        </div>
      </div>
    </GlowCard>
  );
};

export default ShotLoggingSection;
