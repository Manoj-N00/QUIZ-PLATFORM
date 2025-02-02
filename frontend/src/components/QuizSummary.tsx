import React from 'react';
import { Trophy, Award, Zap, Target } from 'lucide-react';

interface QuizSummaryProps {
  score: number;
  totalQuestions: number;
  answers: number[];
  streak: number;
  highestStreak: number;
  totalCorrect: number;
  onRestart: () => void;
}

export const QuizSummary: React.FC<QuizSummaryProps> = ({
  score,
  totalQuestions,
  totalCorrect,
  streak,
  highestStreak,
  onRestart,
}) => {
  const accuracy = Math.round((totalCorrect / totalQuestions) * 100);

  return (
    <div className="w-full max-w-2xl">
      <div className="glass-card rounded-3xl shadow-xl p-12 text-center">
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 w-20 h-20 
                      rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-12 h-12 text-white" />
        </div>
        
        <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent 
                     bg-gradient-to-r from-violet-400 to-fuchsia-400">
          Quiz Complete!
        </h2>
        <p className="text-gray-400 mb-12">Here's how you performed:</p>
        
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-700/50">
            <Award className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
            <p className="text-3xl font-bold text-yellow-400 mb-1">{score}</p>
            <p className="text-sm text-gray-400 font-medium">Total Score</p>
          </div>
          
          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-700/50">
            <Target className="w-10 h-10 text-green-400 mx-auto mb-4" />
            <p className="text-3xl font-bold text-green-400 mb-1">{accuracy}%</p>
            <p className="text-sm text-gray-400 font-medium">Accuracy</p>
          </div>

          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-700/50">
            <Zap className="w-10 h-10 text-violet-400 mx-auto mb-4" />
            <p className="text-3xl font-bold text-violet-400 mb-1">{highestStreak}</p>
            <p className="text-sm text-gray-400 font-medium">Highest Streak</p>
          </div>

          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-700/50">
            <Trophy className="w-10 h-10 text-blue-400 mx-auto mb-4" />
            <p className="text-3xl font-bold text-blue-400 mb-1">{totalCorrect}/{totalQuestions}</p>
            <p className="text-sm text-gray-400 font-medium">Questions Correct</p>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-12 py-4 
                   rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl
                   transition-all duration-300 hover:scale-105"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};