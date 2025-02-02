import React from 'react';
import { Question } from '../types/quiz';
import { Trophy, Zap, Timer } from 'lucide-react';

interface QuizCardProps {
  question: Question;
  onAnswer: (index: number) => void;
  streak: number;
  currentIndex: number;
  totalQuestions: number;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  onAnswer,
  streak,
  currentIndex,
  totalQuestions,
}) => {
  return (
    <div className="w-full max-w-2xl">
      <div className="glass-card rounded-3xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-xl">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="text-lg font-semibold text-yellow-400">{question.points} pts</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-xl">
            <Timer className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-semibold text-blue-400">
              {currentIndex + 1}/{totalQuestions}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-xl">
            <Zap className="w-6 h-6 text-violet-400" />
            <span className="text-lg font-semibold text-violet-400">
              {streak > 0 && '🔥'} Streak: {streak}
            </span>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-8 text-gray-100">{question.question}</h2>
        
        <div className="grid gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(index)}
              className="answer-button w-full p-6 text-left rounded-2xl
                       bg-gray-700/50 hover:bg-gray-700
                       transition-all duration-300 font-medium text-gray-100
                       border border-gray-600/50 hover:border-violet-500/50"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};