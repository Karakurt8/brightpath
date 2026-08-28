/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AskTab } from './components/AskTab';
import { BottomNavBar } from './components/BottomNavBar';
import { CMSManager } from './components/CMS/CMSManager';
import { DailyQuizModal } from './components/DailyQuizModal';
import { Header } from './components/Header';
import { HelpModal } from './components/HelpModal';
import { HomeTab } from './components/HomeTab';
import { LearnTab } from './components/LearnTab';
import { NotificationItem, NotificationModal } from './components/NotificationModal';
import { ProfileTab } from './components/ProfileTab';
import { QuestionDetailModal } from './components/QuestionDetailModal';
import { SettingsModal } from './components/SettingsModal';
import { TeacherProfileModal } from './components/TeacherProfileModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { INITIAL_CMS_ITEMS } from './data/cmsMockData';
import {
  ASSETS,
  INITIAL_QUESTIONS,
  INITIAL_USER,
  TEACHERS,
} from './data/mockData';
import {
  CategoryKey,
  CMSContentItem,
  LearnModule,
  QuestionItem,
  QuizQuestion,
  TabType,
  TeacherExpert,
} from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [user, setUser] = useState(INITIAL_USER);
  const [questions, setQuestions] = useState<QuestionItem[]>(INITIAL_QUESTIONS);
  const [teachers] = useState<TeacherExpert[]>(TEACHERS);

  // CMS Content Items state with LocalStorage persistence
  const [cmsItems, setCmsItems] = useState<CMSContentItem[]>(() => {
    try {
      const saved = localStorage.getItem('brightpath_cms_items');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore JSON parse error
    }
    return INITIAL_CMS_ITEMS;
  });

  // Sync CMS items to LocalStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('brightpath_cms_items', JSON.stringify(cmsItems));
    } catch {
      // LocalStorage quota or access error
    }
  }, [cmsItems]);

  // CMS Handlers
  const handleCMSAddItem = (newItem: CMSContentItem) => {
    setCmsItems((prev) => [newItem, ...prev]);
    // Reward user with XP for content creation
    setUser((prev) => ({
      ...prev,
      currentXp: prev.currentXp + 50,
      weeklyScore: prev.weeklyScore + 50,
    }));
  };

  const handleCMSUpdateItem = (updatedItem: CMSContentItem) => {
    setCmsItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleCMSDeleteItem = (id: string) => {
    setCmsItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCMSResetDefaults = () => {
    setCmsItems(INITIAL_CMS_ITEMS);
    try {
      localStorage.setItem('brightpath_cms_items', JSON.stringify(INITIAL_CMS_ITEMS));
    } catch {
      // ignore
    }
  };

  // Modals state
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionItem | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherExpert | null>(null);
  const [isDailyQuizOpen, setIsDailyQuizOpen] = useState(false);
  const [customQuizQuestions, setCustomQuizQuestions] = useState<QuizQuestion[] | undefined>(undefined);
  const [quizModalTitle, setQuizModalTitle] = useState('Günlük Bilgi Yarışması');
  const [selectedVideo, setSelectedVideo] = useState<{
    title: string;
    duration: string;
    thumbnail: string;
    summary: string;
  } | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [askInitialCategory, setAskInitialCategory] = useState<CategoryKey>('inanc');

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Ayşe Öğretmen Sorunu Yanıtladı!',
      message: '"Namaz kılarken aklımıza başka şeyler gelmesi günah mıdır?" sorun cevaplandı.',
      time: '2 saat önce',
      unread: true,
      type: 'answer',
    },
    {
      id: 'notif-2',
      title: 'Günlük Bilgi Yarışması Hazır 🎯',
      message: 'Bugünün 5 sorusu hazır! 125 XP kazanma fırsatını kaçırma.',
      time: '5 saat önce',
      unread: true,
      type: 'quiz',
    },
    {
      id: 'notif-3',
      title: 'Yeni Rozet: Meraklı 🏆',
      message: 'Farklı konularda 20 soru sorarak Meraklı rozetini kazandın!',
      time: 'Dün',
      unread: false,
      type: 'badge',
    },
  ]);

  // Handlers
  const handleAddNewQuestion = (newQ: {
    title: string;
    category: CategoryKey;
    isAnonymous: boolean;
  }) => {
    const created: QuestionItem = {
      id: `q-${Date.now()}`,
      title: newQ.title,
      category: newQ.category,
      studentName: newQ.isAnonymous ? 'Gizli Soru' : user.name,
      studentAvatar: newQ.isAnonymous ? '' : user.avatar,
      isAnonymous: newQ.isAnonymous,
      createdAt: 'Az önce',
      views: 1,
      likes: 0,
      answer: {
        expertId: 'teacher-ayse',
        expertName: 'Ayşe Öğretmen',
        expertTitle: 'Din Kültürü Uzmanı',
        expertAvatar: ASSETS.ayseOgretmenAvatar,
        content:
          'Sevgili öğrencimiz, sorduğun bu değerli soru için teşekkür ederiz. İnceleme sürecinde olup, uzmanlarımız en kısa sürede detaylı rehberliğini paylaşacaktır.',
        answeredAt: 'Az önce',
        likes: 1,
        isVerified: true,
      },
    };

    setQuestions((prev) => [created, ...prev]);

    // Update user stats & give XP
    setUser((prev) => ({
      ...prev,
      askedCount: prev.askedCount + 1,
      currentXp: prev.currentXp + 15,
      weeklyScore: prev.weeklyScore + 15,
    }));
  };

  const handleStartDailyQuiz = () => {
    setCustomQuizQuestions(undefined);
    setQuizModalTitle('Günlük Bilgi Yarışması');
    setIsDailyQuizOpen(true);
  };

  const handleStartModuleQuiz = (module: LearnModule) => {
    if (module.quizQuestions && module.quizQuestions.length > 0) {
      setCustomQuizQuestions(module.quizQuestions);
      setQuizModalTitle(`${module.title} - Modül Testi`);
      setIsDailyQuizOpen(true);
    }
  };

  const handleQuizComplete = (score: number, total: number, earnedXp: number) => {
    setUser((prev) => ({
      ...prev,
      currentXp: prev.currentXp + earnedXp,
      weeklyScore: prev.weeklyScore + earnedXp,
    }));
  };

  const handleSelectCategoryFromHome = (cat: CategoryKey) => {
    setAskInitialCategory(cat);
    setCurrentTab('ask');
  };

  const handleOpenTeacherProfile = (teacher: TeacherExpert) => {
    setSelectedTeacher(teacher);
  };

  const handleAskQuestionToTeacher = (teacher: TeacherExpert) => {
    setSelectedTeacher(null);
    setAskInitialCategory('inanc');
    setCurrentTab('ask');
  };

  const handleOpenQuestionAnswer = (questionText: string, answerText: string) => {
    const existing = questions.find((q) => q.title === questionText);
    if (existing) {
      setSelectedQuestion(existing);
    } else {
      setSelectedQuestion({
        id: `q-temp-${Date.now()}`,
        title: questionText,
        category: 'inanc',
        studentName: 'Öğrenci',
        studentAvatar: ASSETS.studentAvatarHeader,
        isAnonymous: false,
        createdAt: 'Önceden Yanıtlandı',
        answer: {
          expertId: 'teacher-ayse',
          expertName: 'Ayşe Öğretmen',
          expertTitle: 'Din Kültürü Uzmanı',
          expertAvatar: ASSETS.ayseOgretmenProfile,
          content: answerText,
          answeredAt: 'Kayıtlı Yanıt',
          likes: 54,
          isVerified: true,
        },
      });
    }
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadNotificationsCount = notifications.filter((n) => n.unread).length;

  return (
    <div
      className="min-h-screen text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-white relative overflow-x-hidden"
      style={{
        background: 'radial-gradient(at 0% 0%, #1e1b4b 0px, transparent 50%), radial-gradient(at 100% 0%, #312e81 0px, transparent 50%), radial-gradient(at 50% 100%, #4338ca 0px, transparent 50%), #0f172a'
      }}
    >
      {/* Ambient background light orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed top-[40%] right-[10%] w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadCount={unreadNotificationsCount}
        user={user}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-20 sm:pt-24 pb-24 md:pb-12 relative z-10">
        {currentTab === 'home' && (
          <HomeTab
            user={user}
            questions={questions}
            teachers={teachers}
            cmsItems={cmsItems}
            onOpenQuestion={setSelectedQuestion}
            onOpenTeacher={handleOpenTeacherProfile}
            onStartQuiz={handleStartDailyQuiz}
            onSelectCategory={handleSelectCategoryFromHome}
            onNavigateToAsk={(cat) => {
              if (cat) setAskInitialCategory(cat);
              setCurrentTab('ask');
            }}
            onNavigateToCMS={() => setCurrentTab('cms')}
            onOpenCMSArticle={() => setCurrentTab('cms')}
          />
        )}

        {currentTab === 'ask' && (
          <AskTab
            user={user}
            initialCategory={askInitialCategory}
            questions={questions}
            onAddNewQuestion={handleAddNewQuestion}
            onOpenQuestion={setSelectedQuestion}
          />
        )}

        {currentTab === 'learn' && (
          <LearnTab
            user={user}
            onOpenModule={(mod) => {
              if (mod.featuredVideo) {
                setSelectedVideo(mod.featuredVideo);
              } else if (mod.quizQuestions) {
                handleStartModuleQuiz(mod);
              }
            }}
            onOpenVideo={setSelectedVideo}
            onStartModuleQuiz={handleStartModuleQuiz}
          />
        )}

        {currentTab === 'cms' && (
          <CMSManager
            items={cmsItems}
            onAddItem={handleCMSAddItem}
            onUpdateItem={handleCMSUpdateItem}
            onDeleteItem={handleCMSDeleteItem}
            onResetDefaults={handleCMSResetDefaults}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileTab
            user={user}
            onOpenMyQuestions={() => {
              setCurrentTab('ask');
            }}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenHelp={() => setIsHelpOpen(true)}
            onLogout={() => {
              if (confirm('Oturumu sıfırlamak istediğinize emin misiniz?')) {
                setUser(INITIAL_USER);
              }
            }}
            onEditAvatar={() => {
              const newName = prompt('Yeni adınızı girin:', user.name);
              if (newName && newName.trim()) {
                setUser((prev) => ({ ...prev, name: newName.trim() }));
              }
            }}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNavBar currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Question Detail Modal */}
      {selectedQuestion && (
        <QuestionDetailModal
          question={selectedQuestion}
          teachers={teachers}
          onClose={() => setSelectedQuestion(null)}
          onOpenTeacher={(teacher) => {
            setSelectedQuestion(null);
            setSelectedTeacher(teacher);
          }}
          onAskSimilarQuestion={() => {
            setSelectedQuestion(null);
            setAskInitialCategory(selectedQuestion.category);
            setCurrentTab('ask');
          }}
        />
      )}

      {/* Teacher Profile Modal */}
      {selectedTeacher && (
        <TeacherProfileModal
          teacher={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
          onAskQuestionToTeacher={handleAskQuestionToTeacher}
          onOpenQuestionAnswer={(q, a) => {
            setSelectedTeacher(null);
            handleOpenQuestionAnswer(q, a);
          }}
        />
      )}

      {/* Daily / Module Quiz Modal */}
      {isDailyQuizOpen && (
        <DailyQuizModal
          customQuestions={customQuizQuestions}
          quizTitle={quizModalTitle}
          onClose={() => setIsDailyQuizOpen(false)}
          onComplete={handleQuizComplete}
        />
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayerModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          onCompleteVideo={() => {
            setUser((prev) => ({
              ...prev,
              currentXp: prev.currentXp + 30,
              weeklyScore: prev.weeklyScore + 30,
            }));
          }}
        />
      )}

      {/* Notifications Modal */}
      {isNotificationsOpen && (
        <NotificationModal
          notifications={notifications}
          onClose={() => setIsNotificationsOpen(false)}
          onMarkAllAsRead={handleMarkAllNotificationsRead}
          onSelectNotification={(notif) => {
            setIsNotificationsOpen(false);
            if (notif.type === 'answer') {
              const q = questions.find((item) => item.id === 'q-1');
              if (q) setSelectedQuestion(q);
            } else if (notif.type === 'quiz') {
              handleStartDailyQuiz();
            } else if (notif.type === 'badge') {
              setCurrentTab('profile');
            }
          }}
        />
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          user={user}
          onClose={() => setIsSettingsOpen(false)}
          onUpdateName={(newName) => setUser((prev) => ({ ...prev, name: newName }))}
        />
      )}

      {/* Help & FAQ Modal */}
      {isHelpOpen && <HelpModal onClose={() => setIsHelpOpen(false)} />}
    </div>
  );
}
