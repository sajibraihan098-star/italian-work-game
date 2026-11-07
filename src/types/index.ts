// Core types — keep everything typed and cheap to extend

export type ScenarioId = 'restaurant-1' | 'magazzino-1' | 'fabbrica-1' | 'everyday-1' | string;

export interface DialogueLine {
  id: string;
  speaker: 'npc' | 'player' | 'system';
  textIt: string;
  textBn?: string;      // Bengali help
  textEn?: string;      // English help
  audioUrl?: string;
}

export interface Choice {
  id: string;
  textIt: string;
  textBn?: string;
  textEn?: string;
  isCorrect: boolean;
  feedbackIt: string;
  feedbackBn?: string;
  feedbackEn?: string;
  nextLineId?: string;
}

export interface ScenarioStep {
  id: string;
  type: 'dialogue' | 'choice' | 'info' | 'quiz';
  line?: DialogueLine;
  choices?: Choice[];
  info?: {
    titleIt: string;
    titleBn?: string;
    bodyIt: string;
    bodyBn?: string;
  };
}

export interface Scenario {
  id: ScenarioId;
  titleIt: string;
  titleBn: string;
  titleEn: string;
  descriptionIt: string;
  descriptionBn: string;
  category: 'restaurant' | 'magazzino' | 'fabbrica' | 'everyday';
  difficulty: 1 | 2 | 3;
  estimatedMinutes: number;
  steps: ScenarioStep[];
  vocabularyIds?: string[];
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'match' | 'reorder';
  questionIt: string;
  questionBn?: string;
  questionEn?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanationIt?: string;
  explanationBn?: string;
}

export interface VocabularyItem {
  id: string;
  it: string;
  bn: string;
  en: string;
  exampleIt?: string;
  category: string;
}

export interface UserProgress {
  completedScenarios: ScenarioId[];
  xp: number;
  level: number;
  currentStreak: number;
  lastPlayedDate?: string;
  vocabularyMastered: string[];
}