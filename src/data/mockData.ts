import { CategoryInfo, LearnModule, QuestionItem, QuizQuestion, TeacherExpert, UserProfile } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjiklym4HdSi2ezQOnTBSseEzKHpn7gQmGEl2xy9VnIFfwivnSkzdxHogAF8RveJe1U43OqdfXfHFudv6MOK7Y8LI19E_3gd-uPqFetq5ucYrlEvKRVZ5N-oB3V0jxa-m-MOh80gPSij0Y7dLR_g7eGERxonChLdMTG1Lh8psQeYFT1w6v0Y9xqXb9ve2SM7ZWKtV9Yr6q5__2f0NbVtk0oTaHG1mxfSk7iVr5X7HMSsXLn7IzIYwq',
  studentAvatarHeader: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkMwWDJ7KhaSD8_UOjFH8Vox-9MONIZmqZBV5w8YWBwfYDuvU-91KwIqEN2BW8ldkfDluGFBpjtW527sSFaDLdrLxvw76Bn7TNGOWEmOkcE4z-j2nn_4zMcv8RV77QKUKiIcvESult-3SQbkCCcH6oCXO6bne_aJSLYL7Jj_QFv2BJIpLkKzbKyaHsgWXq78EQ6RQD1C8fD2FogjWsSYJbKJyVMtaxQ2BvQlpQtKWB8rcduefb4cB0',
  studentCuriousIllustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9FahWZNhTG06UUtSnU5zSsNhXl5rZ1sHC15oQw7Dxhg54lLqmh5IjIWI_0VVejGUphQ6UMNhQpPmqswTsjlwTv1xzid7p9BlmfkGKVCrss0mYaTDJQHtOtZyvJkfnChJ8kDL11B5Hyi5NEaTWd0MLtvgkDbV_FPk3tDAmcLrRlHkycKnyUlgG39ZvIzE9KMiaaEd-xH7WMSxQrrmcRoGgske2RnGdjxiyqm4QkNvrSQKHHan_sXGu',
  studentProfileAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIXfxkPraDgT-mB0tYRXbcXZy2TPiORLaFudWkOToxNSVMNIcaR0SUCMXk5gRCsS8ifg263Veg30klQ4KjQY9PJD5XWbp92ZxDgFDQww947pv0UyOPo1VxEzMRxadmwUrGpnoNZ0DN-NG1inNWxNj2MTgCMaPnqcQEHcwiLQH0n9-eXl5N5H6j8fxX9nAy2Eamlh3yo-CLsvv_shxElUqWZnjypfbfdnDXCvxmFnxP4-06Vt00hn6_',
  hasanHocaAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI1IyVK5WCdJBRpCS3UUpPoCvoyuRB4Ox3vaSF_sfIuKr1Uhp0-DXS-h8dwksEPbBNC5pd-mQPW7YihfMERH3YCg_q1IJvSuqdd5iJ9IUmeHeBXztqEf1gUDMaLliHkA5LQr3amyKp9NGXwvSgTanst3AFBSmuvvBSv1oxantWF7APc0oQhhz-sZJN38e0X0nkYJxCBtMabn39yEcMGXMgT1rMkIuJSOHxgyZgfNVuZ2otTO1MsjKx',
  ayseOgretmenAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuuwUiy4N_F3SANp_2F0IqpbLmksYgKv_lYOVg3pjgK85qxhCZ53IFckRP0_y9q1MU4FZmucSASgOpqKwkOe2Po4Axiq6yhmsYprDxS5yg6y1sq9Q01twkvHigm4CIpk2Tkoa91faGh3GHBmQsPcSQ5Jzu84mCwjgaxGOx71NmrQZ4OIQBZ1tHkWakpiEYrJ_8bBFLFdSU9us57753AHu31RpD5TCqANNiL1oK1dVnw9qXkTXniJk1',
  ayseOgretmenProfile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMFiELKSDylU6oQ6Py1U1J5vtkRRW_ulyGwsPENlNDAQllW_mmzNrKPyBVLQVJ_Ts_U7qBAhvhtVxbIkSQ05-nX9K1lKCXXog1NAA63qhzahzOQIshGEbswwUBZ4Zf7S9omkRK5-JUak0LhLaJ3rVkyzPj3kOr1rIL8Wf3Nk_fY3Uz01GcrCnCiBu4gfQtX8gyWjexaOO25BfB0T9COTHhHjMrRlWJ4t4n_zCCrpD2tNK7llKh-Et-',
  mehmetHocaAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAadNnp3tgUvDOjmseEk7kg2numMlyqJ7jIlCgGctgFTb5eY_UzyLgC3YjXU9PbI98GQdg1azWVVz3_SoLHRtekfEVuytGQfWGxbB0PCsFuoYwzz8YxE_xHWMO4Fyawi0Fu_1tlow9R8k-G_9q8un6Qiv4vy7VulUTNNprxdMBgLDEW0TtcTr9IbTGc9XMaaSlzNUxDCiu3wjadibRRo7g8v4dOZFtWcrDFzLX8Ug5DqnGWhv2oVDb0',
  badgeCompass: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtjdS3vI-PxLjDXJFbyU3678q3FyuQusYlob1W6QOpgewiP67EwRqL5KxmIEy4ICrEgrPyIhUtr3Tg_1TxU-au9IoGWDknXc0KCeTPfCAwYz2bF7mYoE22n3S5E3nT46TKL1oxk_tMWgIjaSJgI_LDRUSHL8p2XkaLXp10QmZBoHi2Y4APBBj3FX8hP8EOUL7gmjz18t2N8PR3x6khOwlF7ogOke_3PUFeQfF8PulgxRWkvgWgz9-b',
  badgeBook: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGE_aEWexE2uPsT_q5RwlPjJJfg-iSFE9Sy3pwUWRS7qpE4qFrt5t5LDmNumlfOb42fDoX7qpgiBZFBJ7K0y5eKO5IAVicPGCrnyXM96KrzzR-qkYAEDi1a7qzviVdTiC4B96JEAm7Rz0zG8qs7oCijJbDh6gEA2JZLLPcgiIqbt-rkVDPFn6zpzARjTkGxZvD9gKqokjUodaEZqn0NnCD1dy1qoAiLyp63Lts5g86BQxoFSpoO9fn',
  learnVideoImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDRqDZyadSDKU-p8nIkN_LpKdreeQ2IRQZ0EuLw5O-fCeAT8q2d2VEY4XVBK_ba0e6PcOMavW2vulUi275KwdIfBy1xPnK4RhEr3QSA6kAZ7kTeuyEMLxj7CciLaIubDWXy3-CTo153UCdk8hevzYnDM9Vvak6eLNnWC4b_CmV-cXPZpS7WOmwZKb4Aiih01rpXM0YzLxLxWHoU7mjyiYcN-LNJPrR8HE6mS481BY59h3i-t4-KMTs',
};

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'inanc',
    name: 'İnanç',
    icon: 'favorite',
    color: '#2E7D32',
    bgLight: '#E8F5E9',
    accent: '#4CAF50',
    description: 'Allah inancı, melekler, ahiret ve kader gibi temel inanç esasları'
  },
  {
    id: 'ibadet',
    name: 'İbadet',
    icon: 'clean_hands',
    color: '#E65100',
    bgLight: '#FFF3E0',
    accent: '#FF9800',
    description: 'Namaz, oruç, zekat, hac, dua ve temizlik gibi ibadetler'
  },
  {
    id: 'ahlak',
    name: 'Ahlak',
    icon: 'balance',
    color: '#1565C0',
    bgLight: '#E3F2FD',
    accent: '#2196F3',
    description: 'Güzel ahlak, dürüstlük, kul hakkı, adalet ve saygı'
  },
  {
    id: 'peygamberler',
    name: 'Peygamberler',
    icon: 'menu_book',
    color: '#6A1B9A',
    bgLight: '#F3E5F5',
    accent: '#9C27B0',
    description: 'Peygamberlerin hayatı, örnek davranışları ve kıssaları'
  },
  {
    id: 'genel',
    name: 'Genel',
    icon: 'psychology',
    color: '#0f5238',
    bgLight: '#F1F8F5',
    accent: '#2d6a4f',
    description: 'Aklına takılan tüm merak ettiğin konular ve sorular'
  }
];

export const INITIAL_USER: UserProfile = {
  name: 'Ahmet',
  title: 'Genç Alim',
  level: 4,
  levelTitle: 'Araştırıcı',
  currentXp: 1200,
  nextLevelXp: 1500,
  askedCount: 42,
  answeredCount: 38,
  weeklyScore: 1250,
  classRank: 3,
  avatar: ASSETS.studentProfileAvatar,
  badges: [
    {
      id: 'badge-1',
      title: 'İlk Soru',
      description: 'Toplulukta ilk sorunu başarıyla sordun ve öğrenme yolculuğuna başladın.',
      iconUrl: ASSETS.badgeCompass,
      unlocked: true,
      unlockDate: '12 Ekim 2026'
    },
    {
      id: 'badge-2',
      title: 'Meraklı',
      description: 'Farklı kategorilerde 20\'den fazla soru sorarak merakını kanıtladın.',
      iconUrl: ASSETS.badgeBook,
      unlocked: true,
      unlockDate: '24 Kasım 2026'
    },
    {
      id: 'badge-3',
      title: 'Gizemli',
      description: 'Haftalık bilgi yarışmasında 5 gün üst üste tam puan alarak açılır.',
      unlocked: false
    }
  ]
};

export const TEACHERS: TeacherExpert[] = [
  {
    id: 'teacher-ayse',
    name: 'Ayşe Öğretmen',
    title: 'Din Kültürü ve Ahlak Bilgisi Uzmanı',
    avatar: ASSETS.ayseOgretmenProfile,
    bio: 'Merhaba! 10 yılı aşkın süredir gençlerimize dinimizi sevdirmek, ahlaki değerleri hayatlarına katmalarına rehberlik etmek için çalışıyorum. Sorularınızı çekinmeden sorabilirsiniz, birlikte öğrenmek en güzeli!',
    answeredQuestions: 1245,
    satisfactionRate: 98,
    experienceYears: 12,
    specializations: [
      'İnanç ve İbadet',
      'Ahlak Değerleri',
      'Peygamberler Tarihi',
      'Günlük Hayat ve Din'
    ],
    recentAnswers: [
      {
        id: 'ans-1',
        question: 'Namaz kılarken aklımıza başka şeyler gelmesi günah mıdır? Nasıl odaklanabilirim?',
        answer: 'Sevgili kardeşim, namazda akla başka düşüncelerin gelmesi (vesvese) insan olmamızın doğal bir sonucudur ve tek başına günah değildir. Önemli olan bu düşüncelerin peşine takılmamak ve fark edince tekrar huşuya dönmektir. Anlamlarını bilerek okumak odaklanmana çok yardımcı olur.',
        category: 'ibadet',
        timeAgo: '2 saat önce'
      },
      {
        id: 'ans-2',
        question: 'Kopya çekmek kul hakkına girer mi? Sınavlarda arkadaşımdan yardım almam günah mı?',
        answer: 'Evet, kopya çekmek hem kul hakkına girer hem de dürüstlük ilkesine aykırıdır. Sınavlar bir ölçme aracıdır ve herkes kendi emeğinin karşılığını almalıdır. Başkalarının hakkına girmek yerine az da olsa kendi alın terimizle başarmak en hayırlısıdır.',
        category: 'ahlak',
        timeAgo: '1 gün önce'
      }
    ]
  },
  {
    id: 'teacher-hasan',
    name: 'Hasan Hoca',
    title: 'Din Kültürü Öğretmeni & Rehber',
    avatar: ASSETS.hasanHocaAvatar,
    bio: 'Gençlerin zihnindeki sorulara samimi, akılcı ve Kur\'an-ı Kerim ışığında cevaplar vermek için buradayım. Hiçbir soru cevapsız kalmasın!',
    answeredQuestions: 1890,
    satisfactionRate: 99,
    experienceYears: 15,
    specializations: [
      'Temel İnanç Esasları',
      'Gençlik Sorunları',
      'Kur\'an-ı Kerim ve Anlamı',
      'Dua ve Tefekkür'
    ],
    recentAnswers: [
      {
        id: 'ans-3',
        question: 'Neden dua etmeliyiz? Duamızın kabul olup olmadığını nasıl anlarız?',
        answer: 'Dua, kulun yaratıcısıyla olan en samimi bağıdır. Bir nevi ruhsal bir şarj istasyonudur. İhtiyaçlarımızı iletmenin yanı sıra O\'na olan güvenimizi gösterir. Dualarımız bazen hemen istediğimiz gibi, bazen daha hayırlı bir şekilde kabul olur, bazen de ahirette mükafat olarak saklanır.',
        category: 'inanc',
        timeAgo: 'Günün Sorusu'
      }
    ]
  },
  {
    id: 'teacher-mehmet',
    name: 'Mehmet Hoca',
    title: 'İlahiyatçı & Değerler Eğitimi Yazarı',
    avatar: ASSETS.mehmetHocaAvatar,
    bio: 'Ahlaki tutumlar, peygamberler tarihi ve güncel dini konularda genç araştırmacılarımıza rehberlik etmekten mutluluk duyuyorum.',
    answeredQuestions: 940,
    satisfactionRate: 97,
    experienceYears: 8,
    specializations: [
      'Ahlak Felsefesi',
      'Siyer-i Nebi',
      'İslam Tarihi'
    ],
    recentAnswers: [
      {
        id: 'ans-4',
        question: 'Arkadaşıma şaka yollu yalan söylemek caiz mi?',
        answer: 'Peygamber Efendimiz (sav), şaka yaparken bile doğruluktan ayrılmamayı tavsiye etmiştir. Yalanın şakası dahi güven duygusunu sarsabilir. Espri yaparken doğru ve tatlı dilli olmak en güzel yoldur.',
        category: 'ahlak',
        timeAgo: '5 saat önce'
      }
    ]
  }
];

export const INITIAL_QUESTIONS: QuestionItem[] = [
  {
    id: 'q-today',
    title: 'Neden dua etmeliyiz? Duamızın kabul olup olmadığını nasıl anlarız?',
    category: 'inanc',
    studentName: 'Ahmet',
    studentAvatar: ASSETS.studentProfileAvatar,
    isAnonymous: false,
    createdAt: 'Bugün',
    views: 342,
    likes: 89,
    answer: {
      expertId: 'teacher-hasan',
      expertName: 'Hasan Hoca',
      expertTitle: 'Din Kültürü Öğretmeni',
      expertAvatar: ASSETS.hasanHocaAvatar,
      content: 'Dua, kulun yaratıcısıyla olan en samimi bağıdır. Bir nevi ruhsal bir şarj istasyonudur. İhtiyaçlarımızı iletmenin yanı sıra acziyetimizi bilip sonsuz merhamete sığınmaktır. Dualar mutlaka karşılık bulur; ya aynen dünyada verilir, ya daha hayırlısı bahşedilir, ya da ahirete saklanır.',
      answeredAt: 'Bugün 10:30',
      likes: 120,
      isVerified: true
    }
  },
  {
    id: 'q-1',
    title: 'Namaz kılarken aklımıza başka şeyler gelmesi günah mıdır?',
    category: 'ibadet',
    studentName: 'Zeynep',
    studentAvatar: ASSETS.studentAvatarHeader,
    isAnonymous: false,
    createdAt: '2 saat önce',
    views: 215,
    likes: 47,
    answer: {
      expertId: 'teacher-ayse',
      expertName: 'Ayşe Öğretmen',
      expertTitle: 'Din Kültürü ve Ahlak Bilgisi Uzmanı',
      expertAvatar: ASSETS.ayseOgretmenAvatar,
      content: 'İnsan zihni sürekli hareket halindedir. Namazda akla başka düşüncelerin gelmesi istemsiz olduğu sürece günah değildir. Önemli olan fark edince tekrar odaklanmaya çalışmaktır. Surelerin anlamını düşünerek okumak zihnin dağılmasını önler.',
      answeredAt: '2 saat önce',
      likes: 64,
      isVerified: true
    }
  },
  {
    id: 'q-2',
    title: 'Arkadaşıma şaka yollu yalan söylemek caiz mi?',
    category: 'ahlak',
    studentName: 'Anonim Öğrenci',
    studentAvatar: '',
    isAnonymous: true,
    createdAt: '5 saat önce',
    views: 180,
    likes: 31,
    answer: {
      expertId: 'teacher-mehmet',
      expertName: 'Mehmet Hoca',
      expertTitle: 'İlahiyatçı & Yazar',
      expertAvatar: ASSETS.mehmetHocaAvatar,
      content: 'Peygamber Efendimiz (sav), şaka yaparken bile doğruluktan ayrılmamayı tavsiye etmiştir. Yalanın şakası dahi güven sarsıcı olabilir, bu nedenle kaçınmak en güzelidir. Bir insanı güldürürken bile kalbini kırmadan ve gerçeğe sadık kalarak mizah yapabiliriz.',
      answeredAt: '5 saat önce',
      likes: 52,
      isVerified: true
    }
  },
  {
    id: 'q-3',
    title: 'Kopya çekmek kul hakkına girer mi?',
    category: 'ahlak',
    studentName: 'Can',
    studentAvatar: ASSETS.studentAvatarHeader,
    isAnonymous: false,
    createdAt: '1 gün önce',
    views: 412,
    likes: 95,
    answer: {
      expertId: 'teacher-ayse',
      expertName: 'Ayşe Öğretmen',
      expertTitle: 'Din Kültürü ve Ahlak Bilgisi Uzmanı',
      expertAvatar: ASSETS.ayseOgretmenAvatar,
      content: 'Evet, kopya çekmek hem kul hakkına girer hem de dürüstlük ilkesine aykırıdır. Sınavlar bir ölçme aracıdır ve herkes kendi emeğinin karşılığını almalıdır. Başkalarının hakkına girmek yerine kendi gayretimizle ilerlemek en bereketlisidir.',
      answeredAt: '1 gün önce',
      likes: 88,
      isVerified: true
    }
  },
  {
    id: 'q-4',
    title: 'Hz. Yusuf kıssasından hangi ahlaki dersleri çıkarabiliriz?',
    category: 'peygamberler',
    studentName: 'Elif',
    studentAvatar: ASSETS.studentProfileAvatar,
    isAnonymous: false,
    createdAt: '2 gün önce',
    views: 160,
    likes: 28,
    answer: {
      expertId: 'teacher-hasan',
      expertName: 'Hasan Hoca',
      expertTitle: 'Din Kültürü Öğretmeni',
      expertAvatar: ASSETS.hasanHocaAvatar,
      content: 'Hz. Yusuf kıssası Kur\'an\'da "kıssaların en güzeli" olarak nitelendirilir. Sabır, dürüstlük, iffet, affedicilik ve Allah\'a mutlak güvenin en büyük zaferlerle sonuçlanacağını bize öğretir.',
      answeredAt: '2 gün önce',
      likes: 41,
      isVerified: true
    }
  }
];

export const DAILY_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'quiz-1',
    question: 'Ahiret gününde insanların amellerinin tartıldığı manevi teraziye ne ad verilir?',
    options: ['Sırat', 'Mizan', 'Mahşer', 'Berzah'],
    correctIndex: 1,
    explanation: 'Mizan, kıyamet gününde insanların sevap ve günahlarının adaletle tartıldığı ilahi manevi terazidir.',
    category: 'Melek ve Ahiret'
  },
  {
    id: 'quiz-2',
    question: 'Dört büyük melekten biri olan ve tabiat olaylarını yönetmekle görevli olan melek hangisidir?',
    options: ['Cebrail (as)', 'Azrail (as)', 'Mikail (as)', 'İsrafil (as)'],
    correctIndex: 2,
    explanation: 'Mikail (as), Allah\'ın izniyle rüzgar, yağmur gibi tabiat olaylarını ve rızıkların dağıtılmasını yöneten melektir.',
    category: 'Melek ve Ahiret'
  },
  {
    id: 'quiz-3',
    question: 'İslam dininde zengin sayılan Müslümanların yılda bir kez ihtiyaç sahiplerine vermesi farz olan ibadet nedir?',
    options: ['Sadaka', 'Zekat', 'Kurban', 'Fıtır'],
    correctIndex: 1,
    explanation: 'Nisap miktarı mala sahip olan Müslümanların yılda bir kez malının belli bir oranını (%2.5) ihtiyaç sahiplerine vermesi farz olan ibadet Zekattır.',
    category: 'İbadet'
  },
  {
    id: 'quiz-4',
    question: 'Peygamber Efendimiz Hz. Muhammed\'in (sav) gençlik yıllarında güvenirliğinden dolayı aldığı unvan nedir?',
    options: ['El-Emin', 'El-Fatih', 'El-Kerim', 'El-Muallim'],
    correctIndex: 0,
    explanation: 'Peygamberimiz (sav), peygamberlik verilmeden önce de Mekkeliler tarafından doğruluğu ve dürüstlüğü nedeniyle "Muhammedü\'l-Emin" (Güvenilir Muhammed) olarak anılmıştır.',
    category: 'Peygamberler'
  },
  {
    id: 'quiz-5',
    question: 'Aşağıdakilerden hangisi güzel ahlaklı bir öğrencinin sergilemesi beklenen bir davranıştır?',
    options: ['Arkadaşlarının sırlarını başkalarına anlatmak', 'Öfkelendiğinde sabırla doğruyu savunmak', 'Sadece kendi çıkarını düşünmek', 'Hatalarını başkalarının üzerine atmak'],
    correctIndex: 1,
    explanation: 'Öfke anında sabırlı davranmak, adalet ve nezaketle hareket etmek İslam ahlakının en temel prensiplerindendir.',
    category: 'Ahlak'
  }
];

export const LEARN_MODULES: LearnModule[] = [
  {
    id: 'mod-1',
    moduleNumber: 1,
    title: 'Melek ve Ahiret İnancı',
    description: 'Görünmeyen varlıklar alemini keşfet ve inancın temellerini oyunlarla öğren.',
    icon: 'star',
    videosCount: 4,
    totalMinutes: 28,
    quizCount: 2,
    isLocked: false,
    progressPercent: 45,
    featuredVideo: {
      title: 'Meleklerin Özellikleri Nelerdir?',
      duration: '06:45',
      thumbnail: ASSETS.learnVideoImage,
      summary: 'Nurdan yaratılmış meleklerin özellikleri, dört büyük melek ve insanların hayatındaki görevleri üzerine eğlenceli ve öğretici bir ders.'
    },
    quizQuestions: [
      {
        id: 'mod-q-1',
        question: 'İnsanın sağında ve solunda bulunan, sevap ve günahları yazan meleklere ne denir?',
        options: ['Münker ve Nekir', 'Kiramen Katibin', 'Hamele-i Arş', 'Hazene-i Cennet'],
        correctIndex: 1,
        explanation: 'Kiramen Katibin (Değerli Yazıcılar), insanın amellerini kaydeden meleklerdir.',
        category: 'Melek İnancı'
      },
      {
        id: 'mod-q-2',
        question: 'Ölümle başlayıp kıyamete kadar süren kabir hayatı dönemine ne ad verilir?',
        options: ['Berzah', 'Mahşer', 'Ba\'s', 'Mizan'],
        correctIndex: 0,
        explanation: 'Berzah alemi, dünya hayatı ile ahiret arasındaki bekleme ve geçiş dönemidir.',
        category: 'Ahiret İnancı'
      }
    ]
  },
  {
    id: 'mod-2',
    moduleNumber: 2,
    title: 'Hac ve Kurban',
    description: 'Yardımlaşma ve dayanışmanın en güzel örneklerini incele.',
    icon: 'menu_book',
    videosCount: 2,
    totalMinutes: 15,
    quizCount: 1,
    isLocked: false,
    progressPercent: 0,
    featuredVideo: {
      title: 'Hac İbadetinin Anlamı ve Kabe\'nin Tarihi',
      duration: '07:20',
      thumbnail: ASSETS.learnVideoImage,
      summary: 'Hac ibadetinin bireysel ve toplumsal hikmetleri, tavaf, sa\'y ve Arafat vakfesinin manevi anlamı.'
    }
  },
  {
    id: 'mod-3',
    moduleNumber: 3,
    title: 'Ahlaki Tutumlar',
    description: 'Günlük hayatta güzel ahlaklı olmanın ve erdemli yaşamanın yolları.',
    icon: 'self_improvement',
    videosCount: 3,
    totalMinutes: 20,
    quizCount: 2,
    isLocked: true,
    progressPercent: 0
  },
  {
    id: 'mod-4',
    moduleNumber: 4,
    title: 'Allah\'ın Kulları: Peygamberler',
    description: 'Peygamberlerin ortak nitelikleri ve bize bıraktıkları erdemli miras.',
    icon: 'auto_stories',
    videosCount: 5,
    totalMinutes: 35,
    quizCount: 3,
    isLocked: true,
    progressPercent: 0
  }
];
