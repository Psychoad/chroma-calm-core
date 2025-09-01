import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { detectEmotion, EmotionType } from '@/lib/emotionDetection';
import { AmbientParticles } from './AmbientParticles';

interface MeditationCanvasProps {
  onEmotionChange?: (emotion: EmotionType) => void;
}

export const MeditationCanvas = ({ onEmotionChange }: MeditationCanvasProps) => {
  const [text, setText] = useState('');
  const [currentEmotion, setCurrentEmotion] = useState<EmotionType>('neutral');
  const [isTyping, setIsTyping] = useState(false);

  const analyzeEmotion = useCallback(async (inputText: string) => {
    if (!inputText.trim()) {
      setCurrentEmotion('neutral');
      onEmotionChange?.('neutral');
      return;
    }

    const emotion = await detectEmotion(inputText);
    setCurrentEmotion(emotion);
    onEmotionChange?.(emotion);
  }, [onEmotionChange]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsTyping(false);
      analyzeEmotion(text);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [text, analyzeEmotion]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setIsTyping(true);
  };

  const getCanvasClassName = () => {
    const emotionClass = currentEmotion !== 'neutral' ? `emotion-${currentEmotion}` : '';
    return cn('meditation-canvas', emotionClass);
  };

  return (
    <div className={getCanvasClassName()}>
      <AmbientParticles emotion={currentEmotion} />
      
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-light text-foreground/90 mb-6 tracking-wide">
              Express Yourself
            </h1>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Share your thoughts, feelings, and emotions. Let the colors respond to your state of mind.
            </p>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-surface-elevated/20 backdrop-blur-xl rounded-2xl border border-border/30" />
            
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Type how you're feeling... Let your thoughts flow freely..."
              className="meditation-input relative z-10 w-full h-64 p-8 rounded-2xl backdrop-blur-xl resize-none focus:outline-none"
              style={{
                background: 'transparent',
                boxShadow: isTyping ? '0 0 30px hsl(var(--primary) / 0.2)' : 'none',
              }}
            />

            {isTyping && (
              <div className="absolute bottom-4 right-4 z-20">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="animate-pulse w-2 h-2 bg-primary rounded-full" />
                  <span>Listening...</span>
                </div>
              </div>
            )}
          </div>

          {currentEmotion !== 'neutral' && (
            <div className="text-center mt-8 animate-scale-in">
              <div className="inline-flex items-center space-x-3 px-6 py-3 bg-surface-elevated/60 backdrop-blur-xl rounded-full border border-border/30">
                <div className={cn("w-3 h-3 rounded-full animate-pulse", {
                  'bg-calm': currentEmotion === 'calm',
                  'bg-healing': currentEmotion === 'healing',
                  'bg-strength': currentEmotion === 'strength',
                  'bg-wisdom': currentEmotion === 'wisdom',
                  'bg-joy': currentEmotion === 'joy',
                  'bg-balance': currentEmotion === 'balance',
                })} />
                <span className="text-sm text-foreground/80 capitalize">
                  {currentEmotion === 'healing' ? 'Finding Peace' :
                   currentEmotion === 'strength' ? 'Building Courage' :
                   currentEmotion === 'wisdom' ? 'Seeking Understanding' :
                   currentEmotion === 'joy' ? 'Embracing Happiness' :
                   currentEmotion === 'balance' ? 'Restoring Harmony' :
                   'Feeling Calm'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};