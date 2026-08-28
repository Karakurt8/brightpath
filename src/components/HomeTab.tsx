import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { CategoryKey, CMSContentItem, QuestionItem, TeacherExpert, UserProfile } from '../types';

interface HomeTabProps {
  user: UserProfile;
  questions: QuestionItem[];
  teachers: TeacherExpert[];
  cmsItems?: CMSContentItem[];
  onOpenQuestion: (question: QuestionItem) => void;
  onOpenTeacher: (teacher: TeacherExpert) => void;
  onStartQuiz: () => void;
  onSelectCategory: (category: CategoryKey) => void;
  onNavigateToAsk: (category?: CategoryKey) => void;
  onNavigateToCMS?: () => void;
  onOpenCMSArticle?: (item: CMSContentItem) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  user,
  questions,
  teachers,
  cmsItems = [],
  onOpenQuestion,
  onOpenTeacher,
  onStartQuiz,
  onSelectCategory,
  onNavigateToAsk,
  onNavigateToCMS,
  onOpenCMSArticle,
}) => {
  const todayQuestion = questions.find((q) => q.id === 'q-today') || questions[0];
  const recentAnswers = questions.filter((q) => q.answer && q.id !== 'q-today');
  const publishedArticles = cmsItems.filter((item) => item.status === 'published').slice(0, 3);

  const getTeacherForQuestion = (expertId?: string) => {
    return teachers.find((t) => t.id === expertId) || teachers[0];
  };

  return (
    <div className="space-y-8 md:space-y-10 pb-6">
      {/* Welcome Section */}
      <section className="text-center md:text-left pt-2">
        <h1 className="text-3xl sm:text-4xl font-light text-white tracking-tight font-display">
          Merhaba, <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{user.name}!</span> 👋
        </h1>
        <p className="text-base sm:text-lg text-gray-300 mt-1.5 font-normal">
          Bugün yeni bir şeyler öğrenmeye ve merak ettiğin soruları sormaya hazır mısın?
        </p>
      </section>

      {/* Bento Grid: Question of the Day & Quick Quiz */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
        {/* Question of the Day (Spans 8 cols) */}
        <div className="md:col-span-8 bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all duration-300">
          {/* Subtle decorative glow */}
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide font-display shadow-xs backdrop-blur-md">
                Günün Sorusu
              </span>
              <span className="text-xs text-gray-400 font-medium">İnanç & Tefekkür</span>
            </div>

            <h2
              onClick={() => onOpenQuestion(todayQuestion)}
              className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug hover:text-indigo-300 transition-colors cursor-pointer font-display"
            >
              {todayQuestion?.title}
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3 mb-6">
              {todayQuestion?.answer?.content}
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
            <button
              onClick={() => {
                const teacher = getTeacherForQuestion(todayQuestion?.answer?.expertId);
                onOpenTeacher(teacher);
              }}
              className="flex items-center gap-3 text-left group/teacher cursor-pointer"
              title="Öğretmen Profilini Gör"
            >
              <img
                src={todayQuestion?.answer?.expertAvatar}
                alt={todayQuestion?.answer?.expertName}
                className="w-10 h-10 rounded-full object-cover border border-white/20 bg-slate-800 group-hover/teacher:scale-105 transition-transform"
              />
              <div>
                <p className="text-sm font-bold text-white group-hover/teacher:text-indigo-300 transition-colors">
                  {todayQuestion?.answer?.expertName}
                </p>
                <p className="text-xs text-gray-400">{todayQuestion?.answer?.expertTitle}</p>
              </div>
            </button>

            <button
              onClick={() => onOpenQuestion(todayQuestion)}
              className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 text-sm font-bold rounded-xl transition-all active:scale-95 shadow-md shadow-white/10 cursor-pointer"
            >
              Cevabı Oku
            </button>
          </div>
        </div>

        {/* Quick Quiz Card (Spans 4 cols) */}
        <div className="md:col-span-4 bg-gradient-to-br from-indigo-600/90 to-purple-700/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between relative overflow-hidden text-center group border border-white/20">
          {/* Subtle patterned overlay */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <span className="material-symbols-outlined text-3xl text-amber-300 icon-fill">
                extension
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-1 font-display">
              Günlük Bilgi Yarışması
            </h3>
            <p className="text-sm text-indigo-100 font-medium mb-4">
              Bugün 5 soru seni bekliyor!
            </p>

            <div className="w-full bg-black/30 rounded-full h-3 mb-2 overflow-hidden p-0.5 border border-white/10">
              <div className="bg-gradient-to-r from-amber-400 to-amber-300 h-full rounded-full transition-all duration-500 w-[40%]" />
            </div>
            <span className="text-xs text-amber-200 font-bold self-end mb-4">2 / 5 Tamamlandı</span>
          </div>

          <button
            onClick={onStartQuiz}
            className="relative z-10 w-full py-3 px-6 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-sm font-extrabold rounded-xl transition-all active:scale-98 shadow-md cursor-pointer uppercase tracking-wider font-display"
            id="start-daily-quiz-btn"
          >
            Yarışmaya Başla
          </button>
        </div>
      </section>

      {/* Categories Section ("Ne Öğrenmek İstersin?") */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-white tracking-tight font-display">
            Ne Öğrenmek İstersin?
          </h2>
          <button
            onClick={() => onNavigateToAsk()}
            className="text-xs sm:text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer flex items-center gap-1"
          >
            Tüm Konuları Gör
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
          {CATEGORIES.filter((c) => c.id !== 'genel').map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/10 rounded-2xl sm:rounded-3xl p-5 flex flex-col items-center text-center cursor-pointer group transition-all duration-300 shadow-lg"
              id={`cat-card-${category.id}`}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-indigo-400/40 transition-transform duration-300 shadow-xs">
                <span className="material-symbols-outlined text-2xl sm:text-3xl text-indigo-300">
                  {category.icon}
                </span>
              </div>
              <span className="font-bold text-sm sm:text-base text-white group-hover:text-indigo-300 transition-colors font-display">
                {category.name}
              </span>
              <span className="text-[11px] text-gray-400 line-clamp-1 mt-0.5 hidden sm:inline-block">
                Soruları keşfet
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Educational Articles (CMS Integration) */}
      {publishedArticles.length > 0 && (
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider bg-indigo-500/20 px-2.5 py-0.5 rounded-md border border-indigo-500/30">
                  📚 Editörün Seçtikleri
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight font-display">
                Öne Çıkan Değerler ve Rehberlik Makaleleri
              </h2>
            </div>
            {onNavigateToCMS && (
              <button
                onClick={onNavigateToCMS}
                className="text-sm font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                Tüm İçerikler <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {publishedArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => onOpenCMSArticle ? onOpenCMSArticle(article) : onNavigateToCMS?.()}
                className="bg-white/5 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 hover:border-white/25 shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col group"
              >
                {/* Linked Image */}
                <div className="relative h-40 w-full overflow-hidden bg-black/40">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3 text-[11px] font-bold text-indigo-200 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {CATEGORIES.find((c) => c.id === article.category)?.name || article.category}
                  </span>
                  <span className="absolute bottom-2.5 right-3 text-[11px] text-gray-300 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                    {article.readTimeMinutes} dk
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors line-clamp-2 font-display leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-2 mt-1.5 leading-relaxed">
                      {article.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-gray-300 font-medium">{article.author.name}</span>
                    </div>

                    <span className="text-indigo-400 font-bold group-hover:translate-x-0.5 transition-transform">
                      Oku →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recent Answers from Experts Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight font-display">
              Uzmanlardan Son Cevaplar
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              Öğretmenlerimizin yanıtladığı en güncel sorular
            </p>
          </div>
          <button
            onClick={() => onNavigateToAsk()}
            className="text-sm font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer transition-colors"
          >
            Tümü <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {recentAnswers.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/8 rounded-2xl p-5 sm:p-6 shadow-xl flex gap-4 cursor-pointer transition-all duration-300 group"
              onClick={() => onOpenQuestion(item)}
              id={`recent-answer-card-${item.id}`}
            >
              <div className="hidden sm:flex flex-shrink-0 pt-1">
                <span className="material-symbols-outlined text-indigo-400 bg-indigo-500/20 border border-indigo-500/30 p-2.5 rounded-2xl text-[20px]">
                  forum
                </span>
              </div>

              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-md text-xs font-bold flex items-center gap-1 backdrop-blur-xs">
                    <span className="material-symbols-outlined text-[14px] text-emerald-300 icon-fill">
                      verified
                    </span>
                    Uzman Cevabı
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {CATEGORIES.find((c) => c.id === item.category)?.name || 'Genel'} • {item.createdAt}
                  </span>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-white mb-1.5 group-hover:text-indigo-300 transition-colors leading-snug font-display">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-300 line-clamp-2 mb-3.5 leading-relaxed">
                  {item.answer?.content}
                </p>

                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const teacher = getTeacherForQuestion(item.answer?.expertId);
                      onOpenTeacher(teacher);
                    }}
                    className="flex items-center gap-2 group/author cursor-pointer text-left"
                  >
                    <img
                      src={item.answer?.expertAvatar}
                      alt={item.answer?.expertName}
                      className="w-7 h-7 rounded-full object-cover bg-slate-800 border border-white/20"
                    />
                    <span className="text-xs sm:text-sm font-semibold text-gray-200 group-hover/author:text-indigo-300 transition-colors">
                      {item.answer?.expertName}
                    </span>
                  </button>

                  <span className="text-xs font-bold text-indigo-400 group-hover:text-indigo-300 flex items-center gap-1 transition-colors">
                    Cevabı Oku
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
