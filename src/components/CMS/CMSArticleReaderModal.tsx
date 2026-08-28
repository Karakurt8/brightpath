import React, { useState } from 'react';
import { CATEGORIES } from '../../data/mockData';
import { CMSContentItem } from '../../types';

interface CMSArticleReaderModalProps {
  item: CMSContentItem | null;
  onClose: () => void;
  onEdit: (item: CMSContentItem) => void;
  onTagClick?: (tag: string) => void;
}

export const CMSArticleReaderModal: React.FC<CMSArticleReaderModalProps> = ({
  item,
  onClose,
  onEdit,
  onTagClick,
}) => {
  const [likes, setLikes] = useState<number>(item?.likes ?? 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const categoryInfo = CATEGORIES.find((c) => c.id === item.category);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => Math.max(0, prev - 1));
      setHasLiked(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="bg-slate-900/95 backdrop-blur-2xl rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl border border-white/20 overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: categoryInfo?.color || '#6366f1' }}
            />
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
              {categoryInfo?.name || item.category}
            </span>
            {item.isFeatured && (
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-400/30 ml-2">
                ⭐ ÖNE ÇIKAN
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onEdit(item);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-indigo-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
              title="İçeriği Düzenle"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
              <span>Düzenle</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Linked HTML Image Hero */}
          <div className="w-full h-64 sm:h-84 rounded-3xl overflow-hidden relative border border-white/20 shadow-2xl group">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display leading-tight drop-shadow-md">
                {item.title}
              </h1>
              {item.imageCaption && (
                <p className="text-xs text-gray-300 mt-2 italic drop-shadow-sm">
                  📷 {item.imageCaption}
                </p>
              )}
            </div>
          </div>

          {/* Author & Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <img
                src={item.author.avatar}
                alt={item.author.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-white/30"
              />
              <div>
                <span className="font-bold text-sm text-white block">{item.author.name}</span>
                <span className="text-xs text-indigo-300">{item.author.role}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-gray-300">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-gray-400">
                  calendar_month
                </span>
                <span>{item.createdAt}</span>
              </span>

              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-gray-400">
                  schedule
                </span>
                <span>{item.readTimeMinutes} dk okuma</span>
              </span>

              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-gray-400">
                  visibility
                </span>
                <span>{item.views.toLocaleString('tr-TR')} okuma</span>
              </span>
            </div>
          </div>

          {/* Summary Callout Box */}
          <div className="p-5 bg-indigo-500/10 rounded-2xl border border-indigo-400/25 text-sm sm:text-base text-indigo-200 leading-relaxed font-medium">
            <p className="flex items-start gap-2">
              <span className="text-indigo-400 text-lg">💡</span>
              <span>{item.description}</span>
            </p>
          </div>

          {/* Main Article Content */}
          <div
            className="text-gray-200 text-sm sm:text-base leading-relaxed space-y-4 prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />

          {/* Tags Cloud */}
          <div className="pt-6 border-t border-white/10 space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              İlişkili Etiketler
            </span>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    onTagClick?.(tag);
                    onClose();
                  }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/5 hover:bg-indigo-500/20 text-indigo-300 hover:text-white border border-white/10 hover:border-indigo-400/40 transition-all cursor-pointer"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-white/10 bg-white/5 flex items-center justify-between gap-3 sticky bottom-0 z-20">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                hasLiked
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/30'
                  : 'bg-white/10 text-gray-300 hover:bg-white/15 border-white/10'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[18px] ${hasLiked ? 'icon-fill' : ''}`}
              >
                favorite
              </span>
              <span>{likes} Beğeni</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer border border-white/10"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              <span>{copied ? 'Kopyalandı!' : 'Paylaş'}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white text-slate-900 hover:bg-gray-100 text-xs font-bold shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
