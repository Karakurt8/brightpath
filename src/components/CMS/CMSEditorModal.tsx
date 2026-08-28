import React, { useState } from 'react';
import { PRESET_IMAGE_TEMPLATES, SUGGESTED_TAGS } from '../../data/cmsMockData';
import { CATEGORIES, TEACHERS } from '../../data/mockData';
import { CMSContentItem, CMSContentStatus, CategoryKey } from '../../types';

interface CMSEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: CMSContentItem) => void;
  initialItem?: CMSContentItem | null;
}

export const CMSEditorModal: React.FC<CMSEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialItem,
}) => {
  const isEditing = !!initialItem;

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [title, setTitle] = useState(initialItem?.title || '');
  const [description, setDescription] = useState(initialItem?.description || '');
  const [content, setContent] = useState(
    initialItem?.content ||
      '<h3>Konuya Giriş</h3>\n<p>Buraya detaylı açıklamalarınızı ve gençlere yönelik rehberlik mesajlarınızı yazabilirsiniz.</p>\n\n<h4>Önemli Maddeler:</h4>\n<ul>\n  <li>Madde 1: Örnek bilgi</li>\n  <li>Madde 2: Güzel ahlak ilkesi</li>\n</ul>'
  );
  const [imageUrl, setImageUrl] = useState(
    initialItem?.imageUrl ||
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80'
  );
  const [imageCaption, setImageCaption] = useState(initialItem?.imageCaption || '');
  const [category, setCategory] = useState<CategoryKey | string>(initialItem?.category || 'inanc');
  const [tags, setTags] = useState<string[]>(initialItem?.tags || ['gençlik', 'inanç']);
  const [tagInput, setTagInput] = useState('');
  const [status, setStatus] = useState<CMSContentStatus>(initialItem?.status || 'published');
  const [authorName, setAuthorName] = useState(initialItem?.author.name || TEACHERS[0].name);
  const [authorRole, setAuthorRole] = useState(initialItem?.author.role || TEACHERS[0].title);
  const [authorAvatar, setAuthorAvatar] = useState(initialItem?.author.avatar || TEACHERS[0].avatar);
  const [isFeatured, setIsFeatured] = useState<boolean>(initialItem?.isFeatured || false);
  const [readTimeMinutes, setReadTimeMinutes] = useState<number>(initialItem?.readTimeMinutes || 4);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Add tag handler
  const handleAddTag = (newTag: string) => {
    const clean = newTag.trim().toLowerCase().replace(/^#/, '');
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleKeyDownTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag(tagInput);
    }
  };

  // Quick insertion helpers for content
  const insertContentMarkup = (prefix: string, suffix: string = '') => {
    setContent((prev) => `${prev}\n${prefix}${suffix}`);
  };

  const handleTeacherChange = (teacherName: string) => {
    const selected = TEACHERS.find((t) => t.name === teacherName);
    if (selected) {
      setAuthorName(selected.name);
      setAuthorRole(selected.title);
      setAuthorAvatar(selected.avatar);
    } else {
      setAuthorName(teacherName);
    }
  };

  // Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Lütfen geçerli bir başlık giriniz.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Lütfen kısa açıklama giriniz.');
      return;
    }
    if (!imageUrl.trim()) {
      setErrorMsg('Lütfen görsel bağlantısı (URL) ekleyiniz.');
      return;
    }

    const calculatedReadTime = Math.max(1, Math.ceil(content.split(/\s+/).length / 100));

    const itemToSave: CMSContentItem = {
      id: initialItem?.id || `cms-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
      imageUrl: imageUrl.trim(),
      imageCaption: imageCaption.trim() || undefined,
      category,
      tags: tags.length > 0 ? tags : ['genel'],
      author: {
        name: authorName,
        avatar: authorAvatar,
        role: authorRole,
      },
      status,
      createdAt: initialItem?.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      views: initialItem?.views ?? 0,
      likes: initialItem?.likes ?? 0,
      readTimeMinutes: calculatedReadTime,
      isFeatured,
    };

    onSave(itemToSave);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="bg-slate-900/95 backdrop-blur-2xl rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-white/20 overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-indigo-300 text-[22px]">
                {isEditing ? 'edit_document' : 'post_add'}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-white font-display">
                {isEditing ? 'İçeriği Düzenle' : 'Yeni İçerik Ekle'}
              </h3>
              <p className="text-xs text-gray-400">
                Başlık, açıklama, bağlantılı görsel ve etiketleri yapılandırın
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switch: Edit / Preview */}
            <div className="bg-black/30 p-1 rounded-xl border border-white/10 flex items-center">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'edit'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">edit_note</span>
                <span>Düzenleme</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'preview'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span>Canlı Önizleme</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              aria-label="Kapat"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-200 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {activeTab === 'edit' ? (
            <form id="cms-editor-form" onSubmit={handleSubmit} className="space-y-6">
              {/* 1. Row: Title and Category */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    İçerik Başlığı <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="Örn: İslam Ahlakında Dürüstlük ve Güvenilirlik"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm font-medium text-white placeholder-gray-500 focus:outline-hidden focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 backdrop-blur-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Kategori <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-800 border border-white/15 rounded-xl px-4 py-3 text-sm font-medium text-white focus:outline-hidden focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id} className="bg-slate-900 text-white">
                        {cat.name}
                      </option>
                    ))}
                    <option value="rehberlik" className="bg-slate-900 text-white">
                      Rehberlik & Yaşam
                    </option>
                  </select>
                </div>
              </div>

              {/* 2. Row: Description */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Kısa Açıklama / Özet <span className="text-rose-400">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="İçeriğin ana temasını özetleyen 1-2 cümlelik açıklama..."
                  rows={2}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm font-medium text-white placeholder-gray-500 focus:outline-hidden focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 backdrop-blur-md"
                  required
                />
              </div>

              {/* 3. Row: Image URL (HTML Linked) & Presets */}
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-indigo-400">
                      image
                    </span>
                    <span>Görsel Bağlantısı (HTML Linked URL) <span className="text-rose-400">*</span></span>
                  </label>
                  <span className="text-[11px] text-gray-400">Canlı Bağlantılı Önizleme</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-start">
                  <div className="flex-1 w-full">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/... veya görsel URL adresi"
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-sm font-medium text-white placeholder-gray-500 focus:outline-hidden focus:border-indigo-400"
                      required
                    />
                    <input
                      type="text"
                      value={imageCaption}
                      onChange={(e) => setImageCaption(e.target.value)}
                      placeholder="Görsel alt yazısı / açıklaması (isteğe bağlı)"
                      className="w-full mt-2 bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300 placeholder-gray-500 focus:outline-hidden focus:border-indigo-400"
                    />
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="w-full sm:w-32 h-20 rounded-xl overflow-hidden bg-black/40 border border-white/15 flex-shrink-0 relative group">
                    <img
                      src={imageUrl}
                      alt="Önizleme"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] text-white transition-opacity font-semibold">
                      Önizleme
                    </div>
                  </div>
                </div>

                {/* Preset image templates */}
                <div>
                  <span className="text-[11px] text-gray-400 block mb-2 font-medium">
                    ⚡ Hızlı Görsel Şablonları:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_IMAGE_TEMPLATES.map((tmpl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setImageUrl(tmpl.url)}
                        className="px-2.5 py-1 rounded-lg text-xs bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                      >
                        {tmpl.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Row: Tags Management */}
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  İlgili Etiketler (Tags)
                </label>

                {/* Current tags chips */}
                <div className="flex flex-wrap gap-2 min-h-[36px] items-center">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 backdrop-blur-xs"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-white hover:bg-indigo-500/40 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {tags.length === 0 && (
                    <span className="text-xs text-gray-500 italic">Henüz etiket eklenmedi</span>
                  )}
                </div>

                {/* Tag input field */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleKeyDownTag}
                    placeholder="Etiket yazıp Enter'a basın (örn: ahlak, sabır, dua)..."
                    className="flex-1 bg-black/40 border border-white/15 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-hidden focus:border-indigo-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddTag(tagInput)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer border border-indigo-400/30"
                  >
                    Ekle
                  </button>
                </div>

                {/* Suggested tags */}
                <div className="pt-2">
                  <span className="text-[11px] text-gray-400 block mb-1.5">
                    💡 Önerilen Popüler Etiketler (Tıklayarak ekleyin):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_TAGS.map((stag) => (
                      <button
                        key={stag}
                        type="button"
                        disabled={tags.includes(stag)}
                        onClick={() => handleAddTag(stag)}
                        className={`text-[11px] px-2.5 py-0.5 rounded-md transition-all cursor-pointer ${
                          tags.includes(stag)
                            ? 'bg-white/5 text-gray-500 cursor-not-allowed opacity-40'
                            : 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white'
                        }`}
                      >
                        +{stag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5. Row: Detailed Content with Markup Tools */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                    Detaylı İçerik (HTML / Metin)
                  </label>
                  {/* Quick Format Tools */}
                  <div className="flex flex-wrap gap-1">
                    <button
                      type="button"
                      onClick={() => insertContentMarkup('<h3>Alt Başlık</h3>')}
                      className="px-2 py-1 bg-white/10 hover:bg-white/20 text-[11px] rounded text-gray-300 font-mono"
                      title="Alt Başlık Ekle"
                    >
                      H3
                    </button>
                    <button
                      type="button"
                      onClick={() => insertContentMarkup('<strong>', '</strong>')}
                      className="px-2 py-1 bg-white/10 hover:bg-white/20 text-[11px] rounded text-gray-300 font-bold"
                      title="Kalın Yazı"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => insertContentMarkup('<em>', '</em>')}
                      className="px-2 py-1 bg-white/10 hover:bg-white/20 text-[11px] rounded text-gray-300 italic"
                      title="İtalik Yazı"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        insertContentMarkup(
                          '<ul>\n  <li>Madde 1</li>\n  <li>Madde 2</li>\n</ul>'
                        )
                      }
                      className="px-2 py-1 bg-white/10 hover:bg-white/20 text-[11px] rounded text-gray-300"
                      title="Liste Ekle"
                    >
                      • Liste
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        insertContentMarkup(
                          `<img src="${imageUrl}" alt="${title}" class="w-full rounded-2xl my-4 shadow-lg" />`
                        )
                      }
                      className="px-2 py-1 bg-indigo-600/40 hover:bg-indigo-600/60 text-[11px] rounded text-indigo-200"
                      title="HTML Görsel Etiketi Ekle"
                    >
                      + &lt;img&gt;
                    </button>
                  </div>
                </div>

                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-sm font-mono text-gray-200 placeholder-gray-500 focus:outline-hidden focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 backdrop-blur-md leading-relaxed"
                  placeholder="<p>İçeriğin detaylı metni...</p>"
                  required
                />
              </div>

              {/* 6. Row: Publishing & Author Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
                {/* Status */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Yayın Durumu
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as CMSContentStatus)}
                    className="w-full bg-slate-800 border border-white/15 rounded-xl px-4 py-2.5 text-sm font-medium text-white focus:outline-hidden focus:border-indigo-400"
                  >
                    <option value="published" className="bg-slate-900 text-white">
                      ✅ Yayında (Published)
                    </option>
                    <option value="draft" className="bg-slate-900 text-white">
                      📝 Taslak (Draft)
                    </option>
                    <option value="archived" className="bg-slate-900 text-white">
                      📦 Arşiv (Archived)
                    </option>
                  </select>
                </div>

                {/* Author Select */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Yazar / Eğitmen
                  </label>
                  <select
                    value={authorName}
                    onChange={(e) => handleTeacherChange(e.target.value)}
                    className="w-full bg-slate-800 border border-white/15 rounded-xl px-4 py-2.5 text-sm font-medium text-white focus:outline-hidden focus:border-indigo-400"
                  >
                    {TEACHERS.map((t) => (
                      <option key={t.id} value={t.name} className="bg-slate-900 text-white">
                        {t.name} ({t.title.split(' ')[0]})
                      </option>
                    ))}
                    <option value="Bright Path Editörü" className="bg-slate-900 text-white">
                      Bright Path Editörü
                    </option>
                  </select>
                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-3 cursor-pointer select-none bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 w-full">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">⭐ Öne Çıkar</span>
                      <span className="text-[10px] text-gray-400">Ana vitrinde sergilenir</span>
                    </div>
                  </label>
                </div>
              </div>
            </form>
          ) : (
            /* Live Preview Screen */
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Linked Image Frame */}
              <div className="w-full h-64 sm:h-80 rounded-3xl overflow-hidden relative border border-white/20 shadow-2xl">
                <img
                  src={imageUrl}
                  alt={title || 'Önizleme'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <span className="inline-block text-xs font-bold text-indigo-300 uppercase tracking-wider bg-indigo-500/30 px-3 py-1 rounded-full border border-indigo-400/40 backdrop-blur-md mb-2">
                      {CATEGORIES.find((c) => c.id === category)?.name || category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-tight drop-shadow-md">
                      {title || 'Başlık Önizlemesi'}
                    </h2>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-bold border backdrop-blur-md ${
                      status === 'published'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : status === 'draft'
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                        : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                    }`}
                  >
                    {status === 'published' ? 'Yayında' : status === 'draft' ? 'Taslak' : 'Arşiv'}
                  </span>
                </div>
              </div>

              {/* Author & Meta bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src={authorAvatar}
                    alt={authorName}
                    className="w-10 h-10 rounded-full object-cover border border-white/30"
                  />
                  <div>
                    <span className="font-bold text-sm text-white block">{authorName}</span>
                    <span className="text-xs text-indigo-300">{authorRole}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-300">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                    <span>{new Date().toLocaleDateString('tr-TR')}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    <span>{readTimeMinutes} dk okuma</span>
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-400/20 text-sm text-indigo-200 leading-relaxed italic">
                "{description || 'Özet açıklama buraya gelecektir...'}"
              </div>

              {/* Formatted Content */}
              <div
                className="text-gray-200 text-sm sm:text-base leading-relaxed space-y-4 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Tags */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 items-center">
                <span className="text-xs text-gray-400 font-bold uppercase">Etiketler:</span>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="p-5 border-t border-white/10 bg-white/5 flex items-center justify-between gap-3 sticky bottom-0 z-20">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 hover:text-white text-sm font-semibold transition-colors cursor-pointer border border-white/10"
          >
            İptal
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'edit' ? 'preview' : 'edit')}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-indigo-300 text-sm font-semibold transition-colors cursor-pointer border border-white/10 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">
                {activeTab === 'edit' ? 'visibility' : 'edit'}
              </span>
              <span>{activeTab === 'edit' ? 'Önizle' : 'Düzenle'}</span>
            </button>

            <button
              type="submit"
              form="cms-editor-form"
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/30 transition-all active:scale-95 cursor-pointer border border-indigo-400/40 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>{isEditing ? 'Değişiklikleri Kaydet' : 'İçeriği Yayınla'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
