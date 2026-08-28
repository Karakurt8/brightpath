import React, { useState } from 'react';
import { CATEGORIES } from '../data/mockData';
import { QuestionItem, TeacherExpert } from '../types';

interface QuestionDetailModalProps {
  question: QuestionItem;
  teachers: TeacherExpert[];
  onClose: () => void;
  onOpenTeacher: (teacher: TeacherExpert) => void;
  onAskSimilarQuestion: () => void;
}

export const QuestionDetailModal: React.FC<QuestionDetailModalProps> = ({
  question,
  teachers,
  onClose,
  onOpenTeacher,
  onAskSimilarQuestion,
}) => {
  const [likes, setLikes] = useState(question.answer?.likes || 42);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const teacher = teachers.find((t) => t.id === question.answer?.expertId) || teachers[0];
  const category = CATEGORIES.find((c) => c.id === question.category);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl border border-white/20 overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 sticky top-0 bg-white/5 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full shadow-sm"
              style={{ backgroundColor: category?.color || '#6366f1' }}
            />
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
              {category?.name || 'Genel Soru'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Question Box */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-white/15">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 overflow-hidden flex items-center justify-center text-xs font-bold text-gray-300">
                {question.isAnonymous ? (
                  <span className="material-symbols-outlined text-[18px]">person</span>
                ) : (
                  <img
                    src={question.studentAvatar}
                    alt={question.studentName}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <span className="text-xs font-bold text-white block">
                  {question.isAnonymous ? 'Gizli Soru (Öğrenci)' : question.studentName}
                </span>
                <span className="text-[11px] text-gray-400">{question.createdAt}</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug font-display">
              {question.title}
            </h2>
          </div>

          {/* Expert Answer Section */}
          {question.answer ? (
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/15 space-y-4">
              {/* Expert badge & header */}
              <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-white/10">
                <button
                  onClick={() => onOpenTeacher(teacher)}
                  className="flex items-center gap-3 text-left group cursor-pointer"
                >
                  <img
                    src={question.answer.expertAvatar}
                    alt={question.answer.expertName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white/30 shadow-md group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors">
                        {question.answer.expertName}
                      </span>
                      <span className="material-symbols-outlined text-amber-300 text-[18px] icon-fill">
                        verified
                      </span>
                    </div>
                    <span className="text-xs text-indigo-300 block">
                      {question.answer.expertTitle}
                    </span>
                  </div>
                </button>

                <span className="text-xs font-semibold text-gray-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                  {question.answer.answeredAt}
                </span>
              </div>

              {/* Answer Body Text */}
              <div className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal space-y-3">
                <p>{question.answer.content}</p>
                <p className="text-xs text-gray-300 bg-white/5 p-3.5 rounded-xl border border-white/10 italic">
                  💡 <strong className="text-indigo-300">Öğretmen Tavsiyesi:</strong> Bu konuda aklına takılan başka detaylar olursa tekrar sormaktan çekinme. Öğrenmek ve merak etmek ilmin yarısıdır!
                </p>
              </div>

              {/* Interaction Bar */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                    hasLiked
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/30'
                      : 'bg-white/10 text-gray-300 hover:bg-white/15 border-white/10'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[16px] ${hasLiked ? 'icon-fill' : ''}`}>
                    thumb_up
                  </span>
                  <span>Faydalı ({likes})</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">share</span>
                  <span>{copied ? 'Kopyalandı!' : 'Paylaş'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-amber-400/10 rounded-2xl p-6 text-center text-amber-300 border border-amber-400/20 backdrop-blur-md">
              <span className="material-symbols-outlined text-3xl mb-1">hourglass_top</span>
              <p className="font-bold text-sm text-white">Bu soru henüz öğretmenlerimiz tarafından inceleniyor.</p>
              <p className="text-xs mt-1 text-gray-300">Cevaplandığında bildirim alacaksın.</p>
            </div>
          )}

          {/* Action to ask similar */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 text-center flex flex-col sm:flex-row items-center justify-between gap-3 border border-white/10">
            <span className="text-xs sm:text-sm text-gray-300 font-medium">
              Senin de bu konuda benzer bir sorun var mı?
            </span>
            <button
              onClick={onAskSimilarQuestion}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-indigo-500/30 whitespace-nowrap border border-indigo-400/30 active:scale-95"
            >
              Yeni Soru Sor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
