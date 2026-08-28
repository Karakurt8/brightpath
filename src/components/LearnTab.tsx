import React from 'react';
import { ASSETS, LEARN_MODULES } from '../data/mockData';
import { LearnModule, UserProfile } from '../types';

interface LearnTabProps {
  user: UserProfile;
  onOpenModule: (module: LearnModule) => void;
  onOpenVideo: (video: { title: string; duration: string; thumbnail: string; summary: string }) => void;
  onStartModuleQuiz: (module: LearnModule) => void;
}

export const LearnTab: React.FC<LearnTabProps> = ({
  user,
  onOpenModule,
  onOpenVideo,
  onStartModuleQuiz,
}) => {
  const featuredModule = LEARN_MODULES[0];
  const videoFeature = featuredModule.featuredVideo || {
    title: 'Meleklerin Özellikleri Nelerdir?',
    duration: '06:45',
    thumbnail: ASSETS.learnVideoImage,
    summary: 'Meleklerin özellikleri, dört büyük melek ve insanın hayatındaki görevleri.',
  };

  return (
    <div className="space-y-8 md:space-y-10 pb-6">
      {/* Title Section */}
      <section className="text-center pt-2 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 font-display">
          7. Sınıf Öğrenme Yolculuğu
        </h1>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
          Harika gidiyorsun! Yeni şeyler keşfetmeye ve bilgilerini pekiştirmeye hazır mısın?
        </p>
      </section>

      {/* Bento Grid Layout */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
        {/* Gamified Progress / Featured Lesson (Spans 8 cols) */}
        <div className="md:col-span-8 bg-gradient-to-br from-indigo-900/60 via-purple-900/50 to-slate-900/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-9 shadow-2xl border border-white/15 relative overflow-hidden flex flex-col justify-between group">
          {/* Ambient blur circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl opacity-60 -mr-16 -mt-16 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-amber-300 text-[18px] icon-fill">
                  star
                </span>
              </div>
              <span className="text-xs font-extrabold tracking-wider uppercase font-display text-amber-300">
                Sıradaki Görev
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 font-display">
              {featuredModule.title}
            </h2>

            <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-lg font-normal leading-relaxed">
              {featuredModule.description}
            </p>

            {/* Progress indicator */}
            <div className="mb-6 max-w-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm font-semibold text-gray-300">
                  İlerleme
                </span>
                <span className="text-sm sm:text-base font-extrabold text-indigo-300 font-display">
                  {featuredModule.progressPercent}%
                </span>
              </div>
              <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700 shadow-sm"
                  style={{ width: `${featuredModule.progressPercent}%` }}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onOpenModule(featuredModule)}
                className="bg-white text-slate-900 hover:bg-slate-100 text-sm sm:text-base font-bold px-7 py-3 rounded-xl transition-all shadow-lg active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                id="continue-featured-module-btn"
              >
                <span>Devam Et</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>

              {featuredModule.quizQuestions && (
                <button
                  onClick={() => onStartModuleQuiz(featuredModule)}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 text-sm font-bold px-5 py-3 rounded-xl transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">quiz</span>
                  <span>Modül Testi ({featuredModule.quizQuestions.length} Soru)</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Weekly XP / Quiz Stats Card (Spans 4 cols) */}
        <div className="md:col-span-4 bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 flex flex-col items-center text-center justify-center relative overflow-hidden">
          <div className="absolute top-[-20%] left-[-20%] w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-amber-400/15 border border-amber-400/30 rounded-3xl flex items-center justify-center mb-4 shadow-inner">
            <span className="material-symbols-outlined text-amber-300 text-4xl sm:text-5xl icon-fill">
              trophy
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white mb-1 font-display">
            Haftalık Skorun
          </h3>

          <div className="text-3xl sm:text-4xl font-extrabold text-amber-300 mb-2 font-display">
            {user.weeklyScore} <span className="text-base text-gray-400 font-normal">XP</span>
          </div>

          <p className="text-xs sm:text-sm text-gray-300 max-w-[200px] leading-relaxed">
            Sınıfında <strong className="text-indigo-300">{user.classRank}.</strong> sıradasın! Zirveye çok yakınsın.
          </p>
        </div>

        {/* Module 2: Hac ve Kurban */}
        {LEARN_MODULES.slice(1, 3).map((mod) => (
          <div
            key={mod.id}
            className="md:col-span-4 bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/10 hover:border-white/20 flex flex-col justify-between transition-all duration-300"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-300 border border-white/15">
                  <span className="material-symbols-outlined text-2xl">
                    {mod.icon}
                  </span>
                </div>
                <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-bold font-display border border-white/10">
                  Modül {mod.moduleNumber}
                </span>
              </div>

              <h4 className="text-xl font-bold text-white mb-1.5 font-display">
                {mod.title}
              </h4>
              <p className="text-sm text-gray-300 mb-5 leading-relaxed min-h-[40px]">
                {mod.description}
              </p>

              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300">
                  <span className="material-symbols-outlined text-indigo-400 text-[18px]">
                    play_circle
                  </span>
                  <span>{mod.videosCount} Video ({mod.totalMinutes} dk)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300">
                  <span className="material-symbols-outlined text-amber-300 text-[18px]">
                    quiz
                  </span>
                  <span>{mod.quizCount} İnteraktif Test</span>
                </div>
              </div>
            </div>

            {mod.isLocked ? (
              <button
                disabled
                className="w-full bg-white/5 text-gray-500 font-bold text-sm py-3 rounded-xl cursor-not-allowed border border-white/5 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span>Kilitli (Önceki Modülü Bitir)</span>
              </button>
            ) : (
              <button
                onClick={() => onOpenModule(mod)}
                className="w-full bg-white/10 hover:bg-indigo-600 text-white font-bold text-sm py-3 rounded-xl transition-all border border-white/15 hover:border-indigo-400/50 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                id={`module-start-btn-${mod.id}`}
              >
                <span>Başla</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            )}
          </div>
        ))}

        {/* Video Feature Highlight Card (Spans 4 cols) */}
        <div
          onClick={() => onOpenVideo(videoFeature)}
          className="md:col-span-4 rounded-3xl overflow-hidden shadow-2xl relative group cursor-pointer min-h-[260px] border border-white/15"
          id="daily-video-feature-card"
        >
          <img
            src={videoFeature.thumbnail}
            alt={videoFeature.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          />
          {/* Frosted Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-black/30 backdrop-blur-[2px]" />

          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <span className="bg-amber-400/30 text-amber-300 border border-amber-400/40 text-xs font-extrabold px-3 py-1 rounded-full self-start font-display backdrop-blur-md shadow-sm">
              {videoFeature.duration}
            </span>

            <div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 group-hover:bg-indigo-600 transition-transform">
                <span className="material-symbols-outlined text-white text-2xl icon-fill pl-0.5">
                  play_arrow
                </span>
              </div>

              <h4 className="text-xl font-bold text-white mb-1 font-display leading-tight">
                Günün Videosu
              </h4>
              <p className="text-sm text-indigo-200 font-medium line-clamp-1">
                {videoFeature.title}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
