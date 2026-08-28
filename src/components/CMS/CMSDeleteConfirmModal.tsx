import React from 'react';
import { CMSContentItem } from '../../types';

interface CMSDeleteConfirmModalProps {
  item: CMSContentItem | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const CMSDeleteConfirmModal: React.FC<CMSDeleteConfirmModalProps> = ({
  item,
  onClose,
  onConfirm,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div
        className="bg-slate-900/95 backdrop-blur-2xl rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-white/20 overflow-hidden animate-in fade-in zoom-in duration-200 text-center space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Warning Icon */}
        <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center shadow-inner">
          <span className="material-symbols-outlined text-4xl">delete_forever</span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white font-display mb-2">
            İçeriği Silmek İstiyor musunuz?
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            <strong className="text-white">"{item.title}"</strong> başlıklı içerik sistemden kalıcı olarak kaldırılacaktır. Bu işlem geri alınamaz.
          </p>
        </div>

        {/* Thumbnail Preview */}
        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3 text-left">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-14 h-14 rounded-xl object-cover border border-white/20 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[11px] text-indigo-300 font-bold uppercase tracking-wider block">
              {item.category}
            </span>
            <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
            <span className="text-[10px] text-gray-400">Yazar: {item.author.name}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-white/10 hover:bg-white/15 text-gray-300 hover:text-white font-bold py-2.5 rounded-xl text-sm cursor-pointer border border-white/10 transition-colors"
          >
            Vazgeç
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 rounded-xl text-sm cursor-pointer transition-all active:scale-95 border border-rose-400/40 shadow-lg shadow-rose-600/30"
          >
            Evet, Sil
          </button>
        </div>
      </div>
    </div>
  );
};
