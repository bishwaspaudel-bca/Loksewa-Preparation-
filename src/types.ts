export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  premium: boolean;
  points: number;
  streak: number;
  lastActive: string;
  preferredLanguage: 'en' | 'np';
}

export interface ChatMessage {
  id?: string;
  userId: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  language: 'en' | 'np';
}

export interface MockTestResult {
  id?: string;
  userId: string;
  category: string;
  score: number;
  totalQuestions: number;
  timestamp: string;
  answers: any[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}
