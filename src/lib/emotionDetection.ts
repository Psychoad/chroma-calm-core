export type EmotionType = 'calm' | 'healing' | 'strength' | 'wisdom' | 'joy' | 'balance' | 'neutral';

interface EmotionKeywords {
  [key: string]: string[];
}

const emotionKeywords: EmotionKeywords = {
  calm: [
    'peaceful', 'relaxed', 'serene', 'tranquil', 'quiet', 'still', 'centered', 'balanced', 
    'gentle', 'soft', 'breathe', 'meditation', 'mindful', 'present', 'calm', 'peace',
    'rest', 'ease', 'comfort', 'soothing', 'zen', 'harmony'
  ],
  healing: [
    'hurt', 'pain', 'healing', 'recovery', 'wounded', 'broken', 'mending', 'grief', 
    'loss', 'trauma', 'forgiveness', 'letting go', 'release', 'cleanse', 'purify',
    'restore', 'renewal', 'growth', 'transformation', 'therapy', 'self-care'
  ],
  strength: [
    'angry', 'frustrated', 'rage', 'mad', 'furious', 'irritated', 'annoyed', 'upset',
    'strength', 'power', 'courage', 'brave', 'bold', 'confidence', 'determination',
    'fierce', 'warrior', 'fight', 'overcome', 'challenge', 'resilience', 'strong'
  ],
  wisdom: [
    'confused', 'lost', 'uncertain', 'doubt', 'questioning', 'seeking', 'understanding',
    'wisdom', 'knowledge', 'insight', 'clarity', 'truth', 'purpose', 'meaning',
    'philosophy', 'reflect', 'contemplate', 'think', 'ponder', 'introspect'
  ],
  joy: [
    'happy', 'joyful', 'excited', 'thrilled', 'elated', 'cheerful', 'delighted',
    'grateful', 'thankful', 'blessed', 'celebration', 'success', 'achievement',
    'love', 'laughter', 'smile', 'bright', 'radiant', 'blissful', 'euphoric'
  ],
  balance: [
    'sad', 'depressed', 'melancholy', 'lonely', 'isolated', 'empty', 'hollow',
    'balance', 'harmony', 'equilibrium', 'stability', 'grounded', 'rooted',
    'acceptance', 'surrender', 'flow', 'rhythm', 'natural', 'organic', 'wholeness'
  ]
};

const emotionIntensityWords = {
  high: ['extremely', 'incredibly', 'absolutely', 'completely', 'totally', 'utterly', 'deeply', 'profoundly'],
  medium: ['very', 'quite', 'really', 'fairly', 'pretty', 'somewhat', 'rather'],
  low: ['a bit', 'slightly', 'kind of', 'sort of', 'a little', 'mildly']
};

export const detectEmotion = async (text: string): Promise<EmotionType> => {
  if (!text.trim()) return 'neutral';

  const words = text.toLowerCase().split(/\s+/);
  const emotionScores: Record<EmotionType, number> = {
    calm: 0,
    healing: 0,
    strength: 0,
    wisdom: 0,
    joy: 0,
    balance: 0,
    neutral: 0
  };

  // Calculate base emotion scores
  for (const emotion in emotionKeywords) {
    const keywords = emotionKeywords[emotion];
    let score = 0;
    
    for (const word of words) {
      // Exact match
      if (keywords.includes(word)) {
        score += 3;
      }
      // Partial match (contains keyword)
      else if (keywords.some(keyword => word.includes(keyword) || keyword.includes(word))) {
        score += 1;
      }
    }
    
    emotionScores[emotion as EmotionType] = score;
  }

  // Apply intensity multipliers
  let intensityMultiplier = 1;
  for (const word of words) {
    if (emotionIntensityWords.high.includes(word)) {
      intensityMultiplier = Math.max(intensityMultiplier, 2);
    } else if (emotionIntensityWords.medium.includes(word)) {
      intensityMultiplier = Math.max(intensityMultiplier, 1.5);
    }
  }

  // Apply intensity to all scores
  Object.keys(emotionScores).forEach(emotion => {
    if (emotion !== 'neutral') {
      emotionScores[emotion as EmotionType] *= intensityMultiplier;
    }
  });

  // Find the highest scoring emotion
  const maxScore = Math.max(...Object.values(emotionScores));
  
  if (maxScore === 0) return 'neutral';

  const dominantEmotion = Object.keys(emotionScores).find(
    emotion => emotionScores[emotion as EmotionType] === maxScore
  ) as EmotionType;

  // Additional context analysis for better accuracy
  const contextualEmotion = analyzeContextualCues(text, dominantEmotion);
  
  return contextualEmotion || dominantEmotion || 'neutral';
};

const analyzeContextualCues = (text: string, primaryEmotion: EmotionType): EmotionType | null => {
  const lowerText = text.toLowerCase();
  
  // Detect negation patterns that might flip emotions
  const negationWords = ['not', 'no', 'never', 'nothing', 'nobody', 'nowhere', 'neither', 'nor'];
  const hasNegation = negationWords.some(word => lowerText.includes(word));
  
  // Detect question patterns that suggest seeking wisdom
  const questionWords = ['why', 'how', 'what', 'when', 'where', 'who', 'which'];
  const hasQuestions = questionWords.some(word => lowerText.includes(word + ' ')) || lowerText.includes('?');
  
  if (hasQuestions && lowerText.length > 20) {
    return 'wisdom';
  }
  
  // Detect healing context
  if (lowerText.includes('feel') && (lowerText.includes('better') || lowerText.includes('heal'))) {
    return 'healing';
  }
  
  // Detect strength/anger patterns
  if ((lowerText.includes('can\'t') || lowerText.includes('cannot')) && lowerText.includes('take')) {
    return 'strength';
  }
  
  return null;
};