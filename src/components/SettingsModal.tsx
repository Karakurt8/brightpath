import React, { useState } from 'react';
import { UserProfile } from '../types';

interface SettingsModalProps {
  user: UserProfile;
  onClose: () => void;
  onUpdateName: (newName: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ user, onClose, onUpdateName }) => {
  const [nameInput, setNameInput] = useState(user.name);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [anonymousDefault, setAnonymousDefault] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onUpdateName(nameInput.trim());
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div
        className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl w-full max-w-md shadow-2xl border border-white/20 overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
          <h3 className="font-bold text-lg text-white font-display flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-indigo-300 text-[20px]">manage_accounts</span>
            </div>
            <span>Hesap Ayarları</span>
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors border border-white/10"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
              Öğrenci Adı / Takma Ad
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm font-medium text-white placeholder-gray-500 focus:outline-hidden focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 backdrop-blur-md"
              required
            />
          </div>

          <div className="space-y-3 pt-2 border-t border-white/10">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-gray-200">Soru Cevap Bildirimleri</span>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-gray-200">Her Zaman İsimsiz Sor</span>
              <input
                type="checkbox"
                checked={anonymousDefault}
                onChange={(e) => setAnonymousDefault(e.target.checked)}
                className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
              />
            </label>
          </div>

          <div className="pt-4 border-t border-white/10 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/10 text-gray-300 hover:text-white hover:bg-white/15 font-bold py-2.5 rounded-xl text-sm cursor-pointer border border-white/10 transition-colors"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-sm cursor-pointer transition-all active:scale-95 border border-indigo-400/30 shadow-lg shadow-indigo-500/30"
            >
              {savedSuccess ? 'Kaydedildi! ✓' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
