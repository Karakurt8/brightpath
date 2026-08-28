import React, { useMemo, useState } from 'react';
import { CATEGORIES } from '../../data/mockData';
import { CMSContentItem, CMSContentStatus } from '../../types';
import { CMSArticleReaderModal } from './CMSArticleReaderModal';
import { CMSDeleteConfirmModal } from './CMSDeleteConfirmModal';
import { CMSEditorModal } from './CMSEditorModal';

interface CMSManagerProps {
  items: CMSContentItem[];
  onAddItem: (item: CMSContentItem) => void;
  onUpdateItem: (item: CMSContentItem) => void;
  onDeleteItem: (id: string) => void;
  onResetDefaults?: () => void;
}

type SortOption =
  | 'date-desc'
  | 'date-asc'
  | 'views-desc'
  | 'likes-desc'
  | 'title-asc'
  | 'title-desc'
  | 'readtime-asc';

export const CMSManager: React.FC<CMSManagerProps> = ({
  items,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onResetDefaults,
}) => {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modals state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CMSContentItem | null>(null);
  const [readingItem, setReadingItem] = useState<CMSContentItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<CMSContentItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Collect all unique tags from current items
  const allTags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      item.tags.forEach((t) => set.add(t.toLowerCase().trim()));
    });
    return Array.from(set).sort();
  }, [items]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = items.length;
    const published = items.filter((i) => i.status === 'published').length;
    const draft = items.filter((i) => i.status === 'draft').length;
    const totalViews = items.reduce((acc, i) => acc + (i.views || 0), 0);
    const totalLikes = items.reduce((acc, i) => acc + (i.likes || 0), 0);
    return { total, published, draft, totalViews, totalLikes };
  }, [items]);

  // Filter and Sort items
  const filteredAndSortedItems = useMemo(() => {
    return items
      .filter((item) => {
        // Keyword Search across title, description, content, author, and tags
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchTitle = item.title.toLowerCase().includes(query);
          const matchDesc = item.description.toLowerCase().includes(query);
          const matchContent = item.content.toLowerCase().includes(query);
          const matchAuthor = item.author.name.toLowerCase().includes(query);
          const matchTag = item.tags.some((t) => t.toLowerCase().includes(query));
          if (!matchTitle && !matchDesc && !matchContent && !matchAuthor && !matchTag) {
            return false;
          }
        }

        // Category Filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }

        // Status Filter
        if (selectedStatus !== 'all' && item.status !== selectedStatus) {
          return false;
        }

        // Tag Filter
        if (selectedTag !== 'all') {
          const hasTag = item.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());
          if (!hasTag) return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'date-desc':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'date-asc':
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          case 'views-desc':
            return (b.views || 0) - (a.views || 0);
          case 'likes-desc':
            return (b.likes || 0) - (a.likes || 0);
          case 'title-asc':
            return a.title.localeCompare(b.title, 'tr');
          case 'title-desc':
            return b.title.localeCompare(a.title, 'tr');
          case 'readtime-asc':
            return (a.readTimeMinutes || 1) - (b.readTimeMinutes || 1);
          default:
            return 0;
        }
      });
  }, [items, searchQuery, selectedCategory, selectedStatus, selectedTag, sortBy]);

  // Handlers
  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setIsEditorOpen(true);
  };

  const handleOpenEditModal = (item: CMSContentItem) => {
    setEditingItem(item);
    setIsEditorOpen(true);
  };

  const handleSaveItem = (savedItem: CMSContentItem) => {
    if (editingItem) {
      onUpdateItem(savedItem);
      showToast('İçerik başarıyla güncellendi! ✓');
    } else {
      onAddItem(savedItem);
      showToast('Yeni içerik başarıyla eklendi! ✓');
    }
    setIsEditorOpen(false);
    setEditingItem(null);
  };

  const handleDeleteConfirm = () => {
    if (deletingItem) {
      onDeleteItem(deletingItem.id);
      showToast('İçerik sistemden silindi.');
      setDeletingItem(null);
    }
  };

  const handleDuplicateItem = (item: CMSContentItem) => {
    const duplicated: CMSContentItem = {
      ...item,
      id: `cms-${Date.now()}`,
      title: `${item.title} (Kopya)`,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0,
    };
    onAddItem(duplicated);
    showToast('İçerik taslak olarak kopyalandı! ✓');
  };

  const handleQuickToggleStatus = (item: CMSContentItem) => {
    const nextStatus: CMSContentStatus =
      item.status === 'published' ? 'draft' : 'published';
    onUpdateItem({ ...item, status: nextStatus });
    showToast(`İçerik durumu "${nextStatus === 'published' ? 'Yayında' : 'Taslak'}" olarak güncellendi.`);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedTag('all');
    setSortBy('date-desc');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-2xl border border-indigo-400/40 flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <span className="material-symbols-outlined text-[20px] icon-fill">check_circle</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Overview Banner */}
      <section className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/15 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider font-display">
                İçerik Yönetim Sistemi (CMS)
              </span>
              <span className="text-xs text-gray-400">Canlı Yönetim Masası</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight">
              Eğitim ve Değerler İçerik Masası
            </h1>
            <p className="text-sm sm:text-base text-gray-300 mt-2 max-w-2xl leading-relaxed">
              Makaleleri, görsel bağlantılı dersleri ve rehberlik içeriklerini ekleyin, düzenleyin, etiketleyin ve yayınlayın.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onResetDefaults && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Varsayılan örnek içerikleri geri yüklemek istiyor musunuz?')) {
                    onResetDefaults();
                    showToast('Varsayılan içerikler geri yüklendi.');
                  }
                }}
                className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-white/10 flex items-center gap-2"
                title="Varsayılan İçerikleri Yükle"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                <span className="hidden sm:inline">Varsayılana Sıfırla</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-xl shadow-indigo-500/30 transition-all active:scale-95 cursor-pointer border border-indigo-400/40 flex items-center gap-2"
              id="cms-add-new-btn"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span>Yeni İçerik Ekle</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <span className="text-xs text-gray-400 font-medium block">Toplam İçerik</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-0.5 block">
              {stats.total}
            </span>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <span className="text-xs text-gray-400 font-medium block">Yayında Olanlar</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-display mt-0.5 block">
              {stats.published}
            </span>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <span className="text-xs text-gray-400 font-medium block">Taslaklar</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-display mt-0.5 block">
              {stats.draft}
            </span>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <span className="text-xs text-gray-400 font-medium block">Toplam Okunma</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-300 font-display mt-0.5 block">
              {stats.totalViews.toLocaleString('tr-TR')}
            </span>
          </div>
        </div>
      </section>

      {/* Search, Filter & Sort Controls */}
      <section className="bg-white/5 backdrop-blur-2xl rounded-3xl p-5 sm:p-6 shadow-xl border border-white/15 space-y-4">
        {/* Search Bar + View Mode Toggle */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Başlık, açıklama, içerik veya etiketlerde ara..."
              className="w-full bg-black/30 border border-white/15 rounded-2xl pl-11 pr-10 py-3 text-sm text-white placeholder-gray-400 focus:outline-hidden focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 backdrop-blur-md transition-all"
              id="cms-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 rounded-full cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">cancel</span>
              </button>
            )}
          </div>

          {/* View Mode & Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            {/* Sort Criteria */}
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-2xl border border-white/15">
              <span className="material-symbols-outlined text-gray-400 text-[18px]">
                sort
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-xs sm:text-sm font-semibold text-white focus:outline-hidden cursor-pointer"
                id="cms-sort-select"
              >
                <option value="date-desc" className="bg-slate-900 text-white">
                  🕒 En Yeni
                </option>
                <option value="date-asc" className="bg-slate-900 text-white">
                  🕒 En Eski
                </option>
                <option value="views-desc" className="bg-slate-900 text-white">
                  🔥 Popülerlik (Okunma)
                </option>
                <option value="likes-desc" className="bg-slate-900 text-white">
                  ❤️ En Çok Beğenilen
                </option>
                <option value="title-asc" className="bg-slate-900 text-white">
                  🔤 Başlık (A - Z)
                </option>
                <option value="title-desc" className="bg-slate-900 text-white">
                  🔤 Başlık (Z - A)
                </option>
                <option value="readtime-asc" className="bg-slate-900 text-white">
                  ⏱️ Okuma Süresi (Kısa)
                </option>
              </select>
            </div>

            {/* Grid / List View Toggle */}
            <div className="bg-black/30 p-1 rounded-2xl border border-white/15 flex items-center">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Kart / Grid Görünümü"
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Tablo / Liste Görünümü"
              >
                <span className="material-symbols-outlined text-[18px]">view_list</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills Row: Categories & Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-gray-400 font-bold uppercase mr-1">Kategori:</span>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                selectedCategory === 'all'
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm'
                  : 'bg-white/5 text-gray-300 hover:text-white border-white/10 hover:bg-white/10'
              }`}
            >
              Tümü ({items.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = items.filter((i) => i.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm'
                      : 'bg-white/5 text-gray-300 hover:text-white border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span>{cat.name}</span>
                  <span className="text-[10px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-400 font-bold uppercase mr-1">Durum:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-black/30 border border-white/15 rounded-xl px-3 py-1 text-xs font-semibold text-white focus:outline-hidden cursor-pointer"
            >
              <option value="all" className="bg-slate-900 text-white">
                Tüm Durumlar
              </option>
              <option value="published" className="bg-slate-900 text-white">
                ✅ Yayında ({stats.published})
              </option>
              <option value="draft" className="bg-slate-900 text-white">
                📝 Taslak ({stats.draft})
              </option>
              <option value="archived" className="bg-slate-900 text-white">
                📦 Arşiv
              </option>
            </select>
          </div>
        </div>

        {/* Tag Cloud Selector */}
        {allTags.length > 0 && (
          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-gray-400 font-bold uppercase mr-1">
              🏷️ Etikete Göre Filtrele:
            </span>
            <button
              type="button"
              onClick={() => setSelectedTag('all')}
              className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                selectedTag === 'all'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              Tüm Etiketler
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-indigo-600 text-white border border-indigo-400 shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-indigo-300 hover:text-white border border-white/5'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* Active Filter Indicators */}
        {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all' || selectedTag !== 'all') && (
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
            <span>
              <strong>{filteredAndSortedItems.length}</strong> içerik bulundu.
            </span>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-indigo-300 hover:text-white underline cursor-pointer font-semibold"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </section>

      {/* Content Items List / Grid */}
      {filteredAndSortedItems.length === 0 ? (
        <section className="bg-white/5 backdrop-blur-2xl rounded-3xl p-12 text-center border border-white/15 space-y-4">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center text-gray-400">
            <span className="material-symbols-outlined text-4xl">search_off</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-display">
              Aramanıza Uygun İçerik Bulunamadı
            </h3>
            <p className="text-sm text-gray-300 max-w-md mx-auto mt-1">
              Farklı bir anahtar kelime, kategori veya etiket deneyebilir veya yeni bir içerik oluşturabilirsiniz.
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors cursor-pointer border border-white/10"
            >
              Filtreleri Sıfırla
            </button>
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-indigo-500/30 border border-indigo-400/40"
            >
              Yeni İçerik Ekle
            </button>
          </div>
        </section>
      ) : viewMode === 'grid' ? (
        /* Grid Cards View */
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedItems.map((item) => {
            const categoryInfo = CATEGORIES.find((c) => c.id === item.category);

            return (
              <div
                key={item.id}
                className="bg-white/5 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/15 shadow-xl hover:border-white/30 transition-all flex flex-col group"
              >
                {/* Linked Image Header Frame */}
                <div
                  className="relative h-48 w-full overflow-hidden bg-black/40 cursor-pointer"
                  onClick={() => setReadingItem(item)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-md border border-white/20 backdrop-blur-md"
                      style={{ backgroundColor: categoryInfo?.color || '#6366f1' }}
                    >
                      {categoryInfo?.name || item.category}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {item.isFeatured && (
                        <span className="bg-amber-400 text-amber-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
                          ⭐ ÖNE ÇIKAN
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickToggleStatus(item);
                        }}
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md cursor-pointer transition-colors ${
                          item.status === 'published'
                            ? 'bg-emerald-500/30 text-emerald-200 border-emerald-400/40 hover:bg-emerald-500/50'
                            : item.status === 'draft'
                            ? 'bg-amber-400/30 text-amber-200 border-amber-400/40 hover:bg-amber-400/50'
                            : 'bg-gray-500/30 text-gray-200 border-gray-400/40'
                        }`}
                        title="Tıklayarak durumu değiştirin"
                      >
                        {item.status === 'published' ? 'Yayında' : item.status === 'draft' ? 'Taslak' : 'Arşiv'}
                      </button>
                    </div>
                  </div>

                  {/* Read time badge bottom right */}
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1 border border-white/10">
                    <span className="material-symbols-outlined text-[13px]">schedule</span>
                    <span>{item.readTimeMinutes} dk</span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    {/* Title */}
                    <h3
                      onClick={() => setReadingItem(item)}
                      className="text-lg font-bold text-white font-display leading-snug line-clamp-2 hover:text-indigo-300 transition-colors cursor-pointer"
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.slice(0, 4).map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setSelectedTag(tag)}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/5 hover:bg-indigo-500/20 text-indigo-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                        >
                          #{tag}
                        </button>
                      ))}
                      {item.tags.length > 4 && (
                        <span className="text-[11px] text-gray-400 px-1 py-0.5">
                          +{item.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Author & Stats Footer */}
                  <div className="pt-3 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-2">
                        <img
                          src={item.author.avatar}
                          alt={item.author.name}
                          className="w-6 h-6 rounded-full object-cover border border-white/20"
                        />
                        <span className="font-semibold text-gray-300">{item.author.name}</span>
                      </div>
                      <span>{item.createdAt}</span>
                    </div>

                    {/* Stats & Actions */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1" title="Görüntüleme">
                          <span className="material-symbols-outlined text-[15px]">visibility</span>
                          <span>{item.views}</span>
                        </span>
                        <span className="flex items-center gap-1" title="Beğeni">
                          <span className="material-symbols-outlined text-[15px]">favorite</span>
                          <span>{item.likes}</span>
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setReadingItem(item)}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/10"
                          title="Detaylı Oku"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white transition-colors cursor-pointer border border-indigo-400/30"
                          title="Düzenle"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDuplicateItem(item)}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/10"
                          title="Kopyasını Oluştur"
                        >
                          <span className="material-symbols-outlined text-[18px]">content_copy</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeletingItem(item)}
                          className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-600 text-rose-300 hover:text-white transition-colors cursor-pointer border border-rose-500/30"
                          title="Sil"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      ) : (
        /* List / Table View */
        <section className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/15 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-200">
              <thead className="bg-white/5 border-b border-white/10 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    İçerik & Görsel
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Kategori
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Etiketler
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Yazar & Tarih
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Durum
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    İstatistik
                  </th>
                  <th scope="col" className="px-6 py-4 text-right">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredAndSortedItems.map((item) => {
                  const categoryInfo = CATEGORIES.find((c) => c.id === item.category);

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => setReadingItem(item)}
                    >
                      {/* Image + Title */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3.5 max-w-sm">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-14 h-14 rounded-xl object-cover border border-white/20 flex-shrink-0"
                          />
                          <div>
                            <h4 className="font-bold text-sm text-white font-display hover:text-indigo-300 transition-colors line-clamp-1">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-semibold text-white border border-white/20"
                          style={{ backgroundColor: categoryInfo?.color || '#6366f1' }}
                        >
                          {categoryInfo?.name || item.category}
                        </span>
                      </td>

                      {/* Tags */}
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {item.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-indigo-300"
                            >
                              #{tag}
                            </span>
                          ))}
                          {item.tags.length > 3 && (
                            <span className="text-[10px] text-gray-500">
                              +{item.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Author & Date */}
                      <td className="px-4 py-4 whitespace-nowrap text-xs">
                        <div className="font-semibold text-gray-200">{item.author.name}</div>
                        <div className="text-[11px] text-gray-400">{item.createdAt}</div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                            item.status === 'published'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : item.status === 'draft'
                              ? 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                              : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                          }`}
                        >
                          {item.status === 'published'
                            ? 'Yayında'
                            : item.status === 'draft'
                            ? 'Taslak'
                            : 'Arşiv'}
                        </span>
                      </td>

                      {/* Views & Likes */}
                      <td className="px-4 py-4 whitespace-nowrap text-center text-xs text-gray-300">
                        <div>👁️ {item.views}</div>
                        <div className="text-[11px] text-gray-400">❤️ {item.likes}</div>
                      </td>

                      {/* Actions */}
                      <td
                        className="px-6 py-4 whitespace-nowrap text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white transition-colors cursor-pointer border border-indigo-400/30"
                            title="Düzenle"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDuplicateItem(item)}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/10"
                            title="Kopyala"
                          >
                            <span className="material-symbols-outlined text-[18px]">content_copy</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeletingItem(item)}
                            className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-600 text-rose-300 hover:text-white transition-colors cursor-pointer border border-rose-500/30"
                            title="Sil"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Editor Modal (Add/Edit) */}
      <CMSEditorModal
        isOpen={isEditorOpen}
        initialItem={editingItem}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
      />

      {/* Reader Modal */}
      <CMSArticleReaderModal
        item={readingItem}
        onClose={() => setReadingItem(null)}
        onEdit={(item) => handleOpenEditModal(item)}
        onTagClick={(tag) => setSelectedTag(tag)}
      />

      {/* Delete Confirmation Modal */}
      <CMSDeleteConfirmModal
        item={deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};
