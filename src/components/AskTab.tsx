import React, { useState } from 'react';
import { ASSETS, CATEGORIES } from '../data/mockData';
import { CategoryKey, QuestionItem, UserProfile } from '../types';

interface AskTabProps {
  user: UserProfile;
  initialCategory?: CategoryKey;
  questions: QuestionItem[];
  onAddNewQuestion: (question: {
    title: string;
    category: CategoryKey;
    isAnonymous: boolean;
  }) => void;
  onOpenQuestion: (question: QuestionItem) => void;
}

export const AskTab: React.FC<AskTabProps> = ({
  user,
  initialCategory = 'inanc',
  questions,
  onAddNewQuestion,
  onOpenQuestion,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>(initialCategory);
  const [questionText, setQuestionText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<CategoryKey | 'all'>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      onAddNewQuestion({
        title: questionText.trim(),
        category: selectedCategory,
        isAnonymous,
      });

      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setQuestionText('');

      setTimeout(() => {
        setSubmittedSuccess(false);
      }, 4000);
    }, 1200);
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesCat = filterCategory === 'all' || q.category === filterCategory;
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.answer?.content && q.answer.content.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="relative max-w-3xl mx-auto flex flex-col items-center">
      {/* Header Illustration & Motivational Title */}
      <div className="w-full text-center flex flex-col items-center mb-8 sm:mb-10">
        <div className="w-28 h-28 sm:w-36 sm:h-36 mb-5 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-2xl relative overflow-hidden p-2">
          <img
            src={ASSETS.studentCuriousIllustration}
            alt="Meraklı Öğrenci İllüstrasyonu"
            className="w-full h-full object-cover rounded-full filter drop-shadow-md"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2 max-w-lg font-display">
          Aklına takılan her şeyi sorabilirsin
        </h1>
        <p className="text-sm sm:text-base text-gray-300 max-w-md font-normal leading-relaxed">
          Hiçbir soru anlamsız değildir. Öğrenmek için buradayız, güvenle sor!
        </p>
      </div>

      {/* Main Question Form Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl flex flex-col gap-6 sm:gap-8 relative overflow-hidden"
        id="ask-question-form"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Category Selection (Chips) */}
        <div className="flex flex-col gap-3 relative z-10">
          <label className="text-sm font-bold text-white flex items-center gap-1.5 font-display">
            <span>Konu Seç</span>
            <span className="text-xs font-normal text-gray-400">(İsteğe Bağlı)</span>
          </label>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-400/50 shadow-md shadow-indigo-500/30 scale-102 font-bold'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                  id={`cat-select-${cat.id}`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {cat.icon}
                  </span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Text Input Area */}
        <div className="flex flex-col gap-2.5 relative z-10">
          <label
            htmlFor="question-text"
            className="text-sm font-bold text-white font-display flex items-center justify-between"
          >
            <span>Sorun Nedir?</span>
            <span className="text-xs font-normal text-gray-400">
              {questionText.length} karakter
            </span>
          </label>

          <div className="relative rounded-2xl overflow-hidden transition-all duration-200 bg-white/5 border border-white/15 focus-within:border-indigo-400 focus-within:bg-white/10 focus-within:ring-2 focus-within:ring-indigo-500/30">
            <textarea
              id="question-text"
              name="question"
              rows={4}
              required
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Örn: Neden dua etmeliyiz? Duamızın kabul olup olmadığını nasıl anlarız?"
              className="w-full bg-transparent border-none resize-none p-4 text-sm sm:text-base text-white placeholder:text-gray-400 focus:outline-hidden leading-relaxed"
            />
          </div>
        </div>

        {/* Footer Actions & Options */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-4 border-t border-white/10 relative z-10">
          {/* Anonymous Option */}
          <label className="flex items-start gap-3 cursor-pointer group select-none">
            <input
              type="checkbox"
              id="anonymous"
              name="anonymous"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="mt-0.5 w-5 h-5 rounded-md border-white/20 text-indigo-600 focus:ring-indigo-500 bg-white/10 cursor-pointer accent-indigo-600"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                İsimsiz Sor
              </span>
              <span className="text-xs text-gray-400">
                Profilin gizli kalacak (sadece uzman öğretmenler görebilir).
              </span>
            </div>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !questionText.trim()}
            className={`w-full sm:w-auto font-bold text-sm sm:text-base px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 border ${
              submittedSuccess
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-emerald-500/30'
                : isSubmitting
                ? 'bg-indigo-600/70 text-white border-indigo-400/40 cursor-not-allowed'
                : !questionText.trim()
                ? 'bg-white/10 text-gray-500 border-white/10 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 border-indigo-400/40 shadow-indigo-500/40'
            }`}
            id="submit-question-btn"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">
                  sync
                </span>
                <span>Gönderiliyor...</span>
              </>
            ) : submittedSuccess ? (
              <>
                <span className="material-symbols-outlined text-[20px] icon-fill">
                  check_circle
                </span>
                <span>Sorun İletildi! (+15 XP)</span>
              </>
            ) : (
              <>
                <span>Soruyu Gönder</span>
                <span className="material-symbols-outlined text-[20px]">
                  send
                </span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Explore Previous Questions / Community Answers */}
      <section className="w-full mt-12 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              Önceden Sorulan Sorular
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Aklındaki soru belki de daha önce uzmanlarımızca cevaplanmıştır
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors border ${
                filterCategory === 'all'
                  ? 'bg-indigo-600 text-white border-indigo-400/50 shadow-xs'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              Tümü
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilterCategory(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors border ${
                  filterCategory === c.id
                    ? 'bg-indigo-600 text-white border-indigo-400/50 shadow-xs'
                    : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search box */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Sorularda veya konularda ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl pl-10 pr-10 py-3 text-sm text-white placeholder:text-gray-400 focus:outline-hidden focus:border-indigo-400 focus:bg-white/10 transition-colors shadow-lg"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs font-bold cursor-pointer"
            >
              Temizle
            </button>
          )}
        </div>

        {/* Questions list */}
        <div className="space-y-3 pt-2">
          {filteredQuestions.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/10">
              <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">
                help_outline
              </span>
              <p className="text-white font-bold">Aradığın kriterde soru bulunamadı</p>
              <p className="text-xs text-gray-400 mt-1">
                Yukarıdaki formu kullanarak bu soruyu ilk soran sen olabilirsin!
              </p>
            </div>
          ) : (
            filteredQuestions.map((q) => (
              <div
                key={q.id}
                onClick={() => onOpenQuestion(q)}
                className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/8 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col gap-2.5 cursor-pointer transition-all duration-200 group"
                id={`explore-question-${q.id}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-indigo-500/15 text-indigo-300 px-2.5 py-0.5 rounded-full text-xs font-bold border border-indigo-500/25">
                    {CATEGORIES.find((c) => c.id === q.category)?.name || 'Genel'}
                  </span>
                  <span className="text-xs text-gray-400">{q.createdAt}</span>
                </div>

                <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors font-display leading-snug">
                  {q.title}
                </h3>

                {q.answer ? (
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex items-start gap-2.5 text-xs text-gray-300">
                    <img
                      src={q.answer.expertAvatar}
                      alt={q.answer.expertName}
                      className="w-6 h-6 rounded-full object-cover flex-shrink-0 mt-0.5 border border-white/20"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-indigo-300">{q.answer.expertName}: </span>
                      <span className="line-clamp-2 text-gray-300">{q.answer.content}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-amber-300 bg-amber-500/15 border border-amber-500/25 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    <span>Uzman öğretmenlerimiz tarafından inceleniyor...</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
