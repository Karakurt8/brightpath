import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfileTabProps {
  user: UserProfile;
  onOpenMyQuestions: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  onLogout: () => void;
  onEditAvatar: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  user,
  onOpenMyQuestions,
  onOpenSettings,
  onOpenHelp,
  onLogout,
  onEditAvatar,
}) => {
  const [selectedBadge, setSelectedBadge] = useState<any | null>(null);

  const xpPercent = Math.min(100, Math.round((user.currentXp / user.nextLevelXp) * 100));

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-6">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between pb-2 border-b border-white/10">
        <h1 className="text-2xl font-extrabold text-white font-display">Profil</h1>
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
          aria-label="Ayarlar"
        >
          <span className="material-symbols-outlined text-[24px]">settings</span>
        </button>
      </div>

      {/* Main Profile Header Card */}
      <section className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/15 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

        {/* Avatar with Edit Badge */}
        <div className="relative flex-shrink-0 group">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-white/30 shadow-2xl bg-white/10 p-1 backdrop-blur-md">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <button
            onClick={onEditAvatar}
            className="absolute bottom-1 right-1 bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer border-2 border-white/40"
            title="Profil Resmini Değiştir"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex-1 w-full relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {user.title} ({user.name})
            </h2>
            <span className="inline-block bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/30 self-center sm:self-auto backdrop-blur-xs">
              7. Sınıf Öğrencisi
            </span>
          </div>

          <p className="text-sm sm:text-base text-gray-300 mb-5 font-normal leading-relaxed">
            Hoş geldin! Bilgiye giden yolda emin adımlarla ilerliyorsun.
          </p>

          {/* Level Progress Bar */}
          <div className="w-full bg-black/40 rounded-full h-3 mb-2 overflow-hidden p-0.5 border border-white/10 shadow-inner">
            <div
              className="bg-gradient-to-r from-amber-400 to-amber-300 h-full rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${xpPercent}%` }}
            />
          </div>

          <div className="flex justify-between text-xs sm:text-sm font-semibold text-gray-400">
            <span>Seviye {user.level}: <span className="text-white">{user.levelTitle}</span></span>
            <span className="text-amber-300 font-bold">
              {user.currentXp} / {user.nextLevelXp} XP
            </span>
          </div>
        </div>
      </section>

      {/* Bento Grid: Stats & Badges */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
        {/* Question Stats Card (Spans 5 cols) */}
        <div className="md:col-span-5 bg-white/5 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/10 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 font-display">
              <span className="material-symbols-outlined text-indigo-400 icon-fill">
                forum
              </span>
              <span>Soru Özeti</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/5 p-4 rounded-2xl text-center border border-white/10 shadow-lg backdrop-blur-md">
                <span className="block text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {user.askedCount}
                </span>
                <span className="text-xs font-medium text-gray-400">Sorulan</span>
              </div>

              <div className="bg-emerald-500/10 p-4 rounded-2xl text-center border border-emerald-500/20 shadow-lg backdrop-blur-md">
                <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-300 font-display">
                  {user.answeredCount}
                </span>
                <span className="text-xs font-medium text-emerald-400/80">Cevaplanan</span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenMyQuestions}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm py-3 rounded-xl transition-all active:scale-98 cursor-pointer border border-white/15 flex items-center justify-center gap-1.5 shadow-md"
            id="view-all-questions-btn"
          >
            <span>Tüm Sorularımı Gör</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* Badges Card (Spans 7 cols) */}
        <div className="md:col-span-7 bg-gradient-to-br from-indigo-900/60 via-purple-900/40 to-slate-900/80 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/15 relative overflow-hidden flex flex-col justify-between">
          {/* Decorative Star Icon in background */}
          <div className="absolute -right-6 -top-6 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-9xl text-white icon-fill">
              stars
            </span>
          </div>

          <div className="relative z-10">
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2 font-display">
              <span className="material-symbols-outlined text-amber-300">
                military_tech
              </span>
              <span>Kazanılan Rozetler</span>
            </h3>

            <div className="flex flex-wrap gap-4 sm:gap-6">
              {user.badges.map((badge) => (
                <div
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge)}
                  className={`flex flex-col items-center gap-1.5 cursor-pointer group ${
                    badge.unlocked ? 'opacity-100' : 'opacity-40'
                  }`}
                  title={badge.title}
                >
                  <div
                    className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center p-2 backdrop-blur-md transition-transform group-hover:scale-105 ${
                      badge.unlocked
                        ? 'bg-white/15 border-2 border-amber-300/60 shadow-lg shadow-amber-500/20'
                        : 'bg-white/5 border-2 border-dashed border-white/20'
                    }`}
                  >
                    {badge.unlocked && badge.iconUrl ? (
                      <img
                        src={badge.iconUrl}
                        alt={badge.title}
                        className="w-10 h-10 object-contain filter drop-shadow-md"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-2xl text-gray-400">
                        lock
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-gray-200 text-center max-w-[70px] leading-tight">
                    {badge.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-indigo-300 font-bold">
            <span>2 / 3 Rozet Açıldı</span>
            <span className="text-amber-300">+250 XP Kazandırdı</span>
          </div>
        </div>
      </section>

      {/* Settings & Links Section */}
      <section className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden divide-y divide-white/10">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-white/5 transition-colors group cursor-pointer text-left"
          id="profile-settings-row"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-indigo-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors border border-white/10">
              <span className="material-symbols-outlined text-[20px]">
                manage_accounts
              </span>
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base text-white block">
                Hesap Ayarları
              </span>
              <span className="text-xs text-gray-400">
                Profil bilgileri, bildirimler ve tercihler
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-gray-400 group-hover:text-white transition-colors">
            chevron_right
          </span>
        </button>

        <button
          onClick={onOpenHelp}
          className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-white/5 transition-colors group cursor-pointer text-left"
          id="profile-help-row"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-indigo-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors border border-white/10">
              <span className="material-symbols-outlined text-[20px]">
                help_center
              </span>
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base text-white block">
                Yardım ve Destek
              </span>
              <span className="text-xs text-gray-400">
                Sıkça sorulan sorular, kullanım rehberi
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-gray-400 group-hover:text-white transition-colors">
            chevron_right
          </span>
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-rose-500/10 transition-colors group cursor-pointer text-left"
          id="profile-logout-row"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-300 group-hover:bg-rose-600 group-hover:text-white transition-colors border border-rose-500/30">
              <span className="material-symbols-outlined text-[20px]">
                logout
              </span>
            </div>
            <span className="font-bold text-sm sm:text-base text-rose-300">
              Çıkış Yap
            </span>
          </div>
        </button>
      </section>

      {/* Badge Detail Modal if clicked */}
      {selectedBadge && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setSelectedBadge(null)}
        >
          <div
            className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl border border-white/20 animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/10 border border-white/20 p-3 flex items-center justify-center shadow-inner">
              {selectedBadge.unlocked && selectedBadge.iconUrl ? (
                <img
                  src={selectedBadge.iconUrl}
                  alt={selectedBadge.title}
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              ) : (
                <span className="material-symbols-outlined text-4xl text-gray-400">
                  lock
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-white mb-1 font-display">
              {selectedBadge.title}
            </h3>

            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              {selectedBadge.description}
            </p>

            {selectedBadge.unlocked ? (
              <span className="inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs px-3 py-1 rounded-full mb-5">
                Kazanıldı: {selectedBadge.unlockDate || 'Aktif'}
              </span>
            ) : (
              <span className="inline-block bg-white/10 text-gray-400 font-bold text-xs px-3 py-1 rounded-full mb-5 border border-white/10">
                Henüz Kilitli
              </span>
            )}

            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl transition-colors cursor-pointer border border-indigo-400/40 shadow-lg shadow-indigo-500/30"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
