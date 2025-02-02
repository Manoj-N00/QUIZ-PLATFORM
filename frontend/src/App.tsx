import React from 'react';
import { useQuiz } from './hooks/useQuiz';
import { QuizCard } from './components/QuizCard';
import { QuizSummary } from './components/QuizSummary';
import { Brain } from 'lucide-react';

function App() {
  const { questions, loading, error, quizState, submitAnswer, restartQuiz } = useQuiz();

  if (loading) {
    return (
      <div className="min-h-screen quiz-gradient flex items-center justify-center p-4">
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-violet-400 animate-pulse" />
          <div className="text-2xl font-semibold text-violet-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen quiz-gradient flex items-center justify-center p-4">
        <div className="text-red-400 text-center">
          <p className="text-2xl font-semibold mb-4">Oops! Something went wrong</p>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen quiz-gradient flex items-center justify-center p-4">
      {!quizState.isComplete ? (
        <QuizCard
          question={questions[quizState.currentQuestionIndex]}
          onAnswer={submitAnswer}
          streak={quizState.streak}
          currentIndex={quizState.currentQuestionIndex}
          totalQuestions={questions.length}
        />
      ) : (
        <QuizSummary
          score={quizState.score}
          totalQuestions={questions.length}
          answers={quizState.answers}
          streak={quizState.streak}
          highestStreak={quizState.highestStreak}
          totalCorrect={quizState.totalCorrect}
          onRestart={restartQuiz}
        />
      )}
    </div>
  );
}

export default App;