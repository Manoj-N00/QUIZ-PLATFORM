export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: number[];
  isComplete: boolean;
  streak: number;
  timeSpent: number;
  highestStreak: number;
  totalCorrect: number;
}