import React from 'react';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'answer' | 'quiz' | 'badge';
}

interface NotificationModalProps {
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onSelectNotification?: (notification: NotificationItem) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  notifications,
  onClose,
  onMarkAllAsRead,
  onSelectNotification,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div
        className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl w-full max-w-lg shadow-2xl border border-white/20 overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-indigo-300 text-[20px]">notifications</span>
            </div>
            <h3 className="font-bold text-lg text-white font-display">Bildirimler</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-xs text-indigo-300 font-semibold hover:text-white transition-colors cursor-pointer"
            >
              Tümünü Okundu Say
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors border border-white/10"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* List */}
        <div className="overflow-y-auto p-4 sm:p-6 divide-y divide-white/10">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <span className="material-symbols-outlined text-4xl mb-2">notifications_off</span>
              <p className="text-sm font-bold text-gray-300">Yeni bildirim bulunmuyor</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => onSelectNotification?.(n)}
                className={`py-3.5 px-3 rounded-2xl flex items-start gap-3 cursor-pointer transition-colors ${
                  n.unread ? 'bg-indigo-500/15 border border-indigo-500/25' : 'hover:bg-white/5'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                    n.type === 'answer'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : n.type === 'badge'
                      ? 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                      : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {n.type === 'answer'
                      ? 'forum'
                      : n.type === 'badge'
                      ? 'military_tech'
                      : 'quiz'}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="font-bold text-sm text-white truncate font-display">
                      {n.title}
                    </h4>
                    <span className="text-[11px] text-gray-400 whitespace-nowrap">{n.time}</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">{n.message}</p>
                </div>

                {n.unread && (
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 flex-shrink-0 mt-1 shadow-sm shadow-indigo-400" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
