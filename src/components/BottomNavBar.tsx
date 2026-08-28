import React from 'react';
import { TabType } from '../types';

interface BottomNavBarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentTab, onSelectTab }) => {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-slate-900/85 backdrop-blur-2xl shadow-[0px_-8px_32px_rgba(0,0,0,0.5)] border-t border-white/10 px-3 py-2 pb-[max(env(safe-area-inset-bottom),10px)] flex justify-around items-center"
      aria-label="Mobil Alt Menü"
      id="bottom-nav-bar"
    >
      {/* Home Tab */}
      <button
        onClick={() => onSelectTab('home')}
        className={`flex flex-col items-center justify-center py-1.5 px-4 rounded-2xl transition-all duration-200 cursor-pointer ${
          currentTab === 'home'
            ? 'bg-indigo-600 text-white font-bold scale-105 shadow-lg shadow-indigo-500/30 border border-white/20'
            : 'text-gray-400 hover:text-white'
        }`}
        id="mobile-nav-home"
      >
        <span
          className={`material-symbols-outlined text-[22px] ${
            currentTab === 'home' ? 'icon-fill text-white' : ''
          }`}
        >
          home
        </span>
        <span className="text-[11px] font-medium mt-0.5 tracking-tight">Ana Sayfa</span>
      </button>

      {/* Ask Tab */}
      <button
        onClick={() => onSelectTab('ask')}
        className={`flex flex-col items-center justify-center py-1.5 px-4 rounded-2xl transition-all duration-200 cursor-pointer ${
          currentTab === 'ask'
            ? 'bg-indigo-600 text-white font-bold scale-105 shadow-lg shadow-indigo-500/30 border border-white/20'
            : 'text-gray-400 hover:text-white'
        }`}
        id="mobile-nav-ask"
      >
        <span
          className={`material-symbols-outlined text-[22px] ${
            currentTab === 'ask' ? 'icon-fill text-white' : ''
          }`}
        >
          chat_bubble
        </span>
        <span className="text-[11px] font-medium mt-0.5 tracking-tight">Soru Sor</span>
      </button>

      {/* Learn Tab */}
      <button
        onClick={() => onSelectTab('learn')}
        className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 cursor-pointer ${
          currentTab === 'learn'
            ? 'bg-indigo-600 text-white font-bold scale-105 shadow-lg shadow-indigo-500/30 border border-white/20'
            : 'text-gray-400 hover:text-white'
        }`}
        id="mobile-nav-learn"
      >
        <span
          className={`material-symbols-outlined text-[22px] ${
            currentTab === 'learn' ? 'icon-fill text-white' : ''
          }`}
        >
          local_library
        </span>
        <span className="text-[11px] font-medium mt-0.5 tracking-tight">Öğren</span>
      </button>

      {/* CMS Tab */}
      <button
        onClick={() => onSelectTab('cms')}
        className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 cursor-pointer ${
          currentTab === 'cms'
            ? 'bg-indigo-600 text-white font-bold scale-105 shadow-lg shadow-indigo-500/30 border border-white/20'
            : 'text-gray-400 hover:text-white'
        }`}
        id="mobile-nav-cms"
      >
        <span
          className={`material-symbols-outlined text-[22px] ${
            currentTab === 'cms' ? 'icon-fill text-white' : ''
          }`}
        >
          edit_document
        </span>
        <span className="text-[11px] font-medium mt-0.5 tracking-tight">CMS</span>
      </button>

      {/* Profile Tab */}
      <button
        onClick={() => onSelectTab('profile')}
        className={`flex flex-col items-center justify-center py-1.5 px-4 rounded-2xl transition-all duration-200 cursor-pointer ${
          currentTab === 'profile'
            ? 'bg-indigo-600 text-white font-bold scale-105 shadow-lg shadow-indigo-500/30 border border-white/20'
            : 'text-gray-400 hover:text-white'
        }`}
        id="mobile-nav-profile"
      >
        <span
          className={`material-symbols-outlined text-[22px] ${
            currentTab === 'profile' ? 'icon-fill text-white' : ''
          }`}
        >
          person
        </span>
        <span className="text-[11px] font-medium mt-0.5 tracking-tight">Profil</span>
      </button>
    </nav>
  );
};
