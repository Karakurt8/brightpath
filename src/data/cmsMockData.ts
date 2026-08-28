import { CMSContentItem } from '../types';
import { ASSETS } from './mockData';

export const INITIAL_CMS_ITEMS: CMSContentItem[] = [
  {
    id: 'cms-1',
    title: 'İslam Ahlakında Dürüstlük ve Güvenilirlik (El-Emin İlkesi)',
    description: 'Peygamber Efendimiz’in (sav) gençlik yıllarından itibaren sergilediği doğruluk ve günümüz dünyasında dürüst bir insan olmanın altın kuralları.',
    content: `<h3>Doğruluk: Bütün Erdemlerin Temeli</h3>
<p>İslam ahlak sisteminin en merkezi kavramlarından biri <strong>sıdk</strong>, yani doğruluk ve dürüstlüktür. Doğruluk; sözde, niyette ve davranışta gerçeğe uygun hareket etmeyi ifade eder.</p>

<blockquote class="border-l-4 border-indigo-500 pl-4 italic text-indigo-200 my-3">
  "Emrolunduğun gibi dosdoğru ol!" (Hûd Suresi, 112)
</blockquote>

<h4>Gençler İçin 4 Temel Dürüstlük İlkesi:</h4>
<ul>
  <li><strong>1. Sözünde Durmak (Ahde Vefa):</strong> Verilen sözleri yerine getirmek hem kul hakkı hem de saygınlığın esasıdır.</li>
  <li><strong>2. Sınav ve İş Ahlakı:</strong> Kopya çekmeden, haksız kazanç elde etmeden kendi emeğiyle ilerlemek.</li>
  <li><strong>3. Dijital Ortamda Dürüstlük:</strong> Sosyal medyada asılsız haber yaymamak, kimsenin itibarını zedelememek.</li>
  <li><strong>4. Şakada Bile Doğruluk:</strong> Başkalarını güldürmek için bile yalan ve iftiraya başvurmamak.</li>
</ul>

<p>Doğru sözlü ve güvenilir insan, hem bu dünyada kalplerin sevgisini kazanır hem de ahirette peygamberler ve şehitlerle beraber anılır.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Doğruluk ve adalet, toplumsal huzurun temel taşıdır.',
    category: 'ahlak',
    tags: ['dürüstlük', 'güvenilirlik', 'el-emin', 'gençlik', 'ahlak', 'karakter'],
    author: {
      name: 'Ayşe Öğretmen',
      avatar: ASSETS.ayseOgretmenProfile,
      role: 'Din Kültürü Uzmanı'
    },
    status: 'published',
    createdAt: '2026-08-27',
    updatedAt: '2026-08-28',
    views: 1420,
    likes: 312,
    readTimeMinutes: 4,
    isFeatured: true
  },
  {
    id: 'cms-2',
    title: 'Evrenin Kusursuz Düzeni ve Yaratılış Tefekkürü',
    description: 'Gökyüzündeki yıldızlardan hücrelerin mikro dünyasına kadar tabiatta gözlemlediğimiz mükemmel matematiksel ahenk ve tefekkür sanatı.',
    content: `<h3>Gözlem ve Düşünce: Kuran'ın İlim Yolu</h3>
<p>Kuran-ı Kerim, insanı sürekli çevreye bakmaya, tabiat olaylarını incelemeye ve tefekkür etmeye (derin düşünmeye) çağırır. Gece ile gündüzün birbiri ardınca gelmesi, mevsimlerin döngüsü ve suyun canlılara hayat vermesi tesadüf eseri olamayacak kadar büyük bir ilim ve kudretin göstergesidir.</p>

<h4>Tefekkürün İnsana Kazandırdıkları:</h4>
<ul>
  <li>Evrendeki küçük veya büyük her varlığın bir hikmetle yaratıldığını anlamak.</li>
  <li>Tabiatı kirletmemek ve çevreye emanet bilinciyle yaklaşmak.</li>
  <li>Bilim ve dini birbiriyle çatışan değil, birbirini tamamlayan pencereler olarak görmek.</li>
</ul>

<p>Bir çiçeğin açışını ya da bir kar tanesinin kristal yapısını incelemek bile kalpteki inancı yeşerten bir tefekkür ibadetidir.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Doğanın mucizevi ahengi ve tefekkür ufku.',
    category: 'inanc',
    tags: ['tefekkür', 'yaratılış', 'evren', 'ilim', 'kuran', 'inanç'],
    author: {
      name: 'Hasan Hoca',
      avatar: ASSETS.hasanHocaAvatar,
      role: 'Din Kültürü Öğretmeni'
    },
    status: 'published',
    createdAt: '2026-08-25',
    updatedAt: '2026-08-26',
    views: 980,
    likes: 245,
    readTimeMinutes: 5,
    isFeatured: true
  },
  {
    id: 'cms-3',
    title: 'Dua ve Manevi Huzur: İç Dünyamızın Şarj İstasyonu',
    description: 'Stresli, yoğun ve kaygılı anlarda duanın psikolojik ve ruhi tesiri. Samimi bir yakarışın insan zihnini sakinleştirme gücü.',
    content: `<h3>Dua: Varlığın Özü ile Bağ Kurmak</h3>
<p>Dua sadece bir şeyler istemek değildir; insanın kendi zayıflığını kabul edip Sonsuz Güç ve Merhamet Sahibi'ne sığınmasıdır. Bir dert ortağı, bir iç ferahlığı ve yalnız olmadığını hissetme halidir.</p>

<h4>Duanın Kabul Adabı:</h4>
<ol>
  <li><strong>İhlas ve Samimiyet:</strong> Kalpten gelen, gösterişten uzak içten bir yakarış.</li>
  <li><strong>Helal Kazanç:</strong> Yaşamın temizliği ve helal lokma ile beslenmek.</li>
  <li><strong>Sebat ve Ümit:</strong> Duam hemen kabul olmadı diye ümitsizliğe kapılmamak.</li>
</ol>

<p>Peygamberimiz (sav) şöyle buyurur: <em>"Dua, ibadetin ta kendisidir ve müminin en güçlü manevi kalkanıdır."</em></p>`,
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Dua ile kazanılan iç huzur ve manevi dinginlik.',
    category: 'ibadet',
    tags: ['dua', 'huzur', 'maneviyat', 'ibadet', 'psikoloji', 'sabır'],
    author: {
      name: 'Mehmet Hoca',
      avatar: ASSETS.mehmetHocaAvatar,
      role: 'İlahiyatçı & Yazar'
    },
    status: 'published',
    createdAt: '2026-08-22',
    views: 1850,
    likes: 420,
    readTimeMinutes: 3,
    isFeatured: false
  },
  {
    id: 'cms-4',
    title: 'Hz. Yusuf’un Hayatından Çıkarılacak Liderlik ve Sabır Dersleri',
    description: 'Kuyudan saraya uzanan muazzam bir hayat hikayesi. İffet, sabır, affedicilik ve kriz yönetimi üzerine pratik çıkarımlar.',
    content: `<h3>Ahsenü'l-Kasas: Kıssaların En Güzeli</h3>
<p>Hz. Yusuf'un hayatı, kıskanç kardeşlerinin onu kuyuya atmasıyla başlar, köle olarak satılması, iftiraya uğrayıp zindana girmesi ve nihayet Mısır'ın hazine yöneticisi olmasıyla taçlanır.</p>

<h4>Gençler İçin 3 Büyük Ders:</h4>
<ul>
  <li><strong>Zorluklar Geçicidir:</strong> Kuyu da zindan da ebedi değildir; sabreden mutlaka aydınlığa kavuşur.</li>
  <li><strong>İntikam Değil Affetmek:</strong> Kendisine kötülük yapan kardeşlerini güç elindeyken affetmiş ve kucaklamıştır.</li>
  <li><strong>Kriz Yönetimi ve Planlama:</strong> 7 yıllık kıtlık dönemini önceden öngörüp erzak depolayarak halkı açlıktan kurtarmıştır.</li>
</ul>`,
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Hz. Yusuf kıssası ve sabrın muazzam zaferi.',
    category: 'peygamberler',
    tags: ['yusuf', 'sabır', 'kıssalar', 'peygamberler', 'liderlik', 'affedicilik'],
    author: {
      name: 'Ayşe Öğretmen',
      avatar: ASSETS.ayseOgretmenProfile,
      role: 'Din Kültürü Uzmanı'
    },
    status: 'published',
    createdAt: '2026-08-18',
    views: 2130,
    likes: 560,
    readTimeMinutes: 6,
    isFeatured: true
  },
  {
    id: 'cms-5',
    title: 'Toplumsal Dayanışma: Zekat, Sadaka ve Yardımlaşma Ruhu',
    description: 'Sadece maddi değil tebessümle, güzel sözle ve bilgiyle yapılan sadakanın toplumdaki sevgi köprülerini nasıl kurduğu.',
    content: `<h3>Veren El Alan Elden Üstündür</h3>
<p>İslam dini bireysel ibadetlerin yanında toplumsal adaleti ve dayanışmayı en üst seviyede tutar. Zekat zengin ile fakir arasındaki uçurumu kapatırken, sadaka her insanın yapabileceği bir iyilik kapısıdır.</p>

<p>Peygamberimiz (sav), "Kardeşine gülümsemen dahi bir sadakadır" buyurarak iyiliğin maddiyattan ibaret olmadığını açıkça belirtmiştir.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Paylaşmak ve yardımlaşmak bereketi artırır.',
    category: 'ibadet',
    tags: ['zekat', 'sadaka', 'yardımlaşma', 'toplum', 'ahlak', 'infak'],
    author: {
      name: 'Hasan Hoca',
      avatar: ASSETS.hasanHocaAvatar,
      role: 'Din Kültürü Öğretmeni'
    },
    status: 'published',
    createdAt: '2026-08-15',
    views: 740,
    likes: 180,
    readTimeMinutes: 3,
    isFeatured: false
  },
  {
    id: 'cms-6',
    title: 'Gençler İçin Zaman Yönetimi ve Ömür Nimeti',
    description: 'Boşa geçen vakitleri verimli projelere, okumalara ve faydalı alışkanlıklara dönüştürme rehberi.',
    content: `<h3>İki Nimet: Sağlık ve Boş Vakit</h3>
<p>Zaman, insanın sahip olduğu en değerli ve geri getirilemeyen sermayedir. Günümüzde dikkat dağıtıcı unsurların arttığı bir çağda, zamanı disiplinle yönetmek hem okul başarısını hem de manevi tatmini artırır.</p>

<h4>Pratik Zaman Yönetimi Tavsiyeleri:</h4>
<ul>
  <li>Güne erken başlamak ve sabah saatlerinin bereketinden faydalanmak.</li>
  <li>Sosyal medya kullanımına günlük net süre sınırları koymak.</li>
  <li>Her gün en az 20 sayfa nitelikli kitap okumayı alışkanlık haline getirmek.</li>
</ul>`,
    imageUrl: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Zamanın değeri ve planlı çalışma disiplini.',
    category: 'genel',
    tags: ['zaman', 'gençlik', 'planlama', 'verimlilik', 'rehberlik', 'alışkanlık'],
    author: {
      name: 'Mehmet Hoca',
      avatar: ASSETS.mehmetHocaAvatar,
      role: 'İlahiyatçı & Yazar'
    },
    status: 'draft',
    createdAt: '2026-08-28',
    views: 45,
    likes: 8,
    readTimeMinutes: 4,
    isFeatured: false
  }
];

export const SUGGESTED_TAGS = [
  'inanç',
  'ibadet',
  'ahlak',
  'peygamberler',
  'genel',
  'dua',
  'namaz',
  'oruç',
  'zekat',
  'kuran',
  'hadis',
  'sabır',
  'dürüstlük',
  'gençlik',
  'tefekkür',
  'liderlik',
  'yardımlaşma',
  'zaman'
];

export const PRESET_IMAGE_TEMPLATES = [
  {
    label: 'Doğa & Tefekkür',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Kütüphane & İlim',
    url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Manevi Huzur & Işık',
    url: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Tarih & Kıssalar',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Dayanışma & İyilik',
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    label: 'Ahlak & Dürüstlük',
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80'
  }
];
