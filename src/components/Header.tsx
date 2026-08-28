import React from 'react';
import { ASSETS } from '../data/mockData';
import { TabType, UserProfile } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
  user: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenNotifications,
  unreadCount = 2,
  user,
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand & Logo */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-3 cursor-pointer group text-left transition-transform active:scale-98"
          id="app-brand-button"
        >
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-white/10 backdrop-blur-md shadow-xs border border-white/20 p-1.5 flex items-center justify-center overflow-hidden transition-all group-hover:scale-105 group-hover:border-indigo-400/50">
            <img
              src={ASSETS.logo}
              alt="Bright Path Logo"
              className="h-full w-full object-contain filter drop-shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-none font-display">
              Bright Path
            </span>
            <span className="text-[11px] text-indigo-300 font-medium hidden sm:inline-block mt-0.5 tracking-wide">
              Sor & Öğren
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/5 backdrop-blur-md p-1.5 rounded-full border border-white/10">
          <button
            onClick={() => onSelectTab('home')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              currentTab === 'home'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
            id="nav-tab-home"
          >
            <span className={`material-symbols-outlined text-[19px] ${currentTab === 'home' ? 'icon-fill' : ''}`}>
              home
            </span>
            <span>Ana Sayfa</span>
          </button>

          <button
            onClick={() => onSelectTab('ask')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              currentTab === 'ask'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
            id="nav-tab-ask"
          >
            <span className={`material-symbols-outlined text-[19px] ${currentTab === 'ask' ? 'icon-fill' : ''}`}>
              chat_bubble
            </span>
            <span>Soru Sor</span>
          </button>

          <button
            onClick={() => onSelectTab('learn')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              currentTab === 'learn'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
            id="nav-tab-learn"
          >
            <span className={`material-symbols-outlined text-[19px] ${currentTab === 'learn' ? 'icon-fill' : ''}`}>
              local_library
            </span>
            <span>Öğren</span>
          </button>

          <button
            onClick={() => onSelectTab('cms')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              currentTab === 'cms'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
            id="nav-tab-cms"
          >
            <span className={`material-symbols-outlined text-[19px] ${currentTab === 'cms' ? 'icon-fill' : ''}`}>
              edit_document
            </span>
            <span>İçerik Masası (CMS)</span>
          </button>

          <button
            onClick={() => onSelectTab('profile')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              currentTab === 'profile'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
            id="nav-tab-profile"
          >
            <span className={`material-symbols-outlined text-[19px] ${currentTab === 'profile' ? 'icon-fill' : ''}`}>
              person
            </span>
            <span>Profil</span>
          </button>
        </nav>

        {/* Right Actions: Notifications + User Avatar */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onOpenNotifications}
            className="relative p-2.5 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer active:scale-95 border border-white/10"
            aria-label="Bildirimler"
            id="header-notifications-btn"
          >
            <span className="material-symbols-outlined text-[22px]">
              notifications
            </span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-400 text-amber-950 text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-md animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('profile')}
            className="relative rounded-full p-0.5 border-2 border-indigo-400/40 hover:border-indigo-400 transition-all cursor-pointer group active:scale-95 shadow-md shadow-indigo-500/10"
            title="Profiline Git"
            id="header-avatar-btn"
          >
            <img
              src={user.avatar || ASSETS.studentAvatarHeader}
              alt={`${user.name} Profil Resmi`}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shadow-xs"
            />
            <span className="absolute -bottom-1 -right-1 bg-indigo-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold leading-tight border border-white/40 shadow-xs">
              Lvl {user.level}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
