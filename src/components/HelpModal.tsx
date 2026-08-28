import React from 'react';

interface HelpModalProps {
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  const faqs = [
    {
      q: 'Sorduğum soruları kimler görebilir?',
      a: 'İsimsiz sorma seçeneğini işaretlediğinde profil bilgin gizlenir, sorunu yalnızca uzman öğretmenlerimiz inceleyebilir ve yanıt genel fayda için anonim olarak yayınlanabilir.'
    },
    {
      q: 'Sorularım ne kadar sürede cevaplanır?',
      a: 'Uzman öğretmen kadromuz soruları en geç 24 saat içerisinde titizlikle inceleyip yanıtlamaktadır.'
    },
    {
      q: 'XP puanları ve seviyeler ne işe yarar?',
      a: 'Soru sordukça, günlük bilgi yarışmalarını çözdükçe ve öğrenme modüllerini tamamladıkça seviye atlar, yeni rozetlerin kilidini açarsın.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div
        className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl w-full max-w-lg shadow-2xl border border-white/20 overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
          <h3 className="font-bold text-lg text-white font-display flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-indigo-300 text-[20px]">help_center</span>
            </div>
            <span>Yardım & Sıkça Sorulanlar</span>
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors border border-white/10"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <h4 className="font-bold text-sm text-indigo-300 mb-1.5 font-display">
                ❓ {faq.q}
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}

          <div className="bg-indigo-500/15 backdrop-blur-md rounded-2xl p-4 border border-indigo-400/25 text-center">
            <p className="text-xs text-indigo-200 font-medium leading-relaxed">
              Daha fazla soru veya önerin mi var? <br />
              <strong className="text-white">destek@brightpath.app</strong> üzerinden bize ulaşabilirsin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
