
export enum GameStage {
  INTRO = 'INTRO',
  SURVEY = 'SURVEY',
  CONGRESS = 'CONGRESS',
  RESOLUTION = 'RESOLUTION',
  RESULT = 'RESULT'
}

export interface Stats {
  economy: number;
  people: number;
  stability: number;
}

export interface SurveyPoint {
  id: string;
  name: string;
  title: string;
  description: string[];
  keywords: string[];
  icon: string;
  options: {
    label: string;
    collects: boolean;
    feedback: string;
  }[];
}

export interface SessionOption {
  label: string;
  impact: Partial<Stats>;
  feedback: string;
  resolutionText: string;
  isInnovation: boolean;
}

export interface CongressSession {
  id: number;
  title: string;
  intro: string;
  question: string;
  options: SessionOption[];
}

export interface HistoryInsight {
  title: string;
  content: string;
  significance: string;
}

// Added CrisisItem interface to fix import errors in CrisisScreen.tsx
export interface CrisisItem {
  id: string;
  label: string;
  icon: string;
  fact: string;
}
