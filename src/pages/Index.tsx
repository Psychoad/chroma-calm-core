import { useState } from 'react';
import { MeditationCanvas } from '@/components/MeditationCanvas';
import { Navigation } from '@/components/Navigation';
import { IoTSimulation } from '@/components/IoTSimulation';
import { EmotionType } from '@/lib/emotionDetection';

const Index = () => {
  const [currentEmotion, setCurrentEmotion] = useState<EmotionType>('neutral');
  const [currentMode, setCurrentMode] = useState<'express' | 'meditate' | 'sounds' | 'iot' | 'settings'>('express');

  const handleEmotionChange = (emotion: EmotionType) => {
    setCurrentEmotion(emotion);
  };

  const handleModeChange = (mode: 'express' | 'meditate' | 'sounds' | 'iot' | 'settings') => {
    setCurrentMode(mode);
  };

  const renderCurrentMode = () => {
    switch (currentMode) {
      case 'express':
        return <MeditationCanvas onEmotionChange={handleEmotionChange} />;
      
      case 'iot':
        return (
          <div className="fixed inset-0 bg-background overflow-y-auto">
            <IoTSimulation emotion={currentEmotion} />
          </div>
        );
      
      case 'meditate':
        return (
          <div className="fixed inset-0 bg-background flex items-center justify-center">
            <div className="text-center max-w-2xl mx-auto p-8">
              <h2 className="text-4xl font-light text-foreground mb-6">Guided Meditation</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Based on your current emotional state: <span className="capitalize text-primary">{currentEmotion}</span>
              </p>
              <div className="p-8 bg-surface-elevated/50 backdrop-blur-xl rounded-2xl border border-border/30">
                <p className="text-muted-foreground">
                  Personalized meditation sessions coming soon. Your emotional state will guide the meditation experience.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'sounds':
        return (
          <div className="fixed inset-0 bg-background flex items-center justify-center">
            <div className="text-center max-w-2xl mx-auto p-8">
              <h2 className="text-4xl font-light text-foreground mb-6">Sound Library</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Upload and organize your personal meditation music library
              </p>
              <div className="p-8 bg-surface-elevated/50 backdrop-blur-xl rounded-2xl border border-border/30">
                <p className="text-muted-foreground">
                  AI-powered music categorization and emotion-based playlists coming soon.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="fixed inset-0 bg-background flex items-center justify-center">
            <div className="text-center max-w-2xl mx-auto p-8">
              <h2 className="text-4xl font-light text-foreground mb-6">Settings</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Customize your meditation experience
              </p>
              <div className="p-8 bg-surface-elevated/50 backdrop-blur-xl rounded-2xl border border-border/30">
                <p className="text-muted-foreground">
                  Personalization options and device connections coming soon.
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return <MeditationCanvas onEmotionChange={handleEmotionChange} />;
    }
  };

  return (
    <>
      {renderCurrentMode()}
      <Navigation 
        currentEmotion={currentEmotion} 
        onModeChange={handleModeChange}
      />
    </>
  );
};

export default Index;
