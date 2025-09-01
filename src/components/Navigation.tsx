import { useState } from 'react';
import { MessageCircle, Headphones, Sparkles, Settings, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmotionType } from '@/lib/emotionDetection';

interface NavigationProps {
  currentEmotion: EmotionType;
  onModeChange?: (mode: 'express' | 'meditate' | 'sounds' | 'iot' | 'settings') => void;
}

const navigationItems = [
  {
    id: 'express',
    icon: MessageCircle,
    label: 'Express',
    description: 'Share your thoughts and feelings'
  },
  {
    id: 'meditate',
    icon: Sparkles,
    label: 'Meditate',
    description: 'Guided meditation based on your mood'
  },
  {
    id: 'sounds',
    icon: Headphones,
    label: 'Sounds',
    description: 'Your personal sound library'
  },
  {
    id: 'iot',
    icon: Palette,
    label: 'Ambient',
    description: 'Smart home integration'
  },
  {
    id: 'settings',
    icon: Settings,
    label: 'Settings',
    description: 'Customize your experience'
  }
] as const;

export const Navigation = ({ currentEmotion, onModeChange }: NavigationProps) => {
  const [activeMode, setActiveMode] = useState<'express' | 'meditate' | 'sounds' | 'iot' | 'settings'>('express');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleModeChange = (mode: typeof activeMode) => {
    setActiveMode(mode);
    onModeChange?.(mode);
  };

  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center space-x-4 p-4 bg-surface-elevated/80 backdrop-blur-xl rounded-2xl border border-border/30 shadow-2xl">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMode === item.id;
          const isHovered = hoveredItem === item.id;
          
          return (
            <div key={item.id} className="relative">
              <button
                onClick={() => handleModeChange(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={cn(
                  'nav-icon',
                  isActive && 'active'
                )}
                aria-label={item.label}
              >
                <Icon 
                  size={20} 
                  className={cn(
                    'transition-colors duration-300',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )} 
                />
              </button>

              {/* Tooltip */}
              {isHovered && (
                <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 animate-fade-in">
                  <div className="bg-surface-elevated/95 backdrop-blur-xl rounded-lg px-3 py-2 border border-border/30 shadow-lg">
                    <div className="text-sm font-medium text-foreground whitespace-nowrap">
                      {item.label}
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {item.description}
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                    <div className="w-2 h-2 bg-surface-elevated/95 border-r border-b border-border/30 transform rotate-45" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Emotion Indicator */}
      {currentEmotion !== 'neutral' && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-16 animate-fade-in">
          <div className="flex items-center space-x-2 px-4 py-2 bg-surface-elevated/80 backdrop-blur-xl rounded-full border border-border/30">
            <div className={cn("w-2 h-2 rounded-full animate-pulse", {
              'bg-calm': currentEmotion === 'calm',
              'bg-healing': currentEmotion === 'healing',
              'bg-strength': currentEmotion === 'strength',
              'bg-wisdom': currentEmotion === 'wisdom',
              'bg-joy': currentEmotion === 'joy',
              'bg-balance': currentEmotion === 'balance',
            })} />
            <span className="text-xs text-foreground/80 capitalize">
              {currentEmotion === 'healing' ? 'Healing' :
               currentEmotion === 'strength' ? 'Strength' :
               currentEmotion === 'wisdom' ? 'Wisdom' :
               currentEmotion === 'joy' ? 'Joy' :
               currentEmotion === 'balance' ? 'Balance' :
               'Calm'}
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};