import { useState, useEffect } from 'react';
import { Question, QuizState } from '../types/quiz';

const API_URL = 'https://quiz-platform-5h83.onrender.com';

const initialQuizState: QuizState = {
  currentQuestionIndex: 0,
  score: 0,
  answers: [],
  isComplete: false,
  streak: 0,
  timeSpent: 0,
  highestStreak: 0,
  totalCorrect: 0,
};

export const useQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizState, setQuizState] = useState<QuizState>(initialQuizState);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching questions from backend...');
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Backend response error:', {
            status: response.status,
            statusText: response.statusText,
            error: errorData
          });
          throw new Error(errorData.details || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data from backend:', data);
        
        if (!Array.isArray(data)) {
          console.error('Invalid data format:', data);
          throw new Error('Invalid data format received from server');
        }

        // Validate the data structure
        const validatedQuestions = data.map((q: any, index: number) => {
          if (!q.question || !Array.isArray(q.options)) {
            console.error(`Invalid question at index ${index}:`, q);
            throw new Error(`Invalid question format at index ${index}`);
          }
          return q as Question;
        });

        console.log('Validated questions:', validatedQuestions);
        setQuestions(validatedQuestions);
      } catch (err) {
        console.error('Failed to fetch questions:', err);
        setError(err instanceof Error ? err.message : 'Failed to load quiz questions. Please try again later.');
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const submitAnswer = (answerIndex: number) => {
    if (!questions.length) return;
    
    const currentQuestion = questions[quizState.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const newStreak = isCorrect ? quizState.streak + 1 : 0;
    const streakBonus = Math.floor(newStreak / 3) * 50;
    const basePoints = isCorrect ? currentQuestion.points : 0;
    const bonusPoints = streakBonus;

    setQuizState(prev => ({
      ...prev,
      score: prev.score + basePoints + bonusPoints,
      streak: newStreak,
      highestStreak: Math.max(prev.highestStreak, newStreak),
      totalCorrect: prev.totalCorrect + (isCorrect ? 1 : 0),
      answers: [...prev.answers, answerIndex],
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      isComplete: prev.currentQuestionIndex + 1 >= questions.length,
    }));
  };

  const restartQuiz = () => {
    setQuizState(initialQuizState);
  };

  return {
    questions,
    loading,
    error,
    quizState,
    submitAnswer,
    restartQuiz,
  };
};
