export type TabType = 'home' | 'ask' | 'learn' | 'cms' | 'profile';

export type CategoryKey = 'inanc' | 'ibadet' | 'ahlak' | 'peygamberler' | 'genel';

export type CMSContentStatus = 'published' | 'draft' | 'archived';

export interface CMSContentItem {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  imageCaption?: string;
  category: CategoryKey | string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  status: CMSContentStatus;
  createdAt: string;
  updatedAt?: string;
  views: number;
  likes: number;
  readTimeMinutes: number;
  isFeatured?: boolean;
}

export interface CategoryInfo {
  id: CategoryKey;
  name: string;
  icon: string;
  color: string;
  bgLight: string;
  accent: string;
  description: string;
}

export interface QuestionAnswer {
  expertId: string;
  expertName: string;
  expertTitle: string;
  expertAvatar: string;
  content: string;
  answeredAt: string;
  likes: number;
  isVerified: boolean;
}

export interface QuestionItem {
  id: string;
  title: string;
  category: CategoryKey;
  studentName: string;
  studentAvatar: string;
  isAnonymous: boolean;
  createdAt: string;
  answer?: QuestionAnswer;
  views?: number;
  likes?: number;
}

export interface TeacherExpert {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  answeredQuestions: number;
  satisfactionRate: number;
  experienceYears: number;
  specializations: string[];
  recentAnswers: {
    id: string;
    question: string;
    answer: string;
    category: CategoryKey;
    timeAgo: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface LearnModule {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  icon: string;
  videosCount: number;
  totalMinutes: number;
  quizCount: number;
  isLocked: boolean;
  progressPercent: number;
  featuredVideo?: {
    title: string;
    duration: string;
    thumbnail: string;
    summary: string;
  };
  quizQuestions?: QuizQuestion[];
}

export interface UserBadge {
  id: string;
  title: string;
  description: string;
  iconUrl?: string;
  iconName?: string;
  unlocked: boolean;
  unlockDate?: string;
}

export interface UserProfile {
  name: string;
  title: string;
  level: number;
  levelTitle: string;
  currentXp: number;
  nextLevelXp: number;
  askedCount: number;
  answeredCount: number;
  weeklyScore: number;
  classRank: number;
  avatar: string;
  badges: UserBadge[];
}
