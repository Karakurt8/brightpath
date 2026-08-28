import React, { useState } from 'react';
import { DAILY_QUIZ_QUESTIONS } from '../data/mockData';
import { QuizQuestion } from '../types';

interface DailyQuizModalProps {
  customQuestions?: QuizQuestion[];
  quizTitle?: string;
  onClose: () => void;
  onComplete: (score: number, total: number, earnedXp: number) => void;
}

export const DailyQuizModal: React.FC<DailyQuizModalProps> = ({
  customQuestions,
  quizTitle = 'Günlük Bilgi Yarışması',
  onClose,
  onComplete,
}) => {
  const questions = customQuestions || DAILY_QUIZ_QUESTIONS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQ.correctIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const earnedXp = (correctCount + (selectedOption === currentQ.correctIndex ? 1 : 0)) * 25;
      onComplete(correctCount + (selectedOption === currentQ.correctIndex ? 1 : 0), questions.length, earnedXp);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl w-full max-w-xl shadow-2xl border border-white/20 overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-indigo-950/80 via-purple-950/80 to-slate-900/80 px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-amber-300 text-[20px] icon-fill">
                extension
              </span>
            </div>
            <h3 className="font-bold text-lg text-white font-display">
              {quizTitle}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors border border-white/10"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Finished State Screen */}
        {isFinished ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-amber-400/15 border border-amber-400/30 rounded-3xl flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-6xl text-amber-300 icon-fill">
                emoji_events
              </span>
            </div>

            <div>
              <h4 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 font-display">
                Tebrikler! 🎉
              </h4>
              <p className="text-sm text-gray-300">
                Yarışmayı başarıyla tamamladın ve bilgilerini pekiştirdin.
              </p>
            </div>

            {/* Score box */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase">Doğru Sayısı</span>
                <p className="text-3xl font-extrabold text-white font-display mt-1">
                  {correctCount} / {questions.length}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase">Kazanılan XP</span>
                <p className="text-3xl font-extrabold text-amber-300 font-display mt-1">
                  +{correctCount * 25} XP
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl text-base transition-all active:scale-98 shadow-lg shadow-indigo-500/30 cursor-pointer border border-indigo-400/40"
            >
              Tamamla ve Kapat
            </button>
          </div>
        ) : (
          /* Active Question Flow */
          <div className="p-6 sm:p-8 space-y-6">
            {/* Progress & Category */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-gray-400 mb-2">
                <span className="text-indigo-300 bg-indigo-500/20 px-2.5 py-0.5 rounded-md border border-indigo-500/30 backdrop-blur-xs">
                  {currentQ.category}
                </span>
                <span>
                  Soru {currentIndex + 1} / {questions.length}
                </span>
              </div>

              <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden border border-white/10">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-300 shadow-sm"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <h4 className="text-lg sm:text-xl font-bold text-white leading-snug font-display">
              {currentQ.question}
            </h4>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let optionStyles = 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 hover:border-white/20';

                if (isAnswered) {
                  if (isCorrect) {
                    optionStyles = 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold shadow-lg shadow-emerald-500/10';
                  } else if (isSelected) {
                    optionStyles = 'bg-rose-500/20 border-rose-400 text-rose-200 font-bold';
                  } else {
                    optionStyles = 'bg-white/5 opacity-40 border-white/5 text-gray-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base font-medium flex items-center justify-between transition-all cursor-pointer backdrop-blur-md ${optionStyles}`}
                    id={`quiz-option-${idx}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold font-display flex-shrink-0 text-white">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isAnswered && isCorrect && (
                      <span className="material-symbols-outlined text-emerald-400 text-[22px] icon-fill flex-shrink-0">
                        check_circle
                      </span>
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <span className="material-symbols-outlined text-rose-400 text-[22px] icon-fill flex-shrink-0">
                        cancel
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after answer */}
            {isAnswered && (
              <div className="bg-indigo-500/15 backdrop-blur-md rounded-2xl p-4 border border-indigo-400/30 text-xs sm:text-sm text-indigo-200 leading-relaxed animate-in fade-in duration-200">
                <strong className="text-white">💡 Bilgi & Açıklama:</strong> {currentQ.explanation}
              </div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <button
                onClick={handleNext}
                className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold py-3.5 rounded-xl text-sm sm:text-base transition-all active:scale-98 shadow-xl cursor-pointer flex items-center justify-center gap-2"
                id="quiz-next-btn"
              >
                <span>{currentIndex < questions.length - 1 ? 'Sıradaki Soru' : 'Sonuçları Gör'}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
