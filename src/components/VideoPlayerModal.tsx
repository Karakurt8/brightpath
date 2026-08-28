import React, { useState } from 'react';

interface VideoPlayerModalProps {
  video: {
    title: string;
    duration: string;
    thumbnail: string;
    summary: string;
  };
  onClose: () => void;
  onCompleteVideo?: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  onClose,
  onCompleteVideo,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const handleFinish = () => {
    setHasCompleted(true);
    if (onCompleteVideo) onCompleteVideo();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl border border-white/20 animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video Player Box */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
          <img
            src={video.thumbnail}
            alt={video.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isPlaying ? 'opacity-85 scale-102' : 'opacity-70'
            }`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/50" />

          {/* Close button inside video frame */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-xl bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition-colors border border-white/10"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          {/* Play / Pause Interactive Simulation */}
          {!isPlaying ? (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute z-10 w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-indigo-600 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-4xl icon-fill pl-1">
                play_arrow
              </span>
            </button>
          ) : (
            <div className="absolute inset-0 flex flex-col justify-between p-4 z-10 pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs text-white font-bold bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                  Oynatılıyor • {video.duration}
                </span>
              </div>

              <div className="space-y-2 pointer-events-auto">
                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden backdrop-blur-xs">
                  <div className="bg-indigo-500 h-full w-2/3 animate-pulse" />
                </div>
                <div className="flex justify-between items-center text-xs text-white">
                  <span>04:12 / {video.duration}</span>
                  <button
                    onClick={handleFinish}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-lg text-xs font-bold transition-all border border-indigo-400/30"
                  >
                    Dersi Tamamla (+30 XP)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Info and Interactive Lesson Notes */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold text-indigo-300 uppercase tracking-wider bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30 font-display">
                7. Sınıf Din Kültürü Dersi
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-display">
                {video.title}
              </h3>
            </div>

            <span className="text-xs font-semibold text-gray-300 whitespace-nowrap bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg">
              Süre: {video.duration}
            </span>
          </div>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {video.summary}
          </p>

          {/* Key takeaways */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2">
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider font-display">
              📌 Bu Derste Neler Öğreneceksin?
            </h4>
            <ul className="text-xs sm:text-sm text-gray-300 space-y-1.5 list-disc list-inside">
              <li>Meleklerin nurdan yaratılışı ve temel özellikleri</li>
              <li>Dört büyük meleğin görevleri (Cebrail, Mikail, İsrafil, Azrail)</li>
              <li>İnsanın manevi koruyucusu ve yazıcı meleklerin (Kiramen Katibin) hikmeti</li>
            </ul>
          </div>

          {hasCompleted && (
            <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 p-3 rounded-2xl text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px] icon-fill text-emerald-400">
                check_circle
              </span>
              <span>Ders tamamlandı ve hesabına +30 XP eklendi!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
