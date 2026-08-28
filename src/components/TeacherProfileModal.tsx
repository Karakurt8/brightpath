import React from 'react';
import { TeacherExpert } from '../types';

interface TeacherProfileModalProps {
  teacher: TeacherExpert;
  onClose: () => void;
  onAskQuestionToTeacher: (teacher: TeacherExpert) => void;
  onOpenQuestionAnswer: (questionText: string, answerText: string) => void;
}

export const TeacherProfileModal: React.FC<TeacherProfileModalProps> = ({
  teacher,
  onClose,
  onAskQuestionToTeacher,
  onOpenQuestionAnswer,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-white/20 overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 bg-white/5 border-b border-white/10 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 -ml-2 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center border border-white/10"
              aria-label="Geri Dön"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              Öğretmen Profili
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
            aria-label="Kapat"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6 sm:space-y-8">
          {/* Teacher Hero / Bio Section */}
          <section className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/15 relative overflow-hidden flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            {/* Decorative accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            {/* Avatar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white/30 shadow-2xl flex-shrink-0 bg-white/10 p-1 backdrop-blur-md">
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Info */}
            <div className="flex-1 relative z-10">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {teacher.name}
                </h3>
                <span
                  className="material-symbols-outlined text-amber-300 text-[22px] icon-fill"
                  title="Doğrulanmış Uzman"
                >
                  verified
                </span>
              </div>

              <p className="text-sm font-semibold text-indigo-300 mb-3">
                {teacher.title}
              </p>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-5 max-w-2xl font-normal">
                {teacher.bio}
              </p>

              <button
                onClick={() => onAskQuestionToTeacher(teacher)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-6 py-2.5 text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 transition-all active:scale-95 cursor-pointer mx-auto md:mx-0 border border-indigo-400/40"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>{teacher.name.split(' ')[0]}'ya Soru Sor</span>
              </button>
            </div>
          </section>

          {/* Stats Section */}
          <section className="grid grid-cols-3 gap-3 sm:gap-6">
            <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-4 sm:p-5 text-center flex flex-col items-center justify-center shadow-lg border border-white/10">
              <span className="text-xl sm:text-3xl font-extrabold text-white font-display mb-0.5">
                {teacher.answeredQuestions.toLocaleString('tr-TR')}
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-400">
                Cevaplanan Soru
              </span>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-4 sm:p-5 text-center flex flex-col items-center justify-center shadow-lg border border-white/10">
              <span className="text-xl sm:text-3xl font-extrabold text-emerald-300 font-display mb-0.5">
                %{teacher.satisfactionRate}
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-400">
                Memnuniyet
              </span>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-4 sm:p-5 text-center flex flex-col items-center justify-center shadow-lg border border-white/10">
              <span className="text-xl sm:text-3xl font-extrabold text-amber-300 font-display mb-0.5">
                {teacher.experienceYears} Yıl
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-400">
                Uzmanlık
              </span>
            </div>
          </section>

          {/* Expertise Areas */}
          <section>
            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2 font-display">
              <span className="material-symbols-outlined text-indigo-400">school</span>
              <span>Uzmanlık Alanları</span>
            </h4>

            <div className="flex flex-wrap gap-2">
              {teacher.specializations.map((spec, index) => {
                const dotColors = ['#f59e0b', '#10b981', '#6366f1', '#8b5cf6'];
                return (
                  <span
                    key={index}
                    className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-gray-200 border border-white/10 flex items-center gap-2 shadow-xs"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: dotColors[index % dotColors.length] }}
                    />
                    <span>{spec}</span>
                  </span>
                );
              })}
            </div>
          </section>

          {/* Son Cevaplar */}
          <section className="space-y-4">
            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2 font-display">
              <span className="material-symbols-outlined text-indigo-400">history</span>
              <span>Son Cevaplar</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teacher.recentAnswers.map((ans) => (
                <div
                  key={ans.id}
                  onClick={() => onOpenQuestionAnswer(ans.question, ans.answer)}
                  className="bg-white/5 backdrop-blur-2xl rounded-2xl p-5 shadow-lg border border-white/10 hover:border-white/20 flex flex-col justify-between cursor-pointer transition-all group"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-gray-400 border border-white/10">
                      <span className="material-symbols-outlined text-sm">person</span>
                    </div>
                    <p className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
                      "{ans.question}"
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-3.5 relative border border-white/10">
                    <div className="absolute -top-2.5 right-3 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 backdrop-blur-xs">
                      <span className="material-symbols-outlined text-[12px] icon-fill">
                        verified
                      </span>
                      <span>UZMAN</span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed mt-1">
                      {ans.answer}
                    </p>

                    <span className="mt-2 inline-block text-indigo-300 font-semibold text-xs group-hover:underline">
                      Tümünü Oku →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
